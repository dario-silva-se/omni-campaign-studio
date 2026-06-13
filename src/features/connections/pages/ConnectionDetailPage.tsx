import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Channel } from '@/types'
import { useConnection, useReconnect } from '../hooks/useConnections'
import { ConnectionHealthDetail } from '../components/ConnectionHealthDetail'
import { ConnectionErrorPanel } from '../components/ConnectionErrorPanel'
import { ConnectionRestoredBanner } from '../components/ConnectionRestoredBanner'

const VALID_CHANNELS: Channel[] = ['linkedin', 'youtube', 'telegram']

function isValidChannel(val: string | undefined): val is Channel {
  return VALID_CHANNELS.includes(val as Channel)
}

export default function ConnectionDetailPage() {
  const { channel } = useParams<{ channel: string }>()
  const { t } = useTranslation(['connections', 'common'])
  const [justRestored, setJustRestored] = useState(false)

  const { data: connection, isLoading, isError } = useConnection(
    isValidChannel(channel) ? channel : undefined,
  )

  const reconnect = useReconnect()

  if (!isValidChannel(channel)) {
    return <Navigate to="/settings/connections" replace />
  }

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !connection) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  // State machine: healthy (justRestored=false) → normal detail
  //                healthy (justRestored=true) → restored banner
  //                error/disconnected → error panel
  if (connection.health === 'healthy' && justRestored) {
    return <ConnectionRestoredBanner connection={connection} />
  }

  if (connection.health === 'healthy') {
    return <ConnectionHealthDetail connection={connection} justRestored={false} />
  }

  // error or disconnected
  const handleReconnect = () => {
    reconnect.mutate(channel, {
      onSuccess: () => {
        setJustRestored(true)
      },
    })
  }

  return (
    <ConnectionErrorPanel
      connection={connection}
      onReconnect={handleReconnect}
      isReconnecting={reconnect.isPending}
    />
  )
}
