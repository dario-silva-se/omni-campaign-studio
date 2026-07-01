import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { GlassCard } from '@/components/ui/GlassCard'
import { useNotificationSettings, useUpdateNotificationSettings } from '../hooks/useNotificationSettings'
import type { AlertSeverity, NotificationChannelOverride } from '@/types'

type RoutingChannel = 'inapp' | 'slack' | 'email' | 'telegram'

function routeHas(routes: { severity: AlertSeverity; channels: string[] }[], severity: AlertSeverity, ch: RoutingChannel) {
  const row = routes.find((r) => r.severity === severity)
  return row ? row.channels.includes(ch) : false
}

function overrideRoutingLabel(t: (key: string) => string, routing: string): string {
  if (routing === 'telegramOnly') return t('settings:notifications.channelOverrides.telegramOnly')
  if (routing === 'inAppOnly') return t('settings:notifications.channelOverrides.inAppOnly')
  if (routing === 'slackHighPrio') return t('settings:notifications.channelOverrides.slackHighPrio')
  return routing
}

function overrideRoutingColor(routing: string): string {
  if (routing === 'telegramOnly') return 'text-secondary'
  if (routing === 'inAppOnly') return 'text-primary'
  if (routing === 'slackHighPrio') return 'text-error'
  return 'text-on-surface-variant'
}

function overrideProgressColor(routing: string): string {
  if (routing === 'telegramOnly') return 'bg-secondary'
  if (routing === 'inAppOnly') return 'bg-primary'
  if (routing === 'slackHighPrio') return 'bg-error'
  return 'bg-primary'
}

function ChannelOverrideIcon({ channel }: { channel: NotificationChannelOverride['channel'] }) {
  if (channel === 'linkedin') {
    return (
      <div className="w-8 h-8 rounded bg-[#0077b5] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </div>
    )
  }
  if (channel === 'youtube') {
    return (
      <div className="w-8 h-8 rounded bg-[#FF0000] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded bg-[#0088cc] flex items-center justify-center flex-shrink-0">
      <Icon name="smart_toy" className="text-white text-[20px]" />
    </div>
  )
}

function ChannelOverrideLabel({ t, channel }: { t: (key: string) => string; channel: NotificationChannelOverride['channel'] }) {
  if (channel === 'linkedin') return <p className="font-title-md">{t('common:channels.linkedin')}</p>
  if (channel === 'youtube') return <p className="font-title-md">{t('common:channels.youtube')}</p>
  return <p className="font-title-md">{t('common:channels.customBot')}</p>
}

const SEVERITY_ROWS: { key: AlertSeverity; labelKey: string; descKey: string; colorClass: string; indicatorClass: string }[] = [
  { key: 'critical', labelKey: 'settings:notifications.severityMatrix.critical', descKey: 'settings:notifications.severityMatrix.criticalDesc', colorClass: 'text-error', indicatorClass: 'bg-error dark:shadow-[0_0_10px_rgba(255,180,171,0.5)]' },
  { key: 'warning', labelKey: 'settings:notifications.severityMatrix.warning', descKey: 'settings:notifications.severityMatrix.warningDesc', colorClass: 'text-secondary', indicatorClass: 'bg-secondary' },
  { key: 'info', labelKey: 'settings:notifications.severityMatrix.info', descKey: 'settings:notifications.severityMatrix.infoDesc', colorClass: 'text-primary', indicatorClass: 'bg-primary' },
]

const CHANNEL_CARDS: { key: RoutingChannel; labelKey: string; descKey: string; iconName: string; iconBg: string; iconColor: string }[] = [
  { key: 'inapp', labelKey: 'settings:notifications.channelRouting.inApp', descKey: 'settings:notifications.channelRouting.inAppDesc', iconName: 'notifications_active', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  { key: 'slack', labelKey: 'settings:notifications.channelRouting.slack', descKey: 'settings:notifications.channelRouting.slackDesc', iconName: 'forum', iconBg: 'bg-[#4A154B]/20', iconColor: 'text-[#4A154B]' },
  { key: 'email', labelKey: 'settings:notifications.channelRouting.email', descKey: 'settings:notifications.channelRouting.emailDesc', iconName: 'mail', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary' },
  { key: 'telegram', labelKey: 'settings:notifications.channelRouting.telegram', descKey: 'settings:notifications.channelRouting.telegramDesc', iconName: 'send', iconBg: 'bg-[#0088cc]/10', iconColor: 'text-[#0088cc]' },
]

function channelEnabledField(key: RoutingChannel): 'inAppEnabled' | 'slackEnabled' | 'emailEnabled' | 'telegramEnabled' {
  if (key === 'inapp') return 'inAppEnabled'
  if (key === 'slack') return 'slackEnabled'
  if (key === 'email') return 'emailEnabled'
  return 'telegramEnabled'
}

export default function NotificationSettingsPage() {
  const { t } = useTranslation(['settings', 'common'])
  const { data, isLoading, isError } = useNotificationSettings()
  const { mutate: updateSettings } = useUpdateNotificationSettings()

  if (isError) {
    return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  }

  if (isLoading || !data) {
    return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>
  }

  const handleChannelToggle = (channelKey: RoutingChannel, val: boolean) => {
    const field = channelEnabledField(channelKey)
    updateSettings({ [field]: val })
  }

  const handleBatchingChange = (pref: 'realtime' | 'summary') => {
    updateSettings({ batchingPreference: pref })
  }

  const overrides = data.channelOverrides ?? []
  const teamMembers = data.teamSubscriptions ?? []

  return (
    <div className="max-w-7xl mx-auto space-y-xl p-xl">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <nav className="flex items-center gap-xs text-on-surface-variant font-label-caps mb-xs">
            <span>{t('settings:notifications.breadcrumbAlerts')}</span>
            <Icon name="chevron_right" className="text-[12px]" />
            <span className="text-primary">{t('settings:notifications.breadcrumbConfig')}</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('settings:notifications.title')}</h2>
          <p className="font-body-lg text-on-surface-variant">{t('settings:notifications.subtitle')}</p>
        </div>
        <div className="flex gap-md">
          <button
            type="button"
            className="px-lg py-md rounded-xl border border-outline-variant/30 hover:bg-surface-variant/20 transition-all font-title-md"
          >
            {t('settings:notifications.discardChanges')}
          </button>
          <button
            type="button"
            className="px-xl py-md rounded-xl bg-primary text-on-primary font-title-md shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(173,198,255,0.15)] active:scale-95 transition-all"
          >
            {t('settings:notifications.saveRulebase')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-lg">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">

          {/* Channel Routing */}
          <GlassCard>
            <div className="flex items-center gap-sm mb-lg">
              <Icon name="router" className="text-primary" />
              <h3 className="font-title-md text-title-md">{t('settings:notifications.channelRouting.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {CHANNEL_CARDS.map((card) => {
                const field = channelEnabledField(card.key)
                const enabled = data[field] ?? false
                return (
                  <div
                    key={card.key}
                    className="p-md bg-surface-container-low rounded-xl border border-outline-variant/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-md">
                      <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                        <Icon name={card.iconName} className={card.iconColor} />
                      </div>
                      <div>
                        <p className="font-title-md text-[16px]">{t(card.labelKey)}</p>
                        <p className="font-body-sm text-on-surface-variant">{t(card.descKey)}</p>
                      </div>
                    </div>
                    <Toggle
                      label={t(card.labelKey)}
                      checked={enabled}
                      onChange={(val) => handleChannelToggle(card.key, val)}
                    />
                  </div>
                )
              })}
            </div>
          </GlassCard>

          {/* Severity Routing Matrix */}
          <section className="glass-panel subtle-highlight rounded-lg p-lg">
            <div className="flex items-center justify-between mb-lg">
              <div className="flex items-center gap-sm">
                <Icon name="analytics" className="text-secondary" />
                <h3 className="font-title-md text-title-md">{t('settings:notifications.severityMatrix.title')}</h3>
              </div>
              <button type="button" className="text-primary font-label-caps hover:underline">
                {t('settings:notifications.severityMatrix.resetToDefault')}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="py-md font-label-caps text-on-surface-variant">{t('settings:notifications.severityMatrix.colSeverity')}</th>
                    <th className="py-md font-label-caps text-on-surface-variant text-center">{t('settings:notifications.severityMatrix.colInApp')}</th>
                    <th className="py-md font-label-caps text-on-surface-variant text-center">{t('settings:notifications.severityMatrix.colSlack')}</th>
                    <th className="py-md font-label-caps text-on-surface-variant text-center">{t('settings:notifications.severityMatrix.colEmail')}</th>
                    <th className="py-md font-label-caps text-on-surface-variant text-center">{t('settings:notifications.severityMatrix.colTelegram')}</th>
                    <th className="py-md font-label-caps text-on-surface-variant text-right">{t('settings:notifications.severityMatrix.colAction')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {SEVERITY_ROWS.map((row) => (
                    <tr key={row.key} className="group hover:bg-surface-variant/10 transition-colors">
                      <td className="py-lg">
                        <div className="flex items-center gap-md">
                          <div className={`w-2 h-8 ${row.indicatorClass} rounded-full`} />
                          <div>
                            <p className={`font-title-md ${row.colorClass}`}>{t(row.labelKey)}</p>
                            <p className="font-body-sm text-on-surface-variant">{t(row.descKey)}</p>
                          </div>
                        </div>
                      </td>
                      {(['inapp', 'slack', 'email', 'telegram'] as RoutingChannel[]).map((ch) => (
                        <td key={ch} className="text-center">
                          {routeHas(data.routes, row.key, ch) ? (
                            <Icon name="check_circle" filled className="text-primary" />
                          ) : (
                            <Icon name="radio_button_unchecked" className="text-on-surface-variant/30" />
                          )}
                        </td>
                      ))}
                      <td className="text-right">
                        <button
                          type="button"
                          className="px-md py-xs bg-surface-container rounded-lg border border-outline-variant/30 text-body-sm hover:border-primary/50 transition-all"
                        >
                          {t('settings:notifications.severityMatrix.sendTest')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">

          {/* Time Thresholds */}
          <GlassCard>
            <div className="flex items-center gap-sm mb-lg">
              <Icon name="timer" className="text-tertiary" />
              <h3 className="font-title-md text-title-md">{t('settings:notifications.timeThresholds.title')}</h3>
            </div>
            <div className="space-y-lg">
              <div>
                <label className="font-label-caps text-on-surface-variant block mb-sm">
                  {t('settings:notifications.timeThresholds.dndLabel')}
                </label>
                <div className="flex items-center gap-md">
                  <input
                    type="time"
                    defaultValue={data.quietHours?.start ?? '22:00'}
                    className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-sm text-on-surface focus:border-primary outline-none"
                  />
                  <span className="text-on-surface-variant">{t('settings:notifications.timeThresholds.to')}</span>
                  <input
                    type="time"
                    defaultValue={data.quietHours?.end ?? '08:00'}
                    className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-sm text-on-surface focus:border-primary outline-none"
                  />
                </div>
                <p className="text-[12px] text-on-surface-variant mt-xs italic">
                  {t('settings:notifications.timeThresholds.dndNote')}
                </p>
              </div>

              <div>
                <label className="font-label-caps text-on-surface-variant block mb-sm">
                  {t('settings:notifications.timeThresholds.batchingLabel')}
                </label>
                <div className="grid grid-cols-2 gap-sm">
                  <button
                    type="button"
                    onClick={() => handleBatchingChange('realtime')}
                    className={`p-md rounded-xl text-center transition-all ${!data.batchingPreference || data.batchingPreference === 'realtime' ? 'border-2 border-primary bg-primary/10 text-primary' : 'border border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/50'}`}
                  >
                    <span className="block font-title-md">{t('settings:notifications.timeThresholds.realtime')}</span>
                    <span className="text-[11px] opacity-70">{t('settings:notifications.timeThresholds.realtimeDesc')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBatchingChange('summary')}
                    className={`p-md rounded-xl text-center transition-all ${data.batchingPreference === 'summary' ? 'border-2 border-primary bg-primary/10 text-primary' : 'border border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/50'}`}
                  >
                    <span className="block font-title-md">{t('settings:notifications.timeThresholds.summary')}</span>
                    <span className="text-[11px] opacity-70">{t('settings:notifications.timeThresholds.summaryDesc')}</span>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Team Subscriptions */}
          <GlassCard>
            <div className="flex items-center justify-between mb-lg">
              <div className="flex items-center gap-sm">
                <Icon name="group" className="text-primary" />
                <h3 className="font-title-md text-title-md">{t('settings:notifications.teamSubscriptions.title')}</h3>
              </div>
              <button type="button" className="p-xs hover:bg-surface-variant/30 rounded-full transition-colors">
                <Icon name="person_add" />
              </button>
            </div>
            <div className="space-y-md">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between p-md bg-surface-container-lowest rounded-xl border border-outline-variant/10"
                >
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-[14px]">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-title-md text-[14px]">{member.name}</p>
                      <p className="text-[12px] text-on-surface-variant">
                        {member.role} &bull;{' '}
                        {member.activeRules > 0
                          ? t('settings:notifications.teamSubscriptions.activeRules', { count: member.activeRules })
                          : t('settings:notifications.teamSubscriptions.noRules')}
                      </p>
                    </div>
                  </div>
                  <Icon name="more_vert" className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full mt-lg py-sm border border-dashed border-outline-variant/50 rounded-xl text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all font-label-caps"
            >
              {t('settings:notifications.teamSubscriptions.viewPermissions')}
            </button>
          </GlassCard>
        </div>
      </div>

      {/* Channel-Specific Overrides */}
      <section className="glass-panel subtle-highlight rounded-lg overflow-hidden">
        <div className="p-lg border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-high/30">
          <div className="flex items-center gap-sm">
            <Icon name="hub" className="text-primary" />
            <h3 className="font-title-md text-title-md">{t('settings:notifications.channelOverrides.title')}</h3>
          </div>
          <div className="flex gap-sm">
            <span className="px-md py-xs bg-primary/10 text-primary text-[11px] font-bold rounded-full">
              {t('settings:notifications.channelOverrides.overridesActive', { count: overrides.length })}
            </span>
          </div>
        </div>
        <div className="p-lg grid grid-cols-1 md:grid-cols-3 gap-lg">
          {overrides.map((override) => (
            <div key={override.channel} className="space-y-md">
              <div className="flex items-center gap-md mb-xs">
                <ChannelOverrideIcon channel={override.channel} />
                <ChannelOverrideLabel t={t} channel={override.channel} />
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">{override.condition}</span>
                  <span className={overrideRoutingColor(override.routing)}>
                    {overrideRoutingLabel(t, override.routing)}
                  </span>
                </div>
                <div className="w-full bg-outline-variant/10 h-1 rounded-full">
                  <div
                    className={`${overrideProgressColor(override.routing)} h-1 rounded-full`}
                    style={{ width: `${override.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
