import { useTranslation } from 'react-i18next'
import type { AnalyticsChartBar } from '@/types'

interface Props {
  bars: AnalyticsChartBar[]
  xAxisLabels: string[]
}

export function PerformanceChart({ bars, xAxisLabels }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel subtle-highlight p-xl rounded-xl mb-xl">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h4 className="font-title-md text-title-md text-on-surface">
            {t('valueMetrics.performance.title')}
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            {t('valueMetrics.performance.subtitle')}
          </p>
        </div>
        <div className="flex gap-md">
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant">
              {t('valueMetrics.performance.legendReach')}
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-on-surface-variant">
              {t('valueMetrics.performance.legendEngagement')}
            </span>
          </div>
        </div>
      </div>
      <div
        role="img"
        aria-label={t('valueMetrics.performance.chartAriaLabel')}
        className="relative h-64 w-full border-b border-outline-variant flex items-end px-4 gap-2"
        style={{
          background: 'linear-gradient(180deg, rgba(173,198,255,0.1) 0%, rgba(173,198,255,0) 100%)',
        }}
      >
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`flex-1 ${bar.heightClass} bg-primary/40 rounded-t border-t border-x border-primary/60 relative`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-sm dark:shadow-[0_0_10px_#adc6ff]" />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-md px-4 text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
        {xAxisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
