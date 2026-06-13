import { useTranslation } from 'react-i18next'
import { useAutomationList, useUpdateAutomation } from '../hooks/useAutomations'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { automationSimulationLabFixture } from '@/mocks/fixtures/automations'
import type { AutomationTrigger } from '@/types'

function triggerIcon(trigger: AutomationTrigger): string {
  const icons: Record<AutomationTrigger['metric'], string> = {
    cpm: 'trending_up',
    cpl: 'monitoring',
    roas: 'account_balance_wallet',
    ctr: 'ads_click',
  }
  return icons[trigger.metric]
}

function formatThreshold(trigger: AutomationTrigger): string {
  if (trigger.metric === 'ctr') return `${trigger.operator === 'lt' ? '<' : '>'} ${trigger.threshold}%`
  if (trigger.metric === 'roas') return `${trigger.operator === 'lt' ? '<' : '>'} ${trigger.threshold}x`
  return `${trigger.operator === 'lt' ? '<' : '>'} $${trigger.threshold.toFixed(2)}`
}

const circleRadius = 50
const circleCircumference = 2 * Math.PI * circleRadius // ≈ 314

export default function LogicBuilderPage() {
  const { t } = useTranslation('automations')
  const { data: triggers, isLoading, isError } = useAutomationList()
  const updateAutomation = useUpdateAutomation()

  if (isLoading)
    return <p className="p-lg text-on-surface-variant">{t('common:loading', 'Carregando...')}</p>
  if (isError)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState', 'Ocorreu um erro ao carregar os dados.')}
      </p>
    )

  const list = triggers ?? []
  const sim = automationSimulationLabFixture

  const handleToggle = (trigger: AutomationTrigger) => {
    updateAutomation.mutate({ id: trigger._id, payload: { enabled: !trigger.enabled } })
  }

  const confidenceDashoffset =
    circleCircumference - (sim.confidencePct / 100) * circleCircumference

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-lg py-md border-b border-outline-variant/10 bg-surface/80 backdrop-blur-2xl flex justify-between items-center">
        <div className="flex flex-col">
          <nav className="flex items-center gap-xs text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1">
            <span>{t('builder.breadcrumb.campaigns')}</span>
            <Icon name="chevron_right" className="text-xs" />
            <span>{t('builder.breadcrumb.automations')}</span>
            <Icon name="chevron_right" className="text-xs" />
            <span className="text-primary">{t('builder.breadcrumb.newLogic')}</span>
          </nav>
          <h2 className="text-lg font-bold text-on-surface">{t('builder.title')}</h2>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm bg-surface-container px-md py-xs rounded-full border border-outline-variant/20">
            <Icon name="bolt" className="text-primary text-lg" />
            <span className="text-xs font-medium">{t('builder.realtimeSimulation')}</span>
          </div>
          <button className="px-md py-xs bg-primary text-on-primary-container rounded-full font-bold text-sm active:scale-95 transition-transform">
            {t('builder.publish')}
          </button>
        </div>
      </header>

      {/* Builder Canvas + Simulation Lab */}
      <div className="flex flex-1 overflow-hidden">
        {/* Logic Builder Flow */}
        <div
          className="flex-1 overflow-auto p-xl relative"
          style={{
            backgroundImage: 'radial-gradient(#1c1b1b 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        >
          <div className="max-w-4xl mx-auto space-y-xl pb-32">
            {list.map((trigger, index) => (
              <div key={trigger._id}>
                {/* Connector from previous */}
                {index > 0 && (
                  <div className="h-12 w-[2px] bg-outline-variant/40 mx-auto mb-xs" />
                )}

                {/* AND/OR operator between nodes */}
                {index > 0 && (
                  <div className="flex justify-center mb-xs">
                    <div className="bg-surface-container-highest px-md py-1 rounded-full border border-outline-variant/50 flex items-center gap-xs">
                      <span className="text-xs font-bold uppercase text-on-surface">
                        {index === 1 ? t('builder.connectorAnd') : t('builder.connectorOr')}
                      </span>
                      <Icon name="keyboard_arrow_down" className="text-xs" />
                    </div>
                  </div>
                )}

                {/* Trigger Node */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-xs bg-surface-container text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 rounded z-10">
                    {t('builder.triggerLabel')}
                  </div>
                  <div className="w-full bg-surface-container/70 backdrop-blur-xl border border-white/5 rounded-xl border-l-4 border-l-primary flex gap-lg items-center p-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={triggerIcon(trigger)} className="text-primary text-3xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{trigger.name}</h3>
                      <p className="text-sm text-on-surface-variant">{trigger.description}</p>
                    </div>
                    {/* Threshold badge */}
                    <div className="bg-surface-container-high px-md py-sm rounded-lg border border-outline-variant/20">
                      <span className="text-xs text-on-surface-variant block mb-1">
                        {t('builder.threshold')}
                      </span>
                      <span className="text-lg font-mono font-bold text-primary">
                        {formatThreshold(trigger)}
                      </span>
                    </div>
                    {/* Toggle */}
                    <Toggle
                      label={trigger.name}
                      checked={trigger.enabled}
                      onChange={() => handleToggle(trigger)}
                    />
                  </div>
                  <div className="h-12 w-[2px] bg-gradient-to-b from-primary to-outline-variant/40" />
                </div>
              </div>
            ))}

            {/* Action Result */}
            <div className="flex justify-center flex-col items-center">
              <Icon name="subdirectory_arrow_right" className="text-outline-variant mb-sm" />
              <div className="grid grid-cols-2 gap-md w-full">
                <div className="bg-surface-container/70 backdrop-blur-xl border border-primary/20 rounded-xl p-md flex items-center gap-md group cursor-move hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="pause_circle" className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-on-surface-variant">{t('builder.actionLabel')}</p>
                    <p className="text-sm font-semibold">{t('builder.triggerAction.pauseCampaign')}</p>
                  </div>
                  <Icon name="drag_indicator" className="text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-surface-container/70 backdrop-blur-xl border border-error/20 rounded-xl p-md flex items-center gap-md group cursor-move hover:border-error/50 transition-colors">
                  <div className="w-10 h-10 bg-error/20 rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="notifications" className="text-error" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-on-surface-variant">{t('builder.actionLabel')}</p>
                    <p className="text-sm font-semibold">{t('builder.triggerAction.notifyOpsAlerts')}</p>
                  </div>
                  <Icon name="drag_indicator" className="text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Lab Sidebar */}
        <aside className="w-80 bg-surface-container/70 backdrop-blur-xl border-l border-outline-variant/10 flex flex-col p-lg z-30">
          <div className="flex items-center gap-sm mb-lg">
            <Icon name="query_stats" className="text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider">{t('builder.simulationLab.title')}</h3>
          </div>

          <div className="space-y-lg flex-1">
            {/* Projection Card */}
            <div className="bg-surface-container-high rounded-xl p-md border border-outline-variant/10">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-md">
                {t('builder.simulationLab.estimated30DayImpact')}
              </p>
              <div className="space-y-md">
                {/* Ad Spend Saved */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{t('builder.simulationLab.adSpendSaved')}</span>
                    <span className="text-primary font-bold">
                      +${sim.adSpendSaved.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </div>
                  <div className="h-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]" />
                  </div>
                </div>
                {/* ROAS Recovery */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{t('builder.simulationLab.roasRecovery')}</span>
                    <span className="text-secondary-container font-bold">
                      +{sim.roasRecovery}x
                    </span>
                  </div>
                  <div className="h-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-container w-[45%]" />
                  </div>
                </div>
                {/* Lead Quality */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{t('builder.simulationLab.leadQualityImprovement')}</span>
                    <span className="text-primary font-bold">+{sim.leadQualityLiftPct}%</span>
                  </div>
                  <div className="h-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="text-center py-md">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    fill="transparent"
                    stroke="currentColor"
                    className="text-surface-variant"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    fill="transparent"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={confidenceDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                  <span className="text-2xl font-bold">{sim.confidencePct}%</span>
                  <span className="text-[10px] uppercase text-on-surface-variant">
                    {t('builder.simulationLab.confidence')}
                  </span>
                </div>
              </div>
            </div>

            {/* Historical Samples */}
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-sm">
                {t('builder.simulationLab.basedOnSimilarTriggers')}
              </p>
              <div className="space-y-xs">
                {sim.historicalSamples.map((sample, i) => (
                  <div
                    key={i}
                    className="text-xs p-xs bg-surface/40 rounded border border-outline-variant/5 flex justify-between"
                  >
                    <span>{sample.label}</span>
                    <span className="text-primary">{t('builder.simulationLab.success')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-lg border-t border-outline-variant/10">
            <button className="w-full py-md bg-surface-container-highest hover:bg-surface-variant transition-colors border border-outline-variant/20 rounded-xl flex items-center justify-center gap-sm">
              <Icon name="science" className="text-sm" />
              <span className="text-sm font-bold">{t('builder.simulationLab.runBacktest')}</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-fit z-40 pointer-events-auto">
        <div className="bg-surface-container/70 backdrop-blur-xl border border-primary/30 rounded-full flex gap-xs items-center p-xs shadow-2xl">
          <div className="p-xs hover:bg-primary/10 rounded-full cursor-pointer text-primary transition-colors" title={t('builder.actionPanel.addTrigger')}>
            <Icon name="add_circle" />
          </div>
          <div className="w-[1px] h-4 bg-outline-variant/40" />
          <button className="flex items-center gap-xs px-md py-sm hover:bg-surface-variant/20 rounded-full transition-all group">
            <Icon name="bolt" className="text-sm group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold">{t('builder.actionPanel.triggers')}</span>
              <span className="text-[8px] text-primary uppercase tracking-tighter">{t('builder.actionPanel.triggersHint')}</span>
            </div>
          </button>
          <button className="flex items-center gap-xs px-md py-sm hover:bg-surface-variant/20 rounded-full transition-all group">
            <Icon name="alt_route" className="text-sm group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">{t('builder.actionPanel.conditions')}</span>
          </button>
          <button className="flex items-center gap-xs px-md py-sm hover:bg-surface-variant/20 rounded-full transition-all group">
            <Icon name="smart_toy" className="text-sm group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">{t('builder.actionPanel.actions')}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-20 bg-surface border-t border-outline-variant/10 flex items-center justify-between px-xl z-50">
        <div className="flex items-center gap-lg">
          <div className="flex items-center gap-xs">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-on-surface-variant">{t('builder.footer.logicReady')}</span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <button className="px-xl py-md bg-surface-container-high border border-outline-variant/40 text-on-surface rounded-xl font-bold text-sm hover:bg-surface-variant transition-colors">
            {t('builder.footer.testRun')}
          </button>
          <button className="px-xl py-md bg-primary text-on-primary-container rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform">
            {t('builder.footer.saveLogic')}
          </button>
        </div>
      </footer>
    </div>
  )
}
