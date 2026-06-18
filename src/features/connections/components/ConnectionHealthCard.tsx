import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { ApiConnection, ConnectionHealth } from '@/types'

const CHANNEL_META: Record<string, { icon: string; color: string; bgColor: string; borderColor: string }> = {
  linkedin: {
    icon: 'share',
    color: 'text-[#0077b5]',
    bgColor: 'bg-[#0077b5]/20',
    borderColor: 'border-[#0077b5]/30',
  },
  youtube: {
    icon: 'play_circle',
    color: 'text-[#ff0000]',
    bgColor: 'bg-[#ff0000]/20',
    borderColor: 'border-[#ff0000]/30',
  },
  telegram: {
    icon: 'send',
    color: 'text-[#229ED9]',
    bgColor: 'bg-[#229ED9]/20',
    borderColor: 'border-[#229ED9]/30',
  },
}

function HealthBadge({ health }: { health: ConnectionHealth }) {
  const { t } = useTranslation('connections')
  if (health === 'healthy') {
    return (
      <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-xs">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
          {t('detail.active')}
        </span>
      </div>
    )
  }
  if (health === 'expiring') {
    return (
      <div className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-xs">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{t('list.healthWarning')}</span>
      </div>
    )
  }
  // error / disconnected
  return (
    <div className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-xs">
      <span className="w-2 h-2 rounded-full bg-amber-500" />
      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">{t('list.healthWarning')}</span>
    </div>
  )
}

interface Props {
  connection: ApiConnection
}

export function ConnectionHealthCard({ connection }: Props) {
  const { t } = useTranslation(['connections', 'common'])
  const navigate = useNavigate()
  const meta = CHANNEL_META[connection.channel] ?? CHANNEL_META['linkedin']
  const isError = connection.health === 'error' || connection.health === 'disconnected'

  const channelName = t(`common:channels.${connection.channel}`)

  return (
    <div
      className={`glass-card rounded-xl p-lg flex flex-col justify-between transition-colors group ${
        connection.health === 'error' || connection.health === 'disconnected'
          ? 'border-red-500/40 bg-red-500/[0.03] hover:border-red-500/60'
          : connection.health === 'expiring'
          ? 'border-amber-500/40 bg-amber-500/[0.03] hover:border-amber-500/60'
          : 'hover:border-primary/40'
      }`}
    >
      <div className="flex justify-between items-start mb-lg">
        <div
          className={`w-12 h-12 rounded-xl ${meta.bgColor} flex items-center justify-center border ${meta.borderColor}`}
        >
          <Icon name={meta.icon} className={`${meta.color} text-3xl`} />
        </div>
        <HealthBadge health={connection.health} />
      </div>

      <div>
        <h3 className="text-title-md font-bold mb-base">{channelName}</h3>

        {connection.channel === 'linkedin' && (
          <>
            <p className="text-body-sm text-outline mb-md">
              {t('list.lastSync', { label: connection.lastSyncLabel ?? '' })}
            </p>
            <div className="p-xs bg-overlay-sm rounded-lg mb-lg border border-overlay-sm">
              <p className="text-[10px] text-primary flex items-center gap-xs font-bold uppercase">
                <Icon name="verified" className="text-xs" />
                {t('list.oauthCompliant')}
              </p>
            </div>
          </>
        )}

        {connection.channel === 'youtube' && (
          <>
            <p className="text-body-sm text-outline mb-md">
              {t('list.tokenExpires', { label: connection.tokenExpiresLabel ?? '' })}
            </p>
            <div className="p-sm bg-secondary-container/10 rounded-lg mb-lg border border-secondary-container/20">
              <p className="text-body-sm text-secondary flex items-center gap-xs italic">
                <Icon name="error" className="text-sm" />
                {t('list.requiresRefresh')}
              </p>
            </div>
          </>
        )}

        {connection.channel === 'telegram' && (
          <>
            <p className="text-body-sm text-outline mb-base">
              {t('list.botLabel', { label: connection.accountName })}
            </p>
            <div className="flex items-center gap-md mt-sm">
              <div className="flex-1 h-1 bg-overlay-md rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '98%' }} />
              </div>
              <span className="text-[10px] font-bold text-primary">
                {t('list.latency', { label: '98ms' })}
              </span>
            </div>
          </>
        )}
      </div>

      {isError ? (
        <button
          type="button"
          onClick={() => navigate(`/settings/connections/${connection.channel}`)}
          className="w-full py-xs bg-gradient-to-b from-primary-container to-[#3b7de6] text-white rounded-lg text-body-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 mt-lg"
        >
          {t('list.reauthorize')}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate(`/settings/connections/${connection.channel}`)}
          className="w-full py-xs border border-overlay-md rounded-lg text-body-sm font-bold hover:bg-overlay-sm active:scale-95 transition-all mt-lg"
        >
          {t('list.manage')}
        </button>
      )}
    </div>
  )
}
