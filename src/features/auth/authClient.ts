import axios from 'axios'

export interface AuthUser {
  id: string
  email: string
  tenantId: string
  scopes: string[]
}

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  user: AuthUser
}

/**
 * Base URL of the gateway control plane (`/_gw/auth/*`). Prefer an explicit
 * `VITE_GATEWAY_URL`; otherwise derive it from `VITE_API_URL` by dropping the
 * trailing `/api` (the auth endpoints live at the gateway root, not under /api).
 */
export function gatewayBaseUrl(): string {
  const explicit = import.meta.env.VITE_GATEWAY_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const api = import.meta.env.VITE_API_URL ?? ''
  return api.replace(/\/?api\/?$/, '')
}

// Dedicated client: sends/receives the httpOnly refresh cookie (withCredentials).
export const gatewayClient = axios.create({
  baseURL: gatewayBaseUrl(),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const { data } = await gatewayClient.post<AuthResponse>('/_gw/auth/login', { email, password })
  return data
}

export async function refreshRequest(): Promise<AuthResponse> {
  const { data } = await gatewayClient.post<AuthResponse>('/_gw/auth/refresh')
  return data
}

export async function logoutRequest(): Promise<void> {
  await gatewayClient.post('/_gw/auth/logout')
}
