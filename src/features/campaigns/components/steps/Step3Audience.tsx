import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useWizard } from '../../wizardContext'
import { cn } from '@/lib/cn'

interface Props {
  onBack: () => void
  onNext: () => void
}

const SAVED_SEGMENTS = [
  { id: 'seg-001', name: 'Tech Enthusiasts', desc: 'Active users engaging with AI & Dev tools.', size: '2.4M', engagement: 'High', engagementColor: 'text-secondary' },
  { id: 'seg-002', name: 'LinkedIn Power Users', desc: 'Daily active professionals in marketing.', size: '850K', engagement: 'Medium', engagementColor: 'text-primary' },
]

const LOCATION_OPTIONS = ['Global (All)', 'North America', 'Europe', 'Latin America', 'Asia Pacific']
const AGE_OPTIONS = ['18 - 24', '25 - 44', '45+']
const INTEREST_SUGGESTIONS = ['SaaS', 'B2B Sales', 'No-code', 'DevOps', 'Marketing Automation']

export default function Step3Audience({ onBack, onNext }: Props) {
  const { t } = useTranslation('campaigns')
  const { state, dispatch } = useWizard()
  const {
    selectedSegmentId,
    location,
    ageRange,
    interests,
    behaviorClickedLinkedIn,
    behaviorOpenedEmail,
    behaviorNewLeads,
  } = state.step3
  const [error, setError] = useState('')

  /**
   * A segment is considered configured if:
   * - a saved segment is selected, OR
   * - the custom builder has at least one interest OR one behavior flag set
   *   (location and ageRange have default values so they don't count alone)
   */
  function isAudienceConfigured(): boolean {
    if (selectedSegmentId) return true
    const hasInterest = interests.length > 0
    const hasBehavior = behaviorClickedLinkedIn || behaviorOpenedEmail || behaviorNewLeads
    return hasInterest || hasBehavior
  }

  function handleNext() {
    if (!isAudienceConfigured()) {
      setError(t('wizard.step3.required'))
      return
    }
    setError('')
    onNext()
  }

  function toggleInterest(interest: string) {
    const next = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest]
    dispatch({ type: 'SET_STEP3', payload: { interests: next } })
  }

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div className="text-center mb-xs">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">{t('wizard.step3.heading')}</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t('wizard.step3.subheading')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left: saved segments */}
        <div className="lg:col-span-5 space-y-md">
          <h2 className="font-title-md text-title-md text-on-surface">{t('wizard.step3.savedSegments')}</h2>
          {SAVED_SEGMENTS.map((seg) => {
            const isSelected = selectedSegmentId === seg.id
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_STEP3',
                    payload: { selectedSegmentId: isSelected ? null : seg.id },
                  })
                }
                className={cn(
                  'w-full rounded-xl p-md flex flex-col gap-sm text-left transition-all',
                  'bg-[rgba(42,42,42,0.4)] backdrop-blur-[20px] border',
                  isSelected
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-overlay-md hover:border-overlay-lg',
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-body-lg text-body-lg text-on-surface font-semibold flex items-center gap-xs">
                      {seg.name}
                      {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{seg.desc}</p>
                  </div>
                  {isSelected && (
                    <Icon name="check_circle" className="text-primary text-[20px] shrink-0" />
                  )}
                </div>
                <div className="flex gap-md border-t border-overlay-sm pt-sm">
                  <div>
                    <span className="block font-label-caps text-label-caps text-on-surface-variant">SIZE</span>
                    <span className="font-body-sm text-body-sm text-on-surface">{seg.size}</span>
                  </div>
                  <div>
                    <span className="block font-label-caps text-label-caps text-on-surface-variant">ENGAGEMENT</span>
                    <span className={cn('font-body-sm text-body-sm', seg.engagementColor)}>{seg.engagement}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: custom builder */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-lg flex flex-col gap-lg">
          <div className="flex justify-between items-center border-b border-overlay-md pb-md">
            <h2 className="font-title-md text-title-md text-on-surface">{t('wizard.step3.customBuilder')}</h2>
            <span className="font-label-caps text-label-caps text-primary px-sm py-xs rounded-full bg-primary/10">
              {t('wizard.step3.estReach')}
            </span>
          </div>

          {/* Demographics */}
          <div className="space-y-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-xs">
              <Icon name="public" className="text-[16px]" />
              {t('wizard.step3.demographics')}
            </h3>
            <div className="grid grid-cols-2 gap-sm">
              <div className="space-y-xs">
                <label className="font-body-sm text-body-sm text-on-surface">{t('wizard.step3.location')}</label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => dispatch({ type: 'SET_STEP3', payload: { location: e.target.value } })}
                    className="w-full bg-input-bg border border-overlay-md rounded-md px-sm py-xs text-on-surface font-body-sm text-body-sm appearance-none focus:border-primary focus:outline-none"
                  >
                    {LOCATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <Icon name="expand_more" className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]" />
                </div>
              </div>
              <div className="space-y-xs">
                <label className="font-body-sm text-body-sm text-on-surface">{t('wizard.step3.ageRange')}</label>
                <div className="relative">
                  <select
                    value={ageRange}
                    onChange={(e) => dispatch({ type: 'SET_STEP3', payload: { ageRange: e.target.value } })}
                    className="w-full bg-input-bg border border-overlay-md rounded-md px-sm py-xs text-on-surface font-body-sm text-body-sm appearance-none focus:border-primary focus:outline-none"
                  >
                    {AGE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <Icon name="expand_more" className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-xs">
              <Icon name="favorite" className="text-[16px]" />
              {t('wizard.step3.interests')}
            </h3>
            <div className="relative mb-xs">
              <Icon name="search" className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
              <input
                type="text"
                placeholder={t('wizard.step3.interestsPlaceholder')}
                className="w-full bg-input-bg border border-overlay-md rounded-md pl-xl pr-sm py-xs text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-xs">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className="bg-primary-container/15 border border-primary-container/30 rounded-full px-sm py-xs font-body-sm text-body-sm flex items-center gap-xs text-on-surface"
                >
                  {interest}
                  <Icon name="close" className="text-[14px]" />
                </button>
              ))}
              {INTEREST_SUGGESTIONS.filter((s) => !interests.includes(s)).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => toggleInterest(suggestion)}
                  className="bg-primary/15 border border-primary/30 rounded-full px-sm py-xs font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs hover:text-on-surface"
                >
                  {suggestion}
                  <Icon name="add" className="text-[14px]" />
                </button>
              ))}
            </div>
          </div>

          {/* Past behavior */}
          <div className="space-y-sm">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-xs">
              <Icon name="history" className="text-[16px]" />
              {t('wizard.step3.pastBehavior')}
            </h3>
            <div className="space-y-xs">
              {[
                { key: 'behaviorOpenedEmail', label: t('wizard.step3.behaviorOpenedEmail'), value: behaviorOpenedEmail, field: 'behaviorOpenedEmail' as const },
                { key: 'behaviorClickedLinkedIn', label: t('wizard.step3.behaviorClickedLinkedIn'), value: behaviorClickedLinkedIn, field: 'behaviorClickedLinkedIn' as const },
                { key: 'behaviorNewLeads', label: t('wizard.step3.behaviorNewLeads'), value: behaviorNewLeads, field: 'behaviorNewLeads' as const },
              ].map(({ key, label, value, field }) => (
                <label key={key} className="flex items-center gap-sm cursor-pointer group">
                  <div
                    onClick={() => dispatch({ type: 'SET_STEP3', payload: { [field]: !value } })}
                    className={cn(
                      'w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors',
                      value
                        ? 'border-primary bg-primary/20'
                        : 'border-overlay-lg bg-surface-container-lowest group-hover:border-primary',
                    )}
                  >
                    {value && <Icon name="check" className="text-[16px] text-primary" />}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-sm pt-lg border-t border-outline-variant/10">
        {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}
        <div className="flex justify-between items-center">
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
            className="px-xl py-sm rounded-lg bg-gradient-to-b from-primary to-[#005bc1] text-on-primary font-bold hover:brightness-110 transition-all flex items-center gap-sm"
          >
            {t('wizard.navigation.reviewCampaign')}
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
