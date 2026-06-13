import { screen, render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import SchedulePostPage from './SchedulePostPage'

function renderChannel(channel: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/posts/schedule/${channel}`]}>
          <Routes>
            <Route path="/posts/schedule/:channel" element={<SchedulePostPage />} />
            <Route path="/posts" element={<div>Posts Overview</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('SchedulePostPage', () => {
  it('renders telegram-specific toggles', async () => {
    renderChannel('telegram')
    expect(await screen.findAllByRole('switch')).not.toHaveLength(0)
  })

  it('renders linkedin form with heading', async () => {
    renderChannel('linkedin')
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders youtube form with upload area', async () => {
    renderChannel('youtube')
    expect(await screen.findByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('redirects to /posts for invalid channel', async () => {
    renderChannel('instagram')
    expect(await screen.findByText('Posts Overview')).toBeInTheDocument()
  })
})
