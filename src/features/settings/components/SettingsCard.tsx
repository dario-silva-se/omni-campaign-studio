import type React from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

export function SettingsCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('glass-panel subtle-highlight rounded-2xl overflow-hidden', className)}>
      {children}
    </div>
  )
}

export function SettingsCardHeader({
  icon,
  iconClass = 'text-primary',
  iconBg = 'bg-primary/10',
  title,
  subtitle,
  action,
}: {
  icon: string
  iconClass?: string
  iconBg?: string
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="px-lg py-md border-b border-white/6 flex items-center gap-3">
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
        <Icon name={icon} className={cn('text-[17px]', iconClass)} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-bold text-on-surface">{title}</h3>
        {subtitle && <p className="text-[12px] text-on-surface-variant/70">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

export const inputCls =
  'h-10 w-full rounded-md border border-overlay-md bg-input-bg px-sm text-body-sm text-on-surface ' +
  'placeholder:text-on-surface-variant/50 transition-colors hover:border-overlay-lg ' +
  'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
