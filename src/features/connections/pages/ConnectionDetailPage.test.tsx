import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render } from '@testing-library/react'
import i18n from '@/i18n'
import ConnectionDetailPage from './ConnectionDetailPage'

function renderChannel(channel: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/settings/connections/${channel}`]}>
          <Routes>
            <Route path="/settings/connections/:channel" element={<ConnectionDetailPage />} />
            <Route path="/settings/connections" element={<div>Connections List</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('ConnectionDetailPage', () => {
  it('renders healthy linkedin detail', async () => {
    renderChannel('linkedin')
    // Waits for connection detail to load — the Connection heading contains "linkedin"
    const headings = await screen.findAllByText(/linkedin/i)
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders youtube error state then restores on reconnect', async () => {
    renderChannel('youtube')
    const reconnect = await screen.findByRole('button', { name: /reconectar/i })
    await userEvent.click(reconnect)
    expect(await screen.findByText(/restaurada/i)).toBeInTheDocument()
  })

  it('redirects invalid channel to connections list', async () => {
    renderChannel('invalid-channel')
    expect(await screen.findByText('Connections List')).toBeInTheDocument()
  })
})
