import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children and handles click', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
  it('merges className overrides', () => {
    render(<Button className="w-full">Go</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
  it('disables and blocks clicks', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Go</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })
  it('renders ghost variant', () => {
    render(<Button variant="ghost">Go</Button>)
    expect(screen.getByRole('button').className).toContain('border')
  })
})
