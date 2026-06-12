import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import { AppRoutes } from './router'

describe('router', () => {
  it('renders dashboard placeholder at /', async () => {
    renderWithProviders(<AppRoutes />, { route: '/' })
    expect(await screen.findByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  })
  it('renders campaigns route', async () => {
    renderWithProviders(<AppRoutes />, { route: '/campaigns' })
    expect(await screen.findByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  })
})
