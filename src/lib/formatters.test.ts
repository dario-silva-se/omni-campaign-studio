import { formatCurrency, formatCompact, formatPercent, formatDate } from './formatters'

describe('formatters', () => {
  it('formats USD currency', () => {
    expect(formatCurrency(15.45)).toBe('$15.45')
  })
  it('formats compact numbers', () => {
    expect(formatCompact(13714)).toBe('13.7K')
  })
  it('formats percentages with sign', () => {
    expect(formatPercent(0.18, { signed: true })).toBe('+18%')
    expect(formatPercent(-0.15, { signed: true })).toBe('-15%')
  })
  it('formats dates in given locale', () => {
    expect(formatDate(new Date('2026-06-12T08:40:00'), 'pt-BR')).toBe('12/06/2026')
  })
})
