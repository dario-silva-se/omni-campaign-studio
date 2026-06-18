import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { useTheme } from '@/contexts/ThemeContext'
import { Icon } from './Icon'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation('common')
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('nav.toggleTheme')}
      className={cn(
        'rounded-md p-2 text-on-surface-variant',
        'hover:bg-overlay-sm hover:text-on-surface',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
        className,
      )}
    >
      <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
    </button>
  )
}
