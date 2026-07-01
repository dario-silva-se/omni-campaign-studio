import { useEffect, useMemo, useRef, useState } from 'react'
import { isMockMode } from '@/services/apiClient'
import { tokenStore } from './tokenStore'
import {
  loginRequest,
  logoutRequest,
  refreshRequest,
  registerRequest,
  type AuthUser,
} from './authClient'
import { AuthContext, type AuthContextValue, type AuthStatus } from './authContext'

/**
 * Holds the authenticated session. The access token lives in {@link tokenStore}
 * (memory); this provider tracks the user + status for routing and registers the
 * refresh routine that `apiClient` calls on a 401. In mock mode there is no
 * backend, so the provider reports `authenticated` without any network call.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const mock = isMockMode()
  const [status, setStatus] = useState<AuthStatus>(mock ? 'authenticated' : 'loading')
  const [user, setUser] = useState<AuthUser | null>(null)
  // Guards against overlapping refreshes (e.g. many parallel 401s).
  const refreshing = useRef<Promise<boolean> | null>(null)

  useEffect(() => {
    if (mock) return
    let alive = true

    async function refresh(): Promise<boolean> {
      if (!refreshing.current) {
        refreshing.current = (async () => {
          try {
            const res = await refreshRequest()
            tokenStore.set(res.accessToken)
            if (alive) {
              setUser(res.user)
              setStatus('authenticated')
            }
            return true
          } catch {
            tokenStore.clear()
            if (alive) {
              setUser(null)
              setStatus('unauthenticated')
            }
            return false
          } finally {
            refreshing.current = null
          }
        })()
      }
      return refreshing.current
    }

    tokenStore.registerRefresh(refresh)
    // Silent bootstrap: try to resume a session from the refresh cookie.
    void refresh()

    return () => {
      alive = false
      tokenStore.registerRefresh(null)
    }
  }, [mock])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      async login(email, password) {
        const res = await loginRequest(email, password)
        tokenStore.set(res.accessToken)
        setUser(res.user)
        setStatus('authenticated')
      },
      async register(payload) {
        const res = await registerRequest(payload)
        tokenStore.set(res.accessToken)
        setUser(res.user)
        setStatus('authenticated')
      },
      async logout() {
        try {
          await logoutRequest()
        } finally {
          tokenStore.clear()
          setUser(null)
          setStatus('unauthenticated')
        }
      },
    }),
    [status, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
