import type React from 'react'
import { cn } from '@/lib/cn'

export type ChipStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral'

export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: ChipStatus
  withDot?: boolean
}

const statusClasses: Record<ChipStatus, string> = {
  success: 'bg-emerald-500/15 text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-400',
  error: 'bg-error/15 text-error',
  info: 'bg-primary/15 text-primary',
  neutral: 'bg-overlay-md text-on-surface-variant',
}

const dotClasses: Record<ChipStatus, string> = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-error',
  info: 'bg-primary',
  neutral: 'bg-on-surface-variant',
}

export function StatusChip({ status = 'neutral', withDot = true, className, children, ...props }: StatusChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-label-caps uppercase',
        statusClasses[status],
        className,
      )}
      {...props}
    >
      {withDot && <span aria-hidden="true" className={cn('size-1.5 rounded-full', dotClasses[status])} />}
      {children}
    </span>
  )
}
