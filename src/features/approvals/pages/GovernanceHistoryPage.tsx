import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import type { GovernanceHistoryRow } from '@/types'
import { useGovernanceHistory } from '../hooks/useGovernanceHistory'

type Decision = GovernanceHistoryRow['decision']

function decisionChipStatus(decision: Decision) {
  if (decision === 'approved') return 'success'
  if (decision === 'rejected') return 'error'
  return 'warning'
}

function decisionLabel(decision: Decision, t: (k: string) => string) {
  if (decision === 'approved') return t('history.decision.approved')
  if (decision === 'rejected') return t('history.decision.rejected')
  return t('history.decision.changesRequested')
}

export default function GovernanceHistoryPage() {
  const { t } = useTranslation(['approvals', 'common'])
  const { data: rows, isLoading, isError } = useGovernanceHistory()
  const [search, setSearch] = useState('')

  if (isError) {
    return (
      <div role="alert" className="p-lg text-error">
        {t('common:errorState')}
      </div>
    )
  }

  if (isLoading) {
    return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>
  }

  const allRows = rows ?? []
  const filtered = search
    ? allRows.filter(
        (r) =>
          r.contentName.toLowerCase().includes(search.toLowerCase()) ||
          r.contentId.toLowerCase().includes(search.toLowerCase()) ||
          r.approver.toLowerCase().includes(search.toLowerCase()),
      )
    : allRows

  const approvedCount = allRows.filter((r) => r.decision === 'approved').length
  const rejectedCount = allRows.filter((r) => r.decision === 'rejected').length

  const columns: Column<GovernanceHistoryRow>[] = [
    {
      key: 'contentName',
      header: t('history.table.contentName'),
      render: (row) => (
        <div>
          <p className="font-semibold text-on-surface">{row.contentName}</p>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">{row.contentId}</p>
        </div>
      ),
    },
    {
      key: 'channel',
      header: t('history.table.channel'),
      render: (row) => (
        <div className="flex items-center gap-xs">
          <Icon name="share" className="text-sm text-on-surface-variant" />
          <span className="text-sm text-on-surface">{row.channel}</span>
        </div>
      ),
    },
    {
      key: 'decision',
      header: t('history.table.finalDecision'),
      render: (row) => (
        <StatusChip status={decisionChipStatus(row.decision)}>
          {decisionLabel(row.decision, t)}
        </StatusChip>
      ),
    },
    {
      key: 'approver',
      header: t('history.table.approver'),
      render: (row) => (
        <div className="flex items-center gap-sm">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            {row.approver.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <span className="text-sm text-on-surface">{row.approver}</span>
        </div>
      ),
    },
    {
      key: 'date',
      header: t('history.table.date'),
      render: (row) => <span className="text-sm text-on-surface-variant">{row.date}</span>,
    },
  ]

  return (
    <div className="flex flex-col min-h-full p-lg space-y-xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-md">
        <div>
          <h1 className="text-title-lg font-bold text-on-surface">{t('history.title')}</h1>
        </div>
        <div className="flex items-center gap-md flex-wrap">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('history.searchPlaceholder')}
              className="pl-9 pr-md py-sm rounded-lg border border-overlay-md bg-surface-container text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none w-56"
            />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-md flex-wrap">
        {[
          { key: 'allTime', label: t('history.filters.allTime') },
          { key: 'last30Days', label: t('history.filters.last30Days') },
          { key: 'last7Days', label: t('history.filters.last7Days') },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`px-md py-sm rounded-lg text-label-sm font-medium transition-colors ${
              key === 'allTime'
                ? 'bg-primary text-on-primary-container'
                : 'text-on-surface-variant hover:bg-surface-variant/30'
            }`}
          >
            {label}
          </button>
        ))}
        <button className="flex items-center gap-xs px-md py-sm rounded-lg border border-outline-variant text-label-sm text-on-surface-variant hover:bg-surface-variant/30 transition-all">
          <Icon name="calendar_today" className="text-sm" />
          {t('history.filters.dateRange')}
        </button>
        <button className="flex items-center gap-xs px-md py-sm rounded-lg border border-outline-variant text-label-sm text-on-surface-variant hover:bg-surface-variant/30 transition-all">
          <Icon name="filter_list" className="text-sm" />
          {t('history.filters.channelAll')}
        </button>
        <div className="ml-auto flex gap-md">
          <button className="flex items-center gap-xs px-md py-sm rounded-lg border border-outline-variant text-label-sm text-on-surface-variant hover:bg-surface-variant/30 transition-all">
            <Icon name="download" className="text-sm" />
            {t('history.exportCsv')}
          </button>
          <button className="flex items-center gap-xs px-md py-sm bg-primary/10 text-primary text-label-sm font-medium rounded-lg hover:bg-primary/20 transition-all">
            <Icon name="assessment" className="text-sm" />
            {t('history.auditReport')}
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container border border-overlay-md rounded-xl p-md">
          <p className="text-label-caps uppercase text-on-surface-variant">{t('history.summary.totalApproved')}</p>
          <p className="text-2xl font-bold text-emerald-400 mt-xs">{approvedCount}</p>
        </div>
        <div className="bg-surface-container border border-overlay-md rounded-xl p-md">
          <p className="text-label-caps uppercase text-on-surface-variant">{t('history.summary.totalRejected')}</p>
          <p className="text-2xl font-bold text-error mt-xs">{rejectedCount}</p>
        </div>
        <div className="bg-surface-container border border-overlay-md rounded-xl p-md">
          <p className="text-label-caps uppercase text-on-surface-variant">{t('history.summary.avgCycleTime')}</p>
          <p className="text-2xl font-bold text-on-surface mt-xs">2.4h</p>
        </div>
        <div className="bg-surface-container border border-overlay-md rounded-xl p-md">
          <p className="text-label-caps uppercase text-on-surface-variant">{t('history.summary.complianceRate')}</p>
          <p className="text-2xl font-bold text-primary mt-xs">97%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-overlay-md rounded-xl overflow-hidden">
        <DataTable<GovernanceHistoryRow>
          columns={columns}
          rows={filtered}
          caption={t('history.title')}
          emptyMessage="—"
        />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-on-surface-variant">
        <span>
          {t('history.pagination.showing', {
            from: 1,
            to: filtered.length,
            total: allRows.length,
          })}
        </span>
        <div className="flex items-center gap-xs">
          <button className="w-8 h-8 rounded bg-primary text-on-primary-container font-bold">1</button>
          <button className="w-8 h-8 rounded hover:bg-surface-variant/30 transition-all">2</button>
          <button className="w-8 h-8 rounded hover:bg-surface-variant/30 transition-all">3</button>
        </div>
      </div>
    </div>
  )
}
