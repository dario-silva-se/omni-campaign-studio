import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { Post } from '@/types'

interface Props { post: Post }

const RETENTION_BARS = [85, 80, 78, 74, 70, 65, 60, 55, 50, 48, 45, 42]

export function YouTubePostDetail({ post }: Props) {
  const { t } = useTranslation('posts')
  const d = post.youTubeDetail

  return (
    <div className="p-lg min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-xl">
        <div>
          <div className="flex items-center gap-xs text-on-surface-variant mb-base font-label-caps text-[10px] tracking-widest">
            <span>CAMPANHAS</span>
            <Icon name="chevron_right" className="text-[12px]" />
            <span>{d?.channelName ?? 'Tech Channel Alpha'}</span>
            <Icon name="chevron_right" className="text-[12px]" />
            <span className="text-primary">DETALHES DO POST</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-md mt-sm">
            <span className="flex items-center gap-xs bg-green-500/10 text-green-400 px-sm py-base rounded-full text-label-caps border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              {d?.visibility ?? 'PÚBLICO'}
            </span>
            <span className="text-on-surface-variant font-body-sm">
              {post.publishedAt ? `Publicado em ${new Date(post.publishedAt).toLocaleDateString('pt-BR')}` : ''}
            </span>
            <span className="text-on-surface-variant font-body-sm">•</span>
            <span className="text-on-surface-variant font-body-sm">{d?.channelName ?? ''}</span>
          </div>
        </div>
        <div className="flex gap-md">
          <button className="flex items-center gap-xs border border-white/10 px-lg py-md rounded-lg font-label-caps text-label-caps hover:bg-white/5 transition-all">
            <Icon name="download" className="text-[20px]" /> {t('detail.downloadAnalytics')}
          </button>
          <button className="flex items-center gap-xs border border-white/10 px-lg py-md rounded-lg font-label-caps text-label-caps hover:bg-white/5 transition-all">
            <Icon name="open_in_new" className="text-[20px]" /> {t('detail.viewOnYouTube')}
          </button>
          <button className="flex items-center gap-xs bg-primary text-on-primary px-lg py-md rounded-lg font-label-caps text-label-caps hover:brightness-110 transition-all">
            <Icon name="edit" className="text-[20px]" /> {t('detail.editVideo')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-lg">
        {/* Left */}
        <div className="col-span-12 xl:col-span-7 space-y-lg">
          {/* Video preview */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 overflow-hidden rounded-xl relative aspect-video flex items-center justify-center">
            <Icon name="play_circle" className="text-primary text-[80px] opacity-60" filled />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-md py-xs rounded-lg text-label-caps border border-white/10 text-[10px]">
              12:44
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <h3 className="font-title-md text-title-md mb-md">{t('detail.youtube.postMetadata')}</h3>
            <div className="grid grid-cols-2 gap-xl">
              <div className="space-y-md">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">{t('detail.youtube.description')}</p>
                  <p className="text-body-sm text-on-surface line-clamp-3">{d?.description ?? post.content}</p>
                </div>
                <div className="flex flex-wrap gap-xs">
                  {(d?.tags ?? []).map((tag) => (
                    <span key={tag} className="bg-surface-container-high px-sm py-xs rounded text-[10px] font-bold text-on-surface-variant">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-md">
                {[
                  { label: t('detail.youtube.category'), value: d?.category ?? '—' },
                  { label: t('detail.youtube.visibility'), value: d?.visibility ?? '—' },
                  { label: t('detail.youtube.language'), value: d?.language ?? '—' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center pb-sm border-b border-white/5">
                    <span className="font-label-caps text-on-surface-variant">{row.label}</span>
                    <span className="text-body-sm font-bold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement breakdown */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-title-md text-title-md">{t('detail.youtube.engagementBreakdown')}</h3>
              <div className="flex items-center gap-xs">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[10px] font-label-caps text-green-400">{d?.sentimentPositive ?? '—'} {t('detail.youtube.sentimentPositive')}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-lg">
              {[
                { icon: 'thumb_up', label: t('detail.youtube.likes'), value: d?.likes ?? '—', trend: '+12.4%', pos: true },
                { icon: 'forum', label: t('detail.youtube.comments'), value: d?.comments ?? '—', trend: '+4.1%', pos: true },
                { icon: 'share', label: t('detail.youtube.shares' as const), value: d?.shares ?? '—', trend: '+22.8%', pos: true },
              ].map((m) => (
                <div key={m.label} className="p-md rounded-lg bg-surface-container-lowest border border-white/5">
                  <div className="flex items-center justify-between mb-xs">
                    <Icon name={m.icon} className="text-primary" />
                    <span className={`font-label-caps text-[10px] ${m.pos ? 'text-green-400' : 'text-red-400'}`}>{m.trend}</span>
                  </div>
                  <p className="font-headline-lg text-headline-lg">{m.value}</p>
                  <p className="font-label-caps text-on-surface-variant">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 xl:col-span-5 space-y-lg">
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-md">
            {[
              { label: t('detail.youtube.views'), value: d?.views ?? '—', trend: d?.viewsTrend, pos: d?.viewsTrendPositive },
              { label: t('detail.youtube.watchTime'), value: d?.watchTimeHrs ?? '—', trend: d?.watchTimeTrend, pos: d?.watchTimeTrendPositive },
              { label: t('detail.youtube.subGrowth'), value: d?.subGrowth ?? '—', trend: d?.subGrowthTrend, pos: d?.subGrowthTrendPositive },
              { label: t('detail.youtube.avgViewDuration'), value: d?.avgViewDuration ?? '—', trend: d?.avgViewTrend, pos: d?.avgViewTrendPositive },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{kpi.label}</p>
                <p className="font-headline-lg text-[24px] font-bold">{kpi.value}</p>
                {kpi.trend && (
                  <p className={`text-[10px] font-bold ${kpi.pos ? 'text-green-400' : 'text-red-400'}`}>{kpi.trend}</p>
                )}
              </div>
            ))}
          </div>

          {/* Audience retention */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-title-md text-[14px]">{t('detail.youtube.audienceRetention')}</h4>
              <span className="text-xs text-on-surface-variant">MÉDIA: {d?.audienceRetentionAvg ?? '—'}</span>
            </div>
            <div className="flex items-end gap-xs h-24">
              {RETENTION_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/30 rounded-t-sm hover:bg-primary/60 transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-on-surface-variant opacity-50 mt-xs font-label-caps">
              <span>0:00</span><span>INTRO</span><span>PEAK</span><span>OUTRO</span><span>12:44</span>
            </div>
          </div>

          {/* Traffic sources */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 p-lg rounded-xl">
            <h4 className="font-title-md text-[14px] mb-md">{t('detail.youtube.trafficSources')}</h4>
            <div className="space-y-sm">
              {(d?.trafficSources ?? []).map((src) => (
                <div key={src.label} className="flex items-center gap-md">
                  <span className="text-body-sm flex-1">{src.label}</span>
                  <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${src.pct}%` }} />
                  </div>
                  <span className="text-xs font-bold w-12 text-right">{src.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
