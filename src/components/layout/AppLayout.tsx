import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="p-lg text-on-surface-variant">
      Carregando…
    </div>
  )
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="md:ml-sidebar-width pb-20 md:pb-0">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <MobileNav />
    </div>
  )
}
