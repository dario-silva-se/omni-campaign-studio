import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { DashboardSignal, DashboardSignalSource } from '@/mocks/fixtures/dashboard'

interface SignalSourceConfig {
  bgColor: string
  iconName: string
  iconFilled?: boolean
}

const sourceConfig: Record<DashboardSignalSource, SignalSourceConfig> = {
  linkedin: { bgColor: '#0077b5', iconName: 'work' },
  youtube: { bgColor: '#FF0000', iconName: 'play_arrow', iconFilled: true },
  telegram: { bgColor: '#0088cc', iconName: 'send' },
}

interface LinkedInSignalItemProps {
  signal: DashboardSignal
}

function LinkedInSignalItem({ signal }: LinkedInSignalItemProps) {
  return (
    <div className="p-sm border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors cursor-pointer group">
      <div className="flex items-center mb-1">
        {signal.badge && (
          <span className="text-[9px] font-bold text-secondary-container uppercase mr-2 tracking-wider">
            {signal.badge}
          </span>
        )}
        <h4 className="font-body-sm font-semibold text-primary group-hover:text-primary-fixed transition-colors line-clamp-1">
          {signal.title}
        </h4>
      </div>
      {signal.description && (
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-2">{signal.description}</p>
      )}
      <div className="text-[10px] text-outline-variant flex flex-wrap gap-1">
        <span>{signal.author}</span>
        {signal.publishedAt && (
          <>
            <span>·</span>
            <span>{signal.publishedAt}</span>
          </>
        )}
      </div>
    </div>
  )
}

interface YouTubeSignalItemProps {
  signal: DashboardSignal
  isLast: boolean
}

function YouTubeSignalItem({ signal, isLast }: YouTubeSignalItemProps) {
  const { t } = useTranslation('dashboard')
  return (
    <div
      className={`p-sm ${!isLast ? 'border-b border-outline-variant/10' : ''} hover:bg-surface-variant/30 transition-colors cursor-pointer group`}
    >
      <h4 className="font-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1 mb-1">
        {signal.title}
      </h4>
      {signal.description && (
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-2">{signal.description}</p>
      )}
      <div className="text-[10px] text-outline-variant flex justify-between items-center">
        <span>
          {t('signals.channel')} {signal.author} · {signal.publishedAt}
        </span>
        {signal.views != null && (
          <span className="flex items-center">
            <Icon name="visibility" className="text-[12px] mr-0.5" />
            {signal.views.toLocaleString('pt-BR')}
          </span>
        )}
      </div>
    </div>
  )
}

interface TelegramSignalItemProps {
  signal: DashboardSignal
  isLast: boolean
}

function TelegramSignalItem({ signal, isLast }: TelegramSignalItemProps) {
  return (
    <div
      className={`p-sm ${!isLast ? 'border-b border-outline-variant/10' : ''} hover:bg-surface-variant/30 transition-colors cursor-pointer group`}
    >
      <div className="flex items-center mb-1 gap-2 flex-wrap">
        {signal.categoryTag && (
          <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono border border-primary/20">
            {signal.categoryTag}
          </span>
        )}
        <h4 className="font-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
          {signal.title}
          {signal.author && signal.source === 'telegram' && !signal.categoryTag && (
            <span className="text-outline-variant font-normal text-xs ml-1">{signal.author}</span>
          )}
        </h4>
      </div>
      {signal.description && (
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-2">{signal.description}</p>
      )}
      {signal.activityNote && (
        <div className="text-[10px] text-outline-variant flex items-center">
          <Icon name="bolt" className="text-[12px] mr-0.5 text-secondary-fixed" />
          {signal.activityNote}
        </div>
      )}
    </div>
  )
}

interface SignalSourceCardProps {
  source: DashboardSignalSource
  signals: DashboardSignal[]
  label: string
}

export function SignalSourceCard({ source, signals, label }: SignalSourceCardProps) {
  const { t } = useTranslation('dashboard')
  const config = sourceConfig[source]

  return (
    <div className="glass-panel subtle-highlight rounded-xl overflow-hidden flex flex-col h-[400px]">
      {/* Card header */}
      <div className="bg-surface-container-high p-sm flex items-center justify-between border-b border-outline-variant/20 shrink-0">
        <div className="flex items-center">
          <div
            className="w-6 h-6 rounded flex items-center justify-center mr-xs text-white"
            style={{ backgroundColor: config.bgColor }}
          >
            <Icon
              name={config.iconName}
              filled={config.iconFilled}
              className="text-[14px]"
            />
          </div>
          <span className="font-body-sm font-semibold">{label}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-outline-variant tracking-wider">
          {signals.length} {t('radar.sinais')}
        </span>
      </div>

      {/* Scrollable signal list */}
      <div className="overflow-y-auto p-0 flex-1">
        {source === 'linkedin' &&
          signals.map((s) => <LinkedInSignalItem key={s._id} signal={s} />)}
        {source === 'youtube' &&
          signals.map((s, i) => (
            <YouTubeSignalItem key={s._id} signal={s} isLast={i === signals.length - 1} />
          ))}
        {source === 'telegram' &&
          signals.map((s, i) => (
            <TelegramSignalItem key={s._id} signal={s} isLast={i === signals.length - 1} />
          ))}
      </div>
    </div>
  )
}
