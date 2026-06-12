import { useTranslation } from 'react-i18next'
import type { AnalyticsTopContent, Channel } from '@/types'

interface Props {
  items: AnalyticsTopContent[]
}

const CHANNEL_STYLES: Record<Channel, { bg: string; text: string; label: string }> = {
  linkedin: { bg: 'bg-blue-600/10', text: 'text-blue-400', label: 'LinkedIn' },
  youtube: { bg: 'bg-red-600/10', text: 'text-red-400', label: 'YouTube' },
  telegram: { bg: 'bg-blue-400/10', text: 'text-blue-300', label: 'Telegram' },
}

export function TopContentTable({ items }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="glass-panel subtle-highlight rounded-xl overflow-hidden">
      <div className="p-xl border-b border-outline-variant flex justify-between items-center">
        <h4 className="font-title-md text-title-md">{t('valueMetrics.topContent.title')}</h4>
        <button
          type="button"
          className="text-primary text-body-sm font-bold hover:underline"
        >
          {t('valueMetrics.topContent.viewAll')}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-highest/50">
            <tr>
              <th className="px-xl py-md font-label-caps text-label-caps text-on-surface-variant uppercase">
                {t('valueMetrics.topContent.columns.post')}
              </th>
              <th className="px-xl py-md font-label-caps text-label-caps text-on-surface-variant uppercase">
                {t('valueMetrics.topContent.columns.channel')}
              </th>
              <th className="px-xl py-md font-label-caps text-label-caps text-on-surface-variant uppercase">
                {t('valueMetrics.topContent.columns.reach')}
              </th>
              <th className="px-xl py-md font-label-caps text-label-caps text-on-surface-variant uppercase">
                {t('valueMetrics.topContent.columns.clicks')}
              </th>
              <th className="px-xl py-md font-label-caps text-label-caps text-on-surface-variant uppercase">
                {t('valueMetrics.topContent.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {items.map((item) => {
              const ch = CHANNEL_STYLES[item.channel]
              return (
                <tr key={item._id} className="table-row-zebra hover:bg-white/5 transition-colors">
                  <td className="px-xl py-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-12 h-12 rounded bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                          {item.channel === 'youtube' ? 'play_circle' : item.channel === 'linkedin' ? 'work' : 'send'}
                        </span>
                      </div>
                      <p className="text-body-sm font-bold line-clamp-1">{item.title}</p>
                    </div>
                  </td>
                  <td className="px-xl py-lg">
                    <span className={`${ch.bg} ${ch.text} text-[10px] font-bold px-2 py-1 rounded uppercase`}>
                      {ch.label}
                    </span>
                  </td>
                  <td className="px-xl py-lg font-body-sm">{item.reach.toLocaleString('pt-BR')}</td>
                  <td className="px-xl py-lg font-body-sm">{item.clicks.toLocaleString('pt-BR')}</td>
                  <td className="px-xl py-lg">
                    {item.status === 'active' ? (
                      <span className="flex items-center gap-2 text-green-400 text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        {t('valueMetrics.topContent.statusActive')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-on-surface-variant opacity-60 text-xs">
                        <span className="w-2 h-2 rounded-full bg-on-surface-variant" />
                        {t('valueMetrics.topContent.statusFinished')}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
