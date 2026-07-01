import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { isMockMode } from '@/services/apiClient'
import { useAuth } from '../authContext'
import { AuthBrandPanel } from '../AuthBrandPanel'
import { PasswordField } from '../PasswordField'

/** 0 = empty, 1 = weak, 2 = medium, 3 = strong. */
function scorePassword(pw: string): number {
  if (!pw) return 0
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++
  return Math.max(1, s)
}

export default function RegisterPage() {
  const { t } = useTranslation('auth')
  const { status, register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (isMockMode() || status === 'authenticated') {
    return <Navigate to="/" replace />
  }

  const score = scorePassword(password)
  const strengthLabels = ['—', t('register.strengthWeak'), t('register.strengthMedium'), t('register.strengthStrong')]
  const barClass = (i: number) => {
    if (score < i) return 'bg-surface-container-high'
    if (score === 1) return 'bg-error dark:bg-[#ffb4ab]'
    if (score === 2) return 'bg-[#f59e0b] dark:bg-[#ffc24b]'
    if (score >= 3) return 'bg-primary dark:bg-[#7dffb0]'
    return 'bg-outline-variant dark:bg-[#414755]'
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError(t('register.errorMismatch'))
      return
    }
    if (!agree) {
      setError(t('register.errorTerms'))
      return
    }
    setSubmitting(true)
    try {
      await register({ name, email, password })
      navigate('/', { replace: true })
    } catch {
      setError(t('register.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-background p-gutter">
      <div className="flex w-full max-w-[1040px] overflow-hidden rounded-xl border border-overlay-md bg-surface shadow-2xl dark:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <AuthBrandPanel
          variant="register"
          kicker={t('register.brandKicker')}
          headline={t('register.brandHeadline')}
          benefits={[
            { text: t('register.benefit1') },
            { text: t('register.benefit2') },
            { text: t('register.benefit3') },
          ]}
          footer={t('register.brandFooter')}
        />

        <div className="flex flex-1 items-center justify-center p-xl sm:px-[52px]">
          <form onSubmit={onSubmit} className="w-full max-w-[400px]" aria-label={t('register.title')}>
            <h1 className="text-headline-lg-mobile text-on-surface">{t('register.title')}</h1>
            <p className="mt-xs text-body-sm text-on-surface-variant">{t('register.subtitle')}</p>

            <div className="mt-lg flex flex-col gap-md">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-name" className="text-label-caps uppercase text-on-surface-variant">
                  {t('register.name')}
                </label>
                <div className="relative flex items-center">
                  <Icon name="person" className="pointer-events-none absolute left-3 text-[18px] text-outline" />
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t('register.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-overlay-md bg-input-bg pl-10 pr-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/45 transition-colors hover:border-overlay-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="reg-email" className="text-label-caps uppercase text-on-surface-variant">
                  {t('register.email')}
                </label>
                <div className="relative flex items-center">
                  <Icon name="mail" className="pointer-events-none absolute left-3 text-[18px] text-outline" />
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t('register.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-overlay-md bg-input-bg pl-10 pr-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/45 transition-colors hover:border-overlay-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <PasswordField
                  id="reg-password"
                  label={t('register.password')}
                  autoComplete="new-password"
                  required
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-0.5 flex gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${barClass(i)}`}
                    />
                  ))}
                </div>
                <span className="text-body-sm text-outline">
                  {t('register.strength')}: {strengthLabels[score]}
                </span>
              </div>

              <PasswordField
                id="reg-confirm"
                label={t('register.confirmPassword')}
                autoComplete="new-password"
                required
                placeholder={t('register.confirmPasswordPlaceholder')}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <label className="flex cursor-pointer select-none items-start gap-sm">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agree}
                  onClick={() => setAgree((a) => !a)}
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-all ${
                    agree ? 'border-primary bg-primary' : 'border-overlay-lg bg-transparent'
                  }`}
                >
                  <Icon
                    name="check"
                    className="text-[15px] text-on-primary"
                    style={{ opacity: agree ? 1 : 0 }}
                  />
                </button>
                <span className="text-body-sm leading-relaxed text-on-surface-variant">
                  {t('register.terms')}{' '}
                  <Link to="/terms" className="font-semibold text-primary hover:underline">
                    {t('register.termsLink')}
                  </Link>{' '}
                  {t('register.and')}{' '}
                  <Link to="/privacy" className="font-semibold text-primary hover:underline">
                    {t('register.privacyLink')}
                  </Link>
                  .
                </span>
              </label>

              {error && <p className="text-body-sm text-error">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 items-center justify-center gap-xs rounded-lg bg-primary dark:bg-gradient-to-b dark:from-primary-container dark:to-[#3b7de6] text-body-lg font-semibold text-on-primary dark:text-white shadow-lg dark:shadow-[0_8px_24px_-8px_rgba(75,142,255,0.6)] transition-all hover:opacity-90 dark:hover:brightness-110 active:opacity-100 dark:active:brightness-95 disabled:pointer-events-none disabled:opacity-50"
              >
                {submitting ? t('register.submitting') : t('register.submit')}
                {!submitting && <Icon name="arrow_forward" className="text-[18px]" />}
              </button>
            </div>

            <p className="mt-lg text-center text-body-sm text-on-surface-variant">
              {t('register.haveAccount')}{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                {t('register.signIn')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
