import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const { t } = useTranslation('common')
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/30 bg-background/80 px-lg backdrop-blur-md">
      <div>
        <h1 className="text-title-md">{title}</h1>
        {subtitle && <p className="text-body-sm text-on-surface-variant">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-sm">
        {actions}
        <ThemeToggle />
        <button
          type="button"
          aria-label={t('nav.notifications')}
          className="rounded-md p-2 text-on-surface-variant hover:bg-overlay-sm hover:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Icon name="notifications" />
        </button>
      </div>
    </header>
  )
}
