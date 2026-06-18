import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import CampaignHealthPage from './CampaignHealthPage'

describe('CampaignHealthPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<CampaignHealthPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders campaign health ROI from fixtures', async () => {
    renderWithProviders(<CampaignHealthPage />)
    expect(await screen.findByText('Campaign Health & ROI')).toBeInTheDocument()
    expect(screen.getByText('$1.24M')).toBeInTheDocument()
    expect(screen.getByText('3.8x')).toBeInTheDocument()
  })

  it('renders channel diagnostics table', async () => {
    renderWithProviders(<CampaignHealthPage />)
    await screen.findByText('Campaign Health & ROI')
    expect(screen.getByText('Channel Diagnostics')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn B2B')).toBeInTheDocument()
  })

  it('renders AI actions timeline', async () => {
    renderWithProviders(<CampaignHealthPage />)
    await screen.findByText('Campaign Health & ROI')
    expect(screen.getByText('AI Actions')).toBeInTheDocument()
    expect(screen.getByText('Bid Adjustment')).toBeInTheDocument()
  })
})
