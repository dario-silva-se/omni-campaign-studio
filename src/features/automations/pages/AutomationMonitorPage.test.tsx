import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import AutomationMonitorPage from './AutomationMonitorPage'

describe('AutomationMonitorPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<AutomationMonitorPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders content from fixture', async () => {
    renderWithProviders(<AutomationMonitorPage />)
    expect(await screen.findByText(/Insights & Monitoramento/i)).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
    expect(screen.getByText('$14.2k')).toBeInTheDocument()
    expect(screen.getByText('99.8%')).toBeInTheDocument()
  })

  it('renders execution feed items', async () => {
    renderWithProviders(<AutomationMonitorPage />)
    expect(await screen.findByText(/CPM Surge detectado/i)).toBeInTheDocument()
  })
})
