import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAutomationMonitor, useAutomationList, useUpdateAutomation } from '../hooks/useAutomations'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import type { AutomationTrigger } from '@/types'

function severityBadgeClass(severity: 'critical' | 'warning' | 'info'): string {
  const map = {
    critical: 'bg-secondary/10 text-secondary',
    warning: 'bg-secondary/10 text-secondary',
    info: 'bg-primary/10 text-primary',
  }
  return map[severity]
}

const chartBarsManual = [
  { h: 96 }, { h: 128 }, { h: 112 }, { h: 160 }, { h: 144 }, { h: 176 }, { h: 168 },
]

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export default function AutomationMonitorPage() {
  const { t } = useTranslation('automations')
  const navigate = useNavigate()
  const { data: monitorStats, isLoading: statsLoading, isError: statsError } = useAutomationMonitor()
  const { data: triggers, isLoading: triggersLoading } = useAutomationList()
  const updateAutomation = useUpdateAutomation()

  if (statsLoading || triggersLoading)
    return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando...')}</p>
  if (statsError || !monitorStats)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  const triggerList = triggers ?? []

  const handleToggle = (trigger: AutomationTrigger) => {
    updateAutomation.mutate({ id: trigger._id, payload: { enabled: !trigger.enabled } })
  }

  return (
    <div className="p-lg space-y-xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-xs text-primary font-bold text-xs mb-xs">
          <Icon name="bolt" className="text-sm" />
          <span>{t('monitor.realtimeOperations')}</span>
        </div>
        <h2 className="text-3xl font-bold text-on-surface">{t('monitor.title')}</h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* Active Rules */}
        <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex flex-col hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-md">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{t('monitor.stats.activeRules')}</span>
            <div className="p-sm bg-primary/10 rounded-lg">
              <Icon name="rule" className="text-primary" />
            </div>
          </div>
          <div className="flex items-baseline gap-xs">
            <span className="text-3xl font-bold">{monitorStats.activeRules}</span>
            <span className="text-primary text-sm font-bold">{monitorStats.activeRulesTrend}</span>
          </div>
          <p className="text-on-surface-variant/60 text-sm mt-xs">{t('monitor.stats.logicBuilderDeployments')}</p>
        </div>

        {/* Actions Triggered */}
        <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex flex-col hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-md">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{t('monitor.stats.actionsTriggered')}</span>
            <div className="p-sm bg-secondary/10 rounded-lg">
              <Icon name="location_on" className="text-secondary" />
            </div>
          </div>
          <div className="flex items-baseline gap-xs">
            <span className="text-3xl font-bold">{monitorStats.actionsTriggered.toLocaleString()}</span>
            <span className="text-secondary text-sm font-bold">{t('monitor.today')}</span>
          </div>
          <p className="text-on-surface-variant/60 text-sm mt-xs">{t('monitor.stats.automatedAdjustments')}</p>
        </div>

        {/* Ad Spend Saved */}
        <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex flex-col border-l-4 border-l-primary">
          <div className="flex justify-between items-start mb-md">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{t('monitor.stats.adSpendSaved')}</span>
            <div className="p-sm bg-primary/10 rounded-lg">
              <Icon name="savings" className="text-primary" />
            </div>
          </div>
          <div className="flex items-baseline gap-xs">
            <span className="text-3xl font-bold">{monitorStats.adSpendSaved}</span>
            <span className="text-primary text-sm font-bold">Est.</span>
          </div>
          <p className="text-on-surface-variant/60 text-sm mt-xs">{t('monitor.stats.simulationSavings')}</p>
        </div>

        {/* Health Status */}
        <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex flex-col hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start mb-md">
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{t('monitor.stats.healthStatus')}</span>
            <div className="p-sm bg-emerald-500/10 rounded-lg">
              <Icon name="verified_user" className="text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center gap-xs">
            <span className="text-3xl font-bold">{monitorStats.healthStatus}</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-on-surface-variant/60 text-sm mt-xs">{t('monitor.stats.systemLatency')}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Execution Feed */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">
          <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex flex-col overflow-hidden" style={{ minHeight: '600px' }}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="text-lg font-bold flex items-center gap-xs">
                <Icon name="dynamic_feed" className="text-primary" />
                {t('monitor.executionFeed.title')}
              </h3>
              <span className="text-xs text-on-surface-variant font-bold bg-surface-container-high px-sm py-1 rounded">
                {t('monitor.executionFeed.liveUpdates')}
              </span>
            </div>

            <div className="space-y-md overflow-y-auto pr-xs flex-1">
              {monitorStats.executionFeed.map((item) => (
                <div
                  key={item._id}
                  className="p-md bg-surface-container rounded-xl border border-overlay-md hover:bg-surface-container-high transition-colors"
                >
                  <div className="flex items-start gap-md">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30`}>
                        <Icon name={item.icon} className={`${item.iconColor} text-xl`} />
                      </div>
                      {item.severity === 'critical' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                          <Icon name="pause" className="text-on-secondary text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-xs">
                        <span className="text-xs text-on-surface-variant font-bold">{item.timeAgo}</span>
                        {item.severity !== 'info' && (
                          <span className={`text-[10px] ${severityBadgeClass(item.severity)} px-sm py-0.5 rounded-full font-bold`}>
                            {item.severity.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold leading-snug">{item.title}</p>
                      <div className="flex items-center gap-xs mt-xs text-[11px] text-on-surface-variant italic">
                        <span>{item.actionLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-lg text-primary text-sm font-bold flex items-center justify-center gap-xs py-sm hover:bg-primary/5 rounded-lg transition-colors">
              {t('monitor.executionFeed.viewHistoricalLog')}
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Performance Chart + Critical Toggles */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-lg">
          {/* Performance Chart */}
          <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl flex-1 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-lg">
              <div>
                <h3 className="text-lg font-bold">{t('monitor.performanceChart.title')}</h3>
                <p className="text-on-surface-variant text-sm">{t('monitor.performanceChart.description')}</p>
              </div>
              <div className="flex gap-md">
                <div className="flex items-center gap-xs">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-bold opacity-60">{t('monitor.performanceChart.roas')}</span>
                </div>
                <div className="flex items-center gap-xs">
                  <div className="w-3 h-3 rounded-full bg-surface-variant" />
                  <span className="text-xs font-bold opacity-60">{t('monitor.performanceChart.baseline')}</span>
                </div>
              </div>
            </div>

            {/* Chart visual */}
            <div className="flex-1 flex items-end gap-md pb-md relative min-h-[200px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <Icon name="analytics" className="text-[200px]" />
              </div>
              <div className="flex-1 h-3/4 flex items-end justify-around px-md border-b border-outline-variant/20">
                {chartBarsManual.map((bar, i) => (
                  <div
                    key={i}
                    className="w-8 bg-surface-variant/40 rounded-t-lg"
                    style={{ height: `${bar.h}px` }}
                  />
                ))}
              </div>
              {/* ROAS trend line */}
              <div className="absolute bottom-[2px] left-0 w-full h-full pointer-events-none px-md">
                <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="impact-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#adc6ff" stopOpacity="1" />
                      <stop offset="100%" stopColor="#adc6ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,350 Q100,340 200,300 T400,240 T600,180 T800,120 T1000,80"
                    fill="none"
                    stroke="#adc6ff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 8px #adc6ff)' }}
                  />
                  <path
                    d="M0,350 Q100,340 200,300 T400,240 T600,180 T800,120 T1000,80 L1000,400 L0,400 Z"
                    fill="url(#impact-gradient)"
                    opacity="0.1"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-md text-center mt-md">
              {weekDays.map((d) => (
                <span key={d} className="text-xs font-bold opacity-40">{d}</span>
              ))}
            </div>
          </div>

          {/* Critical Logic Toggles */}
          <div className="bg-surface-container/40 backdrop-blur-xl border border-overlay-md p-lg rounded-2xl">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="text-lg font-bold">{t('monitor.criticalToggles.title')}</h3>
              <button
                onClick={() => navigate('/automations')}
                className="text-primary text-sm font-bold flex items-center gap-xs"
              >
                <Icon name="edit" className="text-sm" />
                {t('monitor.criticalToggles.manageInBuilder')}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {triggerList.map((trigger) => (
                <div
                  key={trigger._id}
                  className="flex items-center justify-between p-md bg-surface-container rounded-xl border border-overlay-md"
                >
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                      <Icon name={trigger.metric === 'cpm' ? 'trending_up' : trigger.metric === 'cpl' ? 'monitoring' : trigger.metric === 'roas' ? 'account_balance_wallet' : 'dark_mode'} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{trigger.name}</h4>
                      <p className="text-[11px] text-on-surface-variant">{trigger.description}</p>
                    </div>
                  </div>
                  <Toggle
                    label={trigger.name}
                    checked={trigger.enabled}
                    onChange={() => handleToggle(trigger)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
