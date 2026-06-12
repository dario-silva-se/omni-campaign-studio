import type React from 'react'
import { cn } from '@/lib/cn'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0..100
  label: string
  tone?: 'primary' | 'success' | 'error'
}

const toneClasses = {
  primary: 'bg-primary-container',
  success: 'bg-emerald-500',
  error: 'bg-error-container',
} as const

export function ProgressBar({ value, label, tone = 'primary', className, ...props }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-white/10', className)}
      {...props}
    >
      <div className={cn('h-full rounded-full transition-all duration-500', toneClasses[tone])} style={{ width: `${clamped}%` }} />
    </div>
  )
}
