import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'

const mobileItems = [
  { labelKey: 'nav.dashboard', icon: 'dashboard', to: '/' },
  { labelKey: 'nav.campaigns', icon: 'rocket_launch', to: '/campaigns' },
  { labelKey: 'nav.contentGeneration', icon: 'auto_awesome', to: '/content-generation' },
  { labelKey: 'nav.settings', icon: 'settings', to: '/settings/connections' },
]

export function MobileNav() {
  const { t } = useTranslation('common')
  return (
    <nav
      aria-label={t('appName')}
      className="fixed bottom-0 inset-x-0 z-50 flex h-16 items-stretch border-t border-outline-variant/30 bg-surface-container-lowest md:hidden"
    >
      {mobileItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px]',
              isActive ? 'text-primary' : 'text-on-surface-variant',
            )
          }
        >
          <Icon name={item.icon} className="text-[22px]" />
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}
