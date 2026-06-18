import { useTranslation } from 'react-i18next'
import { StatusChip } from '@/components/ui/StatusChip'
import type { ApprovalReviewer, ApprovalStatus } from '@/types'

function reviewerChipStatus(status: ApprovalStatus) {
  if (status === 'approved') return 'success'
  if (status === 'rejected') return 'error'
  if (status === 'changes-requested') return 'warning'
  return 'neutral'
}

interface ReviewerPanelProps {
  reviewers: ApprovalReviewer[]
}

export function ReviewerPanel({ reviewers }: ReviewerPanelProps) {
  const { t } = useTranslation('approvals')

  return (
    <div className="space-y-md">
      {reviewers.map((r) => (
        <div key={r.name} className="flex items-center justify-between gap-md">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {r.avatarInitials ?? r.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">{r.name}</p>
              <p className="text-xs text-on-surface-variant">{r.role}</p>
            </div>
          </div>
          <StatusChip status={reviewerChipStatus(r.status)}>
            {r.status === 'approved'
              ? t('detail.approved')
              : r.status === 'rejected'
                ? t('detail.rejected')
                : r.status === 'changes-requested'
                  ? t('detail.changesRequested')
                  : t('detail.awaitingReview')}
          </StatusChip>
        </div>
      ))}
    </div>
  )
}
