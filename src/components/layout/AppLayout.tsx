import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { LayoutProvider, useLayout } from '@/contexts/LayoutContext'
import { Sidebar } from './Sidebar'
import { AppHeader } from './AppHeader'

function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="p-lg text-on-surface-variant">
      Carregando…
    </div>
  )
}

function LayoutShell() {
  const { collapsed } = useLayout()
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div
        className={cn(
          'transition-[margin] duration-200 ease-out',
          collapsed ? 'md:ml-[72px]' : 'md:ml-sidebar-width',
        )}
      >
        <AppHeader />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export function AppLayout() {
  return (
    <LayoutProvider>
      <LayoutShell />
    </LayoutProvider>
  )
}
