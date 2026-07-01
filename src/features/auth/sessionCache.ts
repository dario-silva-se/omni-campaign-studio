import type { AuthUser } from './authClient'

/**
 * Persists the authenticated user's PROFILE (not credentials) in localStorage so
 * a page reload can resume the session instantly instead of flashing the loading
 * gate. The access token is deliberately NOT cached here — it stays in memory
 * ({@link tokenStore}) and is re-minted from the httpOnly refresh cookie by the
 * AuthProvider's silent refresh. This only holds non-sensitive identity fields
 * (id, email, name, tenant, scopes) to render the UI optimistically while that
 * refresh revalidates in the background.
 */
const KEY = 'ocs.auth.user'

export const sessionCache = {
  read(): AuthUser | null {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      // Corrupt JSON or storage unavailable (private mode) → treat as no cache.
      return null
    }
  },
  write(user: AuthUser | null): void {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user))
      else localStorage.removeItem(KEY)
    } catch {
      // Ignore storage failures (quota, disabled) — the refresh cookie remains
      // the source of truth, so caching is a best-effort optimization.
    }
  },
}
