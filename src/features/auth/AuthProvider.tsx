import { useEffect, useMemo, useRef, useState } from 'react'
import { isMockMode } from '@/services/apiClient'
import { tokenStore } from './tokenStore'
import { sessionCache } from './sessionCache'
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
 *
 * On reload the user profile is seeded from {@link sessionCache} (localStorage)
 * so the app renders authenticated immediately, while the silent refresh
 * re-mints the access token from the httpOnly cookie and revalidates in the
 * background. If that refresh fails, the session is cleared and the guard
 * routes to /login.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const mock = isMockMode()
  // Seed from the cached profile so a reload resumes without a loading flash.
  // (Lazy initializers keep these impure reads out of the render body.)
  const [status, setStatus] = useState<AuthStatus>(() => {
    if (mock) return 'authenticated'
    return sessionCache.read() ? 'authenticated' : 'loading'
  })
  const [user, setUser] = useState<AuthUser | null>(() => (mock ? null : sessionCache.read()))
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
            sessionCache.write(res.user)
            if (alive) {
              setUser(res.user)
              setStatus('authenticated')
            }
            return true
          } catch {
            tokenStore.clear()
            sessionCache.write(null)
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
        sessionCache.write(res.user)
        setUser(res.user)
        setStatus('authenticated')
      },
      async register(payload) {
        const res = await registerRequest(payload)
        tokenStore.set(res.accessToken)
        sessionCache.write(res.user)
        setUser(res.user)
        setStatus('authenticated')
      },
      async logout() {
        try {
          await logoutRequest()
        } finally {
          tokenStore.clear()
          sessionCache.write(null)
          setUser(null)
          setStatus('unauthenticated')
        }
      },
    }),
    [status, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
