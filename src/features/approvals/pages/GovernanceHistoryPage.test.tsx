import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '@/test/renderWithProviders'
import GovernanceHistoryPage from './GovernanceHistoryPage'
import * as governanceHistoryService from '@/services/governanceHistoryService'

describe('GovernanceHistoryPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<GovernanceHistoryPage />, { route: '/approvals/history' })
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders content names from governance history fixture', async () => {
    renderWithProviders(<GovernanceHistoryPage />, { route: '/approvals/history' })
    expect(await screen.findByText('Summer Launch Reel v4')).toBeInTheDocument()
    expect(await screen.findByText('Tech-Expo Static Banner')).toBeInTheDocument()
    expect(await screen.findByText('Compliance Update v2.1')).toBeInTheDocument()
    expect(await screen.findByText('Quarterly Insight Story')).toBeInTheDocument()
  })

  it('renders the audit table with rows', async () => {
    renderWithProviders(<GovernanceHistoryPage />, { route: '/approvals/history' })
    // Table rows are rendered by DataTable
    await screen.findByText('Summer Launch Reel v4')
    const rows = screen.getAllByRole('row')
    // 1 header + 4 data rows
    expect(rows.length).toBeGreaterThanOrEqual(5)
  })

  it('shows error state when service fails', async () => {
    vi.spyOn(governanceHistoryService.governanceHistoryService, 'list').mockRejectedValueOnce(
      new Error('Network error'),
    )
    renderWithProviders(<GovernanceHistoryPage />, { route: '/approvals/history' })
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
