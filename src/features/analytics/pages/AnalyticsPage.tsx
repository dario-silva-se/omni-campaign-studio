import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useValueMetrics } from '../hooks/useAnalytics'
import { RoiSummaryBanner } from '../components/RoiSummaryBanner'
import { KpiCard } from '../components/KpiCard'
import { PerformanceChart } from '../components/PerformanceChart'
import { ChannelMetricsGrid } from '../components/ChannelMetricsGrid'
import { TopContentTable } from '../components/TopContentTable'

export default function AnalyticsPage() {
  const { t } = useTranslation(['analytics', 'common'])
  const { data, isLoading, isError } = useValueMetrics()

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <>
      {/* Page header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center w-full px-gutter h-16 shrink-0">
        <div className="flex items-center gap-md">
          <h1 className="font-headline-lg text-headline-lg text-primary hidden md:block">
            {t('analytics:valueMetrics.title')}
          </h1>
        </div>
        <div className="flex items-center gap-sm">
          <div className="glass-panel flex items-center px-md py-2 rounded-xl text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">
            <Icon name="calendar_today" className="mr-2 text-primary text-[18px]" />
            {t('analytics:valueMetrics.periodSelector')}
            <Icon name="expand_more" className="ml-4 text-outline text-[18px]" />
          </div>
          <button
            type="button"
            aria-label={t('analytics:valueMetrics.downloadReport')}
            className="glass-panel p-2 rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Icon name="file_download" className="text-primary" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-gutter pb-12 pt-6 min-h-screen max-w-container-max mx-auto w-full">
        {/* Page title for mobile */}
        <div className="mb-xl md:hidden">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
            {t('analytics:valueMetrics.title')}
          </h2>
          <p className="text-on-surface-variant font-body-lg">
            {t('analytics:valueMetrics.subtitle')}
          </p>
        </div>
        <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-1">
              {t('analytics:valueMetrics.title')}
            </h2>
            <p className="text-on-surface-variant font-body-lg">
              {t('analytics:valueMetrics.subtitle')}
            </p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
          <RoiSummaryBanner roi={data.roi} />
          {data.kpis.map((kpi, i) => (
            <KpiCard key={i} kpi={kpi} />
          ))}
        </div>

        {/* Performance Chart */}
        <PerformanceChart bars={data.chartBars} xAxisLabels={data.xAxisLabels} />

        {/* Channel Metrics */}
        <ChannelMetricsGrid
          linkedin={data.linkedin}
          youtube={data.youtube}
          telegram={data.telegram}
        />

        {/* Top Content Table */}
        <TopContentTable items={data.topContent} />
      </main>
    </>
  )
}
