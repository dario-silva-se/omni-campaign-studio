import { forwardRef } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icons are decorative (aria-hidden). For icon-only buttons, pass an explicit aria-label. */
  leadingIcon?: string
  trailingIcon?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container text-white bg-gradient-to-b from-primary-container to-[#3b7de6] ' +
    'hover:brightness-110 active:brightness-95 disabled:opacity-40 disabled:pointer-events-none',
  ghost:
    'border border-white/10 bg-transparent text-on-surface hover:bg-white/5 ' +
    'active:bg-white/10 disabled:opacity-40 disabled:pointer-events-none',
  danger:
    'bg-error-container text-on-error-container hover:brightness-110 ' +
    'active:brightness-95 disabled:opacity-40 disabled:pointer-events-none',
  subtle:
    'bg-surface-container-high text-on-surface hover:bg-surface-container-highest ' +
    'active:bg-surface-container disabled:opacity-40 disabled:pointer-events-none',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-sm text-label-caps uppercase tracking-wider',
  md: 'h-10 px-md text-body-sm font-medium',
  lg: 'h-12 px-lg text-body-lg font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leadingIcon, trailingIcon, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-xs rounded-md transition-all duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {leadingIcon && <Icon name={leadingIcon} className="text-[18px]" />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} className="text-[18px]" />}
    </button>
  )
})
