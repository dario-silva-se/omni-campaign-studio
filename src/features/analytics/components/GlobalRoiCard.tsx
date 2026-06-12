import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { CampaignHealthRoi } from '@/types'

interface Props {
  data: Pick<CampaignHealthRoi, 'pipelineAmount' | 'blendedRoas' | 'budgetBurn' | 'roiTrendPct' | 'chartBars'>
}

export function GlobalRoiCard({ data }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel rounded-xl p-lg col-span-1 md:col-span-8 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mt-10 -mr-10 pointer-events-none" />
      <div className="flex justify-between items-start mb-lg relative z-10">
        <div>
          <h3 className="font-title-md text-title-md text-on-surface mb-base">
            {t('campaignHealth.globalRoi.title')}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t('campaignHealth.globalRoi.subtitle')}
          </p>
        </div>
        <div className="bg-surface-container px-sm py-xs rounded-lg border border-outline-variant/20 flex items-center gap-xs">
          <Icon name="trending_up" className="text-[16px] text-primary" />
          <span className="font-body-sm text-body-sm text-primary">{data.roiTrendPct}</span>
        </div>
      </div>
      <div className="flex items-end gap-lg mb-xl relative z-10">
        <div>
          <span className="font-display-lg text-display-lg text-on-surface block leading-none">
            {data.pipelineAmount}
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mt-xs block">
            {t('campaignHealth.globalRoi.generatedPipeline')}
          </span>
        </div>
        <div className="h-10 w-px bg-outline-variant/20" />
        <div>
          <span className="font-headline-lg text-headline-lg text-on-surface block leading-none">
            {data.blendedRoas}
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mt-xs block">
            {t('campaignHealth.globalRoi.blendedRoas')}
          </span>
        </div>
        <div className="h-10 w-px bg-outline-variant/20" />
        <div>
          <span className="font-headline-lg text-headline-lg text-error block leading-none">
            {data.budgetBurn}
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mt-xs block">
            {t('campaignHealth.globalRoi.budgetBurn')}
          </span>
        </div>
      </div>
      {/* Bar chart */}
      <div
        role="img"
        aria-label={t('campaignHealth.globalRoi.chartAriaLabel')}
        className="w-full h-32 mt-auto relative z-10 flex items-end justify-between gap-1"
      >
        {data.chartBars.map((bar, i) => {
          const isLast = i === data.chartBars.length - 1
          const isPeakMql = i === data.chartBars.length - 2
          return (
            <div
              key={i}
              className={`w-full ${bar.heightClass} ${
                isLast
                  ? 'bg-primary hover:bg-primary-fixed'
                  : isPeakMql
                  ? 'bg-primary/60 hover:bg-primary/70'
                  : 'bg-primary/20 hover:bg-primary/30'
              } transition-colors rounded-t-sm relative`}
            >
              {isPeakMql && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/20 px-2 py-1 rounded text-[10px] text-on-surface whitespace-nowrap">
                  {t('campaignHealth.globalRoi.peakMql')}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
