import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { CampaignHealthChannelRow } from '@/types'

interface Props {
  rows: CampaignHealthChannelRow[]
}

const STATUS_STYLES = {
  optimal: 'bg-primary/15 text-primary border-primary/20',
  scaling: 'bg-secondary-container/15 text-secondary-container border-secondary-container/20',
  fatigue: 'bg-error/15 text-error border-error/20',
} as const

export function ChannelDiagnosticsTable({ rows }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel rounded-xl col-span-1 md:col-span-8 overflow-hidden">
      <div className="p-lg border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/50">
        <h3 className="font-title-md text-title-md text-on-surface">
          {t('campaignHealth.channelDiagnostics.title')}
        </h3>
        <button type="button" className="text-primary font-body-sm text-body-sm hover:underline">
          {t('campaignHealth.channelDiagnostics.viewAll')}
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container/50 border-b border-outline-variant/10">
              <th className="font-label-caps text-label-caps text-on-surface-variant p-sm pl-lg uppercase tracking-wider w-1/4">
                {t('campaignHealth.channelDiagnostics.columns.channel')}
              </th>
              <th className="font-label-caps text-label-caps text-on-surface-variant p-sm uppercase tracking-wider">
                {t('campaignHealth.channelDiagnostics.columns.spend')}
              </th>
              <th className="font-label-caps text-label-caps text-on-surface-variant p-sm uppercase tracking-wider">
                {t('campaignHealth.channelDiagnostics.columns.cpaSql')}
              </th>
              <th className="font-label-caps text-label-caps text-on-surface-variant p-sm uppercase tracking-wider">
                {t('campaignHealth.channelDiagnostics.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm">
            {rows.map((row, i) => (
              <tr
                key={row._id}
                className={`border-b border-outline-variant/5 hover:bg-surface-variant/10 transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}
              >
                <td className="p-sm pl-lg py-md">
                  <div className="flex items-center gap-sm">
                    <div className={`w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center`}>
                      <Icon name={row.icon} className={`text-[18px] ${row.iconColorClass}`} />
                    </div>
                    <span className="text-on-surface font-semibold">{row.name}</span>
                  </div>
                </td>
                <td className="p-sm text-on-surface">{row.spend}</td>
                <td className="p-sm text-on-surface">
                  {row.cpaSql}{' '}
                  <span className={`text-[10px] ml-1 ${row.cpaChangePositive ? 'text-primary' : 'text-error'}`}>
                    {row.cpaChange}
                  </span>
                </td>
                <td className="p-sm">
                  <span
                    className={`inline-flex items-center gap-xs px-2 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${STATUS_STYLES[row.status]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {t(`campaignHealth.channelDiagnostics.status${row.status.charAt(0).toUpperCase() + row.status.slice(1)}` as `campaignHealth.channelDiagnostics.status${'Optimal' | 'Scaling' | 'Fatigue'}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
