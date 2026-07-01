import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AuthContext, type AuthContextValue } from '../authContext'
import RegisterPage from './RegisterPage'

function renderRegister(register: AuthContextValue['register'] = vi.fn(async () => {})) {
  const value: AuthContextValue = {
    status: 'unauthenticated',
    user: null,
    login: vi.fn(async () => {}),
    register,
    logout: vi.fn(async () => {}),
  }
  renderWithProviders(
    <AuthContext.Provider value={value}>
      <RegisterPage />
    </AuthContext.Provider>,
    { route: '/register' },
  )
  return { register }
}

function fill(values: { name?: string; email?: string; password?: string; confirm?: string }) {
  if (values.name !== undefined)
    fireEvent.change(screen.getByLabelText(/nome|name/i), { target: { value: values.name } })
  if (values.email !== undefined)
    fireEvent.change(screen.getByLabelText(/e-?mail/i), { target: { value: values.email } })
  if (values.password !== undefined)
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: values.password } })
  if (values.confirm !== undefined)
    fireEvent.change(screen.getByLabelText(/confirmar|confirm/i), { target: { value: values.confirm } })
}

beforeEach(() => vi.stubEnv('VITE_USE_MOCKS', 'false'))
afterEach(() => vi.unstubAllEnvs())

describe('RegisterPage', () => {
  it('registers when the form is valid and terms are accepted', async () => {
    const { register } = renderRegister()
    fill({ name: 'Maria Silva', email: 'maria@empresa.com', password: 'secret12', confirm: 'secret12' })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: /criar conta|create account/i }))
    await waitFor(() =>
      expect(register).toHaveBeenCalledWith({
        name: 'Maria Silva',
        email: 'maria@empresa.com',
        password: 'secret12',
      }),
    )
  })

  it('blocks submission when passwords do not match', async () => {
    const { register } = renderRegister()
    fill({ name: 'Maria', email: 'maria@empresa.com', password: 'secret12', confirm: 'different' })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: /criar conta|create account/i }))
    await waitFor(() => expect(screen.getByText(/não coincidem|do not match/i)).toBeInTheDocument())
    expect(register).not.toHaveBeenCalled()
  })

  it('blocks submission when terms are not accepted', async () => {
    const { register } = renderRegister()
    fill({ name: 'Maria', email: 'maria@empresa.com', password: 'secret12', confirm: 'secret12' })
    fireEvent.click(screen.getByRole('button', { name: /criar conta|create account/i }))
    await waitFor(() => expect(screen.getByText(/aceitar os termos|accept the terms/i)).toBeInTheDocument())
    expect(register).not.toHaveBeenCalled()
  })
})
