import { render, screen } from '@testing-library/react'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { audienceService } from '@/services/audienceService'
import EditSegmentPage from './EditSegmentPage'

function renderEditPage(segmentId = 'seg-001') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/audiences/${segmentId}/edit`]}>
          <Routes>
            <Route path="/audiences/:id/edit" element={<EditSegmentPage />} />
            <Route path="/audiences" element={<div data-testid="audiences-list">Audiences List</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('EditSegmentPage', () => {
  it('shows loading state initially', () => {
    renderEditPage('seg-001')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('pre-fills the segment name from fixture for seg-001', async () => {
    renderEditPage('seg-001')
    // Wait for the input to be pre-filled with the fixture name
    const nameInput = await screen.findByDisplayValue('Desenvolvedores Sênior')
    expect(nameInput).toBeInTheDocument()
  })

  it('pre-fills the description from fixture for seg-001', async () => {
    renderEditPage('seg-001')
    const descInput = await screen.findByDisplayValue(
      'Desenvolvedores sênior e entusiastas de tecnologia em SP, NY e SF.',
    )
    expect(descInput).toBeInTheDocument()
  })

  it('renders the modal title', async () => {
    renderEditPage('seg-001')
    await screen.findByDisplayValue('Desenvolvedores Sênior')
    expect(screen.getByText('Editar Nome do Segmento')).toBeInTheDocument()
  })

  it('renders save and cancel buttons', async () => {
    renderEditPage('seg-001')
    await screen.findByDisplayValue('Desenvolvedores Sênior')
    expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('shows an alert when the service rejects', async () => {
    const spy = vi.spyOn(audienceService, 'getById').mockRejectedValueOnce(new Error('not found'))
    renderEditPage('seg-001')
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })
})
