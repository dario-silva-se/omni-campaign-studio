import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { ApiConnection } from '@/types'

interface Props {
  connection: ApiConnection
  justRestored?: boolean
}

export function ConnectionHealthDetail({ connection, justRestored }: Props) {
  const { t } = useTranslation('connections')
  const navigate = useNavigate()
  const channelName = t(`common:channels.${connection.channel}`)

  // Capture the timestamp at mount using a lazy useState initializer (runs once, not during render)
  const [now] = useState<number>(() => Date.now())

  // Calculate days remaining from tokenExpiresAt or fall back to label
  const daysRemaining = useMemo(() => {
    if (!connection.tokenExpiresAt) return '45'
    const diff = Math.ceil(
      (new Date(connection.tokenExpiresAt).getTime() - now) / (1000 * 60 * 60 * 24),
    )
    return diff > 0 ? String(diff) : '45'
  }, [connection.tokenExpiresAt, now])

  const permissions = connection.permissions ?? []
  const connectedAccounts = connection.connectedAccounts ?? []

  return (
    <div className="p-xl space-y-xl">
      {/* Restored banner */}
      {justRestored && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-md pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-sm bg-primary-container text-on-primary-container px-lg py-sm rounded-xl shadow-2xl border border-white/10 animate-[slide-down_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <Icon name="check_circle" style={{ fontVariationSettings: "'FILL' 1" }} />
            <span className="font-body-lg text-body-lg font-bold">{t('restored.bannerTitle')}</span>
          </div>
        </div>
      )}

      {/* Breadcrumbs + Header */}
      <div>
        <div className="flex items-center gap-xs text-xs text-on-surface-variant/40 mb-xs">
          <span>{t('detail.breadcrumbSettings')}</span>
          <Icon name="chevron_right" className="text-[14px]" />
          <span>{t('detail.breadcrumbIntegrations')}</span>
          <Icon name="chevron_right" className="text-[14px]" />
          <span className="text-primary">{t('detail.managementTitle', { channel: channelName })}</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-md">
              {channelName} Connection
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {t('detail.active')}
              </span>
            </h2>
            <p className="text-on-surface-variant/60 mt-1">
              {t('detail.managementSubtitle', { channel: channelName })}
            </p>
          </div>
          <div className="flex gap-md">
            <button
              type="button"
              className="px-lg py-sm glass-card hover:bg-white/5 transition-all text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <Icon name="sync" className="text-[18px]" />
              {t('detail.forceRefresh')}
            </button>
            <button
              type="button"
              className="px-lg py-sm bg-primary text-on-primary hover:opacity-90 transition-all text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Icon name="save" className="text-[18px]" />
              {t('detail.saveConfig')}
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-lg max-w-container-max mx-auto">
        {/* OAuth Token Health */}
        <div className="col-span-4 glass-card p-lg rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-lg">
              <h3 className="font-title-md text-title-md text-on-surface">{t('detail.oauthTokenHealth')}</h3>
              <Icon name="security" className="text-primary" />
            </div>
            <div className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-white/5"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                <circle
                  className="text-primary transition-all duration-1000"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="45"
                  stroke="currentColor"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                  strokeWidth="6"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-display-lg font-black text-on-surface leading-none">{daysRemaining}</span>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant/40 tracking-widest">
                  {t('detail.daysRemaining')}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-lg pt-lg border-t border-white/10">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-on-surface-variant/60">{t('detail.status')}</span>
              <span className="text-primary font-bold">{t('detail.optimal')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant/60">{t('detail.lastRotation')}</span>
              <span className="text-on-surface">15 Oct, 2023</span>
            </div>
            <div className="mt-md p-sm bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
              <Icon name="info" className="text-primary text-[20px]" />
              <p className="text-[11px] text-on-surface-variant leading-tight">{t('detail.autoRefreshNote')}</p>
            </div>
          </div>
        </div>

        {/* Permissions & Troubleshooting */}
        <div className="col-span-8 space-y-lg">
          {/* Permissions */}
          <div className="glass-card p-lg rounded-xl">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-title-md text-title-md text-on-surface">{t('detail.grantedPermissions')}</h3>
              <span className="text-xs text-on-surface-variant/40 font-mono">{t('detail.appId')}</span>
            </div>
            <div className="grid grid-cols-3 gap-md">
              {permissions.length > 0
                ? permissions.map((perm) => (
                    <div
                      key={perm.scope}
                      className="p-md rounded-xl bg-surface-container-high border border-white/5 flex items-start gap-md"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name={perm.icon} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{perm.label}</h4>
                        <p className="text-xs text-on-surface-variant/60">{perm.scope}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded uppercase font-bold">
                          {t('detail.authorized')}
                        </span>
                      </div>
                    </div>
                  ))
                : connection.scopes.map((scope) => (
                    <div
                      key={scope}
                      className="p-md rounded-xl bg-surface-container-high border border-white/5 flex items-start gap-md"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon name="verified_user" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{scope}</h4>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded uppercase font-bold">
                          {t('detail.authorized')}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="glass-card p-lg rounded-xl">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-title-md text-title-md text-on-surface">{t('detail.troubleshooting')}</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                  {t('detail.allSystemsOk')}
                </span>
              </div>
            </div>
            <div className="space-y-sm">
              <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center p-md cursor-pointer list-none">
                  <div className="flex items-center gap-md">
                    <Icon name="dns" className="text-on-surface-variant/40" />
                    <span className="text-sm font-medium">{t('detail.networkApi')}</span>
                  </div>
                  <Icon name="expand_more" className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-md pb-md text-xs text-on-surface-variant/60 leading-relaxed">
                  {t('detail.networkApiDetail')}
                </div>
              </details>
              <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center p-md cursor-pointer list-none">
                  <div className="flex items-center gap-md">
                    <Icon name="history_toggle_off" className="text-on-surface-variant/40" />
                    <span className="text-sm font-medium">{t('detail.webhookLogs')}</span>
                  </div>
                  <Icon name="expand_more" className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-md pb-md text-xs text-on-surface-variant/60">
                  <ul className="space-y-2 font-mono">
                    <li className="flex justify-between">
                      <span>POST /webhook/linkedin</span>
                      <span className="text-primary">200 OK</span>
                    </li>
                    <li className="flex justify-between">
                      <span>GET /api/v2/auth_status</span>
                      <span className="text-primary">200 OK</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        {connectedAccounts.length > 0 && (
          <div className="col-span-12 glass-card rounded-xl overflow-hidden">
            <div className="px-lg py-md bg-white/5 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-title-md text-title-md text-on-surface">{t('detail.connectedAccounts')}</h3>
              <button type="button" className="text-primary text-xs font-bold hover:underline">
                {t('detail.addPage')}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] uppercase font-bold text-on-surface-variant/40 border-b border-white/5">
                    <th className="px-lg py-md">{t('detail.entityName')}</th>
                    <th className="px-lg py-md">{t('detail.type')}</th>
                    <th className="px-lg py-md">{t('detail.adminRole')}</th>
                    <th className="px-lg py-md">{t('detail.accountStatus')}</th>
                    <th className="px-lg py-md text-right">{t('detail.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {connectedAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-white/10 bg-surface-container-high">
                            <Icon name="business" className="text-on-surface-variant/60" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{account.name}</p>
                            <p className="text-xs text-on-surface-variant/60">ID: {account.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md">
                        <span className="text-xs text-on-surface-variant">{account.type}</span>
                      </td>
                      <td className="px-lg py-md">
                        <span className="text-xs text-on-surface-variant">{account.role}</span>
                      </td>
                      <td className="px-lg py-md">
                        <span className="flex items-center gap-2 text-xs text-primary">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {t('detail.synced')}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right">
                        <button
                          type="button"
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          aria-label="settings"
                        >
                          <Icon name="settings" className="text-on-surface-variant" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dangerous action */}
        <div className="col-span-12 mt-xl">
          <div className="border border-error/30 bg-error-container/10 p-lg rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-lg">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
                <Icon name="warning" className="text-3xl" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">
                  {t('detail.disconnectTitle', { channel: channelName })}
                </h4>
                <p className="text-sm text-on-surface-variant/60 max-w-lg mt-1">
                  {t('detail.disconnectDesc')}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-lg py-sm bg-error-container text-on-error-container hover:bg-error-container/80 transition-all font-bold rounded-xl active:scale-95"
            >
              {t('detail.disconnectBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/settings/connections')}
          className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm"
        >
          <Icon name="arrow_back" className="text-sm" />
          {t('detail.back')}
        </button>
      </div>
    </div>
  )
}
