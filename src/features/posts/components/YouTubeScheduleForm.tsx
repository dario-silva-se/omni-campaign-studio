import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'

const INITIAL_TAGS = ['cinematic', 'tutorial', 'lighting']

export function YouTubeScheduleForm() {
  const { t } = useTranslation('posts')
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS)
  const [tagInput, setTagInput] = useState('')
  const [instantPremiere, setInstantPremiere] = useState(true)

  function addTag(value: string) {
    const trimmed = value.trim().replace(/^#/, '')
    if (trimmed && !tags.includes(trimmed)) setTags((prev) => [...prev, trimmed])
    setTagInput('')
  }

  return (
    <div className="max-w-7xl mx-auto p-lg grid grid-cols-12 gap-lg pt-8">
      {/* Left: upload + metadata */}
      <div className="col-span-12 lg:col-span-8 space-y-lg">
        {/* Upload */}
        <section className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-xl">
          <div className="relative z-10 border-2 border-dashed border-outline-variant/30 rounded-xl p-xl flex flex-col items-center justify-center min-h-[280px] hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer">
            <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-md shadow-inner group-hover:scale-110 transition-transform">
              <Icon name="upload_file" className="text-[40px] text-primary" />
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-xs text-center">{t('schedule.youtube.title')}</h2>
            <p className="text-on-surface-variant opacity-70 mb-lg text-center">{t('schedule.youtube.subtitle')}</p>
            <button
              type="button"
              className="bg-surface-container-highest border border-outline-variant/50 px-xl py-md rounded-xl font-title-md hover:bg-surface-bright transition-colors"
            >
              {t('schedule.youtube.selectFile')}
            </button>
          </div>
        </section>

        {/* Metadata */}
        <section className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-xl space-y-xl">
          <div className="grid gap-lg">
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-outline uppercase">{t('schedule.youtube.videoTitle')}</label>
              <input
                type="text"
                defaultValue="THE ART OF LIGHT | Cinematic Studio Reel 2024"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md font-title-md text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            <div className="space-y-xs">
              <label className="text-label-caps font-label-caps text-outline uppercase">{t('schedule.youtube.description')}</label>
              <textarea
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md font-body-lg text-on-surface resize-none focus:border-primary focus:outline-none"
                rows={6}
                defaultValue={`In this episode, we dive deep into the lighting techniques used in the latest studio campaign.\n\nTimestamps:\n0:00 - Introduction\n2:15 - Gear List`}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="space-y-md">
            <label className="text-label-caps font-label-caps text-outline uppercase">{t('schedule.youtube.thumbnails')}</label>
            <div className="grid grid-cols-4 gap-md">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${i === 0 ? 'border-primary/50 bg-primary/10' : 'border-transparent bg-surface-container-highest hover:border-outline-variant/50'} flex items-center justify-center`}
                >
                  <Icon name="play_circle" className="text-on-surface-variant opacity-30 text-[32px]" />
                  {i === 0 && (
                    <div className="absolute flex items-center justify-center">
                      <Icon name="check_circle" className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
              <button
                type="button"
                className="aspect-video border-2 border-dashed border-outline-variant/30 rounded-lg flex flex-col items-center justify-center text-outline hover:bg-surface-variant/10 transition-colors"
              >
                <Icon name="add_photo_alternate" />
                <span className="text-[10px] font-bold mt-xs">{t('schedule.youtube.thumbnails')}</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-xs">
            <label className="text-label-caps font-label-caps text-outline uppercase">{t('schedule.youtube.campaignTags')}</label>
            <div className="flex flex-wrap gap-xs p-md bg-surface-container-lowest border border-outline-variant/30 rounded-xl min-h-[56px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary-container/20 text-secondary border border-secondary/30 px-md py-base rounded-full text-body-sm flex items-center gap-xs"
                >
                  {tag}
                  <button type="button" onClick={() => setTags((p) => p.filter((t) => t !== tag))}>
                    <Icon name="close" className="text-[14px] cursor-pointer" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(tagInput) }
                }}
                className="bg-transparent border-none flex-1 min-w-[120px] p-0 text-body-sm focus:ring-0"
                placeholder={t('schedule.youtube.addTag')}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Right: preview + scheduling */}
      <div className="col-span-12 lg:col-span-4 space-y-lg">
        <section className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl overflow-hidden sticky top-lg">
          {/* Video preview */}
          <div className="aspect-video bg-black relative flex items-center justify-center">
            <Icon name="play_circle" className="text-primary text-[64px] opacity-60" filled />
            <div className="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-black/80 to-transparent">
              <div className="h-1 w-full bg-outline-variant/30 rounded-full mb-xs">
                <div className="h-full w-1/3 bg-primary rounded-full" />
              </div>
              <div className="flex justify-between items-center text-[11px] text-white/70 font-bold">
                <span>01:45 / 04:32</span>
              </div>
            </div>
          </div>

          <div className="p-lg space-y-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-title-md text-on-surface">Preview: Cinematic Studio Reel</h3>
                <p className="text-body-sm text-outline">Campaign: Summer Collection 2024</p>
              </div>
              <span className="px-xs py-1 bg-primary/15 text-primary text-[10px] font-bold rounded uppercase">8K HDR</span>
            </div>
            <div className="flex gap-md p-md bg-surface-container-low rounded-lg border border-outline-variant/10">
              <div className="flex-1 text-center">
                <p className="text-outline text-[10px] font-bold uppercase mb-1">{t('schedule.youtube.visibility')}</p>
                <p className="text-body-sm text-on-surface flex items-center justify-center gap-xs">
                  <Icon name="public" className="text-[18px]" /> Public
                </p>
              </div>
              <div className="w-[1px] bg-outline-variant/30" />
              <div className="flex-1 text-center">
                <p className="text-outline text-[10px] font-bold uppercase mb-1">{t('schedule.youtube.audience')}</p>
                <p className="text-body-sm text-on-surface">General</p>
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="p-lg pt-0 space-y-md">
            <div className="h-[1px] bg-outline-variant/20 mb-md" />
            <h4 className="text-label-caps font-label-caps text-outline uppercase">{t('schedule.youtube.schedulePublication')}</h4>
            <div className="space-y-sm">
              <div className="relative">
                <Icon name="calendar_today" className="absolute left-md top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="date"
                  defaultValue="2024-06-25"
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-md pl-xl pr-md font-body-lg text-on-surface focus:outline-none"
                />
              </div>
              <div className="relative">
                <Icon name="schedule" className="absolute left-md top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="time"
                  defaultValue="18:00"
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-md pl-xl pr-md font-body-lg text-on-surface focus:outline-none"
                />
              </div>
            </div>
            <div className="p-md bg-primary/5 border border-primary/10 rounded-xl">
              <label className="flex items-center gap-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={instantPremiere}
                  onChange={(e) => setInstantPremiere(e.target.checked)}
                  className="w-5 h-5 rounded border-primary/30 text-primary bg-surface"
                />
                <span className="text-body-sm text-on-surface">{t('schedule.youtube.setAsInstantPremiere')}</span>
              </label>
            </div>
            <button
              type="button"
              className="w-full bg-primary text-on-primary py-lg rounded-xl font-headline-lg flex items-center justify-center gap-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Icon name="event_available" />
              {t('schedule.youtube.scheduleVideo')}
            </button>
            <p className="text-center text-body-sm text-outline">
              {t('schedule.youtube.willBePublished', { date: 'June 25, 2024', time: '18:00' })}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
