import type React from 'react'
import { cn } from '@/lib/cn'

export interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'div'
}

export function GlassCard({ as: Tag = 'section', className, children, ...props }: GlassCardProps) {
  return (
    <Tag className={cn('glass-panel subtle-highlight rounded-lg p-lg', className)} {...props}>
      {children}
    </Tag>
  )
}

function Header({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-md flex items-start justify-between gap-md', className)} {...props}>
      {children}
    </div>
  )
}

function Title({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-title-md text-on-surface', className)} {...props}>
      {children}
    </h3>
  )
}

function Subtitle({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-body-sm text-on-surface-variant', className)} {...props}>
      {children}
    </p>
  )
}

function Body({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-body-sm', className)} {...props}>{children}</div>
}

function Footer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-md border-t border-white/5 pt-md text-body-sm text-on-surface-variant', className)} {...props}>
      {children}
    </div>
  )
}

GlassCard.Header = Header
GlassCard.Title = Title
GlassCard.Subtitle = Subtitle
GlassCard.Body = Body
GlassCard.Footer = Footer
