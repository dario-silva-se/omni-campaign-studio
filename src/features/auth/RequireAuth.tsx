import { Navigate, useLocation } from 'react-router-dom'
import { isMockMode } from '@/services/apiClient'
import { useAuth } from './authContext'

/**
 * Route guard for the authenticated app. In mock mode (no backend) it is a
 * pass-through so the fixture-driven experience and tests work without login.
 * Otherwise it waits for the silent refresh, then renders the app or redirects
 * to /login, preserving the attempted location.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  if (isMockMode()) return <>{children}</>
  return <AuthGuard>{children}</AuthGuard>
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center text-on-surface-variant">
        …
      </div>
    )
  }
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}
