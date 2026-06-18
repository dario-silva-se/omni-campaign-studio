import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import LaunchSuccessPage from './LaunchSuccessPage'

describe('LaunchSuccessPage', () => {
  it('renders success heading', () => {
    renderWithProviders(<LaunchSuccessPage />, { route: '/campaigns/launched' })
    // Multiple headings for mobile / desktop
    const headings = screen.getAllByText(/campanha está ao vivo/i)
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders navigation links / buttons', () => {
    renderWithProviders(<LaunchSuccessPage />, { route: '/campaigns/launched' })
    expect(screen.getByRole('button', { name: /painel em tempo real/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nova campanha/i })).toBeInTheDocument()
  })
})
