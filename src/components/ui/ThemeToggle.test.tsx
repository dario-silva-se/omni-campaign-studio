import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/test/renderWithProviders'
import { ThemeToggle } from './ThemeToggle'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

test('renders with aria-label', () => {
  renderWithProviders(<ThemeToggle />)
  expect(screen.getByRole('button', { name: /alternar tema/i })).toBeInTheDocument()
})

test('clicking toggles the theme class on <html>', async () => {
  renderWithProviders(<ThemeToggle />)
  const btn = screen.getByRole('button', { name: /alternar tema/i })
  await userEvent.click(btn)
  expect(document.documentElement.classList.contains('dark')).toBe(false)
  await userEvent.click(btn)
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})
