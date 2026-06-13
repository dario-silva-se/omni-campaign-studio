import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { useUpdateApproval } from '../hooks/useApprovals'

interface RequestChangesModalProps {
  open: boolean
  onClose: () => void
  approvalId: string
  approvalTitle: string
}

export function RequestChangesModal({
  open,
  onClose,
  approvalId,
  approvalTitle,
}: RequestChangesModalProps) {
  const { t } = useTranslation('approvals')
  const [feedback, setFeedback] = useState('')
  const updateApproval = useUpdateApproval()

  const handleSubmit = () => {
    updateApproval.mutate(
      { id: approvalId, payload: { status: 'changes-requested' } },
      {
        onSuccess: () => {
          setFeedback('')
          onClose()
        },
      },
    )
  }

  const charCount = feedback.length

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('requestChanges.title')}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-lg py-sm border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant/30 transition-all font-medium text-sm"
          >
            {t('requestChanges.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={updateApproval.isPending}
            className="px-lg py-sm bg-primary text-on-primary-container font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center gap-xs"
          >
            {t('requestChanges.submitChanges')}
          </button>
        </>
      }
    >
      <div className="space-y-lg">
        <p className="text-sm text-on-surface-variant">
          {t('requestChanges.asset', { name: approvalTitle })}
        </p>

        <div>
          <div className="flex justify-between mb-xs">
            <span className="text-label-caps uppercase text-on-surface-variant">
              {t('requestChanges.detailedFeedback')}
            </span>
            <span className="text-xs text-on-surface-variant">
              {t('requestChanges.charCount', { count: charCount })}
            </span>
          </div>
          <Textarea
            label={t('requestChanges.detailedFeedback')}
            placeholder={t('requestChanges.feedbackPlaceholder')}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
            rows={5}
            className="w-full"
          />
        </div>
      </div>
    </Modal>
  )
}
