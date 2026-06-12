import { createContext, useContext, useId, useState } from 'react'
import type React from 'react'
import { cn } from '@/lib/cn'

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
  rootId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}

export interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (v: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const rootId = useId()
  const setValue = (v: string) => {
    setInternal(v)
    onValueChange?.(v)
  }
  return (
    <TabsContext.Provider value={{ value: current, setValue, rootId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function List({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    )
    if (tabs.length === 0) return
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement)
    let targetIndex: number

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      targetIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      targetIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      targetIndex = tabs.length - 1
    } else {
      return
    }

    const target = tabs[targetIndex]
    target.focus()
    target.click()
  }

  return (
    <div
      role="tablist"
      className={cn('flex gap-xs border-b border-white/10', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function Trigger({ value, className, children, ...props }: TriggerProps) {
  const { value: current, setValue, rootId } = useTabsContext()
  const selected = current === value
  return (
    <button
      type="button"
      role="tab"
      id={`${rootId}-tab-${value}`}
      aria-controls={`${rootId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        'border-b-2 px-md py-xs text-body-sm transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
        selected
          ? 'border-primary text-primary font-semibold'
          : 'border-transparent text-on-surface-variant hover:text-on-surface',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function Panel({ value, className, children, ...props }: PanelProps) {
  const { value: current, rootId } = useTabsContext()
  if (current !== value) return null
  return (
    <div
      role="tabpanel"
      id={`${rootId}-panel-${value}`}
      aria-labelledby={`${rootId}-tab-${value}`}
      className={cn('pt-md', className)}
      {...props}
    >
      {children}
    </div>
  )
}

Tabs.List = List
Tabs.Trigger = Trigger
Tabs.Panel = Panel
