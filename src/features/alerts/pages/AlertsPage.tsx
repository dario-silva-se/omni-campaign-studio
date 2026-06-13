import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAlertList, useUpdateAlert } from '../hooks/useAlerts'
import { Icon } from '@/components/ui/Icon'
import type { Alert, AlertSeverity } from '@/types'

function severityBorderClass(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    critical: 'border-l-error',
    warning: 'border-l-tertiary',
    info: 'border-l-primary/40',
  }
  return map[severity]
}

function severityIconBgClass(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    critical: 'bg-error/20',
    warning: 'bg-tertiary/20',
    info: 'bg-primary/20',
  }
  return map[severity]
}

function severityIconColorClass(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    critical: 'text-error',
    warning: 'text-tertiary',
    info: 'text-primary',
  }
  return map[severity]
}

function severityBadgeClass(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    critical: 'bg-error/10 text-error',
    warning: 'bg-tertiary/10 text-tertiary',
    info: 'bg-primary/10 text-primary',
  }
  return map[severity]
}

function severityIcon(severity: AlertSeverity): string {
  const map: Record<AlertSeverity, string> = {
    critical: 'token',
    warning: 'monitoring',
    info: 'smart_toy',
  }
  return map[severity]
}

function channelIcon(channel: Alert['channel']): string {
  const map: Record<Alert['channel'], string> = {
    linkedin: 'link',
    youtube: 'video_library',
    telegram: 'send',
  }
  return map[channel]
}

const uptimeBars: { pct: number; isError?: boolean }[] = [
  { pct: 70 },
  { pct: 85 },
  { pct: 60 },
  { pct: 90 },
  { pct: 40 },
  { pct: 20, isError: true },
  { pct: 95 },
  { pct: 100 },
  { pct: 80 },
  { pct: 90 },
]

const alertHistoryItems = [
  { label: 'Auto-scaling group active', time: 'Hoje, 08:42', color: 'bg-primary' },
  { label: 'Cache latency threshold hit', time: 'Hoje, 04:15', color: 'bg-tertiary' },
  { label: 'Database failover complete', time: 'Ontem, 23:20', color: 'bg-error' },
  { label: 'Cloudflare SSL renewed', time: 'Ontem, 10:05', color: 'bg-primary' },
  { label: 'Monthly report generated', time: 'Out 26, 09:00', color: 'bg-primary' },
]

export default function AlertsPage() {
  const { t } = useTranslation('alerts')
  const navigate = useNavigate()
  const { data: alerts, isLoading, isError } = useAlertList()
  const updateAlert = useUpdateAlert()

  if (isLoading) return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando...')}</p>
  if (isError)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  const list = alerts ?? []

  const criticalCount = list.filter((a) => a.severity === 'critical').length
  const activeCount = list.filter((a) => !a.acknowledged).length

  const handleAction = (alert: Alert, action: string) => {
    if (action === 'dismiss') {
      updateAlert.mutate({ id: alert._id, payload: { acknowledged: true } })
    } else {
      navigate(`/alerts/${alert._id}`)
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-lg">
        {/* Header */}
        <section className="mb-lg">
          <h2 className="text-3xl font-bold text-on-surface">{t('center.subtitle')}</h2>
          <p className="text-on-surface-variant mt-1">{t('center.description')}</p>
        </section>

        <div className="flex gap-lg">
          {/* Main Feed */}
          <div className="flex-1 flex flex-col gap-lg">
            {/* Top Stats Row */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Active Alerts */}
              <div className="bg-surface-container border border-white/10 p-lg rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
                <p className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('center.stats.activeAlerts')}
                </p>
                <div className="flex items-baseline gap-md">
                  <span className="text-5xl font-black text-error">{activeCount}</span>
                  <span className="text-on-surface-variant font-mono text-sm">{t('center.stats.activeSince1h')}</span>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Icon name="warning" className="text-[80px]" />
                </div>
              </div>

              {/* Mean Time to Resolution */}
              <div className="bg-surface-container border border-white/10 p-lg rounded-xl flex flex-col justify-between h-32">
                <p className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('center.stats.meanTimeToResolution')}
                </p>
                <div className="flex items-baseline gap-sm">
                  <span className="text-5xl font-black text-primary">7m</span>
                  <span className="text-on-surface-variant font-mono text-sm">{t('center.stats.target')}</span>
                </div>
              </div>

              {/* System Health Index */}
              <div className="bg-surface-container border border-white/10 p-lg rounded-xl flex flex-col justify-between h-32">
                <p className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('center.stats.systemHealthIndex')}
                </p>
                <div className="flex items-baseline gap-md">
                  <span className="text-5xl font-black text-tertiary">98%</span>
                  <span className="text-on-surface-variant font-mono text-sm">{t('center.stats.stable')}</span>
                </div>
              </div>
            </section>

            {/* Priority Queue */}
            <section className="flex flex-col gap-md">
              <h3 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold mb-sm">
                {t('center.priorityQueue')}
              </h3>

              {list.map((alert) => (
                <div
                  key={alert._id}
                  className={`bg-surface-container/60 backdrop-blur-lg border border-white/8 border-t border-white/15 rounded-xl overflow-hidden border-l-4 ${severityBorderClass(alert.severity)} ${alert.severity === 'critical' ? 'shadow-[0_0_0_0px_rgba(255,180,171,0.4)]' : ''}`}
                >
                  <div className="p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
                    <div className="flex gap-lg">
                      <div className={`${severityIconBgClass(alert.severity)} p-md rounded-full flex items-center justify-center`}>
                        <Icon
                          name={severityIcon(alert.severity)}
                          className={`${severityIconColorClass(alert.severity)} text-3xl`}
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-on-surface">{alert.title}</h4>
                        <p className="text-on-surface-variant mt-1">{alert.description}</p>
                        <div className="mt-sm flex items-center gap-md">
                          <span
                            className={`font-mono text-xs ${severityBadgeClass(alert.severity)} px-sm py-0.5 rounded uppercase tracking-wider font-bold`}
                          >
                            {t(`center.severity.${alert.severity}`)}
                          </span>
                          <span className="text-on-surface-variant text-xs flex items-center gap-1">
                            <Icon name="schedule" className="text-sm" />
                            {alert.timeAgo ?? '—'}
                          </span>
                          {alert.channel && (
                            <Icon name={channelIcon(alert.channel)} className="text-on-surface-variant text-sm" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    {!alert.acknowledged && (
                      <div className="flex gap-md w-full md:w-auto flex-wrap">
                        {alert.actions.map((act) => (
                          <button
                            key={act.action}
                            onClick={() => handleAction(alert, act.action)}
                            className={
                              act.action === 'reauthorize'
                                ? 'flex-1 md:flex-none bg-on-surface text-surface py-2.5 px-lg rounded-full font-bold hover:scale-105 transition-transform active:scale-95'
                                : act.action === 'dismiss'
                                  ? 'flex-1 md:flex-none text-on-surface-variant hover:text-on-surface font-semibold py-2.5 px-lg transition-colors'
                                  : 'flex-1 md:flex-none border border-on-surface/20 text-on-surface py-2.5 px-lg rounded-full font-semibold hover:bg-surface-variant transition-colors'
                            }
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {criticalCount === 0 && list.length === 0 && (
                <p className="text-on-surface-variant text-center py-xl">Nenhum alerta ativo.</p>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex flex-col gap-lg w-80">
            {/* System Uptime */}
            <div className="bg-surface-container/60 backdrop-blur-lg border border-white/8 rounded-xl p-lg">
              <div className="flex justify-between items-center mb-lg">
                <h4 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('center.sidebar.systemUptime')}
                </h4>
                <span className="text-primary font-mono text-xs">99.98%</span>
              </div>
              <div className="flex items-end gap-1 h-24">
                {uptimeBars.map((bar, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm ${bar.isError ? 'bg-error/40 hover:bg-error' : 'bg-primary/40 hover:bg-primary'} transition-all`}
                    style={{ height: `${bar.pct}%` }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant mt-md text-center tracking-widest uppercase">
                {t('center.sidebar.continuityPulse')}
              </p>
            </div>

            {/* Alert History */}
            <div className="bg-surface-container/60 backdrop-blur-lg border border-white/8 rounded-xl flex flex-col overflow-hidden flex-1">
              <div className="p-lg border-b border-white/5">
                <h4 className="text-label-caps uppercase tracking-widest text-on-surface-variant text-xs font-semibold">
                  {t('center.sidebar.alertHistory')}
                </h4>
              </div>
              <div className="flex-1 overflow-y-auto p-md space-y-md">
                {alertHistoryItems.map((item, i) => (
                  <div key={i} className="flex gap-md">
                    <div className={`w-1.5 h-1.5 ${item.color} rounded-full mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{item.label}</p>
                      <p className="text-xs text-on-surface-variant font-mono">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full p-md text-xs font-bold text-primary hover:bg-white/5 transition-colors border-t border-white/5 uppercase tracking-widest">
                {t('center.sidebar.viewSystemLogs')}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-error/5 blur-[150px] rounded-full" />
      </div>
    </div>
  )
}
