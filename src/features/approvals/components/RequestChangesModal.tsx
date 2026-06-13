import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { Icon } from '@/components/ui/Icon'
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
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const updateApproval = useUpdateApproval()

  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = () => {
    updateApproval.mutate(
      { id: approvalId, payload: { status: 'changes-requested' } },
      {
        onSuccess: () => {
          setFeedback('')
          setTags([])
          setTagInput('')
          onClose()
        },
      },
    )
  }

  const handleSaveDraft = () => {
    onClose()
  }

  const charCount = feedback.length

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('requestChanges.title')}
      footer={
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-lg py-sm border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant/30 transition-all font-medium text-sm"
          >
            {t('requestChanges.cancel')}
          </button>
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-lg py-sm bg-surface-variant text-on-surface rounded-lg hover:bg-surface-container-highest transition-all font-medium text-sm flex items-center gap-xs"
            >
              <Icon name="save" className="text-[18px]" />
              {t('requestChanges.saveDraft')}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={updateApproval.isPending}
              className="px-lg py-sm bg-primary text-on-primary-container font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center gap-xs"
            >
              <Icon name="send" className="text-[18px]" />
              {t('requestChanges.submitChanges')}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-lg">
        <p className="text-sm text-on-surface-variant">
          {t('requestChanges.asset', { name: approvalTitle })}
        </p>

        {/* Detailed Feedback */}
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

        {/* Tag Stakeholders */}
        <div>
          <span className="text-label-caps uppercase text-on-surface-variant block mb-xs">
            {t('requestChanges.tagStakeholders')}
          </span>
          <div className="flex flex-wrap gap-sm p-sm bg-white/[0.03] border border-white/10 rounded-lg min-h-[48px] items-center focus-within:border-primary transition-colors">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-xs bg-primary/10 text-primary border border-primary/20 py-1 px-sm rounded-full text-[13px]"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-on-surface transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <Icon name="close" className="text-[14px]" />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onBlur={handleAddTag}
              placeholder={t('requestChanges.tagPlaceholder')}
              className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface-variant/50 flex-1 min-w-[120px] outline-none"
            />
          </div>
        </div>

        {/* Reference Attachments */}
        <div>
          <span className="text-label-caps uppercase text-on-surface-variant block mb-xs">
            {t('requestChanges.referenceAttachments')}
          </span>
          <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-xl flex flex-col items-center justify-center bg-surface-variant/10 hover:bg-surface-variant/20 hover:border-primary/50 transition-all cursor-pointer group">
            <Icon name="upload_file" className="text-outline group-hover:text-primary text-[32px] mb-sm" />
            <p className="text-sm text-on-surface-variant text-center">
              {t('requestChanges.dropZoneLabel')}
            </p>
            <p className="text-[10px] text-outline mt-xs uppercase tracking-wider">
              {t('requestChanges.dropZoneHint')}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
