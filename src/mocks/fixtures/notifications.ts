import type { NotificationSettings } from '@/types'

export const notificationFixtures: NotificationSettings[] = [
  {
    _id: 'notification-settings',
    slackEnabled: true,
    telegramEnabled: true,
    emailEnabled: false,
    inAppEnabled: true,
    criticalOnly: false,
    batchingPreference: 'realtime',
    quietHours: { start: '22:00', end: '08:00' },
    routes: [
      { severity: 'critical', channels: ['inapp', 'slack', 'email', 'telegram'] },
      { severity: 'warning', channels: ['inapp', 'slack'] },
      { severity: 'info', channels: ['inapp'] },
    ],
    teamSubscriptions: [
      { name: 'Sarah Jenkins', role: 'Owner', activeRules: 4 },
      { name: 'Marcus Chen', role: 'DevOps', activeRules: 2 },
      { name: 'Liam Davis', role: 'Analyst', activeRules: 0 },
    ],
    channelOverrides: [
      {
        channel: 'linkedin',
        condition: 'CPM Spikes > 20%',
        routing: 'telegramOnly',
        progressPct: 75,
      },
      {
        channel: 'youtube',
        condition: 'Engagement Drops',
        routing: 'inAppOnly',
        progressPct: 40,
      },
      {
        channel: 'customBot',
        condition: 'Logic Node Errors',
        routing: 'slackHighPrio',
        progressPct: 90,
      },
    ],
  },
]
