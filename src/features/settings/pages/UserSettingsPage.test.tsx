import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import UserSettingsPage from './UserSettingsPage'

describe('UserSettingsPage', () => {
  it('renders without crashing', () => {
    renderWithProviders(<UserSettingsPage />)
    expect(screen.getByRole('heading', { name: /Configurações/i })).toBeInTheDocument()
  })

  it('shows profile tab content by default', () => {
    renderWithProviders(<UserSettingsPage />)
    expect(screen.getByText('Informações Pessoais')).toBeInTheDocument()
  })

  it('switches to security tab', async () => {
    renderWithProviders(<UserSettingsPage />)
    await userEvent.click(screen.getByRole('tab', { name: /Senha/i }))
    expect(screen.getByText('Alterar Senha')).toBeInTheDocument()
  })

  it('switches to account tab', async () => {
    renderWithProviders(<UserSettingsPage />)
    await userEvent.click(screen.getByRole('tab', { name: /Conta/i }))
    expect(screen.getByText('Preferências Gerais')).toBeInTheDocument()
  })

  it('shows danger zone in account tab', async () => {
    renderWithProviders(<UserSettingsPage />)
    await userEvent.click(screen.getByRole('tab', { name: /Conta/i }))
    expect(screen.getByText('Zona de Perigo')).toBeInTheDocument()
  })

  it('toggles password visibility in security tab', async () => {
    renderWithProviders(<UserSettingsPage />)
    await userEvent.click(screen.getByRole('tab', { name: /Senha/i }))
    const input = screen.getByPlaceholderText('Digite sua senha atual')
    expect(input).toHaveAttribute('type', 'password')
    const toggleBtn = screen.getAllByRole('button', { name: /mostrar senha/i })[0]
    await userEvent.click(toggleBtn)
    expect(input).toHaveAttribute('type', 'text')
  })
})
