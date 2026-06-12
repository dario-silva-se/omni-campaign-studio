import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central place to translate API error bodies into app errors
    const message = error.response?.data?.message ?? error.message ?? 'Unexpected API error'
    return Promise.reject(new Error(message))
  },
)

export const isMockMode = (): boolean => import.meta.env.VITE_USE_MOCKS === 'true'
