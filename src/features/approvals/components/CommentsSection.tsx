import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { ApprovalComment } from '@/types'

interface CommentsSectionProps {
  comments: ApprovalComment[]
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  const { t } = useTranslation('approvals')

  return (
    <div className="space-y-md">
      {comments.map((comment, i) => (
        <div
          key={i}
          className={`rounded-lg p-md ${
            comment.isAlert
              ? 'bg-error/10 border border-error/30'
              : 'bg-surface-container-highest border border-overlay-sm'
          }`}
        >
          {comment.isAlert && (
            <div className="flex items-center gap-xs mb-sm">
              <Icon name="warning" className="text-error text-sm" />
              <span className="text-xs font-bold text-error uppercase tracking-widest">
                {t('detail.comments.missingPixel')}
              </span>
            </div>
          )}
          {!comment.isAlert && (
            <div className="flex items-center gap-sm mb-sm">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {comment.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="text-sm font-semibold text-on-surface">{comment.author}</span>
                {comment.role && (
                  <span className="ml-xs text-xs text-on-surface-variant">{comment.role}</span>
                )}
              </div>
            </div>
          )}
          <p className="text-sm text-on-surface-variant leading-relaxed">{comment.message}</p>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-md ml-lg space-y-sm border-l border-overlay-md pl-md">
              {comment.replies.map((reply, ri) => (
                <div key={ri}>
                  <div className="flex items-center gap-sm mb-xs">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary shrink-0">
                      {reply.author.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-on-surface">{reply.author}</span>
                    {reply.role && (
                      <span className="text-xs text-on-surface-variant">{reply.role}</span>
                    )}
                  </div>
                  <p className="text-sm text-on-surface-variant">{reply.message}</p>
                </div>
              ))}
            </div>
          )}

          {!comment.isAlert && (
            <div className="flex gap-md mt-sm">
              <button className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs">
                <Icon name="reply" className="text-xs" />
                {t('detail.comments.reply')}
              </button>
              <button className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs">
                <Icon name="check_circle" className="text-xs" />
                {t('detail.comments.resolve')}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* New comment input */}
      <div className="flex items-center gap-sm mt-md">
        <input
          type="text"
          placeholder={t('detail.comments.writeComment')}
          className="flex-1 rounded-lg border border-overlay-md bg-surface-container px-md py-sm text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
        />
        <button className="px-md py-sm bg-primary text-on-primary-container text-sm font-bold rounded-lg hover:shadow-primary/20 hover:shadow-lg transition-all">
          {t('detail.comments.send')}
        </button>
      </div>
    </div>
  )
}
