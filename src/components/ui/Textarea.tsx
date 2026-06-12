import { forwardRef, useId } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, rows = 4, ...props },
  ref,
) {
  const autoId = useId()
  const textareaId = id ?? autoId
  const describedBy = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-label-caps uppercase text-on-surface-variant">
        {label}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'min-h-[96px] rounded-md border border-white/10 bg-[#0a0a0a] px-sm py-xs text-body-sm text-on-surface',
          'placeholder:text-on-surface-variant/50 transition-colors resize-y',
          'hover:border-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          'disabled:opacity-40 disabled:pointer-events-none',
          error && 'border-error focus:border-error focus:ring-error',
          className,
        )}
        {...props}
      />
      {error && <p id={`${textareaId}-error`} className="text-body-sm text-error">{error}</p>}
      {!error && hint && <p id={`${textareaId}-hint`} className="text-body-sm text-on-surface-variant">{hint}</p>}
    </div>
  )
})
