import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { tokenStore } from '@/features/auth/tokenStore'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// Default to mock mode unless VITE_USE_MOCKS is explicitly 'false' (real backend connected)
export const isMockMode = (): boolean => import.meta.env.VITE_USE_MOCKS !== 'false'

// Attach the credential on every request: the in-memory access token issued by
// the gateway login (preferred), falling back to a static VITE_API_KEY for
// server-to-server / dev usage. The gateway also accepts the key via X-Api-Key.
apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get() ?? import.meta.env.VITE_API_KEY
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On a 401, try a single silent token refresh and replay the request; if that
// fails the AuthProvider flips to unauthenticated and the guard routes to /login.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    if (!isMockMode() && error.response?.status === 401 && original && !original._retry) {
      original._retry = true
      const refreshed = await tokenStore.refresh()
      if (refreshed) {
        const token = tokenStore.get()
        if (token) original.headers.Authorization = `Bearer ${token}`
        return apiClient(original)
      }
    }
    // Central place to translate API error bodies into app errors
    const data = error.response?.data as { message?: string } | undefined
    const message = data?.message ?? error.message ?? 'Unexpected API error'
    return Promise.reject(new Error(message))
  },
)

// Dev-only guard: talking to a real backend with no credential is almost always
// a misconfiguration (the gateway will answer 401). Warn instead of failing silently.
if (import.meta.env.DEV && !isMockMode() && !import.meta.env.VITE_API_KEY) {
  console.warn(
    '[apiClient] VITE_USE_MOCKS=false — sign in via the gateway, or set VITE_API_KEY for server-to-server access.',
  )
}
