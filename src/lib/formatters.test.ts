import { formatCurrency, formatCompact, formatPercent, formatDate } from './formatters'

describe('formatters', () => {
  it('formats USD currency in pt-BR by default', () => {
    const result = formatCurrency(15.45)
    expect(result).toMatch(/15[,.]45/)
  })
  it('formats USD currency in en-US when locale specified', () => {
    expect(formatCurrency(15.45, 'USD', 'en-US')).toBe('$15.45')
  })
  it('formats compact numbers in pt-BR by default', () => {
    const result = formatCompact(13714)
    expect(result).toMatch(/13[,.]7/)
  })
  it('formats compact numbers in en-US when locale specified', () => {
    expect(formatCompact(13714, 'en-US')).toBe('13.7K')
  })
  it('formats percentages with sign', () => {
    expect(formatPercent(0.18, { signed: true, locale: 'en-US' })).toBe('+18%')
    expect(formatPercent(-0.15, { signed: true, locale: 'en-US' })).toBe('-15%')
  })
  it('formats dates in given locale', () => {
    expect(formatDate(new Date('2026-06-12T08:40:00'), 'pt-BR')).toBe('12/06/2026')
  })
})
