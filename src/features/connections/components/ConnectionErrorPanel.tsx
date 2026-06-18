import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { ApiConnection } from '@/types'

interface Props {
  connection: ApiConnection
  onReconnect: () => void
  isReconnecting?: boolean
}

export function ConnectionErrorPanel({ connection, onReconnect, isReconnecting }: Props) {
  const { t } = useTranslation(['connections', 'common'])
  const navigate = useNavigate()
  const channelName = t(`common:channels.${connection.channel}`)

  return (
    <div className="flex-1 p-xl space-y-xl relative">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-xs font-label-caps text-on-surface-variant">
        <span>{t('detail.breadcrumbSettings')}</span>
        <Icon name="chevron_right" className="text-[14px]" />
        <span>{t('detail.breadcrumbIntegrations')}</span>
        <Icon name="chevron_right" className="text-[14px]" />
        <span className="text-on-surface">{channelName} API</span>
      </nav>

      {/* Connection Error Hero */}
      <section
        className="rounded-xl p-xl relative overflow-hidden"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(32, 31, 31, 0.4)',
          border: '1px solid rgba(255, 94, 7, 0.4)',
          boxShadow: '0 0 40px -10px rgba(255, 94, 7, 0.3)',
        }}
      >
        {/* Scanline animation */}
        <div
          className="absolute w-full pointer-events-none"
          style={{
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(255, 94, 7, 0.2), transparent)',
            animation: 'scan 3s linear infinite',
            zIndex: 10,
            top: 0,
          }}
        />
        <div className="relative z-20 flex flex-col md:flex-row items-center gap-xl">
          {/* Icon */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 rounded-full border-4 border-error/20 flex items-center justify-center bg-error-container/10">
              <Icon
                name="error"
                className="text-[64px] text-error"
                style={{ fontVariationSettings: "'FILL' 1" }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-error text-on-error px-md py-xs rounded-full font-label-caps text-[10px] animate-bounce">
              {t('error.offline')}
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-md mb-xs">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {t('error.title')}
              </h2>
              <span className="px-sm py-base bg-error/15 border border-error/30 text-error rounded font-label-caps text-[10px]">
                {t('error.critical')}
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {connection.errorMessage ?? t('error.description')}
            </p>
            <div className="mt-lg flex flex-wrap items-center justify-center md:justify-start gap-md">
              <button
                type="button"
                onClick={onReconnect}
                disabled={isReconnecting}
                className="bg-gradient-to-b from-primary-container to-[#3b7de6] hover:brightness-110 text-white px-xl py-md rounded-lg font-title-md flex items-center gap-md transition-all active:scale-95 disabled:opacity-60"
              >
                <Icon name={isReconnecting ? 'refresh' : 'sync'} className={isReconnecting ? 'animate-spin' : ''} />
                {isReconnecting ? t('error.reconnecting') : t('error.reconnect')}
              </button>
              <button
                type="button"
                className="border border-outline-variant hover:bg-surface-variant px-xl py-md rounded-lg font-title-md flex items-center gap-md transition-all"
              >
                <Icon name="history" />
                {t('error.viewLogs')}
              </button>
            </div>
          </div>

          {/* Technical diagnostics */}
          <div
            className="w-full md:w-auto p-lg rounded-lg border border-error/20"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'rgba(32, 31, 31, 0.4)',
              border: '1px solid rgba(255, 94, 7, 0.2)',
            }}
          >
            <p className="font-label-caps text-error mb-sm">{t('error.technicalDiagnostics')}</p>
            <div className="space-y-sm">
              <div className="flex justify-between gap-xl">
                <span className="font-body-sm text-on-surface-variant">{t('error.errorCode')}</span>
                <span className="font-body-sm text-error font-mono">
                  {connection.errorCode ?? '504 GATEWAY_TIMEOUT'}
                </span>
              </div>
              <div className="flex justify-between gap-xl">
                <span className="font-body-sm text-on-surface-variant">{t('error.reason')}</span>
                <span className="font-body-sm text-on-surface font-mono">
                  {connection.errorReason ?? 'OAuth Token Expired'}
                </span>
              </div>
              <div className="flex justify-between gap-xl">
                <span className="font-body-sm text-on-surface-variant">{t('error.latency')}</span>
                <span className="font-body-sm text-on-surface font-mono">
                  {connection.errorLatency ?? '> 30,000ms'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
        {/* Health History */}
        <section
          className="md:col-span-8 rounded-xl p-lg"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(32, 31, 31, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-xl">
            <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-md">
              <Icon name="timeline" className="text-primary" />
              {t('error.healthHistory')}
            </h3>
            <div className="flex items-center gap-md text-on-surface-variant font-label-caps">
              <span className="flex items-center gap-xs">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                {t('error.online')}
              </span>
              <span className="flex items-center gap-xs">
                <div className="w-2 h-2 rounded-full bg-error" />
                {t('error.failure')}
              </span>
            </div>
          </div>
          <div className="relative h-32 flex items-end gap-[2px]">
            {[...Array(6)].map((_, i) => (
              <div
                key={`online-${i}`}
                className="flex-1 bg-green-500/20 h-full rounded-t-sm border-t border-green-500/40"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`error-${i}`}
                className="flex-1 bg-error/40 h-[10%] rounded-t-sm border-t border-error"
              />
            ))}
          </div>
          <div className="mt-md flex justify-between font-label-caps text-on-surface-variant text-[10px]">
            <span>12:00 AM</span>
            <span>06:00 AM</span>
            <span>12:00 PM</span>
            <span className="text-error">03:42 PM (DROPPED)</span>
            <span>06:00 PM</span>
          </div>
          <div className="mt-xl p-md bg-surface-container rounded-lg border border-overlay-sm">
            <div className="flex items-start gap-md">
              <Icon name="info" className="text-error mt-1" />
              <div>
                <p className="font-body-sm text-on-surface font-bold">{t('error.failureDetected')}</p>
                <p className="font-body-sm text-on-surface-variant">{t('error.failureDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Impact */}
        <section
          className="md:col-span-4 rounded-xl p-lg"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(32, 31, 31, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h3 className="font-title-md text-title-md text-on-surface mb-lg flex items-center gap-md">
            <Icon name="batch_prediction" className="text-secondary" />
            {t('error.operationalImpact')}
          </h3>
          <div className="space-y-lg">
            <div className="flex items-center justify-between p-md bg-surface-container/50 rounded border border-overlay-sm">
              <div className="flex items-center gap-md">
                <Icon name="upload_file" className="text-on-surface-variant" />
                <span className="font-body-sm text-on-surface">{t('error.scheduledUploads')}</span>
              </div>
              <span className="text-error font-bold font-mono">{t('error.stalled')}</span>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container/50 rounded border border-overlay-sm">
              <div className="flex items-center gap-md">
                <Icon name="monitoring" className="text-on-surface-variant" />
                <span className="font-body-sm text-on-surface">{t('error.liveAnalytics')}</span>
              </div>
              <span className="text-error font-bold font-mono">{t('error.noData')}</span>
            </div>
            <div className="flex items-center justify-between p-md bg-surface-container/50 rounded border border-overlay-sm">
              <div className="flex items-center gap-md">
                <Icon name="comment" className="text-on-surface-variant" />
                <span className="font-body-sm text-on-surface">{t('error.commentModeration')}</span>
              </div>
              <span className="text-error font-bold font-mono">{t('error.offlineStatus')}</span>
            </div>
          </div>
          {/* Service interruption placeholder */}
          <div className="mt-xl rounded-lg overflow-hidden relative aspect-video bg-surface-container-high flex items-center justify-center">
            <div className="text-center px-lg">
              <p className="font-label-caps text-on-surface font-black drop-shadow-lg">
                {t('error.serviceInterruption')}
              </p>
              <p className="text-[10px] text-on-surface-variant">{t('error.recoveryRequired')}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Real-time Exception Log */}
      <section
        className="rounded-xl overflow-hidden border-overlay-md"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(32, 31, 31, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="bg-surface-container p-md flex items-center justify-between border-b border-overlay-sm">
          <div className="flex items-center gap-md">
            <Icon name="terminal" className="text-on-surface-variant" />
            <span className="font-label-caps text-on-surface">{t('error.exceptionLog')}</span>
          </div>
          <div className="flex gap-sm">
            <div className="w-3 h-3 rounded-full bg-error/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
        </div>
        <div className="p-lg font-mono text-[12px] space-y-base bg-black/40 h-64 overflow-y-auto">
          <div className="flex gap-md">
            <span className="text-on-surface-variant opacity-50">[15:42:11]</span>
            <span className="text-error">ERR_YOUTUBE_OAUTH_EXPIRED:</span>
            <span className="text-on-surface-variant">Failed to refresh access token. Grant invalid or revoked.</span>
          </div>
          <div className="flex gap-md">
            <span className="text-on-surface-variant opacity-50">[15:42:12]</span>
            <span className="text-primary">INFO:</span>
            <span className="text-on-surface-variant">Triggering automatic retry (1/3)...</span>
          </div>
          <div className="flex gap-md">
            <span className="text-on-surface-variant opacity-50">[15:42:42]</span>
            <span className="text-error">ERR_TIMEOUT:</span>
            <span className="text-on-surface-variant">Connection attempt timed out after 30000ms.</span>
          </div>
          <div className="flex gap-md">
            <span className="text-on-surface-variant opacity-50">[15:43:45]</span>
            <span className="text-error font-bold">FATAL:</span>
            <span className="text-on-surface-variant">Service entered CRITICAL FAILURE state. Human intervention required.</span>
          </div>
          <div className="flex gap-md animate-pulse">
            <span className="text-on-surface-variant opacity-50">[15:55:21]</span>
            <span className="text-white">_</span>
          </div>
        </div>
      </section>

      {/* Back */}
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
