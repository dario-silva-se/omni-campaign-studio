import { Icon } from '@/components/ui/Icon'
import type { GeneratedPost } from '@/types'

const CHANNEL_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  telegram: { label: 'Telegram', className: 'text-sky-400 bg-sky-400/10' },
  linkedin: { label: 'LinkedIn', className: 'text-primary bg-primary/10' },
  youtube: { label: 'YouTube', className: 'text-red-400 bg-red-400/10' },
}

interface Props {
  post: GeneratedPost
  variant?: 'draft' | 'scheduled' | 'published'
}

function formatScheduleDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)

  const isToday = date.toDateString() === now.toDateString()
  const isTomorrow = date.toDateString() === tomorrow.toDateString()

  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  if (isToday) return `Hoje, ${time}`
  if (isTomorrow) return `Amanhã, ${time}`

  const day = date.getDate()
  const month = date.toLocaleString('pt-BR', { month: 'short' })
  return `${day} de ${month} · ${time}`
}

function formatPublishedDate(iso: string): string {
  const date = new Date(iso)
  const day = date.getDate()
  const month = date.toLocaleString('pt-BR', { month: 'short' })
  return `${day} de ${month}`
}

export function PostCard({ post, variant = 'draft' }: Props) {
  const channelStyle = CHANNEL_STYLES[post.channel] ?? {
    label: post.channel,
    className: 'text-on-surface-variant bg-surface-variant',
  }

  return (
    <div
      className={`glass-card p-sm rounded-lg transition-colors cursor-pointer inner-highlight ${
        variant === 'published'
          ? 'border-l-2 border-l-emerald-400/50 hover:border-l-emerald-400 opacity-80 hover:opacity-100'
          : variant === 'scheduled'
          ? 'hover:border-primary/50'
          : 'hover:border-outline'
      }`}
    >
      <p className="font-body-sm text-[13px] text-on-surface leading-relaxed mb-3 line-clamp-2">
        {post.content}
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${channelStyle.className}`}
        >
          {channelStyle.label}
        </span>
      </div>

      {variant === 'scheduled' && post.scheduledFor && (
        <div className="flex items-center justify-between text-outline text-[11px] border-t border-outline-variant/20 pt-2">
          <div className="flex items-center gap-1">
            <Icon name="calendar_month" className="text-[14px]" />
            <span className="text-primary-fixed">{formatScheduleDate(post.scheduledFor)}</span>
          </div>
        </div>
      )}

      {variant === 'published' && post.publishedAt && (
        <div className="text-outline text-[11px] border-t border-outline-variant/20 pt-2">
          {formatPublishedDate(post.publishedAt)}
        </div>
      )}
    </div>
  )
}
