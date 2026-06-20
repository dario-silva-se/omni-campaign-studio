import { screen, within, fireEvent } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AppLayout } from './AppLayout'

function renderLayout() {
  return renderWithProviders(
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<p>página</p>} />
      </Route>
    </Routes>,
  )
}

describe('AppLayout', () => {
  it('renders sidebar nav and outlet content', () => {
    renderLayout()
    const sidebarNav = screen.getByRole('navigation', { name: /principal/i })
    expect(sidebarNav).toBeInTheDocument()

    expect(within(sidebarNav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(sidebarNav).getByRole('link', { name: 'Campanhas' })).toBeInTheDocument()

    expect(screen.getByText('página')).toBeInTheDocument()
  })

  it('exposes every nav destination in the sidebar (mobile now has full access)', () => {
    renderLayout()
    const sidebarNav = screen.getByRole('navigation', { name: /principal/i })
    // Items that were previously unreachable on mobile
    for (const name of ['Públicos', 'Templates', 'Aprovações', 'Alertas', 'Automações']) {
      expect(within(sidebarNav).getByRole('link', { name })).toBeInTheDocument()
    }
  })

  it('toggles the mobile drawer via the header menu button', () => {
    renderLayout()
    const openBtn = screen.getByRole('button', { name: 'Abrir menu' })
    expect(openBtn).toHaveAttribute('aria-expanded', 'false')
    expect(openBtn).toHaveAttribute('aria-controls', 'app-sidebar')

    fireEvent.click(openBtn)
    const closeBtn = screen.getByRole('button', { name: 'Fechar menu' })
    expect(closeBtn).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles the desktop sidebar collapse via the header button', () => {
    renderLayout()
    const collapseBtn = screen.getByRole('button', { name: 'Recolher menu lateral' })
    expect(collapseBtn).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(collapseBtn)
    expect(screen.getByRole('button', { name: 'Expandir menu lateral' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
