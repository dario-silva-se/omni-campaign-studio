import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '@/test/renderWithProviders'
import ApprovalsPage from './ApprovalsPage'
import * as approvalService from '@/services/approvalService'

describe('ApprovalsPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<ApprovalsPage />, { route: '/approvals' })
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders approval titles and reviewer names from fixture', async () => {
    renderWithProviders(<ApprovalsPage />, { route: '/approvals' })
    expect(await screen.findByText('LI_Q4_PRODUCT_LAUNCH_02')).toBeInTheDocument()
    expect(await screen.findByText('The Future of AI-Driven Workflows in Enterprise')).toBeInTheDocument()
    expect(await screen.findByText('Q4 Product Roadmap Update - Confidential')).toBeInTheDocument()
  })

  it('shows error state when service fails', async () => {
    vi.spyOn(approvalService.approvalService, 'list').mockRejectedValueOnce(new Error('Network error'))
    renderWithProviders(<ApprovalsPage />, { route: '/approvals' })
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
