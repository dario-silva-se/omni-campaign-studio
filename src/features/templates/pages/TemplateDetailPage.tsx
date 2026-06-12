import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useTemplate } from '../hooks/useTemplates'
import { LinkedInTemplateDetail } from '../components/LinkedInTemplateDetail'
import { TelegramTemplateDetail } from '../components/TelegramTemplateDetail'
import { YouTubeTemplateDetail } from '../components/YouTubeTemplateDetail'

export default function TemplateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['templates', 'common'])
  const navigate = useNavigate()
  const { data: template, isLoading, isError } = useTemplate(id)

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !template) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header bar */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 h-16 flex items-center justify-between px-lg">
        <div className="flex items-center gap-md">
          <button
            type="button"
            onClick={() => navigate('/templates')}
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label={t('detail.back')}
          >
            <Icon name="arrow_back" />
          </button>
          <h2 className="font-title-md text-title-md text-on-surface font-semibold">
            {template.channel === 'linkedin' && t('linkedin.title')}
            {template.channel === 'telegram' && t('telegram.title')}
            {template.channel === 'youtube' && t('youtube.title')}
          </h2>
        </div>
      </div>

      {/* Channel-specific detail */}
      {template.channel === 'linkedin' && <LinkedInTemplateDetail template={template} />}
      {template.channel === 'telegram' && <TelegramTemplateDetail template={template} />}
      {template.channel === 'youtube' && <YouTubeTemplateDetail template={template} />}
    </div>
  )
}
