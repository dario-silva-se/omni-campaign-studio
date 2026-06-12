import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import type { Template } from '@/types'

interface Props {
  template: Template
}

type MessageType = 'broadcast' | 'poll' | 'bot-interaction'

const MESSAGE_TYPES: { value: MessageType; icon: string; key: string }[] = [
  { value: 'broadcast', icon: 'send', key: 'telegram.broadcast' },
  { value: 'poll', icon: 'poll', key: 'telegram.poll' },
  { value: 'bot-interaction', icon: 'smart_toy', key: 'telegram.botInteraction' },
]

export function TelegramTemplateDetail({ template }: Props) {
  const { t } = useTranslation('templates')
  const d = template.telegramDetail
  const [activeType, setActiveType] = useState<MessageType>(d?.messageType ?? 'broadcast')
  const [scheduled, setScheduled] = useState(false)

  const buttons = d?.interactiveButtons ?? []
  const estReach = d?.estimatedReach ?? '—'
  const estClicks = d?.estimatedClicks ?? '—'
  const compliance = d?.complianceItems ?? []

  return (
    <div className="flex-grow overflow-y-auto p-lg">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-12 gap-lg">
          {/* Left pane: Editor */}
          <div className="col-span-12 xl:col-span-7 space-y-lg">
            {/* Message Type */}
            <section className="glass-panel p-lg rounded-xl">
              <h2 className="font-title-md text-title-md mb-md">{t('telegram.messageType')}</h2>
              <div className="grid grid-cols-3 gap-md">
                {MESSAGE_TYPES.map((mt) => (
                  <button
                    key={mt.value}
                    type="button"
                    onClick={() => setActiveType(mt.value)}
                    className={`flex flex-col items-center gap-xs p-md rounded-lg border transition-all ${
                      activeType === mt.value
                        ? 'bg-primary/10 border-2 border-primary text-primary'
                        : 'bg-surface-container-high border border-white/10 hover:border-white/20 text-on-surface-variant'
                    }`}
                  >
                    <Icon name={mt.icon} className="text-3xl" />
                    <span className="font-label-caps text-label-caps">{t(mt.key)}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Message Content */}
            <section className="glass-panel p-lg rounded-xl">
              <div className="flex justify-between items-center mb-md">
                <h2 className="font-title-md text-title-md">{t('telegram.messageContent')}</h2>
                <div className="flex gap-xs">
                  {['format_bold', 'format_italic', 'link', 'code'].map((ic) => (
                    <button key={ic} type="button" className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant">
                      <Icon name={ic} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-md text-on-surface focus:outline-none focus:border-primary/50 transition-all font-body-lg resize-none"
                placeholder="Craft your message here... use **bold** or [links](https://...)"
              />
              {/* Interactive Buttons */}
              <div className="mt-lg">
                <div className="flex justify-between items-center mb-sm">
                  <h3 className="font-body-lg text-body-lg font-bold">{t('telegram.interactiveButtons')}</h3>
                  <button
                    type="button"
                    className="flex items-center gap-xs text-primary font-label-caps text-label-caps border border-primary/20 px-md py-1.5 rounded-full hover:bg-primary/10 transition-all"
                  >
                    <Icon name="add" className="text-sm" />
                    {t('telegram.addButton')}
                  </button>
                </div>
                <div className="space-y-sm">
                  {buttons.map((btn) => (
                    <div
                      key={btn.label}
                      className="flex items-center gap-md p-sm bg-white/5 rounded-lg border border-white/5"
                    >
                      <Icon name="drag_indicator" className="text-on-surface-variant/40" />
                      <input
                        className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface outline-none"
                        type="text"
                        defaultValue={btn.label}
                      />
                      <input
                        className="flex-1 bg-transparent border-none focus:ring-0 text-primary font-body-sm outline-none"
                        type="text"
                        defaultValue={btn.url}
                      />
                      <Icon name="delete" className="text-error/60 cursor-pointer hover:text-error" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Media Zone */}
            <section className="glass-panel p-lg rounded-xl">
              <h2 className="font-title-md text-title-md mb-md">{t('telegram.mediaAttachment')}</h2>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-xl flex flex-col items-center justify-center gap-md hover:border-primary/40 transition-all group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon name="cloud_upload" className="text-4xl" />
                </div>
                <div className="text-center">
                  <p className="font-title-md text-title-md mb-xs">{t('telegram.mediaDragDrop')}</p>
                  <p className="text-on-surface-variant/60 font-body-sm text-body-sm">{t('telegram.mediaHint')}</p>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section className="glass-panel p-lg rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-md">
                <Icon name="schedule" className="text-primary text-3xl" />
                <div>
                  <h2 className="font-title-md text-title-md">{t('telegram.schedulePost')}</h2>
                  <p className="text-on-surface-variant/60 text-body-sm">{t('telegram.scheduleHint')}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={scheduled}
                  onChange={(e) => setScheduled(e.target.checked)}
                />
                <div className="w-14 h-7 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary" />
              </label>
            </section>
          </div>

          {/* Right pane: Preview + Insights */}
          <div className="col-span-12 xl:col-span-5 space-y-lg">
            {/* Phone preview */}
            <div className="relative w-[340px] h-[680px] mx-auto bg-black rounded-[3rem] p-4 border-[8px] border-[#1C1C1E] shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
              <div className="w-full h-full bg-[#0E1621] rounded-[2rem] overflow-hidden flex flex-col">
                {/* App header */}
                <div className="bg-[#17212B] px-md pt-10 pb-sm flex items-center gap-md border-b border-black/20">
                  <Icon name="arrow_back" className="text-white/80 text-xl" />
                  <div className="w-8 h-8 rounded-full bg-[#24A1DE] flex items-center justify-center font-bold text-white text-xs">
                    OS
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold leading-none">Open Studio Official</p>
                    <p className="text-[#6D8397] text-[10px]">12,403 subscribers</p>
                  </div>
                  <Icon name="more_vert" className="text-white/80 text-xl" />
                </div>
                {/* Chat canvas */}
                <div className="flex-1 p-md flex flex-col justify-end bg-[#0E1621]">
                  <div className="bg-[#182533] rounded-2xl rounded-bl-none overflow-hidden max-w-[90%] shadow-lg border border-white/5">
                    <div className="w-full h-32 bg-surface-container-highest flex items-center justify-center">
                      <Icon name="image" className="text-on-surface-variant/30 text-[48px]" />
                    </div>
                    <div className="p-sm">
                      <p className="text-white text-sm leading-relaxed mb-sm">
                        🚀 <strong>New Studio Update</strong> is live! Dive into the cinematic dashboard.
                      </p>
                      <div className="flex justify-end gap-xs items-center">
                        <span className="text-[10px] text-[#6D8397]">14:20</span>
                        <Icon name="done_all" className="text-[10px] text-[#24A1DE]" />
                      </div>
                    </div>
                  </div>
                  {buttons.length > 0 && (
                    <div className="mt-xs max-w-[90%] flex flex-col gap-1">
                      {buttons.map((btn) => (
                        <div key={btn.label} className="bg-[#182533]/90 backdrop-blur-sm p-sm rounded-lg border border-white/10 text-center">
                          <span className="text-[#24A1DE] text-xs font-bold">{btn.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Message input */}
                <div className="bg-[#17212B] p-sm flex items-center gap-md">
                  <Icon name="mood" className="text-[#6D8397]" />
                  <div className="flex-1 h-8 bg-black/20 rounded-full flex items-center px-md">
                    <span className="text-[#6D8397] text-xs">Broadcast...</span>
                  </div>
                  <Icon name="mic" className="text-[#24A1DE]" />
                </div>
              </div>
            </div>

            {/* Engagement Analysis */}
            <section className="glass-panel p-lg rounded-xl">
              <div className="flex items-center gap-md mb-md">
                <Icon name="analytics" className="text-primary-container" />
                <h2 className="font-title-md text-title-md">{t('telegram.engagementAnalysis')}</h2>
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="p-md bg-white/5 rounded-lg">
                  <p className="font-label-caps text-label-caps text-on-surface-variant/60 mb-xs">{t('telegram.estReach')}</p>
                  <p className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{estReach}</p>
                </div>
                <div className="p-md bg-white/5 rounded-lg">
                  <p className="font-label-caps text-label-caps text-on-surface-variant/60 mb-xs">{t('telegram.estClicks')}</p>
                  <p className="font-headline-lg-mobile text-headline-lg-mobile text-secondary">{estClicks}</p>
                </div>
              </div>
              <div className="mt-md p-sm bg-primary/5 border border-primary/10 rounded-lg flex items-start gap-md">
                <Icon name="info" className="text-primary text-sm mt-1" />
                <p className="text-body-sm text-on-surface-variant/80">
                  {t('telegram.postingTimeHint')}
                </p>
              </div>
            </section>

            {/* Compliance Checklist */}
            <section className="glass-panel p-lg rounded-xl">
              <h2 className="font-title-md text-title-md mb-md">{t('telegram.complianceChecklist')}</h2>
              <ul className="space-y-sm">
                {compliance.map((item) => (
                  <li key={item.label} className="flex items-center gap-sm">
                    {item.status === 'ok' && <Icon name="check_circle" className="text-primary" filled />}
                    {item.status === 'warn' && <Icon name="radio_button_unchecked" className="text-on-surface-variant/20" />}
                    {item.status === 'error' && <Icon name="error" className="text-error/60" />}
                    <span className={`text-body-sm ${item.status === 'error' ? 'text-error/80' : ''}`}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Floating action bar */}
      <div className="fixed bottom-0 left-0 right-0 p-lg bg-surface/40 backdrop-blur-md border-t border-white/5 z-50">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-xl">
            <div className="flex items-center gap-sm">
              <Icon name="visibility" className="text-on-surface-variant" />
              <span className="text-body-sm text-on-surface-variant">{t('telegram.livePreviewing')}</span>
            </div>
            <div className="flex items-center gap-sm">
              <Icon name="save" className="text-on-surface-variant" />
              <span className="text-body-sm text-on-surface-variant">{t('telegram.autoSaved')}</span>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <Button variant="ghost" className="px-xl py-xs rounded-lg font-bold">{t('detail.discard')}</Button>
            <Button variant="primary" className="px-xl py-xs rounded-lg font-bold shadow-lg shadow-primary/20">
              {t('detail.sendBroadcast')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
