import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <main className="md:ml-sidebar-width pb-20 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}
