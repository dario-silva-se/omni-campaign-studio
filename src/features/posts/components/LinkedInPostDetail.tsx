import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { Post } from '@/types'

interface Props { post: Post }

const CHART_HEIGHTS = [30, 45, 40, 60, 55, 80, 75, 95]
const CHART_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Hoje']

export function LinkedInPostDetail({ post }: Props) {
  const { t } = useTranslation('posts')
  const d = post.linkedInDetail

  return (
    <div className="p-lg min-h-screen">
      {/* Breadcrumb + actions */}
      <div className="flex justify-between items-center mb-lg">
        <nav className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant text-[10px]">
          <a href="/posts" className="hover:text-primary">{t('detail.breadcrumbCampaigns')}</a>
          <Icon name="chevron_right" className="text-[12px]" />
          <a href="#" className="hover:text-primary">Creative Lab</a>
          <Icon name="chevron_right" className="text-[12px]" />
          <span className="text-on-surface">LinkedIn Post #1234</span>
        </nav>
        <div className="flex gap-md">
          <button className="px-lg py-xs border border-white/10 rounded font-label-caps text-label-caps hover:bg-white/5 transition-all flex items-center gap-xs">
            <Icon name="share" className="text-[18px]" /> {t('detail.shareReport')}
          </button>
          <button className="px-lg py-xs bg-primary text-on-primary rounded font-label-caps text-label-caps hover:brightness-110 transition-all flex items-center gap-xs font-bold active:scale-95">
            <Icon name="edit" className="text-[18px]" /> {t('detail.edit')}
          </button>
        </div>
      </div>

      {/* Page header */}
      <div className="mb-xl">
        <h1 className="font-display-lg text-[40px] font-bold tracking-tight mb-sm">{post.title}</h1>
        <div className="flex items-center gap-md">
          <span className="flex items-center gap-xs bg-green-500/10 text-green-400 px-sm py-1 rounded-full text-xs font-bold uppercase border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t(`overview.status.${post.status}`)}
          </span>
          <span className="text-on-surface-variant font-body-sm opacity-60">
            {d?.authorName ? `Criado por ${d.authorName}` : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Left: metrics + chart + history */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-md">
            {[
              { label: t('detail.linkedin.totalImpressions'), value: d?.totalImpressions ?? '—', trend: d?.impressionsTrend, pos: d?.impressionsTrendPositive },
              { label: t('detail.linkedin.engagementRate'), value: d?.engagementRate ?? '—', trend: d?.engagementTrend, pos: d?.engagementTrendPositive },
              { label: t('detail.linkedin.clicks'), value: d?.clicks ?? '—', trend: d?.clicksTrend, pos: d?.clicksTrendPositive },
              { label: t('detail.linkedin.shares'), value: d?.shares ?? '—', trend: d?.sharesTrend, pos: d?.sharesTrendPositive },
            ].map((m) => (
              <div key={m.label} className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{m.label}</p>
                <h3 className="font-headline-lg text-headline-lg font-bold">{m.value}</h3>
                {m.trend && (
                  <p className={`font-body-sm text-body-sm flex items-center gap-1 mt-base ${m.pos ? 'text-green-400' : 'text-red-400'}`}>
                    <Icon name={m.pos ? 'trending_up' : 'trending_down'} className="text-[16px]" />
                    {m.trend}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Engagement chart */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl h-64 flex flex-col">
            <div className="flex justify-between items-center mb-lg">
              <h4 className="font-title-md text-title-md font-bold">{t('detail.engagementOverTime')}</h4>
              <div className="flex gap-xs">
                <button className="px-sm py-1 bg-white/5 rounded text-xs font-bold">7D</button>
                <button className="px-sm py-1 border border-white/10 rounded text-xs font-bold opacity-40">30D</button>
              </div>
            </div>
            <div className="flex-grow flex items-end justify-between px-md pb-xs">
              {CHART_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`w-[8%] rounded-t-sm hover:bg-primary transition-all ${i === CHART_HEIGHTS.length - 1 ? 'bg-primary' : 'bg-primary/20'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between px-md pt-base border-t border-white/5 font-label-caps text-label-caps text-on-surface-variant opacity-40">
              {CHART_DAYS.map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>

          {/* History */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <h4 className="font-title-md text-title-md font-bold mb-lg">{t('detail.postHistory')}</h4>
            <div className="space-y-lg relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {(d?.history ?? []).map((h, i) => (
                <div key={i} className="flex gap-lg relative">
                  <div className={`w-6 h-6 rounded-full border-4 border-background z-10 shrink-0 ${h.type === 'publish' ? 'bg-primary' : h.type === 'approve' ? 'bg-green-500/50' : 'bg-surface-variant'}`} />
                  <div>
                    <p className="font-body-lg font-bold">{h.event}</p>
                    <p className="font-body-sm text-on-surface-variant opacity-60">{h.actor} • {h.timeAgo}</p>
                    {h.quote && <p className="mt-xs bg-white/5 p-sm rounded text-xs italic border-l-2 border-primary">{h.quote}</p>}
                    {h.note && <p className="mt-xs text-xs text-on-surface-variant">{h.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: LinkedIn preview + distribution */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          <div className="bg-[#1D2226] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-md flex items-start gap-md">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Icon name="person" className="text-white/60" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-white text-sm">{d?.authorName ?? 'Matheus B.'}</h5>
                  <Icon name="more_horiz" className="text-white/60 text-[20px]" />
                </div>
                <p className="text-xs text-white/60 leading-tight">{d?.authorTitle ?? ''}</p>
              </div>
            </div>
            <div className="px-md pb-md">
              <p className="text-white text-sm leading-normal line-clamp-3">{post.content}</p>
            </div>
            <div className="w-full aspect-square bg-surface-container relative flex items-center justify-center">
              <Icon name="image" className="text-on-surface-variant opacity-30 text-[48px]" />
            </div>
            <div className="p-sm border-b border-white/5 flex items-center justify-between text-[11px] text-white/60">
              <span>{d?.shares ?? '0'} curtidas</span>
              <span>24 comentários</span>
            </div>
            <div className="flex justify-around p-xs text-white/60">
              {['thumb_up', 'comment', 'share'].map((icon) => (
                <button key={icon} className="flex items-center gap-xs py-2 px-md hover:bg-white/5 rounded transition-all text-xs font-bold">
                  <Icon name={icon} className="text-[18px]" />
                </button>
              ))}
            </div>
          </div>

          {/* Distribution info */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl space-y-md">
            <h4 className="font-title-md text-title-md font-bold">{t('detail.distributionInfo')}</h4>
            <div className="space-y-sm">
              {[
                { label: t('detail.targetAudience'), value: d?.targetAudience ?? '—' },
                { label: t('detail.publicationDate'), value: d?.publicationDate ?? '—' },
                { label: t('detail.status'), value: d?.postStatus ?? '—', highlight: true },
                { label: t('detail.platform'), value: 'LinkedIn Professional' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-sm border-b border-white/5">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">{row.label}</span>
                  <span className={`font-body-sm font-bold ${row.highlight ? 'text-primary' : ''}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-md py-sm border border-primary/30 text-primary rounded font-label-caps text-label-caps hover:bg-primary/10 transition-all flex items-center justify-center gap-xs">
              <Icon name="bolt" className="text-[18px]" /> {t('detail.promotePost')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
