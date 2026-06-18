import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useWizard } from '../../wizardContext'
import { cn } from '@/lib/cn'
import type { WizardChannelOption } from '@/types'

interface Props {
  onBack: () => void
  onNext: () => void
}

interface ChannelConfig {
  value: WizardChannelOption
  icon: string
  labelKey: string
  descKey: string
}

const CHANNEL_OPTIONS: ChannelConfig[] = [
  { value: 'email', icon: 'mail', labelKey: 'wizard.step2.channels.email', descKey: 'wizard.step2.channels.emailDesc' },
  { value: 'social-media', icon: 'share', labelKey: 'wizard.step2.channels.socialMedia', descKey: 'wizard.step2.channels.socialMediaDesc' },
  { value: 'sms', icon: 'sms', labelKey: 'wizard.step2.channels.sms', descKey: 'wizard.step2.channels.smsDesc' },
  { value: 'ads', icon: 'ads_click', labelKey: 'wizard.step2.channels.ads', descKey: 'wizard.step2.channels.adsDesc' },
]

export default function Step2Channels({ onBack, onNext }: Props) {
  const { t } = useTranslation('campaigns')
  const { state, dispatch } = useWizard()
  const { channels } = state.step2
  const [error, setError] = useState('')

  function toggleChannel(ch: WizardChannelOption) {
    const next = channels.includes(ch) ? channels.filter((c) => c !== ch) : [...channels, ch]
    dispatch({ type: 'SET_STEP2', payload: { channels: next } })
    if (error && next.length > 0) setError('')
  }

  function handleNext() {
    if (channels.length === 0) {
      setError(t('wizard.step2.required'))
      return
    }
    setError('')
    onNext()
  }

  return (
    <div className="flex flex-col gap-lg">
      {/* Step header */}
      <div className="mb-xs text-center md:text-left">
        <h2 className="font-headline-lg text-2xl text-on-surface mb-xs">{t('wizard.step2.heading')}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t('wizard.step2.subheading')}</p>
      </div>

      {/* Channel grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {CHANNEL_OPTIONS.map(({ value, icon, labelKey, descKey }) => {
          const isSelected = channels.includes(value)
          return (
            <label
              key={value}
              className={cn(
                'rounded-xl p-lg cursor-pointer flex flex-col relative overflow-hidden transition-all',
                'bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px] border',
                isSelected
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-overlay-md hover:bg-surface-container-high/50',
              )}
            >
              <div className="flex justify-between items-start mb-md">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center transition-colors',
                    isSelected ? 'text-primary' : 'text-on-surface',
                  )}
                >
                  <Icon name={icon} />
                </div>
                {/* Toggle */}
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleChannel(value)}
                    className="sr-only"
                    aria-label={t(labelKey)}
                  />
                  <div
                    onClick={() => toggleChannel(value)}
                    className={cn(
                      'w-10 h-5 rounded-full flex items-center p-0.5 relative cursor-pointer transition-colors',
                      isSelected ? 'bg-primary' : 'bg-outline-variant/30',
                    )}
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full bg-white shadow-sm absolute transition-all',
                        isSelected ? 'right-0.5' : 'left-0.5',
                      )}
                    />
                  </div>
                </div>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-xs">{t(labelKey)}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex-1">{t(descKey)}</p>
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              )}
            </label>
          )
        })}
      </div>

      {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

      {/* Actions */}
      <div className="flex justify-between items-center pt-lg border-t border-outline-variant/10 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-lg py-sm rounded-lg font-body-sm text-on-surface border border-outline-variant/50 hover:bg-surface-container-high transition-colors"
        >
          {t('wizard.navigation.back')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-xl py-sm rounded-lg font-body-sm bg-gradient-to-b from-primary to-[#005bc1] text-on-primary font-bold hover:brightness-110 transition-all flex items-center gap-sm"
        >
          {t('wizard.navigation.continue')}
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>
    </div>
  )
}
