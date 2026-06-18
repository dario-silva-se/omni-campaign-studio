import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { Template } from '@/types'

const channelBadge: Record<string, { bg: string; text: string; border: string; icon: string; label: string }> = {
  youtube: {
    bg: 'bg-[#FF0000]/15',
    text: 'text-[#FF0000]',
    border: 'border-[#FF0000]/20',
    icon: 'smart_display',
    label: 'YouTube',
  },
  linkedin: {
    bg: 'bg-[#0A66C2]/15',
    text: 'text-[#0A66C2]',
    border: 'border-[#0A66C2]/20',
    icon: 'work',
    label: 'LinkedIn',
  },
  telegram: {
    bg: 'bg-[#0088cc]/15',
    text: 'text-[#0088cc]',
    border: 'border-[#0088cc]/20',
    icon: 'send',
    label: 'Telegram',
  },
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { t } = useTranslation('templates')
  const navigate = useNavigate()
  const badge = channelBadge[template.channel] ?? channelBadge.youtube

  return (
    <div
      role="article"
      onClick={() => navigate(`/templates/${template._id}`)}
      className="bg-surface-container rounded-xl overflow-hidden group cursor-pointer hover:bg-surface-container-high transition-all duration-300 border border-outline-variant/30"
    >
      <div className="p-md flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-md">
            <span
              className={`px-xs py-base rounded font-label-caps text-label-caps border flex items-center gap-1 ${badge.bg} ${badge.text} ${badge.border}`}
            >
              <Icon name={badge.icon} className="text-[14px]" />
              {badge.label}
            </span>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Mais opções"
            >
              <Icon name="more_vert" />
            </button>
          </div>
          <h3 className="font-title-md text-title-md text-on-surface mb-xs">{template.name}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{template.description}</p>
        </div>
        <div className="mt-xl flex items-center justify-between border-t border-outline-variant/10 pt-md">
          <div className="flex items-center space-x-sm text-on-surface-variant/60">
            <Icon name="visibility" className="text-sm" />
            <span className="font-body-sm text-[12px]">
              {t('library.usedTimes', { count: template.usageLabel ?? template.usageCount })}
            </span>
          </div>
          <Icon name="arrow_forward" className="text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  )
}
