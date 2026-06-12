import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import AnalyticsPage from './AnalyticsPage'
import { analyticsValueMetricsService } from '@/services/analyticsService'

describe('AnalyticsPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<AnalyticsPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders value metrics from fixtures', async () => {
    renderWithProviders(<AnalyticsPage />)
    const headings = await screen.findAllByText('Dashboard de Analytics')
    expect(headings.length).toBeGreaterThan(0)
    expect(screen.getByText('$142,500.00')).toBeInTheDocument()
    expect(screen.getByText('1.2M')).toBeInTheDocument()
  })

  it('renders channel comparison section', async () => {
    renderWithProviders(<AnalyticsPage />)
    await screen.findAllByText('Dashboard de Analytics')
    expect(screen.getByText('Performance Geral')).toBeInTheDocument()
    expect(screen.getByText('Conteúdos de Melhor Performance')).toBeInTheDocument()
  })

  it('renders top content rows from fixtures', async () => {
    renderWithProviders(<AnalyticsPage />)
    await screen.findAllByText('Dashboard de Analytics')
    await screen.findByText('Estratégias de Growth 2024')
    expect(screen.getByText('Tutorial: Master Class Analytics')).toBeInTheDocument()
    expect(screen.getByText('Relatório Semanal de Mercado')).toBeInTheDocument()
  })

  it('shows error state when the service fails', async () => {
    const spy = vi.spyOn(analyticsValueMetricsService, 'getById').mockRejectedValueOnce(new Error('boom'))
    renderWithProviders(<AnalyticsPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })
})
