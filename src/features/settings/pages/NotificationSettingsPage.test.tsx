import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import NotificationSettingsPage from './NotificationSettingsPage'

describe('NotificationSettingsPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<NotificationSettingsPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders channel routing toggles from fixture', async () => {
    renderWithProviders(<NotificationSettingsPage />)
    // Wait for page title to appear
    expect(await screen.findByText('Configurações de Notificação')).toBeInTheDocument()
    // Channel routing section
    expect(screen.getByText('Roteamento de Canais')).toBeInTheDocument()
    // Channel labels
    expect(screen.getByText('Integração Slack')).toBeInTheDocument()
    expect(screen.getByText('Bot Telegram')).toBeInTheDocument()
    expect(screen.getByText('Digest por E-mail')).toBeInTheDocument()
    expect(screen.getByText('Central In-App')).toBeInTheDocument()
  })

  it('renders severity matrix from fixture', async () => {
    renderWithProviders(<NotificationSettingsPage />)
    expect(await screen.findByText('Matriz de Roteamento por Severidade')).toBeInTheDocument()
    expect(screen.getByText('Crítico')).toBeInTheDocument()
    expect(screen.getByText('Atenção')).toBeInTheDocument()
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('renders team subscriptions from fixture', async () => {
    renderWithProviders(<NotificationSettingsPage />)
    expect(await screen.findByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument()
    expect(screen.getByText('Liam Davis')).toBeInTheDocument()
  })

  it('renders channel overrides section', async () => {
    renderWithProviders(<NotificationSettingsPage />)
    expect(await screen.findByText('Substituições por Canal')).toBeInTheDocument()
    // 3 overrides active badge
    expect(screen.getByText('3 SUBSTITUIÇÕES ATIVAS')).toBeInTheDocument()
  })

  it('toggling Slack switch flips aria-checked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NotificationSettingsPage />)

    // Find the Slack toggle (its aria-label matches the channel label)
    const slackToggle = await screen.findByRole('switch', { name: /integra.*o slack/i })
    // Fixture has slackEnabled: true
    expect(slackToggle).toHaveAttribute('aria-checked', 'true')

    await user.click(slackToggle)

    // After mutation + re-query, the toggle should be false
    await waitFor(() => {
      expect(slackToggle).toHaveAttribute('aria-checked', 'false')
    })
  })

  it('toggling email switch flips aria-checked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NotificationSettingsPage />)

    // emailEnabled is false in fixture
    const emailToggle = await screen.findByRole('switch', { name: /digest por e-mail/i })
    expect(emailToggle).toHaveAttribute('aria-checked', 'false')

    await user.click(emailToggle)

    await waitFor(() => {
      expect(emailToggle).toHaveAttribute('aria-checked', 'true')
    })
  })
})
