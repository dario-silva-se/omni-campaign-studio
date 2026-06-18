import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import { useApproval, useUpdateApproval } from '../hooks/useApprovals'
import { ReviewerPanel } from '../components/ReviewerPanel'
import { ComplianceChecklist } from '../components/ComplianceChecklist'
import { CommentsSection } from '../components/CommentsSection'
import { RequestChangesModal } from '../components/RequestChangesModal'

type TabId = 'comments' | 'history'

function approvalStatusChip(status: string) {
  if (status === 'approved') return 'success'
  if (status === 'rejected') return 'error'
  if (status === 'changes-requested') return 'warning'
  return 'neutral'
}

export default function ApprovalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['approvals', 'common'])
  const navigate = useNavigate()

  const { data: approval, isLoading, isError } = useApproval(id)
  const updateApproval = useUpdateApproval()

  const [activeTab, setActiveTab] = useState<TabId>('comments')
  const [modalOpen, setModalOpen] = useState(false)

  if (isError) {
    return (
      <div role="alert" className="p-lg text-error">
        {t('common:errorState')}
      </div>
    )
  }

  if (isLoading || !approval) {
    return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>
  }

  const handleApprove = () => {
    updateApproval.mutate({ id: approval._id, payload: { status: 'approved' } })
  }

  const commentCount = approval.comments?.length ?? 0

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 px-lg h-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/approvals')}
          className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          <Icon name="arrow_back" className="text-sm" />
          {t('detail.back')}
        </button>
        <div className="flex items-center gap-sm">
          <StatusChip status={approvalStatusChip(approval.status)}>
            {approval.status === 'approved'
              ? t('detail.approved')
              : approval.status === 'rejected'
                ? t('detail.rejected')
                : approval.status === 'changes-requested'
                  ? t('detail.changesRequested')
                  : t('detail.awaitingReview')}
          </StatusChip>
        </div>
      </div>

      {/* Main layout: preview + right panel */}
      <div className="grid grid-cols-12 gap-0 flex-1">
        {/* Left: Preview area */}
        <div className="col-span-12 lg:col-span-8 border-r border-overlay-sm flex flex-col">
          {/* Preview toolbar */}
          <div className="flex items-center gap-md px-lg py-sm border-b border-overlay-sm bg-surface-container">
            <span className="text-label-sm font-medium text-primary">
              {t('detail.desktopPreview')}
            </span>
            <span className="text-on-surface-variant">|</span>
            <span className="text-label-sm text-on-surface-variant">{t('detail.mobilePreview')}</span>
            <span className="ml-auto text-label-sm text-on-surface-variant">{t('detail.zoom')}</span>
          </div>

          {/* Post preview card */}
          <div className="flex-1 flex items-start justify-center bg-[#0a0a14] p-xl overflow-auto">
            <div className="w-full max-w-lg bg-[#1c1c28] border border-overlay-md rounded-xl overflow-hidden shadow-2xl">
              {/* Post header */}
              <div className="p-md flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center font-bold text-sm text-on-surface shrink-0">
                  BS
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">BrandX Solutions</p>
                  <p className="text-xs text-on-surface-variant">{t('detail.postFollowing')}</p>
                </div>
              </div>

              {/* Post content */}
              <div className="px-md pb-md">
                {approval.contentSnippet ? (
                  <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                    {approval.contentSnippet}
                  </p>
                ) : (
                  <div
                    className={`w-full h-48 rounded-lg flex items-center justify-center ${
                      approval.thumbnailColorClass ?? 'bg-surface-container-highest'
                    }`}
                  >
                    <Icon name="image" className="text-5xl text-on-surface-variant/30" />
                  </div>
                )}
              </div>

              {/* Engagement bar */}
              <div className="px-md py-sm border-t border-overlay-sm flex items-center gap-lg">
                <button className="flex items-center gap-xs text-xs text-on-surface-variant hover:text-primary transition-colors">
                  <Icon name="thumb_up" className="text-sm" />
                  {t('detail.postLike')}
                </button>
                <button className="flex items-center gap-xs text-xs text-on-surface-variant hover:text-primary transition-colors">
                  <Icon name="chat_bubble_outline" className="text-sm" />
                  {t('detail.postComment')}
                </button>
                <button className="flex items-center gap-xs text-xs text-on-surface-variant hover:text-primary transition-colors">
                  <Icon name="share" className="text-sm" />
                  {t('detail.postShare')}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="border-t border-overlay-sm bg-surface-container px-lg py-md flex items-center justify-end gap-md">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              disabled={approval.status !== 'pending'}
              className="px-lg py-sm border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant/30 transition-all font-medium text-sm disabled:opacity-50"
            >
              {t('detail.actions.requestChanges')}
            </button>
            <button
              type="button"
              onClick={handleApprove}
              disabled={approval.status !== 'pending' || updateApproval.isPending}
              className="px-lg py-sm bg-primary text-on-primary-container font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-xs"
            >
              <Icon name="check_circle" className="text-sm" />
              {t('detail.actions.approveForPublication')}
            </button>
            <button
              type="button"
              className="px-md py-sm text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all text-sm"
            >
              {t('detail.actions.archive')}
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col overflow-y-auto">
          <div className="p-lg space-y-xl">
            {/* Title */}
            <div>
              <h2 className="text-title-sm font-semibold text-on-surface truncate">
                {approval.title}
              </h2>
              {approval.requestedByName && (
                <p className="text-sm text-on-surface-variant mt-xs">
                  {approval.requestedByName}
                  {approval.timeAgo && (
                    <span className="ml-xs">• {approval.timeAgo}</span>
                  )}
                </p>
              )}
            </div>

            {/* Campaign Context */}
            {approval.campaignContext && (
              <div className="bg-surface-container border border-overlay-sm rounded-xl p-md space-y-sm">
                <h3 className="text-label-caps uppercase text-on-surface-variant tracking-widest">
                  {t('detail.campaignContext')}
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{t('detail.targetAudience')}</span>
                  <span className="font-medium text-on-surface">
                    {approval.campaignContext.targetAudience}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">{t('detail.channel')}</span>
                  <span className="font-medium text-on-surface">
                    {approval.campaignContext.channel}
                  </span>
                </div>
              </div>
            )}

            {/* Compliance Checklist */}
            {approval.complianceItems && approval.complianceItems.length > 0 && (
              <div className="bg-surface-container border border-overlay-sm rounded-xl p-md">
                <ComplianceChecklist items={approval.complianceItems} />
              </div>
            )}

            {/* Reviewers */}
            {approval.reviewers && approval.reviewers.length > 0 && (
              <div className="bg-surface-container border border-overlay-sm rounded-xl p-md">
                <h3 className="text-label-caps uppercase text-on-surface-variant tracking-widest mb-md">
                  {t('detail.reviewers')}
                </h3>
                <ReviewerPanel reviewers={approval.reviewers} />
              </div>
            )}

            {/* Tabs: Comments / History */}
            <div>
              <div className="flex border-b border-overlay-md mb-md">
                <button
                  type="button"
                  onClick={() => setActiveTab('comments')}
                  className={`px-md py-sm text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === 'comments'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t('detail.tabs.comments', { count: commentCount })}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`px-md py-sm text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === 'history'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t('detail.tabs.history')}
                </button>
              </div>

              {activeTab === 'comments' && (
                <CommentsSection comments={approval.comments ?? []} />
              )}

              {activeTab === 'history' && (
                <div className="space-y-md">
                  {(approval.historyEvents ?? []).map((ev, i) => (
                    <div key={i} className="flex items-start gap-sm">
                      <div className="w-2 h-2 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-sm text-on-surface">{ev.event}</p>
                        <p className="text-xs text-on-surface-variant">{ev.actor}</p>
                      </div>
                    </div>
                  ))}
                  {(!approval.historyEvents || approval.historyEvents.length === 0) && (
                    <p className="text-sm text-on-surface-variant">—</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request Changes Modal */}
      <RequestChangesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        approvalId={approval._id}
        approvalTitle={approval.title}
      />
    </div>
  )
}
