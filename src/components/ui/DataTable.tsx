import type React from 'react'
import { cn } from '@/lib/cn'

export interface Column<T extends { _id: string }> {
  key: string
  header: string
  align?: 'left' | 'right' | 'center'
  className?: string
  render?: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends { _id: string }> {
  columns: Column<T>[]
  rows: T[]
  caption: string
  emptyMessage?: string
  onRowClick?: (row: T) => void
  className?: string
}

const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const

export function DataTable<T extends { _id: string }>({
  columns, rows, caption, emptyMessage, onRowClick, className,
}: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table aria-label={caption} className="w-full border-collapse">
        <thead className="sticky top-0 bg-surface-container-lowest">
          <tr className="border-b border-overlay-md">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn('px-md py-sm text-label-caps uppercase text-on-surface-variant', alignClass[col.align ?? 'left'], col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-md py-xl text-center text-body-sm text-on-surface-variant">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr
              key={row._id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn('table-row-zebra border-b border-overlay-sm', onRowClick && 'cursor-pointer hover:bg-overlay-sm')}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-md py-sm text-body-sm', alignClass[col.align ?? 'left'], col.className)}>
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
