import { cn } from './cn'

describe('cn', () => {
  it('merges conditional classes', () => {
    const condition = false
    expect(cn('p-2', condition && 'hidden', 'text-primary')).toBe('p-2 text-primary')
  })
  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('bg-surface', 'bg-primary')).toBe('bg-primary')
  })
})
