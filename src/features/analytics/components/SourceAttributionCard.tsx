import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { LeadSourceAttribution } from '@/types'

const CHANNEL_ICON: Record<string, string> = {
  linkedin: 'work',
  youtube: 'play_arrow',
  telegram: 'send',
}

interface Props {
  sources: LeadSourceAttribution[]
}

export function SourceAttributionCard({ sources }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel rounded-xl p-lg md:col-span-2 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-md">
        <h3 className="font-title-md text-title-md text-on-surface">
          {t('leadLifecycle.sourceAttribution.title')}
        </h3>
        <Icon name="pie_chart" className="text-on-surface-variant" />
      </div>
      <div className="space-y-sm">
        {sources.map((src) => (
          <div key={src.source} className="flex items-center gap-sm">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: `${src.colorHex}20` }}
            >
              <Icon
                name={CHANNEL_ICON[src.source] ?? 'circle'}
                className="text-[20px]"
                style={{ color: src.colorHex }}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-body-sm mb-1">
                <span className="text-on-surface">{src.label}</span>
                <span
                  className={`font-bold ${src.source === 'linkedin' ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  {src.pct}%
                </span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${src.pct}%`,
                    backgroundColor: src.colorHex,
                    opacity: src.source === 'linkedin' ? 1 : src.source === 'youtube' ? 0.8 : 0.6,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
