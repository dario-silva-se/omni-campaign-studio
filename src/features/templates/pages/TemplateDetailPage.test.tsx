import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import TemplateDetailPage from './TemplateDetailPage'

function renderAt(templateId: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[`/templates/${templateId}`]}>
          <Routes>
            <Route path="/templates/:id" element={<TemplateDetailPage />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('TemplateDetailPage', () => {
  it('shows loading on initial render', () => {
    renderAt('tpl-linkedin-thought-leadership')
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders the linkedin template detail', async () => {
    renderAt('tpl-linkedin-thought-leadership')
    expect(await screen.findByText(/B2B Thought Leadership/i)).toBeInTheDocument()
  })

  it('renders the telegram variant for telegram templates', async () => {
    renderAt('tpl-telegram-broadcast-master')
    expect(await screen.findByText(/Broadcast Master/i)).toBeInTheDocument()
  })

  it('renders the youtube variant for youtube templates', async () => {
    renderAt('tpl-youtube-viral-script')
    const matches = await screen.findAllByText(/Viral Script Generator/i)
    expect(matches.length).toBeGreaterThan(0)
  })
})
