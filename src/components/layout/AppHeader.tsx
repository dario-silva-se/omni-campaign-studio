import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useLayout } from '@/contexts/LayoutContext'
import { navSections } from './navItems'

/** Pick the nav item whose `to` is the longest prefix of the current path. */
function useRouteTitleKey(pathname: string): string | null {
  const items = navSections.flatMap((s) => s.items)
  let best: { to: string; labelKey: string } | null = null
  for (const item of items) {
    const matches = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
    if (matches && (!best || item.to.length > best.to.length)) best = item
  }
  return best?.labelKey ?? null
}

export function AppHeader() {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const { mobileOpen, collapsed, toggleMobile, toggleCollapsed } = useLayout()

  const titleKey = useRouteTitleKey(pathname)
  const title = titleKey ? t(titleKey) : t('appName')

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-sm border-b border-outline-variant/30 bg-background/80 px-gutter backdrop-blur-md">
      <div className="flex items-center gap-sm min-w-0">
        {/* Mobile: open/close drawer */}
        <button
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="app-sidebar"
          className={cn(
            'md:hidden rounded-md p-2 text-on-surface-variant',
            'hover:bg-overlay-sm hover:text-on-surface',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
          )}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} />
        </button>
        {/* Desktop: collapse/expand sidebar */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? t('nav.expandSidebar') : t('nav.collapseSidebar')}
          aria-expanded={!collapsed}
          aria-controls="app-sidebar"
          className={cn(
            'hidden md:inline-flex rounded-md p-2 text-on-surface-variant',
            'hover:bg-overlay-sm hover:text-on-surface',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
          )}
        >
          <Icon name={collapsed ? 'menu' : 'menu_open'} />
        </button>
        <h1 className="text-title-md truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-xs shrink-0">
        <ThemeToggle />
        <button
          type="button"
          aria-label={t('nav.notifications')}
          className={cn(
            'relative rounded-md p-2 text-on-surface-variant',
            'hover:bg-overlay-sm hover:text-on-surface',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
          )}
        >
          <Icon name="notifications" />
        </button>
      </div>
    </header>
  )
}
