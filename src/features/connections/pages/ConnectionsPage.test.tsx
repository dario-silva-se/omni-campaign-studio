import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import ConnectionsPage from './ConnectionsPage'

describe('ConnectionsPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<ConnectionsPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders channel cards from fixture', async () => {
    renderWithProviders(<ConnectionsPage />)
    // channel names come from i18n common:channels (LinkedIn, YouTube, Telegram)
    const linkedinEls = await screen.findAllByText(/linkedin/i)
    expect(linkedinEls.length).toBeGreaterThanOrEqual(1)
    const youtubeEls = await screen.findAllByText(/youtube/i)
    expect(youtubeEls.length).toBeGreaterThanOrEqual(1)
    const telegramEls = await screen.findAllByText(/telegram/i)
    expect(telegramEls.length).toBeGreaterThanOrEqual(1)
  })

  it('renders health chips from fixture', async () => {
    renderWithProviders(<ConnectionsPage />)
    // LinkedIn and Telegram are healthy (Ativo), YouTube is error (Atenção) — pt-BR default
    const activeChips = await screen.findAllByText('Ativo')
    expect(activeChips.length).toBeGreaterThanOrEqual(2)
    const warningChips = await screen.findAllByText('Atenção')
    expect(warningChips.length).toBeGreaterThanOrEqual(1)
  })

  it('logs error spy without crashing', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderWithProviders(<ConnectionsPage />)
    const linkedinEls = await screen.findAllByText(/linkedin/i)
    expect(linkedinEls.length).toBeGreaterThanOrEqual(1)
    consoleSpy.mockRestore()
  })
})
