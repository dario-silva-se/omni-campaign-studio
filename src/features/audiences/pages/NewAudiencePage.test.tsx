import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import NewAudiencePage from './NewAudiencePage'

function renderWithRoutes(initialRoute = '/audiences/new') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/audiences/new" element={<NewAudiencePage />} />
            <Route path="/audiences" element={<div data-testid="audiences-list">Audiences List</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </QueryClientProvider>,
  )
}

describe('NewAudiencePage', () => {
  it('renders the form heading', () => {
    renderWithRoutes()
    expect(screen.getByText('Criar Novo Público')).toBeInTheDocument()
  })

  it('renders the Save Segment CTA button', () => {
    renderWithRoutes()
    expect(screen.getByRole('button', { name: /save segment/i })).toBeInTheDocument()
  })

  it('renders all form sections', () => {
    renderWithRoutes()
    expect(screen.getByText('Basic Details')).toBeInTheDocument()
    expect(screen.getByText('Demographics')).toBeInTheDocument()
    expect(screen.getByText('Interests & Keywords')).toBeInTheDocument()
    expect(screen.getByText('Interaction History')).toBeInTheDocument()
  })

  it('navigates to /audiences on successful submit', async () => {
    const user = userEvent.setup()
    renderWithRoutes()

    // Fill in the required name field
    const nameInput = screen.getByPlaceholderText(/Q3 Tech Founders/i)
    await user.type(nameInput, 'Test Segment')

    // Submit
    await user.click(screen.getByRole('button', { name: /save segment/i }))

    // Should navigate to /audiences
    expect(await screen.findByTestId('audiences-list')).toBeInTheDocument()
  })

  it('does not submit without name', async () => {
    const user = userEvent.setup()
    renderWithRoutes()
    // Click submit without filling in the name - browser validation prevents it
    const submitBtn = screen.getByRole('button', { name: /save segment/i })
    expect(submitBtn).toBeInTheDocument()
    // The audience list page should NOT appear without a name
    await user.click(submitBtn)
    expect(screen.queryByTestId('audiences-list')).not.toBeInTheDocument()
  })
})
