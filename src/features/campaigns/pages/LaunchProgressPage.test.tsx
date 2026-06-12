import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import LaunchProgressPage from './LaunchProgressPage'

describe('LaunchProgressPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders progress bar synchronously on mount', () => {
    renderWithProviders(<LaunchProgressPage />, { route: '/campaigns/launching' })
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeInTheDocument()
  })

  it('increases aria-valuenow after advancing timers', () => {
    renderWithProviders(<LaunchProgressPage />, { route: '/campaigns/launching' })
    const barBefore = screen.getByRole('progressbar')
    const before = Number(barBefore.getAttribute('aria-valuenow') ?? '0')

    act(() => {
      vi.advanceTimersByTime(1600)
    })

    const barAfter = screen.getByRole('progressbar')
    const after = Number(barAfter.getAttribute('aria-valuenow') ?? '0')
    expect(after).toBeGreaterThan(before)
  })
})
