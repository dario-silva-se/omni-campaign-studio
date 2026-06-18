import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import NewPostPage from './NewPostPage'

describe('NewPostPage', () => {
  it('renders the entry heading and channel CTA buttons', () => {
    renderWithProviders(<NewPostPage />, { route: '/posts/new' })
    expect(screen.getByRole('heading', { level: 1, name: /Criar Novo Post/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /YouTube/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: /LinkedIn/i }).length).toBeGreaterThan(0)
  })

  it('shows linkedin composer when LinkedIn is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPostPage />, { route: '/posts/new' })
    // There are two LinkedIn buttons (channel bar + preview bar); click the first
    const buttons = screen.getAllByRole('button', { name: /LinkedIn/i })
    await user.click(buttons[0])
    expect(await screen.findByRole('heading', { level: 1, name: /Geração de Post LinkedIn/i })).toBeInTheDocument()
  })

  it('shows youtube composer when YouTube is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPostPage />, { route: '/posts/new' })
    const buttons = screen.getAllByRole('button', { name: /YouTube/i })
    await user.click(buttons[0])
    expect(await screen.findByRole('heading', { level: 1, name: /Geração de Post YouTube/i })).toBeInTheDocument()
  })

  it('navigates back to entry when back button is pressed', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPostPage />, { route: '/posts/new' })
    const buttons = screen.getAllByRole('button', { name: /LinkedIn/i })
    await user.click(buttons[0])
    const backBtn = screen.getByRole('button', { name: /Voltar para Posts/i })
    await user.click(backBtn)
    expect(screen.getByRole('heading', { level: 1, name: /Criar Novo Post/i })).toBeInTheDocument()
  })

  it('shows telegram stub message when Telegram is selected', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewPostPage />, { route: '/posts/new' })
    const buttons = screen.getAllByRole('button', { name: /Telegram/i })
    await user.click(buttons[0])
    expect(await screen.findByText(/Telegram composer/i)).toBeInTheDocument()
  })
})
