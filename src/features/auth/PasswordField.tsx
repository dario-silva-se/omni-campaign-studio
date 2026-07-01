import { forwardRef, useId, useState } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

export interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** Optional right-aligned slot in the label row (e.g. a "forgot password?" link). */
  labelAction?: React.ReactNode
  error?: string
}

/**
 * Password input matching the design-system Input, plus a show/hide toggle and
 * a leading lock icon. Lives in the auth feature since that's its only consumer.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
  { label, labelAction, error, className, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [shown, setShown] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={inputId} className="text-label-caps uppercase text-on-surface-variant">
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative flex items-center">
        <Icon name="lock" className="pointer-events-none absolute left-3 text-[18px] text-outline" />
        <input
          ref={ref}
          id={inputId}
          type={shown ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          className={cn(
            'h-11 w-full rounded-lg border border-overlay-md bg-input-bg pl-10 pr-11 text-body-sm text-on-surface',
            'placeholder:text-on-surface-variant/45 transition-colors',
            'hover:border-overlay-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
            error && 'border-error focus:border-error focus:ring-error',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          aria-label={shown ? 'Ocultar senha' : 'Mostrar senha'}
          className="absolute right-2 grid size-8 place-items-center rounded-md text-outline transition-colors hover:bg-overlay-sm hover:text-on-surface"
        >
          <Icon name={shown ? 'visibility_off' : 'visibility'} className="text-[18px]" />
        </button>
      </div>
      {error && <p className="text-body-sm text-error">{error}</p>}
    </div>
  )
})
