import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('switches panels on click and sets aria-selected', async () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.List aria-label="exemplo">
          <Tabs.Trigger value="a">Aba A</Tabs.Trigger>
          <Tabs.Trigger value="b">Aba B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="a">Conteúdo A</Tabs.Panel>
        <Tabs.Panel value="b">Conteúdo B</Tabs.Panel>
      </Tabs>,
    )
    expect(screen.getByText('Conteúdo A')).toBeVisible()
    expect(screen.queryByText('Conteúdo B')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('tab', { name: 'Aba B' }))
    expect(screen.getByRole('tab', { name: 'Aba B' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Conteúdo B')).toBeVisible()
  })
})
