import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import CampaignsPage from './CampaignsPage'
import { campaignService } from '@/services/campaignService'
import { campaignsFixture } from '@/mocks/fixtures/campaigns'

describe('CampaignsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading state initially', () => {
    vi.spyOn(campaignService, 'list').mockReturnValue(new Promise(() => {}))
    renderWithProviders(<CampaignsPage />)
    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('renders campaign names from fixture', async () => {
    vi.spyOn(campaignService, 'list').mockResolvedValue(campaignsFixture)
    renderWithProviders(<CampaignsPage />)
    // active tab is default — active campaigns only
    const activeNames = campaignsFixture
      .filter((c) => c.status === 'active' || c.status === 'launching')
      .map((c) => c.name)
    for (const name of activeNames) {
      expect(await screen.findByText(name)).toBeInTheDocument()
    }
  })

  it('shows error alert when service fails', async () => {
    vi.spyOn(campaignService, 'list').mockRejectedValue(new Error('fail'))
    renderWithProviders(<CampaignsPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
