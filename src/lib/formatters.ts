export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

export function formatCompact(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

export function formatPercent(ratio: number, opts: { signed?: boolean; locale?: string } = {}): string {
  const { signed = false, locale = 'en-US' } = opts
  const formatted = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(Math.abs(ratio))
  if (!signed) return formatted
  return `${ratio >= 0 ? '+' : '-'}${formatted}`
}

export function formatDate(date: Date, locale = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}
