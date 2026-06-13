import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { usePost } from '../hooks/usePosts'
import { LinkedInPostDetail } from '../components/LinkedInPostDetail'
import { YouTubePostDetail } from '../components/YouTubePostDetail'
import { TelegramPostDetail } from '../components/TelegramPostDetail'

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['posts', 'common'])
  const navigate = useNavigate()
  const { data: post, isLoading, isError } = usePost(id)

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !post) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 px-lg h-12 flex items-center">
        <button
          type="button"
          onClick={() => navigate('/posts')}
          className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          <Icon name="arrow_back" className="text-sm" />
          {t('detail.back')}
        </button>
      </div>

      {post.channel === 'linkedin' && <LinkedInPostDetail post={post} />}
      {post.channel === 'youtube' && <YouTubePostDetail post={post} />}
      {post.channel === 'telegram' && <TelegramPostDetail post={post} />}
      {post.channel !== 'linkedin' && post.channel !== 'youtube' && post.channel !== 'telegram' && (
        <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
      )}
    </div>
  )
}
