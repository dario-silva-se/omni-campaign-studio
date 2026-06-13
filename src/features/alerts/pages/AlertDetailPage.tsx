import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAlert, useUpdateAlert } from '../hooks/useAlerts'
import { Icon } from '@/components/ui/Icon'

const chartBars: { heightPct: number; isHigh?: boolean; label?: string }[] = [
  { heightPct: 30 },
  { heightPct: 32 },
  { heightPct: 35 },
  { heightPct: 34 },
  { heightPct: 38 },
  { heightPct: 65, isHigh: true },
  { heightPct: 85, isHigh: true, label: '+127%' },
  { heightPct: 92, isHigh: true },
  { heightPct: 98, isHigh: true },
]

const severityHistoryColorClass: Record<string, string> = {
  primary: 'bg-outline',
  tertiary: 'bg-tertiary shadow-[0_0_8px_rgba(255,182,145,0.6)]',
  error: 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.6)]',
  outline: 'bg-outline shadow-[0_0_8px_rgba(139,145,160,0.6)]',
}

export default function AlertDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('alerts')
  const { data: alert, isLoading, isError } = useAlert(id)
  const updateAlert = useUpdateAlert()

  if (isLoading)
    return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando...')}</p>
  if (isError || !alert)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  const detail = alert.detail

  const handlePause = () => {
    updateAlert.mutate({ id: alert._id, payload: { acknowledged: true } })
  }

  return (
    <div className="p-lg space-y-lg">
      {/* Alert Header Strip */}
      <div className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl border-l-[6px] border-l-error p-lg flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-md">
            <span className="bg-error/20 text-error px-md py-1 rounded-full text-[10px] tracking-widest uppercase font-black">
              {t('center.severity.critical')}
            </span>
            {detail && (
              <span className="text-on-surface-variant font-mono text-sm">ID: {detail.shortId}</span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-on-surface">
            {detail?.campaignName ?? alert.title}
          </h3>
          <div className="flex items-center gap-sm text-on-surface-variant">
            <Icon name="schedule" className="text-lg" />
            <span>{detail?.detectedAt ?? alert.timeAgo}</span>
          </div>
        </div>
        <div className="flex gap-md">
          <button
            onClick={handlePause}
            className="px-lg py-md bg-error text-on-error font-bold rounded-lg hover:brightness-110 transition-all"
          >
            {t('detail.pauseAdSet')}
          </button>
          <button className="px-lg py-md border border-outline-variant bg-surface-variant/30 text-on-surface font-bold rounded-lg hover:bg-surface-variant transition-all">
            {t('detail.muteAlert')}
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Main Diagnostic */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          {/* Diagnostic Chart */}
          <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-xl h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-xl">
              <div>
                <h4 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('detail.diagnosticChart')}
                </h4>
                <p className="text-2xl font-bold text-on-surface">{t('detail.cpmDeviationAnalysis')}</p>
              </div>
              {detail && (
                <div className="flex gap-md font-mono text-sm">
                  <div className="flex items-center gap-sm">
                    <span className="w-3 h-3 rounded-full bg-error" />
                    <span>
                      {t('detail.live')}: {detail.chartLiveValue}
                    </span>
                  </div>
                  <div className="flex items-center gap-sm text-on-surface-variant">
                    <span className="w-3 h-3 rounded-full bg-outline" />
                    <span>
                      {t('detail.baseline')}: {detail.chartBaselineValue}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 flex items-end justify-between gap-1 px-md">
                <div className="absolute bottom-[35%] left-0 right-0 h-px border-t border-dashed border-outline-variant z-0" />
                <div className="w-full h-full flex items-end gap-sm z-10">
                  {chartBars.map((bar, i) => (
                    <div key={i} className="flex-1 relative">
                      {bar.label && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-error text-on-error px-sm py-1 rounded text-[10px] font-bold whitespace-nowrap">
                          {bar.label}
                        </div>
                      )}
                      <div
                        className={`w-full rounded-t-sm ${bar.isHigh ? 'bg-error/60 border-t-2 border-error' : 'bg-surface-variant opacity-50'}`}
                        style={{ height: `${bar.heightPct}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI Insight & Impact Breakdown */}
          <div className="grid grid-cols-2 gap-lg">
            {/* AI Insight */}
            <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-lg border-l-2 border-l-primary">
              <div className="flex items-center gap-md mb-md">
                <Icon name="science" className="text-primary" />
                <h4 className="text-label-caps uppercase tracking-widest text-primary text-xs font-bold">
                  {t('detail.aiIntelligence')}
                </h4>
              </div>
              <p className="text-on-surface mb-md leading-relaxed text-sm">
                {detail?.aiInsight ?? '—'}
              </p>
              {detail?.aiRecommendation && (
                <div className="p-md bg-surface-container rounded border border-white/5 space-y-sm">
                  <p className="text-label-caps text-on-surface-variant uppercase font-bold text-xs">
                    {t('detail.recommendation')}
                  </p>
                  <p className="text-sm">{detail.aiRecommendation}</p>
                </div>
              )}
            </section>

            {/* Impact Analysis */}
            <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-lg border-l-2 border-l-tertiary">
              <div className="flex items-center gap-md mb-md">
                <Icon name="trending_down" className="text-tertiary" />
                <h4 className="text-label-caps uppercase tracking-widest text-tertiary text-xs font-bold">
                  {t('detail.impactAnalysis')}
                </h4>
              </div>
              <div className="space-y-md">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-sm">{t('detail.estimatedDailyLoss')}</span>
                  <span className="font-mono text-error">{detail?.estimatedDailyLoss ?? '—'}</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full w-[78%]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-sm">{t('detail.reachEfficiency')}</span>
                  <span className="font-mono text-error">{detail?.reachEfficiencyChange ?? '—'}</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[58%]" />
                </div>
              </div>
            </section>
          </div>

          {/* Executive Actions */}
          <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-lg">
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-on-surface">{t('detail.executiveActions')}</h4>
                <p className="text-on-surface-variant text-sm">{t('detail.actionsLoggedNote')}</p>
              </div>
              <div className="flex flex-wrap gap-md justify-end">
                <button
                  onClick={handlePause}
                  className="flex items-center gap-sm px-xl py-md bg-error text-on-error rounded-xl font-bold hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-error/10"
                >
                  <Icon name="pause_circle" />
                  {t('detail.pauseAdSet')}
                </button>
                <button className="flex items-center gap-sm px-lg py-md border border-secondary text-secondary rounded-xl font-bold hover:bg-secondary/10 transition-all">
                  <Icon name="sync_alt" />
                  {t('detail.reallocateToLinkedIn')}
                </button>
                <button className="flex items-center gap-sm px-lg py-md border border-outline-variant text-on-surface-variant rounded-xl font-bold hover:bg-surface-variant transition-all">
                  {t('detail.dismissAndIgnore')}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          {/* Historical Context */}
          <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-lg flex flex-col h-full">
            <h4 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold mb-lg">
              {t('detail.historicalContext')}
            </h4>
            <div className="space-y-lg flex-1">
              {(detail?.historicalContext ?? []).map((item, i) => (
                <div key={i} className="relative pl-lg border-l border-outline-variant pb-lg last:pb-0 last:border-l-0">
                  <div
                    className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${severityHistoryColorClass[item.color] ?? 'bg-outline'}`}
                  />
                  <p className="text-[10px] font-mono text-on-surface-variant mb-1">{item.timestamp}</p>
                  <h5 className="font-bold text-on-surface mb-1">{item.event}</h5>
                </div>
              ))}
            </div>

            {/* Network Health Snapshot placeholder */}
            <div className="mt-xl rounded-lg overflow-hidden border border-white/5 h-32 relative bg-surface-container-high flex items-center justify-center">
              <Icon name="monitoring" className="text-6xl text-primary/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-md">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Network Health Snapshot</p>
              </div>
            </div>
          </section>

          {/* Event Stream */}
          <section className="bg-surface-container/70 backdrop-blur-xl border border-white/10 rounded-xl p-lg">
            <h4 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold mb-md">
              {t('detail.eventStream')}
            </h4>
            <div className="space-y-md font-mono text-xs">
              {(detail?.eventStream ?? []).map((ev, i) => (
                <div key={i} className={`flex gap-md ${ev.isError ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                  <span className={ev.isError ? 'opacity-60' : 'text-primary opacity-60'}>{ev.time}</span>
                  <span>{ev.message}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
