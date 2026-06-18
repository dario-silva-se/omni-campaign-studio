import { forwardRef, useId } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'

export interface SelectOption { value: string; label: string }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, error, className, id, ...props },
  ref,
) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-label-caps uppercase text-on-surface-variant">
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={cn(
          'h-10 rounded-md border border-overlay-md bg-input-bg px-sm text-body-sm text-on-surface transition-colors',
          'hover:border-overlay-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          'disabled:opacity-40 disabled:pointer-events-none',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p id={`${selectId}-error`} className="text-body-sm text-error">{error}</p>}
    </div>
  )
})
