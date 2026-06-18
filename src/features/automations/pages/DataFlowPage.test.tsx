import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import DataFlowPage from './DataFlowPage'

describe('DataFlowPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<DataFlowPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders content from fixture', async () => {
    renderWithProviders(<DataFlowPage />)
    expect(await screen.findByText(/Fluxo de Dados em Tempo Real/i)).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('4.2')).toBeInTheDocument()
  })

  it('renders live traffic table rows', async () => {
    renderWithProviders(<DataFlowPage />)
    const leadSynced = await screen.findAllByText(/Lead Synced/)
    expect(leadSynced.length).toBeGreaterThan(0)
    expect(screen.getByText(/Trigger Activated/)).toBeInTheDocument()
  })

  it('renders channel status section', async () => {
    renderWithProviders(<DataFlowPage />)
    expect(await screen.findByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('Telegram')).toBeInTheDocument()
  })
})
