import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import LogicBuilderPage from './LogicBuilderPage'

describe('LogicBuilderPage', () => {
  it('shows loading on initial render', () => {
    renderWithProviders(<LogicBuilderPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders critical triggers with spec thresholds', async () => {
    renderWithProviders(<LogicBuilderPage />)
    expect(await screen.findByText(/15\.45/)).toBeInTheDocument()
    expect(screen.getByText(/48\.20/)).toBeInTheDocument()
  })

  it('toggles a trigger', async () => {
    renderWithProviders(<LogicBuilderPage />)
    const switches = await screen.findAllByRole('switch')
    const first = switches[0]
    const initial = first.getAttribute('aria-checked')
    await userEvent.click(first)
    await waitFor(() => expect(first.getAttribute('aria-checked')).not.toBe(initial))
  })

  it('renders the simulation lab with impact figures', async () => {
    renderWithProviders(<LogicBuilderPage />)
    expect(await screen.findByText(/12,450/)).toBeInTheDocument()
    expect(screen.getByText(/1\.2x/)).toBeInTheDocument()
    expect(screen.getByText(/18%/)).toBeInTheDocument()
    expect(screen.getByText(/82%/)).toBeInTheDocument()
  })
})
