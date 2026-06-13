import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { setMockExportDurationMs, setMockForceError } from '@/services/reportService'
import ExportReportPage from './ExportReportPage'

// Use a very short duration so tests complete fast and are not flaky
beforeAll(() => {
  setMockExportDurationMs(50)
})

afterAll(() => {
  setMockExportDurationMs(1500)
})

afterEach(() => {
  // Reset test-only mock flags after every test so no state leaks between tests
  setMockForceError(false)
})

describe('ExportReportPage', () => {
  it('renders the idle export form', async () => {
    renderWithProviders(<ExportReportPage />)
    expect(await screen.findByText('Exportar Relatório PDF')).toBeInTheDocument()
    expect(screen.getByText('PERÍODO DE RELATÓRIO')).toBeInTheDocument()
    expect(screen.getByText('CANAIS INCLUSOS')).toBeInTheDocument()
    expect(screen.getByText('SEÇÕES DO DOCUMENTO')).toBeInTheDocument()
  })

  it('shows PDF generation button', () => {
    renderWithProviders(<ExportReportPage />)
    const btn = screen.getByRole('button', { name: /gerar pdf/i })
    expect(btn).toBeInTheDocument()
  })

  it('runs export through progress to completion', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ExportReportPage />)

    // Click the export button
    await user.click(await screen.findByRole('button', { name: /gerar pdf/i }))

    // Progress bar should appear during in-progress state
    expect(await screen.findByRole('progressbar')).toBeInTheDocument()

    // Wait for completion text (Relatório Gerado com Sucesso!)
    expect(
      await screen.findByText(/relatório gerado com sucesso/i, undefined, { timeout: 5000 })
    ).toBeInTheDocument()
  })

  it('shows error state and allows retry', async () => {
    const user = userEvent.setup()

    // Use the test-only seam in reportService to trigger the error path —
    // no URL mutation needed; afterEach resets this flag automatically.
    setMockForceError(true)

    renderWithProviders(<ExportReportPage />)

    await user.click(await screen.findByRole('button', { name: /gerar pdf/i }))

    // Wait for error state
    expect(
      await screen.findByText(/erro ao gerar relatório/i, undefined, { timeout: 5000 })
    ).toBeInTheDocument()

    // Retry button should be visible
    const retryBtn = screen.getByRole('button', { name: /tentar novamente/i })
    expect(retryBtn).toBeInTheDocument()

    // Click retry -> should go back to idle
    await user.click(retryBtn)
    expect(await screen.findByText(/gerar pdf/i)).toBeInTheDocument()
  })
})
