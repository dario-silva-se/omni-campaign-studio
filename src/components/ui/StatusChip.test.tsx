import { render, screen } from '@testing-library/react'
import { StatusChip } from './StatusChip'

describe('StatusChip', () => {
  it('renders label with status styling', () => {
    render(<StatusChip status="success">Ativa</StatusChip>)
    const chip = screen.getByText('Ativa')
    expect(chip.className).toContain('emerald')
  })
  it('renders error tone', () => {
    render(<StatusChip status="error">Erro</StatusChip>)
    expect(screen.getByText('Erro').className).toContain('error')
  })
})
