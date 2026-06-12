import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { creativeDraftService } from '@/services/creativeService'
import CreativeLabPage from './CreativeLabPage'

describe('CreativeLabPage', () => {
  it('shows loading state synchronously on first render', () => {
    renderWithProviders(<CreativeLabPage />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders content from fixture after loading', async () => {
    renderWithProviders(<CreativeLabPage />)
    // Wait for data to load
    expect(await screen.findByText('Novo Criativo')).toBeInTheDocument()
    // Headline should be populated
    expect(screen.getByDisplayValue('Supercharge your workflow today')).toBeInTheDocument()
  })

  it('shows error state when the service fails', async () => {
    const spy = vi.spyOn(creativeDraftService, 'getById').mockRejectedValueOnce(new Error('boom'))
    renderWithProviders(<CreativeLabPage />)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('blocks publishing until compliance checklist is complete', async () => {
    renderWithProviders(<CreativeLabPage />)

    // Wait for data to load (header is rendered)
    await screen.findByText('Novo Criativo')

    // The "Finalizar Criativo" button in the header should be disabled initially
    const publishButtons = screen.getAllByRole('button', { name: /Finalizar Criativo/i })
    // At least one publish button exists
    expect(publishButtons.length).toBeGreaterThan(0)
    // They start disabled because required interactive items are not checked
    publishButtons.forEach((btn) => expect(btn).toBeDisabled())

    // Find all interactive checkboxes (non-auto items)
    const checkboxes = screen.getAllByRole('checkbox')
    // Click all interactive checkboxes
    for (const box of checkboxes) {
      await userEvent.click(box)
    }

    // After checking all required items, the button should be enabled
    const updatedButtons = screen.getAllByRole('button', { name: /Finalizar Criativo/i })
    // At least one should now be enabled
    const anyEnabled = updatedButtons.some((btn) => !btn.hasAttribute('disabled'))
    expect(anyEnabled).toBe(true)
  })
})
