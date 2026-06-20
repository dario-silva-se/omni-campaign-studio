import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface LayoutContextValue {
  /** Mobile drawer open/closed. */
  mobileOpen: boolean
  /** Desktop sidebar collapsed to icon rail. Persisted in localStorage. */
  collapsed: boolean
  toggleMobile: () => void
  closeMobile: () => void
  toggleCollapsed: () => void
}

const LayoutContext = createContext<LayoutContextValue | null>(null)

const COLLAPSE_KEY = 'sidebar-collapsed'

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<boolean>(
    () => localStorage.getItem(COLLAPSE_KEY) === 'true',
  )

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }, [collapsed])

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), [])

  const value = useMemo(
    () => ({ mobileOpen, collapsed, toggleMobile, closeMobile, toggleCollapsed }),
    [mobileOpen, collapsed, toggleMobile, closeMobile, toggleCollapsed],
  )

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook colocated by convention
export function useLayout(): LayoutContextValue {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider')
  return ctx
}
