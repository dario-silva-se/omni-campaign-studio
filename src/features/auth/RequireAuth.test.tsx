import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext, type AuthContextValue } from './authContext'
import { RequireAuth } from './RequireAuth'

function renderAt(status: AuthContextValue['status']) {
  const value: AuthContextValue = {
    status,
    user: null,
    login: vi.fn(async () => {}),
    register: vi.fn(async () => {}),
    logout: vi.fn(async () => {}),
  }
  return render(
    <MemoryRouter initialEntries={['/secret']}>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <div>secret content</div>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<div>login page</div>} />
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  )
}

beforeEach(() => vi.stubEnv('VITE_USE_MOCKS', 'false'))
afterEach(() => vi.unstubAllEnvs())

describe('RequireAuth', () => {
  it('redirects unauthenticated users to /login', () => {
    renderAt('unauthenticated')
    expect(screen.getByText('login page')).toBeInTheDocument()
    expect(screen.queryByText('secret content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    renderAt('authenticated')
    expect(screen.getByText('secret content')).toBeInTheDocument()
  })

  it('bypasses auth entirely in mock mode', () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true')
    render(
      <MemoryRouter initialEntries={['/secret']}>
        <Routes>
          <Route
            path="/secret"
            element={
              <RequireAuth>
                <div>secret content</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('secret content')).toBeInTheDocument()
  })
})
