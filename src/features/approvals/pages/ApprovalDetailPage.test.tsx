import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import ApprovalDetailPage from './ApprovalDetailPage'

function renderAt(approvalId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/approvals/${approvalId}`]}>
          <Routes>
            <Route path="/approvals/:id" element={<ApprovalDetailPage />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('ApprovalDetailPage', () => {
  it('shows loading on initial render', () => {
    renderAt('apr-001')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders reviewers from fixture', async () => {
    renderAt('apr-001')
    // Sarah Jenkins appears in both reviewer panel and comments section
    const sarahItems = await screen.findAllByText('Sarah Jenkins')
    expect(sarahItems.length).toBeGreaterThanOrEqual(1)
    const markItems = await screen.findAllByText('Mark Davis')
    expect(markItems.length).toBeGreaterThanOrEqual(1)
  })

  it('clicking Aprovar button updates status to Aprovado', async () => {
    renderAt('apr-001')
    // Wait for the page to load
    const approveBtn = await screen.findByRole('button', { name: /aprovar para publicação/i })
    expect(approveBtn).toBeInTheDocument()

    fireEvent.click(approveBtn)

    // After mutation succeeds, the status chip should update to Aprovado
    await waitFor(() => {
      expect(screen.getByText(/aprovado/i)).toBeInTheDocument()
    })
  })

  it('opens request changes modal when button is clicked', async () => {
    // Use apr-002 to avoid state pollution from the approve test
    renderAt('apr-002')
    const requestBtn = await screen.findByRole('button', { name: /solicitar alterações/i })
    fireEvent.click(requestBtn)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    // Modal has a textarea (may be multiple textboxes on page)
    expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(1)
  })

  it('closes request changes modal on cancel', async () => {
    // Use apr-003 to avoid state pollution from prior tests
    renderAt('apr-003')
    const requestBtn = await screen.findByRole('button', { name: /solicitar alterações/i })
    fireEvent.click(requestBtn)
    // Wait for the dialog to appear
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    // Find Cancel inside the dialog
    const cancelBtn = screen.getAllByRole('button', { name: /cancelar/i })[0]
    fireEvent.click(cancelBtn)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
