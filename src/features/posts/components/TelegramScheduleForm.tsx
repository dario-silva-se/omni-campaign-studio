import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'

export function TelegramScheduleForm() {
  const { t } = useTranslation('posts')
  const [silentMessage, setSilentMessage] = useState(false)
  const [protectedContent, setProtectedContent] = useState(false)

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-lg pt-8 pb-xl px-lg">
      {/* Left: editor */}
      <div className="col-span-12 lg:col-span-7 space-y-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{t('schedule.telegram.title')}</h1>
          <p className="text-on-surface-variant opacity-70">{t('schedule.telegram.subtitle')}</p>
        </div>

        {/* Channel selector */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
          <label className="font-label-caps text-label-caps text-primary uppercase mb-md block">
            {t('schedule.telegram.targetDestination')}
          </label>
          <div className="flex flex-wrap gap-md">
            <button className="flex items-center gap-sm px-md py-2.5 rounded-full border border-primary bg-primary/10 text-primary transition-all">
              <Icon name="send" className="text-sm" />
              <span className="text-body-sm font-semibold">@CreativeCircle</span>
              <Icon name="check_circle" className="text-sm" />
            </button>
            <button className="flex items-center gap-sm px-md py-2.5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:border-primary/50 transition-all">
              <Icon name="send" className="text-sm" />
              <span className="text-body-sm">@CampaignStudio_News</span>
            </button>
            <button className="flex items-center gap-sm px-md py-2.5 rounded-full border border-outline-variant/10 bg-surface-container-high/30 text-on-surface-variant hover:bg-surface-variant/20 transition-all">
              <Icon name="add" className="text-sm" />
              <span className="text-body-sm">{t('schedule.telegram.connectChannel')}</span>
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg space-y-md">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-md">
            <div className="flex gap-md">
              {['format_bold', 'format_italic', 'link', 'code', 'sentiment_satisfied'].map((icon, i) => (
                <button key={icon} className={`${i === 3 ? 'ml-xs' : ''} text-on-surface-variant hover:text-primary transition-all`}>
                  <Icon name={icon} />
                </button>
              ))}
            </div>
            <span className="text-[10px] font-label-caps text-on-surface-variant opacity-60">0 / 4096</span>
          </div>
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 resize-none min-h-[200px] font-body-lg leading-relaxed"
            placeholder={t('schedule.telegram.editorPlaceholder')}
          />
          <div className="flex flex-wrap gap-md pt-md">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
              <Icon name="add_photo_alternate" />
              <span className="text-[10px] font-label-caps mt-1">{t('schedule.telegram.attach')}</span>
            </div>
          </div>
        </div>

        {/* Telegram-specific toggles */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg space-y-md">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface">{t('schedule.telegram.silentMessage')}</span>
            <Toggle
              label={t('schedule.telegram.silentMessage')}
              checked={silentMessage}
              onChange={setSilentMessage}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-on-surface">{t('schedule.telegram.protectedContent')}</span>
            <Toggle
              label={t('schedule.telegram.protectedContent')}
              checked={protectedContent}
              onChange={setProtectedContent}
            />
          </div>
        </div>

        {/* Scheduling */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg">
          <label className="font-label-caps text-label-caps text-primary uppercase mb-md block">
            {t('schedule.telegram.scheduleDeployment')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="space-y-xs">
              <span className="text-body-sm text-on-surface-variant">{t('schedule.telegram.releaseDate')}</span>
              <div className="flex items-center bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-md py-3 text-on-surface">
                <Icon name="calendar_today" className="text-sm mr-md text-primary" />
                <input type="date" className="bg-transparent border-none focus:ring-0 w-full text-body-sm" />
              </div>
            </div>
            <div className="space-y-xs">
              <span className="text-body-sm text-on-surface-variant">{t('schedule.telegram.deploymentTime')}</span>
              <div className="flex items-center bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-md py-3 text-on-surface">
                <Icon name="schedule" className="text-sm mr-md text-primary" />
                <input type="time" className="bg-transparent border-none focus:ring-0 w-full text-body-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: preview */}
      <div className="col-span-12 lg:col-span-5 space-y-lg sticky top-8">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block">
          {t('schedule.telegram.realTimePreview')}
        </label>

        {/* Telegram phone preview */}
        <div className="relative w-full aspect-[9/16] max-h-[600px] bg-surface-container-low border border-outline-variant/10 rounded-[40px] border-[8px] border-surface-container-highest shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-surface-container-highest/80 backdrop-blur-md p-md flex items-center gap-md border-b border-outline-variant/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">CC</div>
            <div className="flex-1">
              <p className="font-bold text-on-surface text-body-sm">Creative Circle</p>
              <p className="text-[11px] text-on-surface-variant">124.500 inscritos</p>
            </div>
            <Icon name="more_vert" className="text-on-surface-variant" />
          </div>
          <div className="flex-1 p-lg overflow-y-auto flex flex-col justify-end space-y-md">
            <div className="bg-surface-container-high rounded-2xl rounded-tr-sm p-0 overflow-hidden shadow-lg ml-auto max-w-[85%] border border-overlay-sm">
              <div className="w-full aspect-video bg-surface-container-highest flex items-center justify-center">
                <Icon name="image" className="text-on-surface-variant opacity-30 text-[32px]" />
              </div>
              <div className="p-md">
                <p className="text-on-surface text-body-sm leading-relaxed">
                  The future of cinematic campaign management is here. ⚡️
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                  <span className="text-[10px] text-on-surface-variant">18:30</span>
                  <Icon name="done_all" className="text-[12px] text-on-surface-variant" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-highest p-md border-t border-outline-variant/10 flex items-center gap-md">
            <Icon name="attachment" className="text-on-surface-variant" />
            <div className="flex-1 bg-surface-dim rounded-full px-md py-2 text-[12px] text-on-surface-variant">Broadcast message...</div>
            <Icon name="send" className="text-primary" filled />
          </div>
        </div>

        {/* Optimization tip */}
        <div className="bg-surface-container-low/60 backdrop-blur-sm border border-outline-variant/10 rounded-xl p-lg border-l-4 border-l-primary">
          <div className="flex gap-md">
            <Icon name="tips_and_updates" className="text-primary" />
            <div>
              <p className="font-title-md text-body-sm text-on-surface">{t('schedule.telegram.optimizationTip')}</p>
              <p className="text-body-sm text-on-surface-variant mt-1 leading-snug">{t('schedule.telegram.optimizationDesc')}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-md">
          <button className="flex-1 bg-surface-container-highest border border-outline-variant/20 py-4 rounded-xl font-bold text-on-surface hover:bg-surface-variant/40 transition-all active:scale-95">
            {t('schedule.telegram.saveDraft')}
          </button>
          <button className="flex-[1.5] bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95">
            {t('schedule.telegram.schedulePost')}
          </button>
        </div>
      </div>
    </div>
  )
}
