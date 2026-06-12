import { forwardRef, useId } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-label-caps uppercase text-on-surface-variant">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'h-10 rounded-md border border-white/10 bg-[#0a0a0a] px-sm text-body-sm text-on-surface',
          'placeholder:text-on-surface-variant/50 transition-colors',
          'hover:border-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          'disabled:opacity-40 disabled:pointer-events-none',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...props}
      />
      {error && <p id={`${inputId}-error`} className="text-body-sm text-error">{error}</p>}
      {!error && hint && <p id={`${inputId}-hint`} className="text-body-sm text-on-surface-variant">{hint}</p>}
    </div>
  )
})
