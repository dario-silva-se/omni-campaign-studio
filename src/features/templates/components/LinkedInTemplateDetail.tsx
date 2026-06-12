import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import type { Template } from '@/types'

interface Props {
  template: Template
}

export function LinkedInTemplateDetail({ template }: Props) {
  const { t } = useTranslation('templates')
  const d = template.linkedInDetail
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop')

  const headline = d?.headline ?? ''
  const contentBody = d?.contentBody ?? ''
  const hashtags = d?.hashtags ?? []
  const authorName = d?.authorName ?? 'Marcus Thorne'
  const authorTitle = d?.authorTitle ?? ''
  const estEngagement = d?.estimatedEngagement ?? 0
  const bestPractices = d?.bestPractices ?? []
  const sentimentTone = d?.sentimentTone ?? []

  return (
    <section className="flex-grow flex overflow-hidden">
      {/* Left: content fields */}
      <div className="w-full md:w-[45%] flex flex-col border-r border-outline-variant/10 bg-surface-container-lowest">
        <div className="flex-grow overflow-y-auto p-lg space-y-xl">
          {/* Post Headline */}
          <div className="space-y-sm">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-on-surface-variant uppercase tracking-widest">
                {t('linkedin.postHeadline')}
              </label>
              <span className="text-[10px] bg-tertiary/10 text-tertiary px-sm py-0.5 rounded-full border border-tertiary/20">
                {t('linkedin.aiEnhanced')}
              </span>
            </div>
            <input
              className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl p-md text-on-surface font-title-md focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              type="text"
              defaultValue={headline}
            />
          </div>

          {/* Content Body */}
          <div className="space-y-sm">
            <label className="font-label-caps text-on-surface-variant uppercase tracking-widest">
              {t('linkedin.contentBody')}
            </label>
            <div className="relative">
              <textarea
                className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl p-md text-body-lg text-on-surface-variant focus:ring-2 focus:ring-primary/50 transition-all outline-none resize-none leading-relaxed"
                rows={10}
                defaultValue={contentBody}
              />
              <button
                type="button"
                className="absolute bottom-md right-md flex items-center gap-xs bg-surface-container-highest border border-outline-variant/30 px-md py-sm rounded-full text-primary hover:bg-primary/10 transition-all active:scale-95"
              >
                <Icon name="auto_awesome" className="scale-90" />
                <span className="font-label-caps">{t('linkedin.optimizeContent')}</span>
              </button>
            </div>
          </div>

          {/* Hashtag Generator */}
          <div className="space-y-sm">
            <label className="font-label-caps text-on-surface-variant uppercase tracking-widest">
              {t('linkedin.hashtagGenerator')}
            </label>
            <div className="flex flex-wrap gap-xs">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-container-high px-md py-xs rounded-full text-body-sm text-on-surface-variant border border-outline-variant/10"
                >
                  {tag} <button type="button" className="ml-xs opacity-50">×</button>
                </span>
              ))}
              <button
                type="button"
                className="bg-primary/10 text-primary px-md py-xs rounded-full text-body-sm border border-primary/20"
              >
                {t('linkedin.suggestTags')}
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-sm">
            <label className="font-label-caps text-on-surface-variant uppercase tracking-widest">
              {t('linkedin.mediaAsset')}
            </label>
            <div className="border-2 border-dashed border-outline-variant/20 rounded-xl p-xl flex flex-col items-center justify-center hover:bg-surface-variant/5 transition-colors cursor-pointer group">
              <Icon name="cloud_upload" className="text-primary scale-150 mb-md group-hover:scale-[1.6] transition-transform" />
              <p className="font-body-lg text-on-surface">{t('linkedin.mediaUploadLabel')}</p>
              <p className="font-body-sm text-on-surface-variant opacity-60">{t('linkedin.mediaUploadHint')}</p>
            </div>
          </div>
        </div>

        {/* Footer action bar */}
        <div className="p-lg border-t border-outline-variant/10 flex gap-md bg-surface-container-low">
          <Button variant="subtle" className="flex-grow py-md rounded-xl font-bold">{t('detail.saveDraft')}</Button>
          <Button variant="primary" leadingIcon="send" className="flex-grow py-md rounded-xl font-bold">
            {t('detail.sendForApproval')}
          </Button>
        </div>
      </div>

      {/* Right: live preview + metrics sidebar */}
      <div className="hidden md:flex md:w-[55%] bg-background relative overflow-hidden flex-col">
        {/* View toggle */}
        <div className="flex justify-between items-center p-lg z-10">
          <div className="flex bg-surface-container-high p-1 rounded-full border border-outline-variant/10">
            <button
              type="button"
              onClick={() => setView('desktop')}
              className={`px-lg py-xs rounded-full text-body-sm font-bold transition-all ${view === 'desktop' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {t('linkedin.desktopView')}
            </button>
            <button
              type="button"
              onClick={() => setView('mobile')}
              className={`px-lg py-xs rounded-full text-body-sm font-bold transition-all ${view === 'mobile' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {t('linkedin.mobileView')}
            </button>
          </div>
          <div className="flex items-center gap-md">
            <span className="text-body-sm text-on-surface-variant">{t('linkedin.livePreviewing')}</span>
          </div>
        </div>

        {/* Preview canvas */}
        <div className="flex-grow flex items-center justify-center p-xl z-10 overflow-hidden relative">
          {view === 'desktop' ? (
            <div className="w-full max-w-[550px] bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden shadow-lg">
              {/* LinkedIn post header */}
              <div className="p-md flex gap-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <Icon name="person" className="text-on-surface-variant" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-xs">
                    <span className="font-bold text-on-surface">{authorName}</span>
                    <span className="text-on-surface-variant opacity-60">• 1st</span>
                  </div>
                  <span className="text-[12px] text-on-surface-variant leading-tight">{authorTitle}</span>
                  <div className="flex items-center gap-xs text-[10px] text-on-surface-variant opacity-60">
                    <span>Now</span>
                    <span>•</span>
                    <Icon name="public" className="text-[12px]" />
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="px-md pb-sm text-body-sm text-on-surface space-y-md">
                <p className="font-bold">{headline}</p>
                <p className="text-on-surface-variant">
                  {contentBody.slice(0, 80)}...{' '}
                  <span className="text-primary-container font-semibold cursor-pointer">{t('linkedin.seeMore')}</span>
                </p>
              </div>
              {/* Media placeholder */}
              <div className="w-full aspect-[4/5] bg-surface-container-highest flex items-center justify-center">
                <Icon name="image" className="text-on-surface-variant text-[48px] opacity-30" />
              </div>
              {/* Engagement footer */}
              <div className="p-sm flex justify-between border-t border-outline-variant/10 text-on-surface-variant">
                <div className="flex gap-md items-center">
                  {[
                    { icon: 'thumb_up', label: t('linkedin.like') },
                    { icon: 'comment', label: t('linkedin.comment') },
                    { icon: 'repeat', label: t('linkedin.repost') },
                  ].map((btn) => (
                    <div key={btn.label} className="flex items-center gap-xs hover:bg-surface-variant/20 px-sm py-1 rounded cursor-pointer">
                      <Icon name={btn.icon} className="scale-90" />
                      <span className="text-body-sm font-semibold">{btn.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-xs hover:bg-surface-variant/20 px-sm py-1 rounded cursor-pointer">
                  <Icon name="send" className="scale-90" />
                  <span className="text-body-sm font-semibold">{t('linkedin.send')}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile view */
            <div className="h-[80%] aspect-[9/19.5] bg-surface-container-lowest rounded-[40px] border-[8px] border-surface-container-high relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-6 bg-surface-container-high flex justify-center items-center">
                <div className="w-16 h-4 bg-black rounded-full" />
              </div>
              <div className="mt-8 p-md h-full overflow-y-auto">
                <div className="flex gap-sm mb-md">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest" />
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface text-sm">{authorName}</span>
                    <span className="text-[10px] text-on-surface-variant">{authorTitle.split('|')[0]}</span>
                  </div>
                </div>
                <p className="text-xs mb-sm leading-relaxed">{headline}...</p>
                <div className="w-full aspect-[4/5] bg-surface-container-highest rounded-lg mb-md" />
              </div>
            </div>
          )}
        </div>

        {/* Metrics sidebar (absolute right) */}
        <div className="absolute right-md top-1/2 -translate-y-1/2 flex flex-col gap-md w-[180px] z-20">
          {/* Engagement score */}
          <div className="glass-panel p-md rounded-xl space-y-sm">
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-on-surface-variant text-[10px] uppercase">{t('linkedin.estEngagement')}</span>
              <Icon name="bolt" className="text-primary scale-75" />
            </div>
            <div className="text-headline-lg font-bold text-primary">{estEngagement}%</div>
            <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${estEngagement}%` }} />
            </div>
            <p className="text-[10px] text-on-surface-variant leading-tight">
              Pontuação proprietária baseada no histórico de desempenho.
            </p>
          </div>
          {/* Best practices */}
          <div className="glass-panel p-md rounded-xl space-y-sm border-l-4 border-l-primary/40">
            <span className="font-label-caps text-on-surface-variant text-[10px] uppercase">{t('linkedin.bestPractices')}</span>
            <ul className="space-y-xs">
              {bestPractices.map((bp) => (
                <li key={bp.label} className={`flex items-center gap-xs text-[10px] ${bp.passed ? '' : 'text-on-surface-variant/40'}`}>
                  <Icon
                    name={bp.passed ? 'check_circle' : 'radio_button_unchecked'}
                    className={`scale-50 ${bp.passed ? 'text-primary' : ''}`}
                    filled={bp.passed}
                  />
                  <span>{bp.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Sentiment */}
          <div className="glass-panel p-md rounded-xl space-y-sm">
            <span className="font-label-caps text-on-surface-variant text-[10px] uppercase">{t('linkedin.sentimentTone')}</span>
            {sentimentTone.map((st) => (
              <div key={st.label} className="flex items-center justify-between">
                <span className="text-[10px] opacity-60">{st.label}</span>
                <span className="text-[10px] text-primary">{st.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
