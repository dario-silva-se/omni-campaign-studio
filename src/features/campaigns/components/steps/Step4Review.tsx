import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useWizard } from '../../wizardContext'

interface Props {
  onBack: () => void
  onNext: () => void
}

const SEGMENTS: Record<string, { name: string; size: string; engagement: string; location: string; ageRange: string }> = {
  'seg-001': { name: 'Tech Enthusiasts', size: '2.4M', engagement: 'High', location: 'Global (All)', ageRange: '25 - 44' },
  'seg-002': { name: 'LinkedIn Power Users', size: '850K', engagement: 'Medium', location: 'Global (All)', ageRange: '25 - 44' },
}

export default function Step4Review({ onBack, onNext }: Props) {
  const { t } = useTranslation('campaigns')
  const { state } = useWizard()
  const { selectedSegmentId, interests, location, ageRange, behaviorClickedLinkedIn } = state.step3

  const seg = selectedSegmentId ? SEGMENTS[selectedSegmentId] : null
  const displayName = seg?.name ?? t('wizard.step4.customAudience')
  const displaySize = seg?.size ?? '~1.2M'
  const displayEngagement = seg?.engagement ?? 'Medium'
  const displayLocation = seg?.location ?? location
  const displayAgeRange = seg?.ageRange ?? ageRange

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div className="flex flex-col items-start gap-xs">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
          {t('wizard.step4.heading')}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t('wizard.step4.subheading')}</p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg w-full">
        {/* Left col */}
        <div className="col-span-1 md:col-span-8 flex flex-col gap-lg">
          {/* Main segment card */}
          <div className="bg-[rgba(42,42,42,0.4)] backdrop-blur-[20px] border border-white/10 rounded-xl p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-lg relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
            <div className="flex items-center gap-md z-10">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-primary">
                <Icon name="group" className="text-[24px]" />
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {t('wizard.step4.selectedSegment')}
                </div>
                <h2 className="font-title-md text-title-md text-on-surface">{displayName}</h2>
              </div>
            </div>
            <div className="flex gap-md w-full md:w-auto z-10">
              <div className="bg-surface-container px-md py-sm rounded-lg border border-outline-variant/10 flex-1 md:flex-none">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {t('wizard.step4.audienceSize')}
                </div>
                <div className="font-title-md text-title-md text-on-surface">{displaySize}</div>
              </div>
              <div className="bg-surface-container px-md py-sm rounded-lg border border-outline-variant/10 flex-1 md:flex-none">
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {t('wizard.step4.engagement')}
                </div>
                <div className="font-title-md text-title-md text-tertiary-fixed flex items-center gap-xs">
                  {displayEngagement}
                  <Icon name="trending_up" className="text-[16px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Details row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Demographics */}
            <div className="bg-[rgba(42,42,42,0.4)] backdrop-blur-[20px] border border-white/10 rounded-xl p-lg flex flex-col gap-md">
              <div className="flex items-center gap-sm text-on-surface-variant border-b border-outline-variant/10 pb-sm">
                <Icon name="public" className="text-[18px]" />
                <span className="font-label-caps text-label-caps">{t('wizard.step4.demographics')}</span>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{t('wizard.step4.location')}</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">{displayLocation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{t('wizard.step4.ageRange')}</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">{displayAgeRange}</span>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-[rgba(42,42,42,0.4)] backdrop-blur-[20px] border border-white/10 rounded-xl p-lg flex flex-col gap-md">
              <div className="flex items-center gap-sm text-on-surface-variant border-b border-outline-variant/10 pb-sm">
                <Icon name="favorite" className="text-[18px]" />
                <span className="font-label-caps text-label-caps">{t('wizard.step4.interestsBehaviors')}</span>
              </div>
              <div className="flex flex-wrap gap-xs">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="px-sm py-xs rounded-full bg-primary/10 border border-primary/20 font-body-sm text-body-sm text-primary"
                  >
                    {i}
                  </span>
                ))}
                {behaviorClickedLinkedIn && (
                  <span className="px-sm py-xs rounded-full bg-surface-variant/50 border border-outline-variant/20 font-body-sm text-body-sm text-on-surface-variant">
                    {t('wizard.step4.linkedinClicks')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: reach estimate */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center bg-[rgba(42,42,42,0.4)] backdrop-blur-[20px] border border-white/10 rounded-xl p-lg text-center">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-sm tracking-widest">
            {t('wizard.step4.estReach')}
          </span>
          <span className="font-display-lg text-display-lg text-primary leading-none">~1.2M</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm opacity-70">
            {t('wizard.step4.reachDescription')}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-lg border-t border-outline-variant/10">
        <button
          type="button"
          onClick={onBack}
          className="px-lg py-sm rounded-lg flex items-center gap-xs font-body-sm text-on-surface border border-outline-variant/50 hover:bg-surface-container-high transition-colors"
        >
          <Icon name="arrow_back" className="text-sm" />
          {t('wizard.navigation.back')}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-xl py-sm rounded-lg bg-gradient-to-b from-primary to-[#005bc1] text-on-primary font-bold hover:brightness-110 transition-all flex items-center gap-sm"
        >
          {t('wizard.navigation.continueToCreative')}
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>
    </div>
  )
}
