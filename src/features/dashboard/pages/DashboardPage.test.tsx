import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<DashboardPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders greeting and summary stats from the service', async () => {
    renderWithProviders(<DashboardPage />)
    expect(await screen.findByText(/Bom dia, Matheus/)).toBeInTheDocument()
    expect(screen.getByText('Resultados Gerais')).toBeInTheDocument()
    expect(screen.getByText('880')).toBeInTheDocument()
  })

  it('renders signal sections', async () => {
    renderWithProviders(<DashboardPage />)
    expect(await screen.findByText(/LinkedIn Trends/)).toBeInTheDocument()
    // Multiple elements may contain "YouTube" (stat label + signal header)
    expect(screen.getAllByText(/YouTube/).length).toBeGreaterThan(0)
  })
})
