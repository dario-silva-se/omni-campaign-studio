import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { contentGenerationService } from '@/services/creativeService'
import ContentGenerationPage from './ContentGenerationPage'

describe('ContentGenerationPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<ContentGenerationPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders content generation data from fixtures', async () => {
    renderWithProviders(<ContentGenerationPage />)

    // Wait for data to load
    expect(await screen.findByText('Geração de Posts')).toBeInTheDocument()
    // Stats
    expect(screen.getByText('GERADOS')).toBeInTheDocument()
    expect(screen.getByText('AGENDADOS')).toBeInTheDocument()
    expect(screen.getByText('PUBLICADOS')).toBeInTheDocument()
    // Column headers
    expect(screen.getByText('Posts Gerados')).toBeInTheDocument()
    expect(screen.getByText('Agendados')).toBeInTheDocument()
    expect(screen.getByText('Feitos do mês')).toBeInTheDocument()
    // Post content
    expect(
      screen.getByText(/Tutorial: Como automatizar seu fluxo de Telegram/i),
    ).toBeInTheDocument()
  })

  it('shows error state when the service fails', async () => {
    const spy = vi
      .spyOn(contentGenerationService, 'getById')
      .mockRejectedValueOnce(new Error('boom'))
    renderWithProviders(<ContentGenerationPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('generate action triggers content generation and renders result', async () => {
    renderWithProviders(<ContentGenerationPage />)

    // Wait for page to load
    await screen.findByText('Geração de Posts')

    // Click the generate button
    const generateBtn = screen.getByRole('button', { name: /Gerar novo post/i })
    await userEvent.click(generateBtn)

    // Wait for the generated content to appear
    expect(
      await screen.findByText(/O futuro do marketing digital está aqui/i),
    ).toBeInTheDocument()
  })
})
