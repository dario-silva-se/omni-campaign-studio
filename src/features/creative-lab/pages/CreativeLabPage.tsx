import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { AssetPanel } from '../components/AssetPanel'
import { PublishSafeguards } from '../components/PublishSafeguards'
import { useCreativeDraft } from '../hooks/useCreativeDraft'
import type { CreativeFormat, CreativePublishContext } from '@/types'

const DRAFT_ID = 'creative-draft-001'

const FORMAT_OPTIONS: { value: CreativeFormat; key: string }[] = [
  { value: 'single-image', key: 'format.singleImage' },
  { value: 'carousel', key: 'format.carousel' },
  { value: 'video', key: 'format.video' },
  { value: 'story-reel', key: 'format.storyReel' },
]

const CTA_OPTIONS = ['Learn More', 'Sign Up', 'Download Now']

export default function CreativeLabPage() {
  const { t } = useTranslation(['creativeLab', 'common'])
  const { data, isLoading, isError } = useCreativeDraft(DRAFT_ID)

  const [format, setFormat] = useState<CreativeFormat>('single-image')
  const [publishContext, setPublishContext] = useState<CreativePublishContext>('company-page')
  const [headline, setHeadline] = useState('')
  const [primaryText, setPrimaryText] = useState('')
  const [cta, setCta] = useState('Learn More')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [initialized, setInitialized] = useState(false)

  // Initialize state from fixture once data loads
  if (data && !initialized) {
    setFormat(data.format)
    setPublishContext(data.publishContext)
    setHeadline(data.headline)
    setPrimaryText(data.primaryText)
    setCta(data.cta)
    setInitialized(true)
  }

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

  const handleToggle = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // All REQUIRED items must be either auto-checked or user-checked
  const requiredItems = data.complianceItems.filter((item) => item.required)
  const canPublish = requiredItems.every(
    (item) => item.autoChecked || checkedIds.has(item.id),
  )

  // Count unresolved issues (required items not yet checked/auto)
  const issueCount = requiredItems.filter(
    (item) => !item.autoChecked && !checkedIds.has(item.id),
  ).length

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top header bar */}
      <header className="glass-panel h-16 w-full flex justify-between items-center px-lg z-40 flex-shrink-0">
        <nav className="flex items-center space-x-2 text-on-surface-variant font-body-sm text-body-sm">
          <a href="#" className="hover:text-primary transition-colors">
            {t('breadcrumb.campaigns')}
          </a>
          <Icon name="chevron_right" className="text-[16px]" />
          <span className="text-on-surface font-semibold">{t('breadcrumb.newCreative')}</span>
        </nav>
        <div className="flex items-center gap-md">
          <button
            type="button"
            className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface font-body-sm text-body-sm hover:bg-surface-variant/30 transition-colors"
          >
            {t('header.saveDraft')}
          </button>
          {issueCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-error-container/10 border border-error-container/20">
              <Icon name="warning" className="text-secondary-container text-[18px]" />
              <span className="text-[12px] font-semibold text-secondary-container">
                {t('header.issues', { count: issueCount })}
              </span>
            </div>
          )}
          <button
            type="button"
            disabled={!canPublish}
            className="px-4 py-1.5 rounded-lg bg-primary text-on-primary-container font-title-md text-title-md !text-[14px] flex items-center gap-2 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/90"
            aria-label={t('header.finalize')}
          >
            <Icon name="check_circle" className="text-[18px]" />
            {t('header.finalize')}
          </button>
        </div>
      </header>

      {/* Canvas area */}
      <div className="flex-1 overflow-hidden flex gap-md p-md">
        {/* Left: Content inputs */}
        <section className="w-[320px] flex-shrink-0 flex flex-col gap-md overflow-y-auto pr-2 pb-8">
          {/* Format selector */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
              <Icon name="view_carousel" className="text-[16px]" />
              {t('format.title')}
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {FORMAT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormat(opt.value)}
                  className={
                    format === opt.value
                      ? 'py-2 px-3 rounded-lg bg-primary/10 border border-primary/30 text-primary font-body-sm text-body-sm text-center'
                      : 'py-2 px-3 rounded-lg border border-outline-variant/20 text-on-surface-variant font-body-sm text-body-sm text-center hover:bg-surface-variant/20'
                  }
                >
                  {t(opt.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Publishing context */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
              <Icon name="account_circle" className="text-[16px]" />
              {t('publishContext.title')}
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              <label
                className={`flex items-center gap-3 p-2 rounded-lg bg-surface-container border border-outline-variant/20 cursor-pointer hover:border-primary/30 transition-colors ${
                  publishContext === 'company-page'
                    ? 'ring-1 ring-primary/50 border-primary/50 shadow-[0_0_15px_rgba(173,198,255,0.1)]'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="pub_context"
                  className="w-4 h-4 accent-primary bg-surface-container-highest border-outline-variant/30"
                  checked={publishContext === 'company-page'}
                  onChange={() => setPublishContext('company-page')}
                />
                <span className="font-body-sm text-body-sm text-on-surface">
                  {t('publishContext.companyPage')}
                </span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-lg border border-outline-variant/10 cursor-pointer hover:bg-surface-variant/20 transition-colors">
                <input
                  type="radio"
                  name="pub_context"
                  className="w-4 h-4 accent-primary bg-surface-container-highest border-outline-variant/30"
                  checked={publishContext === 'personal-profile'}
                  onChange={() => setPublishContext('personal-profile')}
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {t('publishContext.personalProfile')}
                </span>
              </label>
            </div>
          </div>

          {/* Media assets */}
          <AssetPanel assets={data.assets} />

          {/* Copywriting */}
          <div className="glass-card p-lg rounded-xl flex flex-col gap-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
              <Icon name="edit_note" className="text-[16px]" />
              {t('copywriting.title')}
            </h3>
            <div className="mt-2 flex flex-col gap-4">
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-1.5 opacity-80">
                  {t('copywriting.headline')}
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block font-body-sm text-body-sm text-on-surface opacity-80">
                    {t('copywriting.primaryText')}
                  </label>
                  <button
                    type="button"
                    className="text-primary hover:underline text-[10px] font-label-caps"
                  >
                    {t('copywriting.aiGenerate')}
                  </button>
                </div>
                <textarea
                  value={primaryText}
                  onChange={(e) => setPrimaryText(e.target.value)}
                  rows={4}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-1.5 opacity-80">
                  {t('copywriting.cta')}
                </label>
                <select
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                >
                  {CTA_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Center: Live preview */}
        <section className="flex-1 flex flex-col min-w-0 bg-surface-container-high rounded-2xl border border-outline-variant/10 overflow-hidden relative shadow-2xl">
          {/* Preview toolbar */}
          <div className="h-14 border-b border-outline-variant/10 bg-surface-container-low flex justify-center items-center gap-md px-4 shrink-0">
            <div className="flex bg-surface rounded-lg p-1 border border-outline-variant/10">
              <button
                type="button"
                onClick={() => setPreviewMode('desktop')}
                className={`px-4 py-1.5 rounded-md font-body-sm text-body-sm flex items-center gap-2 shadow-sm ${
                  previewMode === 'desktop'
                    ? 'bg-surface-variant text-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface transition-colors'
                }`}
              >
                <Icon name="laptop_mac" className="text-[16px]" />
                {t('preview.desktop')}
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('mobile')}
                className={`px-4 py-1.5 rounded-md font-body-sm text-body-sm flex items-center gap-2 ${
                  previewMode === 'mobile'
                    ? 'bg-surface-variant text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface transition-colors'
                }`}
              >
                <Icon name="smartphone" className="text-[16px]" />
                {t('preview.mobile')}
              </button>
            </div>
            <div className="h-6 w-px bg-outline-variant/20 mx-2" />
            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                className="flex items-center gap-1.5 px-2 py-1 rounded border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors"
              >
                <Icon name="grid_guides" className="text-[16px]" />
                <span className="text-[11px] font-label-caps">{t('preview.safeZones')}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/30"
                title="LinkedIn Preview"
              >
                <span className="font-bold text-sm">in</span>
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface text-on-surface-variant flex items-center justify-center border border-outline-variant/20 hover:text-on-surface hover:bg-surface-variant transition-colors"
                title="Instagram Preview"
              >
                <Icon name="photo_camera" className="text-[18px]" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface text-on-surface-variant flex items-center justify-center border border-outline-variant/20 hover:text-on-surface hover:bg-surface-variant transition-colors"
                title="YouTube Preview"
              >
                <Icon name="play_arrow" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Preview canvas */}
          <div className="flex-1 overflow-y-auto p-lg flex justify-center items-start bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-variant/20 to-transparent">
            <div className="w-full max-w-[540px] bg-surface rounded-xl border border-outline-variant/10 shadow-lg overflow-hidden mt-8">
              {/* Post header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-outline-variant/10 flex items-center justify-center">
                  <Icon name="business" className="text-primary" />
                </div>
                <div>
                  <h4 className="font-title-md text-title-md !text-[15px] !leading-tight text-on-surface">
                    Campaign Studio
                  </h4>
                  <p className="font-body-sm text-body-sm !text-[12px] text-on-surface-variant">
                    {t('preview.promoted')}
                  </p>
                </div>
                <button type="button" className="ml-auto text-on-surface-variant">
                  <Icon name="more_horiz" />
                </button>
              </div>
              {/* Post text */}
              <div className="px-4 pb-3">
                <p className="font-body-sm text-body-sm text-on-surface whitespace-pre-wrap">
                  {primaryText}
                </p>
              </div>
              {/* Media placeholder */}
              <div className="w-full aspect-video bg-surface-container-highest relative overflow-hidden border-y border-outline-variant/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-surface-variant to-primary/10 flex items-center justify-center">
                  <Icon name="image" className="text-4xl text-on-surface-variant/30" />
                </div>
              </div>
              {/* Post CTA */}
              <div className="p-4 bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant/10">
                <div className="flex-1 pr-4">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                    campaignstudio.com
                  </p>
                  <h5 className="font-title-md text-title-md !text-[16px] text-on-surface leading-tight truncate">
                    {headline}
                  </h5>
                </div>
                <button
                  type="button"
                  className="shrink-0 px-4 py-2 rounded-full bg-surface-container-highest border border-outline-variant/20 text-on-surface font-title-md text-title-md !text-[14px] hover:bg-surface-variant transition-colors"
                >
                  {cta}
                </button>
              </div>
              {/* Engagement mock */}
              <div className="px-4 py-2 border-t border-outline-variant/10 flex items-center gap-4 text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <Icon name="thumb_up" className="text-[18px]" />
                  <span className="text-xs">1.2k</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="chat_bubble_outline" className="text-[18px]" />
                  <span className="text-xs">48</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="share" className="text-[18px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Optimizer + Publish Safeguards */}
        <PublishSafeguards
          complianceItems={data.complianceItems}
          suggestions={data.suggestions}
          checkedIds={checkedIds}
          onToggle={handleToggle}
          onPublish={() => {
            // Publish action
          }}
          canPublish={canPublish}
        />
      </div>
    </div>
  )
}
