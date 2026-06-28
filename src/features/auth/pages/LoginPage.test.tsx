import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AuthContext, type AuthContextValue } from '../authContext'
import LoginPage from './LoginPage'

function renderLogin(login: AuthContextValue['login'] = vi.fn(async () => {})) {
  const value: AuthContextValue = {
    status: 'unauthenticated',
    user: null,
    login,
    logout: vi.fn(async () => {}),
  }
  renderWithProviders(
    <AuthContext.Provider value={value}>
      <LoginPage />
    </AuthContext.Provider>,
    { route: '/login' },
  )
  return { login }
}

beforeEach(() => vi.stubEnv('VITE_USE_MOCKS', 'false'))
afterEach(() => vi.unstubAllEnvs())

describe('LoginPage', () => {
  it('submits credentials to login()', async () => {
    const { login } = renderLogin()
    fireEvent.change(screen.getByLabelText(/e-?mail/i), { target: { value: 'a@b.com' } })
    fireEvent.change(screen.getByLabelText(/senha|password/i), { target: { value: 'secret12' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar|sign in/i }))
    await waitFor(() => expect(login).toHaveBeenCalledWith('a@b.com', 'secret12'))
  })

  it('shows an error when login fails', async () => {
    const login = vi.fn(async () => {
      throw new Error('bad')
    })
    renderLogin(login)
    fireEvent.change(screen.getByLabelText(/e-?mail/i), { target: { value: 'a@b.com' } })
    fireEvent.change(screen.getByLabelText(/senha|password/i), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar|sign in/i }))
    await waitFor(() =>
      expect(screen.getByText(/inválidos|invalid/i)).toBeInTheDocument(),
    )
  })
})
