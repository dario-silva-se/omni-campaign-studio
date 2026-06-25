import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import AiNewsPage from './AiNewsPage'

describe('AiNewsPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<AiNewsPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders article titles from fixture', async () => {
    renderWithProviders(<AiNewsPage />)
    const headings = await screen.findAllByRole('heading', { level: 3 })
    const titles = headings.map((h) => h.textContent ?? '')
    expect(titles.some((t) => /Claude 4 Opus/i.test(t))).toBe(true)
    expect(titles.some((t) => /GPT-5/i.test(t))).toBe(true)
    expect(titles.some((t) => /Llama 4/i.test(t))).toBe(true)
  })

  it('renders digest section', async () => {
    renderWithProviders(<AiNewsPage />)
    expect(await screen.findByText(/Digest Semanal/i)).toBeInTheDocument()
    expect(screen.getByText(/Semana 25/i)).toBeInTheDocument()
  })
})
