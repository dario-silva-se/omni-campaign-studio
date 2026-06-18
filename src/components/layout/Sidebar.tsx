import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { navSections } from './navItems'
import { currentUserFixture } from '@/mocks/fixtures/user'

export function Sidebar() {
  const { t } = useTranslation('common')
  return (
    <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 w-sidebar-width bg-surface-container-lowest border-r border-outline-variant z-50">
      <div className="h-16 flex items-center gap-sm px-lg border-b border-outline-variant/30 shrink-0">
        <Icon name="hub" className="text-primary" filled />
        <div>
          <p className="text-body-lg font-bold leading-tight">{t('appName')}</p>
          <p className="text-label-caps uppercase text-on-surface-variant">{t('appTagline')}</p>
        </div>
      </div>
      <nav aria-label={t('nav.sectionMain')} className="flex-1 overflow-y-auto px-sm py-md">
        {navSections.map((section) => (
          <div key={section.labelKey} className="mb-lg">
            <p className="px-sm pb-xs text-label-caps uppercase text-on-surface-variant/80">
              {t(section.labelKey)}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-sm rounded-md px-sm py-xs text-body-sm transition-colors',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-on-surface-variant/80 hover:bg-overlay-sm hover:text-on-surface',
                      )
                    }
                  >
                    <Icon name={item.icon} className="text-[20px]" />
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-outline-variant/30 p-md flex items-center gap-sm">
        <div
          aria-hidden="true"
          className="size-9 rounded-full bg-primary-container/40 flex items-center justify-center text-body-sm font-bold text-primary"
        >
          {currentUserFixture.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-body-sm font-medium">{currentUserFixture.name}</p>
          <p className="truncate text-label-caps text-on-surface-variant">{currentUserFixture.role}</p>
        </div>
      </div>
    </aside>
  )
}
