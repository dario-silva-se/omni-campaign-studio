import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { Select } from './Select'
import { Toggle } from './Toggle'
import { ProgressBar } from './ProgressBar'
import { Textarea } from './Textarea'

describe('form primitives', () => {
  it('Input is labelled and typeable', async () => {
    render(<Input label="Nome da campanha" name="name" />)
    const input = screen.getByLabelText('Nome da campanha')
    await userEvent.type(input, 'Q4')
    expect(input).toHaveValue('Q4')
  })
  it('Input shows error text wired via aria-describedby', () => {
    render(<Input label="CPL" name="cpl" error="Valor inválido" />)
    const input = screen.getByLabelText('CPL')
    expect(input).toHaveAccessibleDescription('Valor inválido')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
  it('Select renders options', async () => {
    render(
      <Select label="Canal" name="channel" options={[
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'youtube', label: 'YouTube' },
      ]} />,
    )
    await userEvent.selectOptions(screen.getByLabelText('Canal'), 'youtube')
    expect(screen.getByLabelText('Canal')).toHaveValue('youtube')
  })
  it('Toggle switches state with keyboard', async () => {
    const onChange = vi.fn()
    render(<Toggle label="Slack" checked={false} onChange={onChange} />)
    const toggle = screen.getByRole('switch', { name: 'Slack' })
    toggle.focus()
    await userEvent.keyboard(' ')
    expect(onChange).toHaveBeenCalledWith(true)
  })
  it('ProgressBar exposes value', () => {
    render(<ProgressBar value={62} label="Download" />)
    const bar = screen.getByRole('progressbar', { name: 'Download' })
    expect(bar).toHaveAttribute('aria-valuenow', '62')
  })

  it('Textarea is labelled and shows error with aria-invalid', () => {
    render(<Textarea label="Descrição" error="Obrigatório" />)
    const ta = screen.getByLabelText('Descrição')
    expect(ta).toHaveAccessibleDescription('Obrigatório')
    expect(ta).toHaveAttribute('aria-invalid', 'true')
  })

  it('ProgressBar clamps value above 100 to 100', () => {
    render(<ProgressBar value={150} label="Overload" />)
    const bar = screen.getByRole('progressbar', { name: 'Overload' })
    expect(bar).toHaveAttribute('aria-valuenow', '100')
  })
})
