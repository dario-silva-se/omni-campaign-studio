import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { DashboardStatCard } from '@/types'

interface StatTileProps {
  stat: DashboardStatCard
}

function StatTile({ stat }: StatTileProps) {
  return (
    <div className="glass-panel subtle-highlight rounded-xl p-md flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center text-outline-variant text-xs font-semibold">
          <Icon name={stat.icon} className="text-[16px] mr-1" />
          {stat.label}
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div className="font-display-lg text-display-lg text-on-surface">{stat.value}</div>
        <div className={`text-[10px] font-bold flex items-center mt-1 ${stat.trendPositive ? 'text-secondary-fixed' : 'text-error'}`}>
          <Icon name="trending_up" className="text-[12px] mr-0.5" />
          {stat.trend}
        </div>
        <div className="w-16 h-8 flex items-end">
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
