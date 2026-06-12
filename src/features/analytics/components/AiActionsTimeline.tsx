import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { CampaignHealthAiAction } from '@/types'

interface Props {
  actions: CampaignHealthAiAction[]
}

const DOT_COLOR_MAP = {
  'secondary-container': 'bg-secondary-container',
  'primary': 'bg-primary',
  'outline-variant': 'bg-outline-variant',
} as const

export function AiActionsTimeline({ actions }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-4 flex flex-col">
      <div className="flex justify-between items-center mb-lg">
        <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-sm">
          <Icon name="auto_awesome" className="text-secondary-container" />
          {t('campaignHealth.aiActions.title')}
        </h3>
        <span className="text-on-surface-variant text-[12px]">
          {t('campaignHealth.aiActions.live')}
        </span>
      </div>
      <div className="relative pl-sm flex-1">
        {/* Timeline line */}
        <div className="absolute top-2 bottom-2 left-[19px] w-px bg-outline-variant/20" />
        {actions.map((action, i) => (
          <div key={action._id} className={`relative pl-xl ${i < actions.length - 1 ? 'mb-md' : ''}`}>
            <div
              className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${DOT_COLOR_MAP[action.dotColor]} ring-4 ring-background z-10`}
            />
            <p className="font-body-sm text-body-sm text-on-surface font-semibold mb-1">
              {action.title}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-tight mb-1">
              {action.description}
            </p>
            <span className="font-label-caps text-label-caps text-on-surface-variant/60 text-[10px]">
              {action.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
