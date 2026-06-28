import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// When pointing at omni-campaign-studio-gateway, requests must carry a
// credential. Attach the configured API key (Bearer) on every request; the
// gateway also accepts it via the `X-Api-Key` header. Leave VITE_API_KEY unset
// to talk to an unauthenticated API directly (or in mock mode).
apiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_API_KEY
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central place to translate API error bodies into app errors
    const message = error.response?.data?.message ?? error.message ?? 'Unexpected API error'
    return Promise.reject(new Error(message))
  },
)

// Default to mock mode unless VITE_USE_MOCKS is explicitly 'false' (real backend connected)
export const isMockMode = (): boolean => import.meta.env.VITE_USE_MOCKS !== 'false'
