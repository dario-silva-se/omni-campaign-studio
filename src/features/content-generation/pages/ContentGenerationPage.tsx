import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { PostCard } from '../components/PostCard'
import {
  useContentGenerationData,
  useGenerateContent,
} from '../hooks/useContentGeneration'
import type { GeneratedPost } from '@/types'

export default function ContentGenerationPage() {
  const { t } = useTranslation(['contentGeneration', 'common'])
  const { data, isLoading, isError } = useContentGenerationData()
  const generateMutation = useGenerateContent()
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null)

  if (isError) {
    return (
      <div role="alert" className="p-lg text-error">
        {t('common:errorState')}
      </div>
    )
  }

  if (isLoading || !data) {
    return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>
  }

  const handleGenerate = async () => {
    const result = await generateMutation.mutateAsync(undefined)
    setGeneratedPost({
      _id: `generated-${Date.now()}`,
      content: result.content,
      channel: 'linkedin',
      status: 'draft',
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top header */}
      <header className="glass-panel h-16 w-full flex justify-between items-center px-lg z-40 flex-shrink-0">
        <h1 className="font-title-md text-title-md text-on-surface">{t('title')}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-variant"
          >
            <Icon name="sync" />
          </button>
          <button
            type="button"
            className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-variant relative"
          >
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="flex items-center gap-2 bg-gradient-to-b from-primary-container to-[#3b7de6] text-white px-lg py-2 rounded-lg font-title-md text-[14px] font-semibold hover:brightness-110 active:brightness-95 transition-all border border-overlay-md shadow-[0_4px_12px_rgba(75,142,255,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Icon name="auto_awesome" className="text-[18px]" />
            {generateMutation.isPending ? t('generating') : t('generateBtn')}
          </button>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto p-gutter relative z-10">
        <div className="mb-lg flex justify-between items-end">
          <p className="font-body-lg text-body-lg text-on-surface-variant">{t('subtitle')}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
          {/* Generated */}
          <div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-outline-variant/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 text-outline">
              <div className="w-2 h-2 rounded-full bg-outline" />
              <span className="font-label-caps text-label-caps tracking-wider">{t('stats.generated')}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display-lg text-display-lg text-on-surface">
                {data.stats.generated}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {t('stats.generatedSub')}
              </span>
            </div>
          </div>

          {/* Scheduled */}
          <div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary-container/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-label-caps text-label-caps tracking-wider">{t('stats.scheduled')}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display-lg text-display-lg text-on-surface">
                {data.stats.scheduled}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {t('stats.scheduledSub')}
              </span>
            </div>
          </div>

          {/* Published */}
          <div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-label-caps text-label-caps tracking-wider">{t('stats.published')}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-display-lg text-display-lg text-on-surface">
                {data.stats.published}
              </span>
              <span className="font-body-sm text-body-sm text-emerald-400/80">
                {t('stats.publishedSub')}
              </span>
            </div>
          </div>
        </div>

        {/* Generated content preview (after mutation) */}
        {generatedPost && (
          <div className="mb-lg p-md rounded-xl bg-primary/5 border border-primary/20">
            <p className="font-label-caps text-label-caps text-primary mb-2">
              {t('generatedSuccess')}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface">{generatedPost.content}</p>
          </div>
        )}

        {/* Kanban columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md h-[calc(100vh-280px)] min-h-[500px]">
          {/* Drafts */}
          <div className="bg-surface-container/30 rounded-xl border border-outline-variant/20 flex flex-col">
            <div className="p-sm border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-outline" />
                <h3 className="font-title-md text-[14px] text-on-surface">
                  {t('columns.drafts')}
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">
                {data.drafts.length}
              </span>
            </div>
            <div className="flex-1 p-sm space-y-sm overflow-y-auto">
              {data.drafts.map((post) => (
                <PostCard key={post._id} post={post} variant="draft" />
              ))}
            </div>
          </div>

          {/* Scheduled */}
          <div className="bg-surface-container/30 rounded-xl border border-outline-variant/20 flex flex-col">
            <div className="p-sm border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-title-md text-[14px] text-on-surface">
                  {t('columns.scheduled')}
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">
                {data.scheduled.length}
              </span>
            </div>
            <div className="flex-1 p-sm space-y-sm overflow-y-auto">
              {data.scheduled.map((post) => (
                <PostCard key={post._id} post={post} variant="scheduled" />
              ))}
            </div>
          </div>

          {/* Published */}
          <div className="bg-surface-container/30 rounded-xl border border-outline-variant/20 flex flex-col">
            <div className="p-sm border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="font-title-md text-[14px] text-on-surface">
                  {t('columns.published')}
                </h3>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full">
                {data.published.length}
              </span>
            </div>
            <div className="flex-1 p-sm space-y-sm overflow-y-auto">
              {data.published.map((post) => (
                <PostCard key={post._id} post={post} variant="published" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
