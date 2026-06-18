import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { usePostList } from '../hooks/usePosts'
import type { Channel, PostStatus } from '@/types'

type TabFilter = 'all' | Channel

const STATUS_COLORS: Record<PostStatus, string> = {
  scheduled: 'bg-primary/20 text-primary',
  published: 'bg-[#4ADE80]/20 text-[#4ADE80]',
  draft: 'bg-secondary/20 text-secondary',
  failed: 'bg-error/20 text-error',
  'pending-approval': 'bg-tertiary/20 text-tertiary',
}

const CHANNEL_ICON: Record<Channel, string> = {
  linkedin: 'work',
  youtube: 'play_circle',
  telegram: 'send',
}

const WEEK_DAYS = [
  { day: 'Seg', date: '21', posts: '2 Posts', color: 'border-primary' },
  { day: 'Ter', date: '22', posts: '1 Post (Rascunho)', color: 'border-secondary-container' },
  { day: 'Qua', date: '23', posts: null, color: '' },
  { day: 'Qui', date: '24', posts: '3 Posts', color: 'border-primary' },
]

export default function PostsOverviewPage() {
  const { t } = useTranslation(['posts', 'common'])
  const navigate = useNavigate()
  const { data: posts, isLoading, isError } = usePostList()
  const [activeTab, setActiveTab] = useState<TabFilter>('all')

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !posts) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  const filtered = activeTab === 'all' ? posts : posts.filter((p) => p.channel === activeTab)
  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length
  const draftCount = posts.filter((p) => p.status === 'draft').length
  const publishedCount = posts.filter((p) => p.status === 'published').length

  const tabs: { key: TabFilter; label: string }[] = [
    { key: 'all', label: t('overview.tabs.all') },
    { key: 'linkedin', label: t('overview.tabs.linkedin') },
    { key: 'youtube', label: t('overview.tabs.youtube') },
    { key: 'telegram', label: t('overview.tabs.telegram') },
  ]

  return (
    <div className="p-xl max-w-[1440px] mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{t('overview.title')}</h1>
          <p className="text-on-surface-variant opacity-60">
            {t('overview.subtitle', { count: scheduledCount })}
          </p>
        </div>
        <div className="flex gap-md">
          <div className="flex bg-surface-container-low p-xs rounded-xl border border-outline-variant/10">
            <button className="px-md py-xs bg-primary/10 text-primary rounded-lg font-bold text-sm">
              {t('overview.gridView')}
            </button>
            <button className="px-md py-xs text-on-surface-variant hover:text-on-surface rounded-lg font-bold text-sm transition-colors">
              {t('overview.calendarView')}
            </button>
          </div>
          <Button
            variant="subtle"
            leadingIcon="add"
            onClick={() => navigate('/posts/new')}
            className="border border-primary/20 text-primary bg-primary/10 hover:bg-primary/20 px-lg py-md rounded-xl font-bold"
          >
            {t('overview.createNew')}
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
        {[
          { label: t('overview.stats.nextUp'), value: '14:00', desc: t('overview.stats.nextUpDesc'), icon: 'schedule', color: 'text-primary' },
          { label: t('overview.stats.scheduled'), value: String(scheduledCount).padStart(2, '0'), desc: t('overview.stats.scheduledDesc'), icon: 'event_available', color: 'text-secondary' },
          { label: t('overview.stats.drafts'), value: String(draftCount).padStart(2, '0'), desc: t('overview.stats.draftsDesc'), icon: 'edit_note', color: 'text-tertiary' },
          { label: t('overview.stats.successful'), value: String(publishedCount), desc: t('overview.stats.successfulDesc'), icon: 'check_circle', color: 'text-[#4ADE80]' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
            <div className="flex justify-between items-start mb-md">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{stat.label}</span>
              <Icon name={stat.icon} className={stat.color} />
            </div>
            <div className="text-[28px] font-bold">{stat.value}</div>
            <p className="text-body-sm text-on-surface-variant">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-lg border-b border-outline-variant/10 mb-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-md border-b-2 font-bold transition-colors ${
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Post cards grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-lg">
          {filtered.map((post) => (
            <div
              key={post._id}
              className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl overflow-hidden flex flex-col group cursor-pointer hover:border-primary/30 transition-all"
              onClick={() => navigate(`/posts/${post._id}`)}
            >
              {/* Image area */}
              <div className="relative aspect-video bg-surface-container-highest flex items-center justify-center overflow-hidden">
                <Icon name={CHANNEL_ICON[post.channel]} className="text-on-surface-variant opacity-20 text-[64px]" />
                <div className="absolute top-md left-md flex gap-xs">
                  <span className="bg-black/60 backdrop-blur-md px-xs py-base rounded flex items-center gap-xs">
                    <Icon name={CHANNEL_ICON[post.channel]} className="text-[16px]" />
                  </span>
                  <span className={`backdrop-blur-md text-[10px] px-xs py-base rounded-full font-bold uppercase tracking-wider ${STATUS_COLORS[post.status]}`}>
                    {t(`overview.status.${post.status}`)}
                  </span>
                </div>
                {post.scheduledFor && (
                  <div className="absolute bottom-md right-md bg-black/80 backdrop-blur-md px-xs py-base rounded text-[10px] font-bold">
                    {new Date(post.scheduledFor).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
                {post.publishedAt && (
                  <div className="absolute bottom-md right-md bg-black/80 backdrop-blur-md px-xs py-base rounded text-[10px] font-bold">
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-lg flex flex-col flex-1">
                <h3 className="font-title-md text-on-surface mb-xs line-clamp-1">{post.title}</h3>
                <p className="text-body-sm text-on-surface-variant opacity-70 mb-lg line-clamp-2">{post.content}</p>
                <div className="mt-auto flex justify-between items-center">
                  {post.metrics && post.metrics.impressions > 0 ? (
                    <div className="flex items-center gap-xs text-[12px] text-[#4ADE80]">
                      <Icon name="visibility" className="text-[16px]" />
                      <span>{(post.metrics.impressions / 1000).toFixed(1)}k Views</span>
                    </div>
                  ) : (
                    <span className="text-xs text-on-surface-variant bg-surface-container-high px-xs py-base rounded italic">
                      {post.status === 'draft' ? 'Aguardando Mídia' : '—'}
                    </span>
                  )}
                  <div className="flex gap-xs">
                    {post.status === 'published' ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); navigate(`/posts/${post._id}`) }}
                          className="p-xs hover:bg-surface-variant/30 rounded-lg transition-colors"
                        >
                          <Icon name="analytics" className="text-[18px]" />
                        </button>
                        <button type="button" className="p-xs hover:bg-surface-variant/30 rounded-lg transition-colors">
                          <Icon name="share" className="text-[18px]" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="p-xs hover:bg-surface-variant/30 rounded-lg transition-colors">
                          <Icon name="edit" className="text-[18px]" />
                        </button>
                        <button type="button" className="p-xs hover:bg-surface-variant/30 rounded-lg transition-colors text-error">
                          <Icon name="delete" className="text-[18px]" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-lg">
          {/* Upcoming week */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
            <div className="flex justify-between items-center mb-lg">
              <h4 className="font-title-md text-[16px]">{t('overview.upcomingWeek')}</h4>
              <Icon name="calendar_month" className="text-primary" />
            </div>
            <div className="space-y-md">
              {WEEK_DAYS.map(({ day, date, posts: dayPosts, color }) => (
                <div key={date} className={`flex items-center gap-md ${!dayPosts ? 'opacity-50' : ''}`}>
                  <div className="w-12 text-center">
                    <div className="text-[10px] text-on-surface-variant uppercase">{day}</div>
                    <div className="font-bold">{date}</div>
                  </div>
                  {dayPosts ? (
                    <div className={`flex-1 bg-surface-container-high p-xs rounded border-l-4 ${color}`}>
                      <div className="text-[12px] font-bold">{dayPosts}</div>
                    </div>
                  ) : (
                    <div className="flex-1 border border-dashed border-outline-variant/30 p-xs rounded">
                      <div className="text-[12px]">{t('overview.noSchedules')}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-lg text-primary text-sm font-bold flex items-center justify-center gap-xs">
              {t('overview.viewFullCalendar')} <Icon name="arrow_forward" className="text-[16px]" />
            </button>
          </div>

          {/* Platform status */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
            <h4 className="font-title-md text-[16px] mb-lg">{t('overview.platformStatus')}</h4>
            <div className="space-y-md">
              {(['linkedin', 'youtube', 'telegram'] as Channel[]).map((ch) => (
                <div key={ch} className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                      <Icon name={CHANNEL_ICON[ch]} className="text-primary text-[16px]" />
                    </div>
                    <span className="text-sm font-bold capitalize">{ch}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                    <span className="text-[12px] text-on-surface-variant">{t('overview.connected')}</span>
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-xs border border-dashed border-outline-variant/20 rounded-lg p-xs text-on-surface-variant text-[12px] flex items-center justify-center gap-xs hover:border-primary/40 transition-colors"
              >
                <Icon name="add" className="text-[16px]" />
              </button>
            </div>
          </div>

          {/* Smart Scheduler */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg border-l-4 border-l-primary">
            <div className="flex items-center gap-sm mb-md">
              <Icon name="auto_awesome" className="text-primary" />
              <h4 className="font-title-md text-[14px]">{t('overview.smartScheduler')}</h4>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-relaxed mb-md">
              {t('overview.smartSchedulerDesc')}
            </p>
            <button className="text-primary text-sm font-bold hover:underline">
              {t('overview.optimizeSchedule')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
