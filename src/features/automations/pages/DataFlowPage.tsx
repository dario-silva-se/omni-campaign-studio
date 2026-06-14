import { useTranslation } from 'react-i18next'
import { useDataFlow } from '../hooks/useAutomations'
import { Icon } from '@/components/ui/Icon'
import type { DataFlowTrafficRow } from '@/types'

function statusBadgeClass(status: DataFlowTrafficRow['status']): string {
  const map: Record<DataFlowTrafficRow['status'], string> = {
    success: 'bg-primary/10 text-primary border-primary/20',
    delayed: 'bg-secondary/10 text-secondary border-secondary/20',
    error: 'bg-error/10 text-error border-error/20',
  }
  return map[status]
}

function statusLabel(status: DataFlowTrafficRow['status'], t: (key: string) => string): string {
  if (status === 'success') return t('dataFlow.statusSuccess')
  if (status === 'delayed') return t('dataFlow.statusDelayed')
  return t('dataFlow.channelStatus.error')
}

const throughputBars = [40, 60, 50, 90, 70, 100]

export default function DataFlowPage() {
  const { t } = useTranslation('automations')
  const { data: dataFlow, isLoading, isError } = useDataFlow()

  if (isLoading)
    return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando...')}</p>
  if (isError || !dataFlow)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  return (
    <div className="p-md md:p-lg relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Section Header */}
      <div className="mb-lg flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">{t('dataFlow.title')}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{t('dataFlow.description')}</p>
        </div>
        <div className="hidden sm:flex items-center gap-xs text-primary text-xs font-bold bg-primary/10 px-md py-1 rounded-full border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t('dataFlow.systemOnline')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Data Pulse Architecture (8 cols) */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl flex flex-col overflow-hidden relative">
          <div className="p-md border-b border-outline-variant/10 flex justify-between items-center bg-surface-container/50">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-sm">
              <Icon name="hub" className="text-tertiary" />
              {t('dataFlow.dataPulseArchitecture')}
            </h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="fullscreen" />
            </button>
          </div>
          {/* Architecture placeholder */}
          <div className="flex-1 min-h-[300px] lg:min-h-[400px] relative bg-black/40 flex items-center justify-center p-md">
            <div className="w-full h-full rounded-lg overflow-hidden border border-primary/20 relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
              {/* Architecture diagram placeholder */}
              <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                <div className="flex flex-col items-center gap-lg opacity-60">
                  <div className="flex items-center gap-xl">
                    {(['linkedin', 'youtube', 'telegram'] as const).map((ch) => (
                      <div key={ch} className="flex flex-col items-center gap-sm">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Icon
                            name={ch === 'linkedin' ? 'work' : ch === 'youtube' ? 'play_circle' : 'send'}
                            className="text-primary text-3xl"
                          />
                        </div>
                        <div className="w-px h-8 bg-primary/30" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-xl">
                    <div className="w-px h-8 bg-primary/30 mx-auto" />
                  </div>
                  <div className="w-32 h-16 rounded-xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center">
                    <Icon name="storage" className="text-tertiary text-3xl" />
                    <span className="text-xs font-bold text-tertiary ml-sm">{t('dataFlow.atlasLabel')}</span>
                  </div>
                </div>
              </div>
              {/* Atlas Cluster badge */}
              <div className="absolute top-md right-md z-20 bg-surface/80 backdrop-blur-md px-md py-1 rounded border border-outline-variant/30 flex items-center gap-sm">
                <Icon name="data_usage" className="text-secondary text-sm" />
                <span className="text-xs font-bold">{t('dataFlow.atlasClusterHealthy')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Health Metrics (4 cols) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-lg">
          {/* Global Latency */}
          <div className="bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-all" />
            <div className="flex justify-between items-start mb-xl relative z-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  {t('dataFlow.metrics.globalLatency')}
                </p>
                <h4 className="text-5xl font-bold text-primary">
                  {dataFlow.globalLatencyMs}
                  <span className="text-3xl text-on-surface-variant/50 ml-1">ms</span>
                </h4>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                <Icon name="speed" className="text-primary" />
              </div>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden relative z-10">
              <div className="bg-primary h-full w-[15%] rounded-full shadow-[0_0_10px_rgba(173,198,255,0.8)]" />
            </div>
            <p className="text-sm text-primary/80 mt-sm flex items-center gap-1 z-10">
              <Icon name="arrow_downward" className="text-sm" />
              {t('dataFlow.latencyDelta')}
            </p>
          </div>

          {/* Throughput */}
          <div className="bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl p-lg flex flex-col justify-between relative overflow-hidden group hover:border-tertiary/30 transition-colors">
            <div className="flex justify-between items-start mb-xl relative z-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  {t('dataFlow.metrics.throughput')}
                </p>
                <h4 className="text-5xl font-bold text-tertiary">
                  {dataFlow.throughputK}
                  <span className="text-3xl text-on-surface-variant/50 ml-1">k</span>
                </h4>
                <p className="text-sm text-on-surface-variant">{t('dataFlow.metrics.eventsPerSec')}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                <Icon name="swap_calls" className="text-tertiary" />
              </div>
            </div>
            {/* Sparkline */}
            <div className="flex items-end gap-1 h-8 mt-auto z-10">
              {throughputBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: i === throughputBars.length - 1
                      ? 'rgb(192,193,255)'
                      : `rgba(192,193,255,${0.4 + (i / throughputBars.length) * 0.4})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Traffic Table (8 cols) */}
        <div className="col-span-1 lg:col-span-8 bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl flex flex-col overflow-hidden">
          <div className="p-md border-b border-outline-variant/10 flex justify-between items-center bg-surface-container/50">
            <h3 className="text-lg font-bold flex items-center gap-sm">
              <Icon name="list_alt" className="text-on-surface-variant" />
              {t('dataFlow.liveTraffic.title')}
            </h3>
            <div className="flex gap-sm">
              <button className="px-md py-xs text-sm bg-surface-container rounded border border-outline-variant/20 hover:border-primary/50 transition-colors">
                {t('dataFlow.liveTraffic.filter')}
              </button>
              <button className="px-md py-xs text-sm bg-surface-container rounded border border-outline-variant/20 hover:border-primary/50 transition-colors">
                {t('dataFlow.liveTraffic.export')}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container/30">
                  <th className="py-md px-md text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {t('dataFlow.liveTraffic.timestamp')}
                  </th>
                  <th className="py-md px-md text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {t('dataFlow.liveTraffic.eventType')}
                  </th>
                  <th className="py-md px-md text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {t('dataFlow.liveTraffic.sourceDestination')}
                  </th>
                  <th className="py-md px-md text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                    {t('dataFlow.liveTraffic.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {dataFlow.trafficRows.map((row, i) => (
                  <tr
                    key={row._id}
                    className={`border-b border-outline-variant/5 hover:bg-surface-container-high/30 transition-colors ${i % 2 === 1 ? 'bg-surface-container/10' : ''}`}
                  >
                    <td className="py-md px-md text-on-surface-variant font-mono text-[13px]">
                      {row.timestamp}
                    </td>
                    <td className="py-md px-md text-on-surface font-medium">{row.eventType}</td>
                    <td className="py-md px-md text-on-surface-variant">
                      <div className="flex items-center gap-sm">
                        <span className={`w-2 h-2 rounded-full ${row.sourceColor}`} />
                        {row.source}
                        <span className="text-outline-variant">→</span>
                        {row.dest}
                      </div>
                    </td>
                    <td className="py-md px-md text-right">
                      <span className={`inline-flex items-center px-sm py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(row.status)}`}>
                        {statusLabel(row.status, t)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Channel Status (4 cols) */}
        <div className="col-span-1 lg:col-span-4 bg-surface-container/40 backdrop-blur-xl border border-white/5 rounded-xl flex flex-col overflow-hidden">
          <div className="p-md border-b border-outline-variant/10 bg-surface-container/50">
            <h3 className="text-lg font-bold flex items-center gap-sm">
              <Icon name="sensors" className="text-secondary" />
              {t('dataFlow.channelStatus.title')}
            </h3>
          </div>
          <div className="p-md flex flex-col gap-sm flex-1 justify-center">
            {dataFlow.channelStatuses.map((ch) => (
              <div
                key={ch.channel}
                className={`flex items-center justify-between p-sm rounded-lg bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors`}
              >
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    <Icon
                      name={ch.channel === 'linkedin' ? 'work' : ch.channel === 'youtube' ? 'play_circle' : 'send'}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-on-surface">{ch.label}</p>
                    <p className="text-sm text-on-surface-variant">{ch.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-sm">
                  <span className={`text-xs font-bold ${ch.status === 'syncing' ? 'text-tertiary' : 'text-primary'}`}>
                    {ch.status === 'stable'
                      ? t('dataFlow.channelStatus.stable')
                      : ch.status === 'syncing'
                        ? t('dataFlow.channelStatus.syncing')
                        : t('dataFlow.channelStatus.error')}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${ch.status === 'syncing' ? 'bg-tertiary animate-pulse' : 'bg-primary'}`}
                    style={ch.status === 'stable' ? { boxShadow: '0 0 8px rgba(173,198,255,0.6)' } : undefined}
                  />
                </div>
              </div>
            ))}
            <div className="mt-md flex justify-between items-center text-sm text-on-surface-variant/60">
              <span>{t('dataFlow.channelStatus.successRate')}</span>
              <span className="text-primary font-medium">{dataFlow.successRatePct}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
