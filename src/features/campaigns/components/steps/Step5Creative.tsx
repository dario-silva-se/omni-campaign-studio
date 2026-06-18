import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useWizard, clearWizardStorage } from '../../wizardContext'
import { useCreateCampaign } from '../../hooks/useCampaigns'
import { cn } from '@/lib/cn'
import type { Channel, WizardChannelOption } from '@/types'

/**
 * Maps Step 2 wizard channel options (Email/SocialMedia/SMS/Ads) to the
 * Campaign domain's Channel[] (linkedin | youtube | telegram).
 *
 * Mapping rationale:
 *  - 'social-media' → all three platform channels (linkedin, youtube, telegram)
 *    because the social-media option represents the full set of social platforms
 *    supported by the app.
 *  - 'email', 'sms', 'ads' → no direct platform equivalent in the Campaign
 *    Channel union, so they are omitted (they affect delivery config, not channel
 *    presence).  This deduplication means that selecting only email/sms/ads with
 *    no social-media yields an empty set → fallback to ['linkedin'].
 */
const WIZARD_TO_CAMPAIGN_CHANNELS: Partial<Record<WizardChannelOption, Channel[]>> = {
  'social-media': ['linkedin', 'youtube', 'telegram'],
}

function mapWizardChannels(wizardChannels: WizardChannelOption[]): Channel[] {
  const set = new Set<Channel>()
  for (const wc of wizardChannels) {
    const mapped = WIZARD_TO_CAMPAIGN_CHANNELS[wc]
    if (mapped) mapped.forEach((c) => set.add(c))
  }
  return set.size > 0 ? Array.from(set) : ['linkedin']
}

interface Props {
  onBack: () => void
}

type FormatOption = 'single-image' | 'video' | 'carousel' | 'document'

const FORMAT_OPTIONS: { value: FormatOption; icon: string; labelKey: string }[] = [
  { value: 'single-image', icon: 'image', labelKey: 'wizard.step5.formats.singleImage' },
  { value: 'video', icon: 'videocam', labelKey: 'wizard.step5.formats.video' },
  { value: 'carousel', icon: 'view_carousel', labelKey: 'wizard.step5.formats.carousel' },
  { value: 'document', icon: 'description', labelKey: 'wizard.step5.formats.document' },
]

const CTA_OPTIONS = ['Learn More', 'Sign Up', 'Get Quote', 'Download', 'Book Now']

const PREVIEW_CHANNELS = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'work' },
  { id: 'youtube', label: 'YouTube', icon: 'smart_display' },
  { id: 'telegram', label: 'Telegram', icon: 'send' },
]

export default function Step5Creative({ onBack }: Props) {
  const { t } = useTranslation('campaigns')
  const navigate = useNavigate()
  const { state, dispatch } = useWizard()
  const { format, headline, primaryText, cta } = state.step5
  const [previewChannel, setPreviewChannel] = useState('linkedin')
  const { mutate: createCampaign, isPending } = useCreateCampaign()

  function handleLaunch() {
    const now = new Date().toISOString()
    createCampaign(
      {
        name: state.step1.name || 'Nova Campanha',
        status: 'launching',
        channels: mapWizardChannels(state.step2.channels),
        budget: 0,
        spend: 0,
        cpl: 0,
        cpm: 0,
        roas: 0,
        leads: 0,
        mql: 0,
        sql: 0,
        startDate: now.split('T')[0],
        audienceId: state.step3.selectedSegmentId ?? undefined,
        createdAt: now,
        updatedAt: now,
      },
      {
        onSuccess: () => {
          clearWizardStorage()
          dispatch({ type: 'RESET' })
          navigate('/campaigns/launching')
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-xl">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{t('wizard.step5.heading')}</h2>
        <span className="font-label-caps text-label-caps text-primary tracking-widest">
          {t('wizard.step5.stepIndicator')}
        </span>
      </div>

      {/* Progress bar — full at step 5 */}
      <div className="w-full h-1 bg-surface-variant/30 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-primary to-primary-container rounded-full" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Left: form */}
        <div className="col-span-12 lg:col-span-7 space-y-lg">
          {/* Format selection */}
          <section>
            <h3 className="font-title-md text-title-md text-on-surface mb-md">
              {t('wizard.step5.formatSelection')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              {FORMAT_OPTIONS.map(({ value, icon, labelKey }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => dispatch({ type: 'SET_STEP5', payload: { format: value } })}
                  className={cn(
                    'glass-panel p-md rounded-xl flex flex-col items-center gap-sm transition-all',
                    format === value
                      ? 'border-primary/50 bg-primary/5'
                      : 'opacity-60 hover:opacity-100',
                  )}
                >
                  <Icon
                    name={icon}
                    className={cn('text-3xl', format === value ? 'text-primary' : 'text-outline')}
                  />
                  <span className="font-label-caps text-label-caps text-center">{t(labelKey)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Media assets */}
          <section>
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-title-md text-title-md text-on-surface">{t('wizard.step5.mediaAssets')}</h3>
              <span className="text-body-sm text-outline">{t('wizard.step5.slotsUsed')}</span>
            </div>
            <div className="glass-panel border-dashed border-2 border-outline-variant/30 rounded-xl p-xl flex flex-col items-center justify-center gap-md group hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon name="cloud_upload" className="text-4xl" />
              </div>
              <div className="text-center">
                <p className="font-title-md text-title-md text-on-surface">{t('wizard.step5.dropzone')}</p>
                <p className="text-body-sm text-outline">{t('wizard.step5.dropzoneHint')}</p>
              </div>
            </div>
          </section>

          {/* Copywriting */}
          <section className="space-y-md">
            <h3 className="font-title-md text-title-md text-on-surface">{t('wizard.step5.copywriting')}</h3>

            {/* Headline */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                {t('wizard.step5.headline')}
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => dispatch({ type: 'SET_STEP5', payload: { headline: e.target.value } })}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface transition-all focus:outline-none"
              />
            </div>

            {/* Primary text */}
            <div className="space-y-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-caps text-label-caps text-outline uppercase">
                  {t('wizard.step5.primaryText')}
                </label>
                <button
                  type="button"
                  className="flex items-center gap-xs text-primary font-label-caps text-label-caps hover:brightness-110 transition-all"
                >
                  <Icon name="auto_awesome" className="text-sm" />
                  {t('wizard.step5.aiGenerate')}
                </button>
              </div>
              <textarea
                value={primaryText}
                onChange={(e) => dispatch({ type: 'SET_STEP5', payload: { primaryText: e.target.value } })}
                rows={4}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface transition-all focus:outline-none resize-none"
              />
            </div>

            {/* CTA */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                {t('wizard.step5.cta')}
              </label>
              <div className="relative">
                <select
                  value={cta}
                  onChange={(e) => dispatch({ type: 'SET_STEP5', payload: { cta: e.target.value } })}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface transition-all appearance-none focus:outline-none"
                >
                  {CTA_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
              </div>
            </div>
          </section>
        </div>

        {/* Right: preview */}
        <div className="col-span-12 lg:col-span-5 flex flex-col">
          <div className="glass-panel rounded-2xl flex flex-col border border-outline-variant/20 overflow-hidden">
            {/* Preview tabs */}
            <div className="flex items-center border-b border-outline-variant/10 p-sm">
              {PREVIEW_CHANNELS.map(({ id, label, icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPreviewChannel(id)}
                  className={cn(
                    'flex-1 py-xs flex items-center justify-center gap-xs font-label-caps text-label-caps transition-opacity',
                    previewChannel === id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-outline opacity-60 hover:opacity-100',
                  )}
                >
                  <Icon name={icon} className="text-[16px]" />
                  {label}
                </button>
              ))}
            </div>
            {/* Preview content */}
            <div className="flex-1 p-lg bg-black/40 min-h-[200px] flex flex-col gap-sm">
              {headline && (
                <p className="font-title-md text-title-md text-on-surface">{headline}</p>
              )}
              {primaryText && (
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-4">{primaryText}</p>
              )}
              {cta && (
                <button
                  type="button"
                  className="mt-auto self-start px-md py-xs rounded-lg bg-primary text-on-primary font-label-caps text-label-caps"
                >
                  {cta}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-lg border-t border-outline-variant/20">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-xs font-body-sm text-on-surface hover:text-primary transition-colors"
        >
          <Icon name="arrow_back" className="text-sm" />
          {t('wizard.navigation.backToAudience')}
        </button>
        <div className="flex items-center gap-md">
          <button
            type="button"
            className="px-lg py-sm rounded-lg border border-outline-variant/50 font-body-sm text-on-surface hover:bg-surface-variant transition-colors"
          >
            {t('wizard.navigation.saveDraft')}
          </button>
          <button
            type="button"
            onClick={handleLaunch}
            disabled={isPending}
            className="px-lg py-sm rounded-lg bg-gradient-to-b from-primary-container to-[#3b7de6] text-white font-body-sm font-semibold hover:brightness-110 transition-all flex items-center gap-xs disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(75,142,255,0.39)]"
          >
            <Icon name="rocket_launch" className="text-[18px]" filled />
            {t('wizard.navigation.launchCampaign')}
          </button>
        </div>
      </div>
    </div>
  )
}
