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
})
