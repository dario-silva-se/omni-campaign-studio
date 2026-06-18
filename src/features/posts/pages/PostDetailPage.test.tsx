import { screen, render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import PostDetailPage from './PostDetailPage'

function renderAt(postId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/posts/${postId}`]}>
          <Routes>
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('PostDetailPage', () => {
  it('shows loading on initial render', () => {
    renderAt('post-li-001')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders linkedin post detail', async () => {
    renderAt('post-li-001')
    expect(await screen.findByText('AI Revolution in Marketing')).toBeInTheDocument()
    // LinkedIn-specific: distribution info
    expect(await screen.findByText('Tech Enthusiasts')).toBeInTheDocument()
  })

  it('renders youtube post detail', async () => {
    renderAt('post-yt-001')
    expect(await screen.findByText('The Future of Content Creation')).toBeInTheDocument()
    // YouTube-specific: traffic sources
    expect(await screen.findByText('Procurar Recursos')).toBeInTheDocument()
  })

  it('renders telegram post detail', async () => {
    renderAt('post-tg-001')
    expect(await screen.findByText('Spring Collection Launch')).toBeInTheDocument()
    // Telegram-specific: referral ID
    expect(await screen.findByText('TG-8294-PR')).toBeInTheDocument()
  })
})
