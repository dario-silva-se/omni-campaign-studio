import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { Channel } from '@/types'

type ComposerChannel = Channel | null

const CHANNEL_OPTIONS: { key: Channel; label: string; icon: string }[] = [
  { key: 'youtube', label: 'YouTube', icon: 'play_circle' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'work' },
  { key: 'telegram', label: 'Telegram', icon: 'send' },
]

function LinkedInComposer() {
  const { t } = useTranslation('posts')
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'document' | 'poll'>('text')
  const [hashtags] = useState(['#EstratégiaDigital', '#Marketing828', '#Inovação', '#Campanhas2024'])

  return (
    <div className="grid grid-cols-12 gap-lg">
      {/* Editor */}
      <div className="col-span-12 lg:col-span-7 space-y-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg">{t('new.linkedin.title')}</h1>
          <p className="text-on-surface-variant opacity-70">{t('new.linkedin.subtitle')}</p>
        </div>

        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg space-y-md">
          {/* Tabs */}
          <div className="flex items-center gap-md border-b border-outline-variant/10 pb-sm">
            {(['text', 'image', 'document', 'poll'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-md py-xs rounded-lg text-sm font-bold transition-colors ${
                  activeTab === tab ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t(`new.linkedin.tabs.${tab}`)}
              </button>
            ))}
          </div>

          <div>
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-sm block">
              {t('new.linkedin.postBody')}
            </label>
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 resize-none min-h-[180px] font-body-lg"
              placeholder={t('new.linkedin.bodyPlaceholder')}
            />
          </div>

          {/* Hashtag suggestions */}
          <div>
            <label className="font-label-caps text-label-caps text-tertiary uppercase mb-sm block">
              {t('new.linkedin.hashtagSuggestions')}
            </label>
            <div className="flex flex-wrap gap-xs">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-container-high px-md py-xs rounded-full text-body-sm text-on-surface-variant border border-outline-variant/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="border-2 border-dashed border-outline-variant/20 rounded-xl p-lg flex flex-col items-center justify-center gap-sm cursor-pointer hover:border-primary/40 transition-all">
            <Icon name="cloud_upload" className="text-3xl text-outline-variant" />
            <p className="text-body-sm text-on-surface-variant">{t('new.linkedin.mediaLabel')}</p>
            <p className="text-xs text-on-surface-variant opacity-60">{t('new.linkedin.mediaHint')}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-md pt-md border-t border-outline-variant/10">
          <button type="button" className="px-lg py-md text-on-surface-variant hover:text-on-surface transition-colors font-bold">
            {t('new.linkedin.discard')}
          </button>
          <div className="flex-1" />
          <button type="button" className="px-lg py-md bg-surface-container-high rounded-xl font-bold border border-outline-variant/20 hover:bg-surface-variant/40 transition-all">
            {t('new.linkedin.schedule')}
          </button>
          <button type="button" className="px-lg py-md bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 transition-all">
            {t('new.linkedin.publishNow')}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="col-span-12 lg:col-span-5">
        <div className="sticky top-8">
          <h3 className="font-label-caps text-on-surface-variant mb-md">PREVIEW EM TEMPO REAL</h3>
          <div className="bg-[#1d2226] rounded-xl border border-white/5 overflow-hidden">
            <div className="p-md flex gap-sm">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Icon name="person" className="text-white/60" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Matheus ×</p>
                <p className="text-xs text-white/60">Campaign Studio • Agora</p>
              </div>
            </div>
            <div className="px-md pb-md">
              <p className="text-white text-sm opacity-50">Explorando as novas fronteiras da estratégia digital...</p>
            </div>
            <div className="w-full aspect-square bg-surface-container-highest flex items-center justify-center">
              <Icon name="image" className="text-on-surface-variant opacity-30 text-[48px]" />
            </div>
            <div className="p-sm flex justify-around border-t border-white/5 text-white/60">
              {['thumb_up', 'comment', 'repeat', 'send'].map((icon) => (
                <button key={icon} type="button" className="p-xs hover:text-white/80 transition-colors">
                  <Icon name={icon} className="text-[18px]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function YouTubeComposer() {
  const { t } = useTranslation('posts')
  const [tags, setTags] = useState(['tutorial', 'cinematic'])

  return (
    <div className="grid grid-cols-12 gap-lg">
      {/* Left */}
      <div className="col-span-12 lg:col-span-7 space-y-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg">{t('new.youtube.title')}</h1>
        </div>

        {/* Upload */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-xl">
          <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-xl flex flex-col items-center justify-center min-h-[200px] hover:border-primary/40 transition-all cursor-pointer">
            <Icon name="cloud_upload" className="text-[40px] text-outline-variant mb-md" />
            <p className="font-bold text-on-surface">{t('new.youtube.uploadLabel')}</p>
            <p className="text-sm text-on-surface-variant opacity-60 mb-lg">{t('new.youtube.uploadHint')}</p>
            <button type="button" className="bg-surface-container-highest border border-outline-variant/50 px-lg py-sm rounded-xl font-bold hover:bg-surface-bright transition-colors">
              {t('new.youtube.selectFile')}
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-xl space-y-lg">
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-outline uppercase">{t('new.youtube.videoTitle')}</label>
            <input
              type="text"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md font-title-md text-on-surface focus:border-primary focus:outline-none"
              placeholder="Título do vídeo aqui..."
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-outline uppercase">{t('new.youtube.descriptionLabel')}</label>
            <textarea
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md font-body-lg text-on-surface resize-none focus:border-primary focus:outline-none"
              rows={4}
              placeholder="Fale sobre os espectadores sobre o seu vídeo..."
            />
          </div>

          {/* Thumbnails */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-outline uppercase">{t('new.youtube.thumbnails')}</label>
            <div className="grid grid-cols-3 gap-md">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-video bg-surface-container-highest rounded-lg flex items-center justify-center border border-outline-variant/20">
                  <Icon name="image" className="text-on-surface-variant opacity-30" />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-outline uppercase">{t('new.youtube.tags')}</label>
            <div className="flex flex-wrap gap-xs p-md bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
              {tags.map((tag) => (
                <span key={tag} className="bg-secondary-container/20 text-secondary border border-secondary/30 px-md py-base rounded-full text-body-sm flex items-center gap-xs">
                  {tag}
                  <button type="button" onClick={() => setTags((p) => p.filter((t) => t !== tag))}>
                    <Icon name="close" className="text-[14px]" />
                  </button>
                </span>
              ))}
              <input type="text" className="bg-transparent border-none text-body-sm focus:ring-0 min-w-[80px]" placeholder="+ tag" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: schedule + preview */}
      <div className="col-span-12 lg:col-span-5 space-y-lg">
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg space-y-md">
          <h3 className="font-label-caps text-label-caps text-outline uppercase">{t('new.youtube.publishOptions')}</h3>
          <button type="button" className="w-full bg-primary text-on-primary py-md rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-md">
            <Icon name="publish" />
            {t('new.youtube.publishNow')}
          </button>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="text-xs text-on-surface-variant">{t('new.youtube.scheduleLabel')}</label>
              <input type="date" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-sm mt-xs focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant">{t('new.youtube.timeLabel')}</label>
              <input type="time" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-sm mt-xs focus:outline-none" />
            </div>
          </div>
          <button type="button" className="w-full border border-primary/30 text-primary py-md rounded-xl font-bold hover:bg-primary/10 transition-all">
            {t('new.youtube.finalizeSchedule')}
          </button>
        </div>

        {/* Live preview */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-md">LIVE PREVIEW</h3>
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-md">
            <div className="flex flex-col items-center gap-md">
              <div className="w-16 h-16 bg-surface-container-high rounded flex items-center justify-center">
                <span className="text-on-surface font-bold text-xl">N</span>
              </div>
            </div>
          </div>
          <div className="space-y-xs">
            <p className="font-bold text-on-surface text-sm">Título do Vídeo Aparecerá Aqui</p>
            <p className="text-xs text-on-surface-variant">Campaign Studio • 0 visualizações • Agora</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewPostPage() {
  const { t } = useTranslation('posts')
  const [selectedChannel, setSelectedChannel] = useState<ComposerChannel>(null)

  if (selectedChannel === 'linkedin') return (
    <div className="p-xl max-w-[1440px] mx-auto">
      <button type="button" onClick={() => setSelectedChannel(null)} className="flex items-center gap-xs text-on-surface-variant hover:text-primary mb-lg transition-colors">
        <Icon name="arrow_back" className="text-sm" />
        <span className="text-sm">{t('detail.back')}</span>
      </button>
      <LinkedInComposer />
    </div>
  )

  if (selectedChannel === 'youtube') return (
    <div className="p-xl max-w-[1440px] mx-auto">
      <button type="button" onClick={() => setSelectedChannel(null)} className="flex items-center gap-xs text-on-surface-variant hover:text-primary mb-lg transition-colors">
        <Icon name="arrow_back" className="text-sm" />
        <span className="text-sm">{t('detail.back')}</span>
      </button>
      <YouTubeComposer />
    </div>
  )

  if (selectedChannel === 'telegram') return (
    <div className="p-xl max-w-[1440px] mx-auto">
      <button type="button" onClick={() => setSelectedChannel(null)} className="flex items-center gap-xs text-on-surface-variant hover:text-primary mb-lg transition-colors">
        <Icon name="arrow_back" className="text-sm" />
        <span className="text-sm">{t('detail.back')}</span>
      </button>
      <div className="text-center py-xl text-on-surface-variant">Telegram composer — use /posts/schedule/telegram</div>
    </div>
  )

  // Entry / channel selector
  return (
    <div className="p-xl max-w-[1440px] mx-auto">
      <div className="grid grid-cols-12 gap-lg">
        {/* Left: media + form */}
        <div className="col-span-12 lg:col-span-7 space-y-lg">
          <div>
            <h1 className="font-headline-lg text-headline-lg">{t('new.title')}</h1>
            <p className="text-on-surface-variant opacity-70">{t('new.subtitle')}</p>
          </div>

          {/* Channel selector bar */}
          <div className="flex items-center gap-md">
            {CHANNEL_OPTIONS.map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedChannel(key)}
                className="flex items-center gap-xs px-lg py-sm bg-surface-container-high rounded-xl border border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-primary transition-all font-bold"
              >
                <Icon name={icon} className="text-sm" />
                {label}
              </button>
            ))}
          </div>

          {/* Media drop area */}
          <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-xl flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-primary/40 transition-all">
            <Icon name="cloud_upload" className="text-[48px] text-outline-variant mb-md" />
            <p className="font-bold text-on-surface">{t('new.dragMedia')}</p>
            <p className="text-sm text-on-surface-variant opacity-60">{t('new.dragMediaHint')}</p>
          </div>

          {/* Fields */}
          <div className="space-y-md">
            <div>
              <label className="font-body-sm text-on-surface mb-xs block">{t('new.postTitleCaption')}</label>
              <input
                type="text"
                placeholder={t('new.titlePlaceholder')}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-md text-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-xs">
                <label className="font-body-sm text-on-surface">{t('new.description')}</label>
                <button type="button" className="flex items-center gap-xs text-xs text-primary bg-primary/10 px-sm py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-all">
                  <Icon name="auto_awesome" className="text-[14px]" />
                  {t('new.magicWrite')}
                </button>
              </div>
              <textarea
                placeholder={t('new.descriptionPlaceholder')}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-md text-on-surface focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none"
                rows={5}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-md pt-md border-t border-outline-variant/10">
            <button type="button" className="px-lg py-md text-on-surface-variant hover:text-on-surface font-bold transition-colors">
              {t('new.discard')}
            </button>
            <div className="flex-1" />
            <button type="button" className="px-lg py-md bg-surface-container-high rounded-xl font-bold border border-outline-variant/20 hover:bg-surface-variant/40 transition-all">
              {t('new.saveDraft')}
            </button>
            <button type="button" className="px-lg py-md bg-surface-container-high rounded-xl font-bold border border-outline-variant/20 hover:bg-surface-variant/40 transition-all">
              {t('new.schedule')}
            </button>
            <button type="button" className="px-lg py-md bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-xs">
              {t('new.publishNow')}
              <Icon name="send" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="col-span-12 lg:col-span-5">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-body-sm text-on-surface font-bold flex items-center gap-xs">
                <Icon name="visibility" className="text-primary text-sm" />
                {t('new.livePreview')}
              </h3>
              <div className="flex gap-xs">
                {CHANNEL_OPTIONS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedChannel(key)}
                    className="flex items-center gap-xs px-md py-1 text-xs font-bold bg-surface-container-high rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Icon name={icon} className="text-[14px]" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Instagram-style preview card */}
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden">
              <div className="p-sm flex items-center gap-sm border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <Icon name="account_circle" className="text-on-surface-variant" />
                </div>
                <span className="text-sm font-bold">campaign_studio</span>
                <Icon name="more_horiz" className="ml-auto text-on-surface-variant" />
              </div>
              <div className="aspect-square bg-surface-container-highest flex items-center justify-center">
                <Icon name="image" className="text-on-surface-variant opacity-30 text-[48px]" />
              </div>
              <div className="p-sm space-y-xs">
                <div className="flex gap-md text-on-surface-variant">
                  {['favorite_border', 'chat_bubble_outline', 'send'].map((icon) => (
                    <Icon key={icon} name={icon} />
                  ))}
                  <Icon name="bookmark_border" className="ml-auto" />
                </div>
                <p className="text-sm font-bold">1.204 curtidas</p>
                <p className="text-sm text-on-surface opacity-60">
                  <span className="font-bold mr-xs">campaign_studio</span>
                  {t('new.descriptionPlaceholder')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
