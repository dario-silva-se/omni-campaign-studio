import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAiNewsList, useToggleBookmark } from '../hooks/useAiNews'
import { Icon } from '@/components/ui/Icon'
import { aiNewsDigestFixture } from '@/mocks/fixtures/aiNews'
import type { AiNewsCategory, AiNewsRelevance } from '@/types'

const REFETCH_INTERVAL_MS = 5 * 60 * 1000

const CATEGORY_FILTERS: Array<{ key: AiNewsCategory | 'all' }> = [
  { key: 'all' },
  { key: 'models' },
  { key: 'tools' },
  { key: 'research' },
  { key: 'industry' },
  { key: 'product' },
]

const CATEGORY_ICONS: Record<AiNewsCategory, string> = {
  models: 'smart_toy',
  tools: 'build',
  research: 'science',
  industry: 'trending_up',
  product: 'deployed_code',
}

const RELEVANCE_COLORS: Record<AiNewsRelevance, string> = {
  high: 'text-primary bg-primary/10',
  medium: 'text-tertiary bg-tertiary/10',
  low: 'text-on-surface-variant bg-surface-variant',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatRelativeTime(ts: number, now: number): string {
  const diffMin = Math.floor((now - ts) / 60_000)
  if (diffMin < 1) return 'agora'
  if (diffMin === 1) return 'há 1 min'
  return `há ${diffMin} min`
}

function countUniqueSources(sources: string[]): number {
  return new Set(sources).size
}

export default function AiNewsPage() {
  const { t } = useTranslation('aiNews')
  const [activeFilter, setActiveFilter] = useState<AiNewsCategory | 'all'>('all')
  const [showBookmarked, setShowBookmarked] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  const { data: articles, isLoading, isError, isFetching, dataUpdatedAt, refetch } = useAiNewsList()
  const toggleBookmark = useToggleBookmark()

  // Tick every second so the countdown stays live without calling Date.now() in render
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (isLoading) return <p className="p-lg text-on-surface-variant">{t('common:loading')}</p>
  if (isError)
    return (
      <p role="alert" className="p-lg text-error">
        {t('common:errorState')}
      </p>
    )

  const list = articles ?? []
  const digest = aiNewsDigestFixture[0]

  const filtered = list
    .filter((a) => !showBookmarked || a.bookmarked)
    .filter((a) => activeFilter === 'all' || a.category === activeFilter)

  const highRelevanceCount = list.filter((a) => a.relevance === 'high').length
  const sourcesCount = countUniqueSources(list.map((a) => a.source))
  const remainingMs = dataUpdatedAt ? Math.max(0, dataUpdatedAt + REFETCH_INTERVAL_MS - now) : REFETCH_INTERVAL_MS
  const countdownMin = Math.ceil(remainingMs / 60_000)

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-lg">
        {/* Header */}
        <section className="mb-md">
          <div className="flex items-start justify-between gap-md">
            <div>
              <h2 className="text-3xl font-bold text-on-surface">{t('page.title')}</h2>
              <p className="text-on-surface-variant mt-1">{t('page.subtitle')}</p>
            </div>

            {/* Sync status bar */}
            <div className="flex items-center gap-md shrink-0 mt-1">
              {isFetching ? (
                <span className="flex items-center gap-xs text-xs text-primary font-mono">
                  <Icon name="sync" className="text-sm animate-spin" />
                  {t('page.sync.updating')}
                </span>
              ) : (
                <span className="flex items-center gap-xs text-xs text-on-surface-variant/60 font-mono">
                  <Icon name="check_circle" className="text-sm text-primary/60" />
                  {dataUpdatedAt ? t('page.sync.updatedAt', { time: formatRelativeTime(dataUpdatedAt, now) }) : '—'}
                </span>
              )}

              <span className="text-xs text-on-surface-variant/40 font-mono hidden sm:block">
                {t('page.sync.nextIn', { min: countdownMin })}
              </span>

              <button
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label={t('page.sync.refreshNow')}
                className="flex items-center gap-xs text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors disabled:opacity-40 border border-overlay-md px-md py-1 rounded-full"
              >
                <Icon name="refresh" className={`text-sm ${isFetching ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{t('page.sync.refreshNow')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-lg mb-lg">
          <div className="bg-surface-container border border-overlay-md p-lg rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {t('page.stats.totalArticles')}
            </p>
            <div className="flex items-baseline gap-md">
              <span className="text-5xl font-black text-primary">{list.length}</span>
            </div>
            <div className="absolute -right-3 -bottom-3 opacity-10">
              <Icon name="article" className="text-[72px]" />
            </div>
          </div>

          <div className="bg-surface-container border border-overlay-md p-lg rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {t('page.stats.highRelevance')}
            </p>
            <div className="flex items-baseline gap-md">
              <span className="text-5xl font-black text-tertiary">{highRelevanceCount}</span>
            </div>
            <div className="absolute -right-3 -bottom-3 opacity-10">
              <Icon name="trending_up" className="text-[72px]" />
            </div>
          </div>

          <div className="bg-surface-container border border-overlay-md p-lg rounded-xl flex flex-col justify-between h-28 relative overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {t('page.stats.sources')}
            </p>
            <div className="flex items-baseline gap-md">
              <span className="text-5xl font-black text-on-surface">{sourcesCount}</span>
            </div>
            <div className="absolute -right-3 -bottom-3 opacity-10">
              <Icon name="rss_feed" className="text-[72px]" />
            </div>
          </div>
        </section>

        <div className="flex gap-lg">
          {/* Main feed */}
          <div className="flex-1 flex flex-col gap-lg min-w-0">
            {/* Filters */}
            <div className="flex items-center gap-sm flex-wrap">
              {CATEGORY_FILTERS.map(({ key }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-md py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    activeFilter === key
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-overlay-md'
                  }`}
                >
                  {t(`page.filters.${key}`)}
                </button>
              ))}

              <button
                onClick={() => setShowBookmarked((v) => !v)}
                className={`ml-auto flex items-center gap-sm px-md py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  showBookmarked
                    ? 'bg-tertiary/20 text-tertiary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-overlay-md'
                }`}
              >
                <Icon name="bookmark" className="text-base" />
                {t('page.bookmarked')}
              </button>
            </div>

            {/* Articles */}
            <div className="flex flex-col gap-md">
              {filtered.length === 0 && (
                <p className="text-on-surface-variant text-center py-xl">{t('page.noArticles')}</p>
              )}

              {filtered.map((article) => (
                <article
                  key={article._id}
                  className="bg-surface-container/60 backdrop-blur-lg border border-overlay-sm rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
                >
                  <div className="p-lg flex gap-lg">
                    {/* Category icon */}
                    <div className="bg-primary/10 rounded-xl p-md flex items-center justify-center shrink-0 w-12 h-12">
                      <Icon name={CATEGORY_ICONS[article.category]} className="text-primary text-2xl" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-md">
                        <h3 className="text-base font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <button
                          onClick={() =>
                            toggleBookmark.mutate({ id: article._id, bookmarked: !article.bookmarked })
                          }
                          aria-label={article.bookmarked ? t('page.card.unbookmark') : t('page.card.bookmark')}
                          className={`shrink-0 transition-colors ${
                            article.bookmarked
                              ? 'text-tertiary'
                              : 'text-on-surface-variant/40 hover:text-on-surface-variant'
                          }`}
                        >
                          <Icon name={article.bookmarked ? 'bookmark' : 'bookmark_border'} className="text-xl" />
                        </button>
                      </div>

                      <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{article.summary}</p>

                      {/* Meta row */}
                      <div className="mt-md flex items-center gap-md flex-wrap">
                        <span
                          className={`text-xs font-bold px-sm py-0.5 rounded uppercase tracking-wider ${RELEVANCE_COLORS[article.relevance]}`}
                        >
                          {t(`page.relevance.${article.relevance}`)}
                        </span>

                        <span className="text-xs text-on-surface-variant font-mono flex items-center gap-1">
                          <Icon name="schedule" className="text-sm" />
                          {t('page.card.readTime', { min: article.readTimeMin })}
                        </span>

                        <span className="text-xs text-on-surface-variant">{article.source}</span>

                        <span className="text-xs text-on-surface-variant/60 font-mono ml-auto">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-sm flex gap-xs flex-wrap">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono text-on-surface-variant/60 bg-surface-variant/40 px-xs py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Digest sidebar */}
          <aside className="hidden lg:flex flex-col gap-lg w-80 shrink-0">
            {digest && (
              <div className="bg-surface-container/60 backdrop-blur-lg border border-overlay-sm rounded-xl overflow-hidden sticky top-lg">
                {/* Header */}
                <div className="p-lg border-b border-overlay-sm">
                  <div className="flex items-center justify-between mb-xs">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      {t('page.digest.title')}
                    </h4>
                    <span className="flex items-center gap-xs text-[10px] text-primary font-mono uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {t('page.digest.poweredBy')}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/60 font-mono">{digest.weekLabel}</p>
                  <p className="text-sm font-semibold text-on-surface mt-md leading-snug">{digest.headline}</p>
                </div>

                {/* Highlights */}
                <div className="p-lg">
                  <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-md">
                    {t('page.digest.highlights')}
                  </p>
                  <ul className="space-y-md">
                    {digest.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-md">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <p className="text-sm text-on-surface-variant leading-snug">{highlight}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-lg pb-lg">
                  <p className="text-[10px] text-on-surface-variant/40 font-mono">
                    {new Date(digest.generatedAt).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Atmospheric glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-tertiary/5 blur-[150px] rounded-full" />
      </div>
    </div>
  )
}
