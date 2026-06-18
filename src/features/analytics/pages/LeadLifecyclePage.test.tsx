import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import LeadLifecyclePage from './LeadLifecyclePage'

describe('LeadLifecyclePage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<LeadLifecyclePage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders lead lifecycle attribution from fixtures', async () => {
    renderWithProviders(<LeadLifecyclePage />)
    expect(await screen.findByText('Lead Lifecycle & Attribution')).toBeInTheDocument()
    expect(screen.getByText('Source Attribution')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn Campaigns')).toBeInTheDocument()
  })

  it('renders velocity and quality metrics', async () => {
    renderWithProviders(<LeadLifecyclePage />)
    await screen.findByText('Lead Lifecycle & Attribution')
    expect(screen.getByText('Velocity')).toBeInTheDocument()
    expect(screen.getByText('4.2')).toBeInTheDocument()
    expect(screen.getByText('Avg Quality')).toBeInTheDocument()
  })

  it('renders leads table rows from fixtures', async () => {
    renderWithProviders(<LeadLifecyclePage />)
    await screen.findByText('Sarah Anderson')
    expect(screen.getByText('Marcus Reed')).toBeInTheDocument()
    expect(screen.getByText('Elena Lopez')).toBeInTheDocument()
  })
})
