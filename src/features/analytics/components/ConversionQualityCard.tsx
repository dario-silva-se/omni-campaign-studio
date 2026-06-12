import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { CampaignHealthFunnelStage } from '@/types'

interface Props {
  funnelStages: CampaignHealthFunnelStage[]
  mqlToSqlRate: string
}

export function ConversionQualityCard({ funnelStages, mqlToSqlRate }: Props) {
  const { t } = useTranslation('analytics')
  const rateNumber = parseFloat(mqlToSqlRate)
  return (
    <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-md">
          <h3 className="font-title-md text-title-md text-on-surface">
            {t('campaignHealth.conversionQuality.title')}
          </h3>
          <Icon name="filter_alt" className="text-on-surface-variant" />
        </div>
        <div className="space-y-md">
          {funnelStages.map((stage) => (
            <div key={stage.label}>
              <div className="flex justify-between font-body-sm text-body-sm mb-xs">
                <span className="text-on-surface-variant">{stage.label}</span>
                <span className="text-on-surface">{stage.value.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className={`${stage.colorClass} h-full rounded-full`}
                  style={{ width: `${stage.barWidthPct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-lg pt-md border-t border-outline-variant/10">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {t('campaignHealth.conversionQuality.mqlToSqlRate')}
            </span>
            <span className="block font-headline-lg-mobile text-headline-lg-mobile text-secondary mt-xs">
              {mqlToSqlRate}
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-secondary/20 flex items-center justify-center relative">
            <svg aria-hidden="true" className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${rateNumber}, 100`}
                strokeWidth="3"
              />
            </svg>
            <Icon name="star" className="text-secondary text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
