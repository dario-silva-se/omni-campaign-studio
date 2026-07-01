import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { isMockMode } from '@/services/apiClient'
import { useAuth } from '../authContext'
import { AuthBrandPanel } from '../AuthBrandPanel'
import { PasswordField } from '../PasswordField'

interface FromState {
  from?: { pathname?: string }
}

export default function LoginPage() {
  const { t } = useTranslation('auth')
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = (location.state as FromState)?.from?.pathname ?? '/'

  // Already signed in (or mock mode) → no reason to show the form.
  if (isMockMode() || status === 'authenticated') {
    return <Navigate to={redirectTo} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch {
      setError(t('error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background p-gutter">
      <div className="flex w-full max-w-[1040px] overflow-hidden rounded-xl border border-overlay-md bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <AuthBrandPanel
          variant="login"
          kicker={t('brandKicker')}
          headline={t('brandHeadline')}
          subtext={t('brandSubtext')}
          stats={[
            { value: t('statChannels'), label: t('statChannelsLabel') },
            { value: t('statRealtime'), label: t('statRealtimeLabel') },
          ]}
        />

        <div className="flex flex-1 items-center justify-center p-xl sm:px-[56px]">
          <form onSubmit={onSubmit} className="w-full max-w-[380px]" aria-label={t('title')}>
            <h1 className="text-headline-lg-mobile text-on-surface">{t('welcomeBack')}</h1>
            <p className="mt-xs text-body-sm text-on-surface-variant">{t('subtitle')}</p>

            <div className="mt-lg flex flex-col gap-md">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="text-label-caps uppercase text-on-surface-variant">
                  {t('email')}
                </label>
                <div className="relative flex items-center">
                  <Icon name="mail" className="pointer-events-none absolute left-3 text-[18px] text-outline" />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-overlay-md bg-input-bg pl-10 pr-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/45 transition-colors hover:border-overlay-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <PasswordField
                id="login-password"
                label={t('password')}
                autoComplete="current-password"
                required
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelAction={
                  <Link to="/forgot-password" className="text-body-sm font-semibold text-primary hover:underline">
                    {t('forgotPassword')}
                  </Link>
                }
              />

              <div className="flex items-center gap-sm">
                <Toggle label={t('rememberMe')} checked={remember} onChange={setRemember} />
                <span className="text-body-sm text-on-surface-variant">{t('rememberMe')}</span>
              </div>

              {error && <p className="text-body-sm text-error">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 items-center justify-center gap-xs rounded-lg bg-gradient-to-b from-primary-container to-[#3b7de6] text-body-lg font-semibold text-white shadow-[0_8px_24px_-8px_rgba(75,142,255,0.6)] transition-all hover:brightness-110 active:brightness-95 disabled:pointer-events-none disabled:opacity-50"
              >
                {submitting ? t('submitting') : t('submit')}
                {!submitting && <Icon name="arrow_forward" className="text-[18px]" />}
              </button>
            </div>

            <p className="mt-lg text-center text-body-sm text-on-surface-variant">
              {t('noAccount')}{' '}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                {t('createAccount')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
