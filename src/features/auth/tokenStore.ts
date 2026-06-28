/**
 * In-memory access-token store. The access token is deliberately NOT persisted
 * (no localStorage) — it lives only for the page session; the refresh token is
 * an httpOnly cookie owned by the gateway. A refresh handler is registered by
 * the AuthProvider so `apiClient` can recover from a 401 without a circular import.
 */
let accessToken: string | null = null
let refreshHandler: (() => Promise<boolean>) | null = null

export const tokenStore = {
  get(): string | null {
    return accessToken
  },
  set(token: string | null): void {
    accessToken = token
  },
  clear(): void {
    accessToken = null
  },
  /** Called by AuthProvider to wire its refresh routine. */
  registerRefresh(handler: (() => Promise<boolean>) | null): void {
    refreshHandler = handler
  },
  /** Attempt a token refresh; resolves true when a new token is available. */
  async refresh(): Promise<boolean> {
    return refreshHandler ? refreshHandler() : false
  },
}
