import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { isMockMode } from '@/services/apiClient'
import { AuthContext } from './authContext'

/**
 * Header logout control. Renders nothing in mock mode (no real session) or when
 * no AuthProvider is present (e.g. isolated component tests), so it is safe to
 * drop into the shared layout.
 */
export function LogoutButton() {
  const auth = useContext(AuthContext)
  const { t } = useTranslation('auth')
  if (isMockMode() || !auth || auth.status !== 'authenticated') return null
  return (
    <button
      type="button"
      onClick={() => void auth.logout()}
      aria-label={t('logout')}
      className={cn(
        'rounded-md p-2 text-on-surface-variant',
        'hover:bg-overlay-sm hover:text-on-surface',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
      )}
    >
      <Icon name="logout" />
    </button>
  )
}
