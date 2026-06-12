import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import type { Template } from '@/types'

interface Props {
  template: Template
}

export function YouTubeTemplateDetail({ template }: Props) {
  const { t } = useTranslation('templates')
  const d = template.youTubeDetail
  const tags = d?.tags ?? []
  const estCtr = d?.estimatedCtr ?? '—'
  const scriptPacing = d?.scriptPacing ?? '—'
  const retentionScore = d?.retentionScore ?? '—'
  const checklist = d?.viralChecklist ?? []

  return (
    <div className="p-lg h-full overflow-hidden flex flex-col">
      {/* Breadcrumb + actions */}
      <div className="flex justify-between items-end mb-lg">
        <div>
          <nav className="flex gap-md mb-xs text-on-surface-variant font-label-caps uppercase tracking-wider text-[10px]">
            <span className="hover:text-primary cursor-pointer">{t('youtube.breadcrumbProjects')}</span>
            <span>/</span>
            <span className="text-primary">{template.name}</span>
          </nav>
          <h2 className="font-headline-lg text-headline-lg">{t('youtube.title')}</h2>
        </div>
        <div className="flex gap-md">
          <Button variant="ghost" leadingIcon="save" className="px-md py-sm rounded-xl text-body-sm">
            {t('detail.saveDraft')}
          </Button>
          <Button variant="primary" leadingIcon="auto_fix_high" className="px-md py-sm rounded-xl text-body-sm">
            {t('youtube.title')}
          </Button>
        </div>
      </div>

      {/* Editor / Preview grid */}
      <div className="grid grid-cols-12 gap-lg flex-1 overflow-hidden">
        {/* Left pane: editing (7 cols) */}
        <section className="col-span-12 md:col-span-7 flex flex-col gap-lg overflow-y-auto pr-md">
          {/* Video Title */}
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-primary uppercase">{t('youtube.videoTitle')}</label>
              <button
                type="button"
                className="flex items-center gap-xs text-[11px] font-bold bg-tertiary-container/20 text-tertiary px-sm py-1 rounded-full border border-tertiary/20 hover:bg-tertiary-container/30 transition-all"
              >
                <Icon name="auto_awesome" className="text-[14px]" />
                {t('youtube.aiEnhance')}
              </button>
            </div>
            <input
              className="bg-surface-container-lowest border border-outline-variant/30 focus:border-primary/50 focus:ring-0 rounded-xl p-md text-on-surface font-title-md outline-none"
              placeholder={template.name}
              type="text"
            />
          </div>

          {/* Script Editor */}
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-md">
              <label className="font-label-caps text-primary uppercase">{t('youtube.scriptEditor')}</label>
              <div className="flex gap-sm">
                {['format_bold', 'format_italic', 'format_list_bulleted', 'history'].map((ic) => (
                  <button key={ic} type="button" className="p-1.5 hover:bg-surface-variant/30 rounded transition-all">
                    <Icon name={ic} className="text-[18px]" />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-md">
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{t('youtube.hook')}</p>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary/40 focus:ring-0 rounded-xl p-md text-body-lg text-primary outline-none"
                  placeholder={t('youtube.hookPlaceholder')}
                  rows={2}
                  defaultValue={d?.hook ?? ''}
                />
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{t('youtube.introValue')}</p>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary/40 focus:ring-0 rounded-xl p-md text-body-lg outline-none"
                  placeholder={t('youtube.introPlaceholder')}
                  rows={3}
                  defaultValue={d?.introValueProp ?? ''}
                />
              </div>
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{t('youtube.mainBody')}</p>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary/40 focus:ring-0 rounded-xl p-md text-body-lg outline-none"
                  placeholder={t('youtube.mainBodyPlaceholder')}
                  rows={10}
                  defaultValue={d?.mainBody ?? ''}
                />
              </div>
            </div>
          </div>

          {/* Thumbnail Strategy */}
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-primary uppercase">{t('youtube.thumbnailStrategy')}</label>
              <button
                type="button"
                className="flex items-center gap-xs text-[11px] font-bold bg-primary-container/20 text-primary px-sm py-1 rounded-full border border-primary/20 hover:bg-primary-container/30 transition-all"
              >
                <Icon name="magic_button" className="text-[14px]" />
                {t('youtube.magicWrite')}
              </button>
            </div>
            <textarea
              className="bg-surface-container-lowest border border-outline-variant/30 focus:border-primary/50 focus:ring-0 rounded-xl p-md text-body-sm text-on-surface outline-none"
              placeholder={t('youtube.thumbnailPlaceholder')}
              rows={3}
              defaultValue={d?.thumbnailStrategy ?? ''}
            />
          </div>

          {/* Tags & Media */}
          <div className="grid grid-cols-2 gap-md mb-xl">
            <div className="glass-panel p-lg rounded-xl flex flex-col gap-md">
              <label className="font-label-caps text-primary uppercase">{t('youtube.tagsKeywords')}</label>
              <div className="flex flex-wrap gap-xs">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-variant/40 border border-outline-variant/30 text-body-sm px-md py-1 rounded-full flex items-center gap-xs"
                  >
                    {tag} <Icon name="close" className="text-[14px] cursor-pointer" />
                  </span>
                ))}
                <button
                  type="button"
                  className="border border-dashed border-outline-variant/50 text-[11px] px-md py-1 rounded-full text-on-surface-variant hover:text-primary transition-all"
                >
                  {t('youtube.addNew')}
                </button>
              </div>
            </div>
            <div className="glass-panel p-lg rounded-xl flex flex-col gap-md border-dashed border-outline-variant/40 hover:border-primary/40 transition-colors group cursor-pointer">
              <label className="font-label-caps text-primary uppercase">{t('youtube.mediaAsset')}</label>
              <div className="flex flex-col items-center justify-center py-md text-on-surface-variant group-hover:text-primary transition-all">
                <Icon name="cloud_upload" className="text-[32px] mb-xs" />
                <p className="text-[11px] text-center">{t('youtube.mediaHint')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right pane: Preview & Analytics (5 cols) */}
        <section className="col-span-12 md:col-span-5 flex flex-col gap-lg overflow-y-auto">
          {/* Video player */}
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl relative group aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-red-600/30">
                <Icon name="play_arrow" className="text-white text-[32px]" filled />
              </div>
            </div>
            {/* Thumbnail placeholder */}
            <div className="w-full h-full bg-surface-container-highest opacity-60 flex items-center justify-center">
              <Icon name="videocam" className="text-on-surface-variant/30 text-[64px]" />
            </div>
            {/* View toggle */}
            <div className="absolute top-md right-md flex bg-surface/90 backdrop-blur rounded-lg border border-outline-variant/20 overflow-hidden p-1">
              <button type="button" className="px-sm py-1 rounded bg-primary/20 text-primary text-[10px] font-bold">DESKTOP</button>
              <button type="button" className="px-sm py-1 rounded text-on-surface-variant hover:text-on-surface text-[10px] font-bold">MOBILE</button>
            </div>
          </div>

          {/* Optimization panel */}
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-lg">
            <div className="flex items-center gap-sm">
              <Icon name="analytics" className="text-tertiary" />
              <h3 className="font-title-md text-title-md">{t('youtube.optimizationAnalysis')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/10">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{t('youtube.estCtr')}</p>
                <div className="flex items-end gap-xs">
                  <span className="text-headline-lg font-bold text-primary">{estCtr}</span>
                  <span className="text-green-400 text-[11px] mb-1.5 flex items-center">
                    <Icon name="arrow_upward" className="text-[14px]" /> 12%
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant/10">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-xs">{t('youtube.scriptPacing')}</p>
                <div className="flex items-end gap-xs">
                  <span className="text-headline-lg font-bold text-on-surface">{scriptPacing}</span>
                  <div className="flex gap-0.5 mb-2.5">
                    {[true, true, true, false].map((filled, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 rounded-full ${filled ? 'bg-primary' : 'bg-outline-variant/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex justify-between items-center text-body-sm">
                <span className="text-on-surface-variant">{t('youtube.retentionScore')}</span>
                <span className="text-on-surface">{retentionScore}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[88%] shadow-[0_0_8px_rgba(173,198,255,0.5)]" />
              </div>
            </div>
          </div>

          {/* Viral checklist */}
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md">
            <h3 className="font-label-caps text-on-surface-variant mb-xs">{t('youtube.viralChecklist')}</h3>
            <div className="space-y-sm">
              {checklist.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-md p-sm bg-surface-variant/20 rounded-lg border border-outline-variant/10 ${item.passed ? '' : 'opacity-60'}`}
                >
                  <Icon
                    name={item.passed ? 'check_circle' : 'radio_button_unchecked'}
                    className={item.passed ? 'text-green-400' : 'text-on-surface-variant'}
                    filled={item.passed}
                  />
                  <div className="flex-1">
                    <p className="text-body-sm font-bold">{item.label}</p>
                    <p className="text-[11px] text-on-surface-variant">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Floating action button */}
      <button
        type="button"
        className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
        aria-label="AI Assistant"
      >
        <Icon name="smart_toy" className="text-[28px]" />
      </button>
    </div>
  )
}
