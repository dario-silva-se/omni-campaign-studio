import { screen, render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import AlertDetailPage from './AlertDetailPage'

function renderAt(alertId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/alerts/${alertId}`]}>
          <Routes>
            <Route path="/alerts/:id" element={<AlertDetailPage />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('AlertDetailPage', () => {
  it('shows loading on initial render', () => {
    renderAt('alert-yt-001')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders the YouTube anomaly alert detail', async () => {
    renderAt('alert-yt-001')
    expect(await screen.findByText(/YouTube CPM Surge: Q4 Tech Campaign/i)).toBeInTheDocument()
    expect(screen.getByText(/YTA-9921-X/i)).toBeInTheDocument()
  })

  it('renders the anomaly diagnostic chart section', async () => {
    renderAt('alert-yt-001')
    expect(await screen.findByText(/Análise de Desvio de CPM/i)).toBeInTheDocument()
  })
})
