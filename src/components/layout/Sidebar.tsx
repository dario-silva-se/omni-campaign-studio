import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { useLayout } from '@/contexts/LayoutContext'
import { navSections } from './navItems'
import { currentUserFixture } from '@/mocks/fixtures/user'

export function Sidebar() {
  const { t } = useTranslation('common')
  const { mobileOpen, collapsed, closeMobile } = useLayout()

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!mobileOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen, closeMobile])

  return (
    <>
      {/* Backdrop — mobile only, when drawer is open */}
      {mobileOpen && (
        <button
          type="button"
          aria-label={t('actions.close')}
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col bg-surface-container-lowest border-r border-outline-variant',
          'w-sidebar-width transition-[width,transform] duration-200 ease-out',
          // Mobile: off-canvas drawer
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible, width follows collapsed state
          'md:translate-x-0',
          collapsed ? 'md:w-[72px]' : 'md:w-sidebar-width',
        )}
      >
        <div
          className={cn(
            'h-16 flex items-center gap-sm border-b border-outline-variant/30 shrink-0',
            collapsed ? 'md:justify-center md:px-0 px-lg' : 'px-lg',
          )}
        >
          <Icon name="hub" className="text-primary shrink-0" filled />
          <div className={cn('min-w-0', collapsed && 'md:hidden')}>
            <p className="text-body-lg font-bold leading-tight truncate">{t('appName')}</p>
            <p className="text-label-caps uppercase text-on-surface-variant whitespace-nowrap">
              {t('appTagline')}
            </p>
          </div>
        </div>

        <nav aria-label={t('nav.sectionMain')} className="flex-1 overflow-y-auto px-sm py-md">
          {navSections.map((section) => (
            <div key={section.labelKey} className="mb-lg">
              <p
                className={cn(
                  'px-sm pb-xs text-label-caps uppercase text-on-surface-variant/80',
                  collapsed && 'md:hidden',
                )}
              >
                {t(section.labelKey)}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={closeMobile}
                      aria-label={t(item.labelKey)}
                      title={collapsed ? t(item.labelKey) : undefined}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-sm rounded-md px-sm py-xs text-body-sm transition-colors',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
                          collapsed && 'md:justify-center md:px-0',
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-on-surface-variant/80 hover:bg-overlay-sm hover:text-on-surface',
                        )
                      }
                    >
                      <Icon name={item.icon} className="text-[20px] shrink-0" />
                      <span className={cn('truncate', collapsed && 'md:hidden')}>
                        {t(item.labelKey)}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div
          className={cn(
            'border-t border-outline-variant/30 p-md flex items-center gap-sm',
            collapsed && 'md:justify-center',
          )}
        >
          <div
            aria-hidden="true"
            className="size-9 shrink-0 rounded-full bg-primary-container/40 flex items-center justify-center text-body-sm font-bold text-primary"
          >
            {currentUserFixture.initials}
          </div>
          <div className={cn('min-w-0', collapsed && 'md:hidden')}>
            <p className="truncate text-body-sm font-medium">{currentUserFixture.name}</p>
            <p className="truncate text-label-caps text-on-surface-variant">
              {currentUserFixture.role}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
