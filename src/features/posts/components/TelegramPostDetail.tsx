import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { Post } from '@/types'

interface Props { post: Post }

export function TelegramPostDetail({ post }: Props) {
  const { t } = useTranslation('posts')
  const d = post.telegramDetail

  return (
    <div className="p-lg min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-lg">
        <nav className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant">
          <a href="/posts" className="hover:text-primary">{t('detail.breadcrumbCampaigns')}</a>
          <Icon name="chevron_right" className="text-[12px]" />
          <a href="#" className="hover:text-primary">Creative Circle</a>
          <Icon name="chevron_right" className="text-[12px]" />
          <span className="text-on-surface">Post #{d?.referralId ?? ''}</span>
        </nav>
        <div className="flex gap-md">
          <button className="px-lg py-xs border border-overlay-md rounded font-label-caps text-label-caps hover:bg-overlay-sm transition-all flex items-center gap-xs">
            <Icon name="edit" className="text-[18px]" /> {t('detail.edit')}
          </button>
          <button className="px-lg py-xs bg-primary text-on-primary rounded font-label-caps text-label-caps hover:brightness-110 transition-all flex items-center gap-xs font-bold">
            <Icon name="open_in_new" className="text-[18px]" /> {t('detail.viewOnTelegram')}
          </button>
        </div>
      </div>

      {/* Page title */}
      <div className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg font-bold">{post.title}</h1>
        <div className="flex items-center gap-md mt-sm">
          <span className="flex items-center gap-xs bg-green-500/10 text-green-400 px-sm py-1 rounded-full text-xs font-bold border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t(`overview.status.${post.status}`)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-lg">
        {/* Left: metrics + velocity + history */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-md">
            <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('detail.telegram.totalReach')}</p>
              <h3 className="font-headline-lg text-headline-lg font-bold">{d?.totalReach ?? '—'}</h3>
              {d?.reachTrend && (
                <p className={`font-body-sm text-body-sm flex items-center gap-1 mt-base ${d.reachTrendPositive ? 'text-green-400' : 'text-red-400'}`}>
                  <Icon name={d.reachTrendPositive ? 'trending_up' : 'trending_down'} className="text-[16px]" />
                  {d.reachTrend}
                </p>
              )}
            </div>
            <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('detail.telegram.forwardCount')}</p>
              <h3 className="font-headline-lg text-headline-lg font-bold">{d?.forwardCount ?? '—'}</h3>
            </div>
            <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('detail.telegram.reactionCount')}</p>
              <h3 className="font-headline-lg text-headline-lg font-bold">{d?.reactionCount ?? '—'}</h3>
            </div>
          </div>

          {/* Engagement velocity chart */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <h4 className="font-title-md text-[16px] font-bold mb-md">{t('detail.telegram.engagementVelocity')}</h4>
            <div className="flex items-end gap-xs h-32 px-md">
              {(d?.velocityBars ?? []).map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-primary/30 hover:bg-primary/60 transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-on-surface-variant opacity-40 mt-xs px-md font-label-caps">
              <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span>
            </div>
          </div>

          {/* History + audit */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <h4 className="font-title-md text-title-md font-bold mb-lg">{t('detail.telegram.postHistoryAudit')}</h4>
            <div className="space-y-lg">
              {(d?.history ?? []).map((h, i) => (
                <div key={i} className="flex items-start gap-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${h.type === 'publish' ? 'bg-primary/20' : 'bg-surface-container-high'}`}>
                    <Icon
                      name={h.type === 'publish' ? 'send' : h.type === 'approve' ? 'check_circle' : 'edit'}
                      className={`text-[16px] ${h.type === 'publish' ? 'text-primary' : 'text-on-surface-variant'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-body-sm text-on-surface">{h.event}</p>
                    <p className="text-[11px] text-on-surface-variant opacity-60">{h.actor} — {h.timeAgo}</p>
                  </div>
                  {h.badge && (
                    <span className={`text-[10px] font-bold px-xs py-base rounded font-label-caps ${h.type === 'publish' ? 'bg-green-500/10 text-green-400' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      {h.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Telegram preview + info */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          {/* Telegram preview */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl overflow-hidden">
            <div className="bg-surface-container-highest/80 p-md flex items-center gap-md border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">CC</div>
              <div>
                <p className="font-bold text-on-surface text-body-sm">Creative Circle</p>
                <p className="text-[11px] text-on-surface-variant">{d?.targetChannel ?? ''}</p>
              </div>
            </div>
            <div className="p-lg">
              <div className="bg-surface-container-high rounded-2xl rounded-tr-sm p-0 overflow-hidden ml-auto max-w-[90%]">
                <div className="aspect-video bg-surface-container-highest flex items-center justify-center">
                  <Icon name="image" className="text-on-surface-variant opacity-30 text-[32px]" />
                </div>
                <div className="p-sm">
                  <p className="text-on-surface text-xs leading-relaxed line-clamp-3">{post.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                    <span className="text-[10px] text-on-surface-variant">14:40</span>
                    <Icon name="done_all" className="text-[12px] text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution info */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl space-y-sm">
            {[
              { label: t('detail.telegram.targetChannel'), value: d?.targetChannel ?? '—' },
              { label: t('detail.telegram.publicationDate'), value: d?.publicationDate ?? '—' },
              { label: t('detail.telegram.referralId'), value: d?.referralId ?? '—' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-sm border-b border-overlay-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant">{row.label}</span>
                <span className="font-body-sm font-bold">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
