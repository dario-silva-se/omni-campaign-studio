import type React from 'react'
import { cn } from '@/lib/cn'

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  filled?: boolean
}

export function Icon({ name, filled = false, className, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('material-symbols-outlined select-none leading-none', className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      {...props}
    >
      {name}
    </span>
  )
}
