import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'

export function LinkedInScheduleForm() {
  const { t } = useTranslation('posts')
  const [charCount, setCharCount] = useState(0)

  return (
    <div className="pt-24 px-xl pb-xl max-w-7xl mx-auto grid grid-cols-12 gap-xl">
      {/* Editor */}
      <div className="col-span-12 lg:col-span-7 space-y-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg">{t('schedule.linkedin.title')}</h1>
          <p className="text-on-surface-variant opacity-70">{t('schedule.linkedin.subtitle')}</p>
        </div>

        {/* Post content */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 border-primary/20 rounded-xl p-lg space-y-md shadow-xl shadow-primary/5">
          <div className="flex justify-between items-center mb-xs">
            <label className="font-label-caps text-label-caps text-primary uppercase">
              {t('schedule.linkedin.postContent')}
            </label>
            <span className="text-xs text-on-surface-variant opacity-60">{charCount} / 3000</span>
          </div>
          <textarea
            className="w-full h-48 bg-transparent border-none focus:ring-0 text-on-surface resize-none placeholder:text-on-surface-variant/40 font-body-lg"
            placeholder="What's happening in your campaign? Use cinematic storytelling..."
            maxLength={3000}
            onChange={(e) => setCharCount(e.target.value.length)}
          />
          {/* Media Upload */}
          <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-xl flex flex-col items-center justify-center gap-sm cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
            <Icon name="cloud_upload" className="text-4xl text-outline-variant group-hover:text-primary transition-colors" />
            <div className="text-center">
              <p className="font-bold text-on-surface">{t('schedule.linkedin.mediaLabel')}</p>
              <p className="text-sm text-on-surface-variant opacity-60">{t('schedule.linkedin.mediaHint')}</p>
            </div>
          </div>
        </div>

        {/* AI enhancement */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 border-tertiary/20 rounded-xl p-lg">
          <div className="flex items-center gap-sm mb-lg">
            <Icon name="auto_awesome" className="text-tertiary" />
            <h3 className="font-title-md text-on-surface">{t('schedule.linkedin.aiEnhancement')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <button className="p-md bg-surface-container-highest/30 border border-outline-variant/20 rounded-lg text-left hover:border-tertiary/50 transition-all group">
              <p className="text-xs font-label-caps text-tertiary mb-1">{t('schedule.linkedin.recommendedHashtags')}</p>
              <p className="text-sm text-on-surface-variant group-hover:text-on-surface">#CinematicUI #DesignSystems #CampaignStudio</p>
            </button>
            <button className="p-md bg-surface-container-highest/30 border border-outline-variant/20 rounded-lg text-left hover:border-tertiary/50 transition-all group">
              <p className="text-xs font-label-caps text-tertiary mb-1">{t('schedule.linkedin.toneOfVoice')}</p>
              <p className="text-sm text-on-surface-variant group-hover:text-on-surface">{t('schedule.linkedin.toneValue')}</p>
            </button>
          </div>
        </div>

        {/* Scheduling */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
          <div className="flex items-center gap-sm mb-lg">
            <Icon name="calendar_month" className="text-secondary" />
            <h3 className="font-title-md text-on-surface">{t('schedule.linkedin.schedulingOptions')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="space-y-xs">
              <label className="text-xs font-label-caps opacity-60">{t('schedule.linkedin.publishDate')}</label>
              <div className="relative">
                <Icon name="event" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60" />
                <input
                  type="date"
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-md pl-10 text-on-surface focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-xs">
              <label className="text-xs font-label-caps opacity-60">{t('schedule.linkedin.publishTime')}</label>
              <div className="relative">
                <Icon name="schedule" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60" />
                <input
                  type="time"
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-md pl-10 text-on-surface focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-lg flex items-center gap-md">
            <button className="flex-1 py-lg bg-surface-container-high font-bold rounded-xl border border-outline-variant/20 hover:bg-surface-variant/40 transition-all active:scale-[0.98]">
              {t('schedule.linkedin.saveDraft')}
            </button>
            <button className="flex-[2] py-lg bg-primary text-on-primary font-extrabold rounded-xl hover:brightness-110 transition-all active:scale-[0.98]">
              {t('schedule.linkedin.schedulePost')}
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="col-span-12 lg:col-span-5 flex flex-col items-center">
        <div className="sticky top-24 w-full flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-[340px] mb-lg px-md">
            <h3 className="font-label-caps text-on-surface-variant">{t('schedule.linkedin.realTimePreview')}</h3>
          </div>
          {/* Phone shell */}
          <div className="bg-black rounded-[3rem] p-3 border-[6px] border-[#222] relative overflow-hidden shadow-2xl w-[340px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#222] rounded-b-2xl z-10" />
            <div className="bg-[#1d2226] rounded-[2.5rem] overflow-y-auto pt-8 max-h-[500px]">
              <div className="px-md py-sm border-b border-overlay-sm flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-overlay-md flex items-center justify-center">
                    <Icon name="person" className="text-white/60" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white">Alexander Vance</p>
                    <p className="text-[10px] text-white/60">Creative Director • Now</p>
                  </div>
                </div>
                <Icon name="more_horiz" className="text-white/60 text-sm" />
              </div>
              <div className="px-md py-md">
                <p className="text-[14px] text-white/90 leading-relaxed">
                  {t('schedule.linkedin.previewPlaceholder')}
                </p>
              </div>
              <div className="w-full bg-[#38434f] aspect-video flex items-center justify-center">
                <Icon name="image" className="text-3xl opacity-40" />
              </div>
              <div className="p-sm flex items-center gap-md border-t border-overlay-sm">
                {['thumb_up', 'comment', 'share', 'send'].map((icon) => (
                  <div key={icon} className="flex items-center gap-1 text-white/60">
                    <Icon name={icon} className="text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
