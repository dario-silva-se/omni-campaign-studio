import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useLeadLifecycle } from '../hooks/useAnalytics'
import { SourceAttributionCard } from '../components/SourceAttributionCard'
import { LeadsLifecycleTable } from '../components/LeadsLifecycleTable'

export default function LeadLifecyclePage() {
  const { t } = useTranslation(['analytics', 'common'])
  const { data, isLoading, isError } = useLeadLifecycle()

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <main className="pt-6 px-md md:px-lg pb-xl max-w-container-max mx-auto w-full flex flex-col gap-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-sm">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">
            {t('analytics:leadLifecycle.title')}
          </h2>
          <p className="font-body-lg text-body-sm md:text-body-lg text-on-surface-variant">
            {t('analytics:leadLifecycle.subtitle')}
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            type="button"
            className="glass-panel px-sm py-xs rounded-lg text-body-sm font-body-sm flex items-center gap-xs hover:bg-surface-container transition-colors"
          >
            <Icon name="calendar_today" className="text-[18px]" />
            {t('analytics:leadLifecycle.periodSelector')}
          </button>
          <button
            type="button"
            className="glass-panel px-sm py-xs rounded-lg text-body-sm font-body-sm flex items-center gap-xs hover:bg-surface-container transition-colors"
          >
            <Icon name="filter_list" className="text-[18px]" />
            {t('analytics:leadLifecycle.filter')}
          </button>
        </div>
      </div>

      {/* Funnel Overview Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
        {/* Source Attribution — spans 2 cols */}
        <SourceAttributionCard sources={data.sources} />

        {/* Velocity */}
        <div className="glass-panel rounded-xl p-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-xs">
              <h3 className="font-title-md text-title-md text-on-surface">
                {t('analytics:leadLifecycle.velocity.title')}
              </h3>
              <Icon name="speed" className="text-primary" />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('analytics:leadLifecycle.velocity.subtitle')}
            </p>
          </div>
          <div className="mt-md">
            <div className="font-display-lg text-[40px] leading-tight font-bold text-on-surface">
              {data.avgTimeToSqlDays}{' '}
              <span className="text-title-md text-on-surface-variant font-normal">
                {t('analytics:leadLifecycle.velocity.days')}
              </span>
            </div>
            <div className="flex items-center gap-xs mt-xs text-sm text-[#4CAF50]">
              <Icon name="trending_down" className="text-[16px]" />
              <span>
                {data.avgTimeToSqlTrendPct} {t('analytics:leadLifecycle.velocity.vsLastMonth')}
              </span>
            </div>
          </div>
        </div>

        {/* Avg Quality Score */}
        <div className="glass-panel rounded-xl p-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-xs">
              <h3 className="font-title-md text-title-md text-on-surface">
                {t('analytics:leadLifecycle.avgQuality.title')}
              </h3>
              <Icon name="star_rate" className="text-tertiary" />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('analytics:leadLifecycle.avgQuality.subtitle')}
            </p>
          </div>
          <div className="mt-md">
            <div className="font-display-lg text-[40px] leading-tight font-bold text-on-surface">
              {data.avgQualityScore}
              <span className="text-title-md text-on-surface-variant font-normal">
                /{data.avgQualityOutOf}
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 mt-sm">
              <div
                className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full"
                style={{ width: `${data.avgQualityScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <LeadsLifecycleTable leads={data.leads} />
    </main>
  )
}
