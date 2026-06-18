import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'

interface ChannelCard {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
  metrics: { label: string; valueKey: string }[]
}

const CHANNEL_CARDS: ChannelCard[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'work',
    color: 'text-[#0077b5]',
    bgColor: 'bg-[#0077b5]/20 border-[#0077b5]/30',
    metrics: [
      { label: 'targetReach', valueKey: '45K' },
      { label: 'budgetPacing', valueKey: 'onTrack' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'play_circle',
    color: 'text-[#ff0000]',
    bgColor: 'bg-[#ff0000]/20 border-[#ff0000]/30',
    metrics: [
      { label: 'adGroups', valueKey: '3' },
      { label: 'biddingStrategy', valueKey: 'maxConv' },
    ],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'send',
    color: 'text-[#0088cc]',
    bgColor: 'bg-[#0088cc]/20 border-[#0088cc]/30',
    metrics: [
      { label: 'broadcastLists', valueKey: '12' },
      { label: 'deliveryStatus', valueKey: '100%' },
    ],
  },
]

function metricValue(key: string, t: (k: string) => string): string {
  const mapped: Record<string, string> = {
    onTrack: t('success.channels.onTrack'),
    maxConv: t('success.channels.maxConv'),
  }
  return mapped[key] ?? key
}

export default function LaunchSuccessPage() {
  const { t } = useTranslation('campaigns')
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center p-md md:p-xl relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-tertiary-container/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-xl">
          <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mx-auto mb-lg shadow-[0_0_40px_rgba(173,198,255,0.2)]">
            <Icon name="check_circle" className="text-[64px] text-primary" filled />
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-xs hidden md:block">
            {t('success.title')}
          </h1>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-xs md:hidden">
            {t('success.title')}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{t('success.subtitle')}</p>
        </div>

        {/* Channel cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full mb-xl">
          {CHANNEL_CARDS.map((card) => (
            <div
              key={card.id}
              className="glass-panel rounded-xl p-lg flex flex-col"
              style={{
                background: 'rgba(42, 42, 42, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-lg">
                <div className="flex items-center gap-sm">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${card.bgColor}`}>
                    <Icon name={card.icon} className={card.color} />
                  </div>
                  <span className="font-title-md text-title-md text-on-surface">{card.name}</span>
                </div>
                <div className="px-sm py-base rounded-full bg-primary/15 border border-primary/20 flex items-center gap-xs">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-caps text-label-caps text-primary">
                    {t('success.channels.active')}
                  </span>
                </div>
              </div>
              <div className="space-y-sm mt-auto">
                {card.metrics.map(({ label, valueKey }) => (
                  <div key={label} className="flex justify-between font-body-sm text-body-sm">
                    <span className="text-on-surface-variant">
                      {t(`success.channels.${label}`)}
                    </span>
                    <span className="text-on-surface font-semibold">{metricValue(valueKey, t)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-md w-full max-w-2xl justify-center items-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full md:w-auto px-xl py-sm rounded-lg bg-gradient-to-b from-primary to-[#8aa7db] text-on-primary-container font-title-md text-title-md font-semibold hover:opacity-90 transition-opacity active:scale-95 duration-200 shadow-[0_4px_14px_0_rgba(173,198,255,0.39)]"
          >
            {t('success.actions.dashboard')}
          </button>
          <button
            type="button"
            className="w-full md:w-auto px-lg py-sm rounded-lg bg-transparent border border-outline-variant text-on-surface font-title-md text-title-md hover:bg-surface-variant/20 transition-colors active:scale-95 duration-200 flex items-center justify-center gap-xs"
          >
            <Icon name="share" className="text-[20px]" />
            {t('success.actions.shareReport')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/campaigns/new/step-1')}
            className="w-full md:w-auto px-lg py-sm rounded-lg bg-transparent border border-outline-variant text-on-surface font-title-md text-title-md hover:bg-surface-variant/20 transition-colors active:scale-95 duration-200 flex items-center justify-center gap-xs"
          >
            <Icon name="add" className="text-[20px]" />
            {t('success.actions.newCampaign')}
          </button>
        </div>
      </div>
    </main>
  )
}
