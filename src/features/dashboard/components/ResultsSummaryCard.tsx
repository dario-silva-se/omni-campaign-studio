import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { DashboardStatCard } from '@/types'

interface StatTileProps {
  stat: DashboardStatCard
}

function StatTile({ stat }: StatTileProps) {
  return (
    <div className="glass-panel subtle-highlight rounded-xl p-lg flex flex-col relative overflow-hidden group min-h-[120px]">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-1.5 text-outline-variant text-xs font-semibold uppercase tracking-wider">
          <Icon name={stat.icon} className="text-[15px]" />
          {stat.label}
        </div>
        <div className={`flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${stat.trendPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-error bg-error/10'}`}>
          <Icon name={stat.trendPositive ? 'trending_up' : 'trending_down'} className="text-[13px]" />
          {stat.trend}
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div className="font-display-lg text-display-lg text-on-surface leading-none">{stat.value}</div>
        <div className="w-20 h-10 flex items-end">
          <svg
            className="w-full h-full stroke-secondary-fixed stroke-2 fill-none"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            viewBox="0 0 100 30"
          >
            <polyline points={stat.sparklinePoints} />
          </svg>
        </div>
      </div>
    </div>
  )
}

interface ResultsSummaryCardProps {
  stats: DashboardStatCard[]
}

export function ResultsSummaryCard({ stats }: ResultsSummaryCardProps) {
  const { t } = useTranslation('dashboard')
  return (
    <section aria-label={t('resultados.title')}>
      <div className="flex items-center justify-between mb-sm">
        <h3 className="font-title-md text-title-md text-on-surface">{t('resultados.title')}</h3>
        <span className="text-xs text-outline-variant">{t('resultados.subtitle')}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {stats.map((stat) => (
          <StatTile key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  )
}
