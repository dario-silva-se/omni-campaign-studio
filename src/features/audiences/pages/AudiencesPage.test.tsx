import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import AudiencesPage from './AudiencesPage'
import { audienceService } from '@/services/audienceService'

describe('AudiencesPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<AudiencesPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders segment cards from fixtures', async () => {
    renderWithProviders(<AudiencesPage />)
    expect(await screen.findByText('Desenvolvedores Sênior')).toBeInTheDocument()
    expect(screen.getByText('Diretores B2B')).toBeInTheDocument()
    expect(screen.getByText('Fundadores de Startup')).toBeInTheDocument()
  })

  it('renders the page title', async () => {
    renderWithProviders(<AudiencesPage />)
    expect(await screen.findByText('Segmentação de Público')).toBeInTheDocument()
  })

  it('shows error state when the service fails', async () => {
    const spy = vi.spyOn(audienceService, 'list').mockRejectedValueOnce(new Error('boom'))
    renderWithProviders(<AudiencesPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })
})
