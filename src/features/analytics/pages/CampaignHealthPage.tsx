import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useCampaignHealth } from '../hooks/useAnalytics'
import { GlobalRoiCard } from '../components/GlobalRoiCard'
import { ConversionQualityCard } from '../components/ConversionQualityCard'
import { ChannelDiagnosticsTable } from '../components/ChannelDiagnosticsTable'
import { AiActionsTimeline } from '../components/AiActionsTimeline'

export default function CampaignHealthPage() {
  const { t } = useTranslation(['analytics', 'common'])
  const { data, isLoading, isError } = useCampaignHealth()

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <main className="px-gutter pb-12 pt-6 min-h-screen max-w-container-max mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
            {t('analytics:campaignHealth.title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {t('analytics:campaignHealth.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-xs bg-surface-container-low px-sm py-xs rounded-full border border-outline-variant/10">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {t('analytics:campaignHealth.liveSync')}
            </span>
          </div>
          <div className="bg-surface-container-low px-sm py-xs rounded-lg border border-outline-variant/10 flex items-center gap-sm cursor-pointer hover:border-primary/50 transition-all">
            <span className="font-body-sm text-body-sm text-on-surface">
              {t('analytics:campaignHealth.periodSelector')}
            </span>
            <Icon name="keyboard_arrow_down" className="text-[16px] text-on-surface-variant" />
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        <GlobalRoiCard
          data={{
            pipelineAmount: data.pipelineAmount,
            blendedRoas: data.blendedRoas,
            budgetBurn: data.budgetBurn,
            roiTrendPct: data.roiTrendPct,
            chartBars: data.chartBars,
          }}
        />
        <ConversionQualityCard
          funnelStages={data.funnelStages}
          mqlToSqlRate={data.mqlToSqlRate}
        />
        <ChannelDiagnosticsTable rows={data.channelRows} />
        <AiActionsTimeline actions={data.aiActions} />
      </div>
    </main>
  )
}
