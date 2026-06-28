import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { isMockMode } from '@/services/apiClient'
import { useAuth } from '../authContext'

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
    <div className="grid min-h-screen place-items-center bg-background px-gutter">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col gap-md rounded-lg border border-outline-variant/30 bg-surface-container p-lg"
        aria-label={t('title')}
      >
        <h1 className="text-title-lg">{t('title')}</h1>
        <Input
          label={t('email')}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('password')}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-body-sm text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? t('submitting') : t('submit')}
        </Button>
      </form>
    </div>
  )
}
