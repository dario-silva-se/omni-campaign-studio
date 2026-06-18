import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { ApiConnection } from '@/types'

interface Props {
  connection: ApiConnection
}

export function ConnectionRestoredBanner({ connection }: Props) {
  const { t } = useTranslation(['connections', 'common'])
  const navigate = useNavigate()
  const channelName = t(`common:channels.${connection.channel}`)

  return (
    <div className="p-xl flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      {/* Top slide-down banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-md pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-sm bg-primary-container text-on-primary-container px-lg py-sm rounded-xl shadow-2xl border border-overlay-md"
          style={{ animation: 'slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <Icon name="check_circle" style={{ fontVariationSettings: "'FILL' 1" }} />
          <span className="font-body-lg text-body-lg font-bold">{t('restored.bannerTitle')}</span>
        </div>
      </div>

      <div className="max-w-3xl w-full text-center space-y-xl">
        {/* Central success icon */}
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
          <div className="relative bg-surface-container rounded-full p-xl glass-card border-primary/30 border-2">
            <Icon
              name="check_circle"
              className="text-[80px] leading-none text-primary"
              style={{
                fontVariationSettings: "'FILL' 1",
                filter: 'drop-shadow(0 0 15px rgba(173, 198, 255, 0.4))',
              }}
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-md">
          <h2 className="font-display-lg text-display-lg text-on-surface">
            {t('restored.title', { channel: channelName })}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            {t('restored.body', { channel: channelName })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg text-left">
          <div className="glass-card p-lg rounded-xl border-l-4 border-l-primary group hover:bg-overlay-sm transition-all cursor-default">
            <p className="font-label-caps text-label-caps text-on-surface-variant/60 uppercase mb-xs">
              {t('restored.syncStatus')}
            </p>
            <div className="flex items-center gap-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-title-md text-title-md text-primary font-bold">{t('restored.syncActive')}</span>
            </div>
          </div>
          <div className="glass-card p-lg rounded-xl border-l-4 border-l-secondary/40 group hover:bg-overlay-sm transition-all cursor-default">
            <p className="font-label-caps text-label-caps text-on-surface-variant/60 uppercase mb-xs">
              {t('restored.lastHeartbeat')}
            </p>
            <span className="font-title-md text-title-md text-on-surface font-bold">
              {t('restored.lastHeartbeatValue')}
            </span>
          </div>
          <div className="glass-card p-lg rounded-xl border-l-4 border-l-tertiary/40 group hover:bg-overlay-sm transition-all cursor-default">
            <p className="font-label-caps text-label-caps text-on-surface-variant/60 uppercase mb-xs">
              {t('restored.pendingTasks')}
            </p>
            <span className="font-title-md text-title-md text-on-surface font-bold">
              {t('restored.pendingTasksValue')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-xl flex flex-col sm:flex-row items-center justify-center gap-lg">
          <button
            type="button"
            onClick={() => navigate('/settings/connections')}
            className="px-xl py-md bg-primary text-on-primary rounded-full font-bold font-title-md shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-sm"
          >
            <Icon name="arrow_back" />
            {t('restored.returnToIntegrations')}
          </button>
          <button
            type="button"
            className="px-xl py-md bg-transparent border border-outline-variant/30 text-on-surface rounded-full font-bold font-title-md hover:bg-overlay-sm transition-all flex items-center gap-sm"
          >
            {t('restored.viewApiLogs')}
          </button>
        </div>

        {/* Decorative */}
        <div className="mt-xl flex items-center justify-center gap-xl opacity-30">
          <Icon name="verified_user" className="text-headline-lg" />
          <div className="h-4 w-px bg-outline-variant" />
          <Icon name="cloud_done" className="text-headline-lg" />
          <div className="h-4 w-px bg-outline-variant" />
          <Icon name="link" className="text-headline-lg" />
        </div>
      </div>
    </div>
  )
}
