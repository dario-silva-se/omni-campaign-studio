import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useApprovalList, useUpdateApproval } from '../hooks/useApprovals'
import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import {
  approvalActivityFixture,
  approvalDashboardStatsFixture,
} from '@/mocks/fixtures/approvals'
import type { Approval } from '@/types'

function channelIcon(channel: Approval['channel']): string {
  const map: Record<Approval['channel'], string> = {
    linkedin: 'link',
    youtube: 'video_library',
    telegram: 'send',
  }
  return map[channel]
}

function channelLabel(channel: Approval['channel']): string {
  const map: Record<Approval['channel'], string> = {
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    telegram: 'Telegram',
  }
  return map[channel]
}

function channelColorClass(channel: Approval['channel']): string {
  const map: Record<Approval['channel'], string> = {
    linkedin: 'text-blue-400',
    youtube: 'text-red-500',
    telegram: 'text-sky-400',
  }
  return map[channel]
}

function contentTypeLabel(channel: Approval['channel']): string {
  const map: Record<Approval['channel'], string> = {
    linkedin: 'Text Post',
    youtube: 'Video Ad',
    telegram: 'Announcement',
  }
  return map[channel]
}

export default function ApprovalsPage() {
  const { t } = useTranslation('approvals')
  const navigate = useNavigate()
  const { data: approvals, isLoading, isError } = useApprovalList()
  const updateApproval = useUpdateApproval()
  const [activeChannel, setActiveChannel] = useState<string>('all')

  if (isLoading) return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando…')}</p>
  if (isError)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  const list = approvals ?? []
  const filtered =
    activeChannel === 'all' ? list : list.filter((a) => a.channel === activeChannel)

  const handleApprove = (id: string) => {
    updateApproval.mutate({ id, payload: { status: 'approved' } })
  }

  const handleReject = (id: string) => {
    updateApproval.mutate({ id, payload: { status: 'rejected' } })
  }

  const pendingCount = list.filter((a) => a.status === 'pending').length
  const inReviewCount = list.filter((a) => a.reviewers.some((r) => r.status === 'pending')).length

  return (
    <div className="flex flex-col min-h-full">
      {/* Stat Cards */}
      <div className="p-lg space-y-xl">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Pending Approval */}
          <div className="relative p-lg rounded-xl bg-surface-container border border-overlay-md overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex justify-between items-start mb-md">
              <Icon name="pending_actions" className="text-primary text-3xl" />
              <span className="font-mono text-primary bg-primary/10 px-sm py-1 rounded text-[10px] tracking-widest">
                {t('dashboard.stats.vsLastWeek')}
              </span>
            </div>
            <p className="text-label-caps uppercase text-on-surface-variant tracking-widest">
              {t('dashboard.stats.pendingApproval')}
            </p>
            <h3 className="text-4xl font-bold mt-xs text-on-surface">{pendingCount}</h3>
          </div>

          {/* In Review */}
          <div className="relative p-lg rounded-xl bg-surface-container border border-overlay-md overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tertiary/30 to-transparent" />
            <div className="flex justify-between items-start mb-md">
              <Icon name="visibility" className="text-tertiary text-3xl" />
              <span className="font-mono text-tertiary bg-tertiary/10 px-sm py-1 rounded text-[10px] tracking-widest">
                {t('dashboard.stats.liveNow')}
              </span>
            </div>
            <p className="text-label-caps uppercase text-on-surface-variant tracking-widest">
              {t('dashboard.stats.inReview')}
            </p>
            <h3 className="text-4xl font-bold mt-xs text-on-surface">{inReviewCount}</h3>
          </div>

          {/* Scheduled Today */}
          <div className="relative p-lg rounded-xl bg-surface-container border border-overlay-md overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            <div className="flex justify-between items-start mb-md">
              <Icon name="event_available" className="text-secondary text-3xl" />
              <span className="font-mono text-secondary bg-secondary/10 px-sm py-1 rounded text-[10px] tracking-widest">
                {t('dashboard.stats.onTrack')}
              </span>
            </div>
            <p className="text-label-caps uppercase text-on-surface-variant tracking-widest">
              {t('dashboard.stats.scheduledToday')}
            </p>
            <h3 className="text-4xl font-bold mt-xs text-on-surface">{approvalDashboardStatsFixture.scheduledToday}</h3>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <section className="grid grid-cols-12 gap-lg">
          {/* Feed Column */}
          <div className="col-span-12 lg:col-span-8 space-y-lg">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-surface-container border border-overlay-md p-md rounded-xl">
              <div className="flex gap-md flex-wrap">
                {(['all', 'linkedin', 'youtube', 'telegram'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setActiveChannel(ch)}
                    className={`px-md py-sm rounded-lg text-label-md font-medium transition-colors flex items-center gap-xs ${
                      activeChannel === ch
                        ? 'bg-primary text-white'
                        : 'text-on-surface-variant hover:bg-surface-variant/30'
                    }`}
                  >
                    {ch !== 'all' && (
                      <Icon name={channelIcon(ch as Approval['channel'])} className="text-sm" />
                    )}
                    {t(`dashboard.filters.${ch === 'all' ? 'allChannels' : ch}`)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-md border-l border-outline-variant pl-md">
                <span className="text-label-caps text-on-surface-variant">{t('dashboard.filters.urgency')}</span>
                <select className="bg-transparent border-none text-label-md text-primary font-bold focus:ring-0 cursor-pointer">
                  <option>{t('dashboard.filters.high')}</option>
                  <option>{t('dashboard.filters.recent')}</option>
                  <option>{t('dashboard.filters.oldest')}</option>
                </select>
              </div>
            </div>

            {/* Feed Items */}
            <div className="space-y-md">
              {filtered.map((approval) => (
                <div
                  key={approval._id}
                  className="bg-surface-container border border-overlay-md p-md rounded-xl hover:border-primary/50 transition-all flex items-center gap-lg"
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-outline-variant ${
                      approval.contentSnippet
                        ? 'bg-surface-container-highest p-md'
                        : (approval.thumbnailColorClass ?? 'bg-surface-container-highest')
                    }`}
                  >
                    {approval.contentSnippet ? (
                      <p className="text-xs text-on-surface-variant line-clamp-4 leading-relaxed">
                        {approval.contentSnippet}
                      </p>
                    ) : (
                      <Icon name={channelIcon(approval.channel)} className={`text-4xl opacity-30 ${channelColorClass(approval.channel)}`} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-sm mb-xs">
                      <Icon name={channelIcon(approval.channel)} className={`text-lg ${channelColorClass(approval.channel)}`} />
                      <span className="text-label-sm text-on-surface-variant">
                        {channelLabel(approval.channel)} • {contentTypeLabel(approval.channel)}
                      </span>
                    </div>
                    <h4 className="text-body-md font-semibold text-on-surface truncate">{approval.title}</h4>
                    <div className="flex items-center gap-md mt-sm">
                      <span className="text-label-md text-on-surface-variant">
                        {approval.requestedByName}
                      </span>
                      <span className="text-outline">•</span>
                      <span className="text-label-md text-on-surface-variant flex items-center gap-xs">
                        <Icon name="schedule" className="text-sm" />
                        {approval.timeAgo}
                      </span>
                      {approval.urgency === 'critical' && (
                        <StatusChip status="error" className="text-[10px] font-bold uppercase tracking-widest">
                          {t('dashboard.feed.critical')}
                        </StatusChip>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-sm flex-shrink-0">
                    <button
                      onClick={() => navigate(`/approvals/${approval._id}`)}
                      className="p-sm text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title={t('dashboard.feed.viewDetails')}
                    >
                      <Icon name="open_in_new" />
                    </button>
                    <button
                      onClick={() => handleReject(approval._id)}
                      className="p-sm text-error hover:bg-error/10 rounded-lg transition-all"
                      title={t('dashboard.feed.reject')}
                      disabled={approval.status !== 'pending'}
                    >
                      <Icon name="close" />
                    </button>
                    <button
                      onClick={() => handleApprove(approval._id)}
                      disabled={approval.status !== 'pending'}
                      className="px-lg py-md bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {approval.status === 'approved'
                        ? t('detail.approved')
                        : t('dashboard.feed.approve')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-4 space-y-lg">
            <div className="bg-surface-container border border-overlay-md p-lg rounded-xl flex flex-col gap-lg sticky top-[84px]">
              {/* Review Progress */}
              <div>
                <h5 className="text-body-md font-semibold text-on-surface mb-md">
                  {t('dashboard.sidebar.reviewProgress')}
                </h5>
                <div className="space-y-md">
                  <div className="flex justify-between items-end mb-xs">
                    <span className="text-label-md text-on-surface-variant">
                      {t('dashboard.sidebar.monthlyTarget')}
                    </span>
                    <span className="font-mono text-primary text-sm">84%</span>
                  </div>
                  <div className="w-full bg-surface-variant/30 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[84%] rounded-full shadow-sm dark:shadow-[0_0_10px_rgba(173,198,255,0.5)]" />
                  </div>
                </div>
              </div>

              <hr className="border-outline-variant" />

              {/* Recent Activity */}
              <div>
                <h5 className="text-label-caps uppercase tracking-widest text-on-surface-variant mb-md">
                  {t('dashboard.sidebar.recentActivity')}
                </h5>
                <div className="space-y-lg">
                  {approvalActivityFixture.map((item) => (
                    <div key={item._id} className="flex gap-md">
                      <div className={`w-8 h-8 rounded-full bg-${item.colorToken}/10 flex items-center justify-center shrink-0`}>
                        <Icon name={item.icon} className={`text-${item.colorToken} text-sm`} />
                      </div>
                      <div>
                        <p className="text-sm text-on-surface">{item.text}</p>
                        <p className="text-label-sm text-on-surface-variant mt-1">{item.timeAgo}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/approvals/history')}
                  className="w-full py-md border border-outline-variant rounded-xl font-bold text-on-surface hover:bg-surface-variant/30 transition-all flex items-center justify-center gap-sm mt-md"
                >
                  <Icon name="history" />
                  {t('dashboard.sidebar.viewAllActivity')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
