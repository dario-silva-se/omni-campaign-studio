import { Navigate, useParams } from 'react-router-dom'
import type { Channel } from '@/types'
import { LinkedInScheduleForm } from '../components/LinkedInScheduleForm'
import { TelegramScheduleForm } from '../components/TelegramScheduleForm'
import { YouTubeScheduleForm } from '../components/YouTubeScheduleForm'

const VALID_CHANNELS: Channel[] = ['linkedin', 'youtube', 'telegram']

export default function SchedulePostPage() {
  const { channel } = useParams<{ channel: string }>()

  if (!channel || !VALID_CHANNELS.includes(channel as Channel)) {
    return <Navigate to="/posts" replace />
  }

  const ch = channel as Channel

  return (
    <div className="min-h-screen">
      {ch === 'linkedin' && <LinkedInScheduleForm />}
      {ch === 'telegram' && <TelegramScheduleForm />}
      {ch === 'youtube' && <YouTubeScheduleForm />}
    </div>
  )
}
