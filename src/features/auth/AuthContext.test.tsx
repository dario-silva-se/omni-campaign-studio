import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('./authClient', () => ({
  refreshRequest: vi.fn(),
  loginRequest: vi.fn(),
  registerRequest: vi.fn(),
  logoutRequest: vi.fn(),
}))

import * as authClient from './authClient'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './authContext'
import { tokenStore } from './tokenStore'
import { sessionCache } from './sessionCache'

function Probe() {
  const { status, user } = useAuth()
  return (
    <div>
      status:{status} user:{user?.email ?? 'none'}
    </div>
  )
}

beforeEach(() => {
  vi.stubEnv('VITE_USE_MOCKS', 'false')
  vi.clearAllMocks()
  tokenStore.clear()
  localStorage.clear()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('AuthProvider', () => {
  it('resumes a session when the refresh cookie is valid', async () => {
    vi.mocked(authClient.refreshRequest).mockResolvedValue({
      accessToken: 'tok',
      expiresIn: 1800,
      user: { id: 'u1', email: 'a@b.com', tenantId: 't', scopes: ['api:read'] },
    })
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByText(/status:authenticated/)).toBeInTheDocument())
    expect(tokenStore.get()).toBe('tok')
  })

  it('falls back to unauthenticated when refresh fails', async () => {
    vi.mocked(authClient.refreshRequest).mockRejectedValue(new Error('no cookie'))
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByText(/status:unauthenticated/)).toBeInTheDocument())
    expect(tokenStore.get()).toBeNull()
  })

  it('resumes optimistically from the cached profile before refresh resolves', () => {
    sessionCache.write({ id: 'u1', email: 'cached@b.com', tenantId: 't', scopes: ['api:read'] })
    // Refresh never settles: the UI must already be authenticated from cache.
    vi.mocked(authClient.refreshRequest).mockReturnValue(new Promise(() => {}))
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    expect(screen.getByText(/status:authenticated user:cached@b.com/)).toBeInTheDocument()
  })

  it('clears the cached profile when the background refresh fails', async () => {
    sessionCache.write({ id: 'u1', email: 'stale@b.com', tenantId: 't', scopes: ['api:read'] })
    vi.mocked(authClient.refreshRequest).mockRejectedValue(new Error('expired'))
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByText(/status:unauthenticated/)).toBeInTheDocument())
    expect(sessionCache.read()).toBeNull()
  })

  it('persists the profile to cache on a successful refresh', async () => {
    vi.mocked(authClient.refreshRequest).mockResolvedValue({
      accessToken: 'tok',
      expiresIn: 1800,
      user: { id: 'u9', email: 'fresh@b.com', tenantId: 't', scopes: ['api:read'] },
    })
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByText(/status:authenticated/)).toBeInTheDocument())
    expect(sessionCache.read()?.email).toBe('fresh@b.com')
  })
})
