import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

test('defaults to dark theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })
  expect(result.current.theme).toBe('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})

test('reads stored theme from localStorage', () => {
  localStorage.setItem('theme', 'light')
  const { result } = renderHook(() => useTheme(), { wrapper })
  expect(result.current.theme).toBe('light')
  expect(document.documentElement.classList.contains('dark')).toBe(false)
})

test('toggleTheme switches dark → light', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })
  act(() => result.current.toggleTheme())
  expect(result.current.theme).toBe('light')
  expect(document.documentElement.classList.contains('dark')).toBe(false)
  expect(localStorage.getItem('theme')).toBe('light')
})

test('toggleTheme switches light → dark', () => {
  localStorage.setItem('theme', 'light')
  const { result } = renderHook(() => useTheme(), { wrapper })
  act(() => result.current.toggleTheme())
  expect(result.current.theme).toBe('dark')
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})

test('useTheme throws when used outside ThemeProvider', () => {
  expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within ThemeProvider')
})
