import { useTranslation } from 'react-i18next'
import type {
  AnalyticsChannelLinkedIn,
  AnalyticsChannelYouTube,
  AnalyticsChannelTelegram,
} from '@/types'

interface Props {
  linkedin: AnalyticsChannelLinkedIn
  youtube: AnalyticsChannelYouTube
  telegram: AnalyticsChannelTelegram
}

export function ChannelMetricsGrid({ linkedin, youtube, telegram }: Props) {
  const { t } = useTranslation('analytics')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-xl">
      {/* LinkedIn */}
      <div className="glass-panel subtle-highlight p-lg rounded-xl flex flex-col">
        <div className="flex items-center gap-md mb-lg">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-400 text-[20px]">work</span>
          </div>
          <div>
            <h5 className="font-title-md text-body-lg">{t('valueMetrics.linkedin.title')}</h5>
            <span className="text-xs text-on-surface-variant">
              {t('valueMetrics.linkedin.subtitle')}
            </span>
          </div>
        </div>
        <div className="space-y-md mb-lg">
          <div>
            <p className="text-xs text-on-surface-variant uppercase mb-2">
              {t('valueMetrics.linkedin.engagementBySeniority')}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{t('valueMetrics.linkedin.cLevel')}</span>
                <span className="font-bold">{linkedin.cLevelPct}%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${linkedin.cLevelPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span>{t('valueMetrics.linkedin.director')}</span>
                <span className="font-bold">{linkedin.directorPct}%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${linkedin.directorPct}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-outline-variant">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.linkedin.ctrVideoContent')}
            </span>
            <span className="font-bold text-primary">{linkedin.ctrVideoContent}</span>
          </div>
        </div>
      </div>

      {/* YouTube */}
      <div className="glass-panel subtle-highlight p-lg rounded-xl flex flex-col">
        <div className="flex items-center gap-md mb-lg">
          <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-400 text-[20px]">play_circle</span>
          </div>
          <div>
            <h5 className="font-title-md text-body-lg">{t('valueMetrics.youtube.title')}</h5>
            <span className="text-xs text-on-surface-variant">
              {t('valueMetrics.youtube.subtitle')}
            </span>
          </div>
        </div>
        <div className="space-y-md mb-lg">
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.youtube.avgViewDuration')}
            </span>
            <span className="font-bold">{youtube.avgViewDuration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.youtube.retentionRate')}
            </span>
            <span className="font-bold">{youtube.retentionRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.youtube.watchTime')}
            </span>
            <span className="font-bold">{youtube.watchTimeHours}</span>
          </div>
        </div>
        <div
          className="mt-auto h-16 w-full relative border-l border-b border-outline-variant/30"
          role="img"
          aria-label={t('valueMetrics.youtube.chartAriaLabel')}
        >
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <path
              d="M0 5 Q 25 10, 50 25 T 100 35"
              fill="none"
              stroke="#ffb59a"
              strokeWidth="2"
            />
          </svg>
          <span className="absolute top-0 left-1 text-[8px] text-on-surface-variant">
            {t('valueMetrics.youtube.retentionCurve')}
          </span>
        </div>
      </div>

      {/* Telegram */}
      <div className="glass-panel subtle-highlight p-lg rounded-xl flex flex-col">
        <div className="flex items-center gap-md mb-lg">
          <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-300 text-[20px]">send</span>
          </div>
          <div>
            <h5 className="font-title-md text-body-lg">{t('valueMetrics.telegram.title')}</h5>
            <span className="text-xs text-on-surface-variant">
              {t('valueMetrics.telegram.subtitle')}
            </span>
          </div>
        </div>
        <div className="space-y-md mb-lg">
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.telegram.readRate')}
            </span>
            <span className="font-bold text-tertiary">{telegram.readRatePct}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.telegram.linkClicks')}
            </span>
            <span className="font-bold">{telegram.linkClicks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant">
              {t('valueMetrics.telegram.memberRetention')}
            </span>
            <span className="font-bold">{telegram.memberRetentionPct}</span>
          </div>
        </div>
        <div
          className="mt-auto h-12 w-full flex items-end gap-1"
          role="img"
          aria-label={t('valueMetrics.telegram.chartAriaLabel')}
        >
          <div className="flex-1 h-3/4 bg-tertiary/40 rounded-t-sm" />
          <div className="flex-1 h-4/5 bg-tertiary/40 rounded-t-sm" />
          <div className="flex-1 h-full bg-tertiary rounded-t-sm shadow-[0_0_8px_#c0c1ff]" />
          <div className="flex-1 h-5/6 bg-tertiary/40 rounded-t-sm" />
        </div>
      </div>
    </div>
  )
}
