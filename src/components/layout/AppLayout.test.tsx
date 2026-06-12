import { screen, within } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AppLayout } from './AppLayout'

describe('AppLayout', () => {
  it('renders sidebar nav and outlet content', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<p>página</p>} />
        </Route>
      </Routes>,
    )
    // Sidebar nav has aria-label matching /principal/i (pt-BR locale in test env)
    const sidebarNav = screen.getByRole('navigation', { name: /principal/i })
    expect(sidebarNav).toBeInTheDocument()

    // Scope link assertions to the sidebar nav to avoid ambiguity with MobileNav
    expect(within(sidebarNav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(sidebarNav).getByRole('link', { name: 'Campanhas' })).toBeInTheDocument()

    // Outlet content
    expect(screen.getByText('página')).toBeInTheDocument()
  })
})
