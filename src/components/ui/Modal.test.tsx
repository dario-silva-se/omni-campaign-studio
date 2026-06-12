import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders dialog when open and closes on Escape', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Solicitar Alterações">
        <p>corpo</p>
      </Modal>,
    )
    expect(screen.getByRole('dialog', { name: 'Solicitar Alterações' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={() => {}} title="x"><p>corpo</p></Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('Tab key cycles focus within the modal', async () => {
    render(
      <Modal open onClose={() => {}} title="Trap Test">
        <button type="button">First</button>
        <button type="button">Second</button>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const last = focusable[focusable.length - 1] as HTMLElement
    last.focus()
    await userEvent.keyboard('{Tab}')
    expect(focusable[0]).toHaveFocus()
  })

  it('sets body overflow hidden while open', () => {
    const { unmount } = render(
      <Modal open onClose={() => {}} title="Scroll Lock">
        <p>content</p>
      </Modal>,
    )
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
