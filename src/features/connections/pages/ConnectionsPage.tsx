import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useConnectionList } from '../hooks/useConnections'
import { ConnectionHealthCard } from '../components/ConnectionHealthCard'

const PULSE_BARS = [
  { height: '60%', color: 'primary' },
  { height: '65%', color: 'primary' },
  { height: '55%', color: 'primary' },
  { height: '70%', color: 'primary' },
  { height: '80%', color: 'primary' },
  { height: '40%', color: 'primary' },
  { height: '90%', color: 'secondary' },
  { height: '95%', color: 'secondary' },
  { height: '88%', color: 'secondary' },
  { height: '50%', color: 'primary' },
  { height: '60%', color: 'primary' },
  { height: '65%', color: 'primary' },
  { height: '55%', color: 'primary' },
  { height: '70%', color: 'primary' },
  { height: '80%', color: 'primary' },
  { height: '40%', color: 'primary' },
]

const LOG_ENTRIES = [
  {
    event: 'Data Sync Successful',
    platform: 'LinkedIn',
    status: 'success',
    timestamp: 'Oct 24, 2023 · 14:22:01',
    identity: 'System_Cron_V4',
  },
  {
    event: 'Token Expiration Warning',
    platform: 'YouTube',
    status: 'warning',
    timestamp: 'Oct 24, 2023 · 13:05:44',
    identity: 'Auth_Monitor_Service',
  },
  {
    event: 'Data Sync Successful',
    platform: 'Telegram',
    status: 'success',
    timestamp: 'Oct 24, 2023 · 12:45:12',
    identity: 'System_Cron_V4',
  },
  {
    event: 'Bot Interaction Log',
    platform: 'Telegram',
    status: 'info',
    timestamp: 'Oct 24, 2023 · 12:45:12',
    identity: 'User_IO_9521',
  },
  {
    event: 'Connection Re-validated',
    platform: 'LinkedIn',
    status: 'success',
    timestamp: 'Oct 24, 2023 · 08:12:54',
    identity: 'Admin_A_Alex',
  },
]

export default function ConnectionsPage() {
  const { t } = useTranslation(['connections', 'common'])
  const { data: connections, isLoading, isError } = useConnectionList()

  function statusBadge(status: string) {
    if (status === 'success')
      return (
        <span className="inline-flex items-center gap-xs text-[10px] font-bold text-green-500 uppercase px-2 py-0.5 bg-green-500/10 rounded">
          {t('connections:list.logSuccess')}
        </span>
      )
    if (status === 'warning')
      return (
        <span className="inline-flex items-center gap-xs text-[10px] font-bold text-amber-500 uppercase px-2 py-0.5 bg-amber-500/10 rounded">
          {t('connections:list.logWarning')}
        </span>
      )
    return (
      <span className="inline-flex items-center gap-xs text-[10px] font-bold text-primary uppercase px-2 py-0.5 bg-primary/10 rounded">
        {t('connections:list.logInfo')}
      </span>
    )
  }

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !connections) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return (
    <div className="max-w-container-max mx-auto space-y-xl p-xl">
      {/* Header */}
      <section className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-white mb-xs">{t('connections:list.title')}</h2>
        <p className="text-on-surface-variant max-w-2xl">{t('connections:list.description')}</p>
      </section>

      {/* Connection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {connections.map((conn) => (
          <ConnectionHealthCard key={conn._id} connection={conn} />
        ))}
      </section>

      {/* System Pulse + Uptime */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <div className="lg:col-span-2 glass-card rounded-xl p-lg">
          <div className="flex justify-between items-center mb-xl">
            <div>
              <h3 className="text-title-md font-bold">{t('connections:list.systemPulse')}</h3>
              <p className="text-body-sm text-outline">{t('connections:list.systemPulseDesc')}</p>
            </div>
            <div className="flex items-center gap-lg">
              <div className="flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-label-caps text-outline">LinkedIn</span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-label-caps text-outline">YouTube</span>
              </div>
            </div>
          </div>
          <div className="h-48 w-full relative flex items-end gap-1 px-base">
            {PULSE_BARS.map((bar, i) => (
              <div
                key={i}
                className={`flex-1 bg-${bar.color}/20 rounded-t hover:bg-${bar.color} transition-colors`}
                style={{ height: bar.height }}
                title={`${bar.color === 'primary' ? '45' : '145'}ms`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-sm text-[10px] text-outline px-base font-bold">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-lg flex flex-col justify-center text-center">
          <div className="mb-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-primary/20">
              <Icon name="security" className="text-4xl text-primary" />
            </div>
          </div>
          <h4 className="text-title-md font-bold mb-xs">{t('connections:list.uptime')}</h4>
          <p className="text-body-sm text-outline px-md">{t('connections:list.uptimeDesc')}</p>
        </div>
      </section>

      {/* Security & Logs */}
      <section className="glass-card rounded-xl overflow-hidden">
        <div className="p-lg border-b border-overlay-md flex justify-between items-center">
          <h3 className="text-title-md font-bold">{t('connections:list.securityLogs')}</h3>
          <button
            type="button"
            className="text-primary text-body-sm font-bold flex items-center gap-xs hover:underline"
          >
            <Icon name="download" className="text-sm" />
            {t('connections:list.exportAudit')}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-overlay-sm">
                <th className="px-lg py-md text-label-caps text-outline uppercase">
                  {t('connections:list.logTable.eventType')}
                </th>
                <th className="px-lg py-md text-label-caps text-outline uppercase">
                  {t('connections:list.logTable.platform')}
                </th>
                <th className="px-lg py-md text-label-caps text-outline uppercase">
                  {t('connections:list.logTable.status')}
                </th>
                <th className="px-lg py-md text-label-caps text-outline uppercase">
                  {t('connections:list.logTable.timestamp')}
                </th>
                <th className="px-lg py-md text-label-caps text-outline uppercase">
                  {t('connections:list.logTable.identity')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-overlay-sm">
              {LOG_ENTRIES.map((entry, i) => (
                <tr key={i} className="hover:bg-overlay-sm transition-colors">
                  <td className="px-lg py-md font-bold text-body-sm">{entry.event}</td>
                  <td className="px-lg py-md text-body-sm">{entry.platform}</td>
                  <td className="px-lg py-md">{statusBadge(entry.status)}</td>
                  <td className="px-lg py-md text-body-sm text-outline">{entry.timestamp}</td>
                  <td className="px-lg py-md text-body-sm">{entry.identity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
