import { Icon } from '@/components/ui/Icon'
import type { AnalyticsKpi } from '@/types'

interface Props {
  kpi: AnalyticsKpi
}

export function KpiCard({ kpi }: Props) {
  return (
    <div className="glass-panel subtle-highlight p-lg rounded-xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-md">
        <div className={`p-2 bg-${kpi.colorClass}/10 rounded-lg`}>
          <Icon name={kpi.icon} className={`text-${kpi.colorClass}`} />
        </div>
        <span
          className={`${kpi.trendPositive ? 'text-green-400' : 'text-red-400'} text-xs font-bold flex items-center`}
        >
          {kpi.trendValue}{' '}
          <Icon
            name={kpi.trendPositive ? 'trending_up' : 'trending_down'}
            className="text-[14px]"
          />
        </span>
      </div>
      <p className="text-on-surface-variant font-label-caps text-label-caps uppercase mb-1">
        {kpi.label}
      </p>
      <h3 className="text-headline-lg font-bold">{kpi.value}</h3>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-${kpi.colorClass}/20`}>
        <div
          className={`h-full bg-${kpi.colorClass} transition-all duration-1000`}
          style={{ width: `${kpi.barWidthPct}%` }}
        />
      </div>
    </div>
  )
}
