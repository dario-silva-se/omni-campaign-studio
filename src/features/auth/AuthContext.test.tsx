import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('./authClient', () => ({
  refreshRequest: vi.fn(),
  loginRequest: vi.fn(),
  logoutRequest: vi.fn(),
}))

import * as authClient from './authClient'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './authContext'
import { tokenStore } from './tokenStore'

function Probe() {
  const { status } = useAuth()
  return <div>status:{status}</div>
}

beforeEach(() => {
  vi.stubEnv('VITE_USE_MOCKS', 'false')
  vi.clearAllMocks()
  tokenStore.clear()
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
    await waitFor(() => expect(screen.getByText('status:authenticated')).toBeInTheDocument())
    expect(tokenStore.get()).toBe('tok')
  })

  it('falls back to unauthenticated when refresh fails', async () => {
    vi.mocked(authClient.refreshRequest).mockRejectedValue(new Error('no cookie'))
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByText('status:unauthenticated')).toBeInTheDocument())
    expect(tokenStore.get()).toBeNull()
  })
})
