import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { WizardContext, useWizardReducer } from '../wizardContext'
import Step1Details from '../components/steps/Step1Details'
import Step2Channels from '../components/steps/Step2Channels'
import Step3Audience from '../components/steps/Step3Audience'
import Step4Review from '../components/steps/Step4Review'
import Step5Creative from '../components/steps/Step5Creative'
import { cn } from '@/lib/cn'

const STEP_PATHS = [
  '/campaigns/new/step-1',
  '/campaigns/new/step-2',
  '/campaigns/new/step-3',
  '/campaigns/new/step-4',
  '/campaigns/new/step-5',
]

function parseStep(pathname: string): number {
  const match = pathname.match(/step-(\d+)/)
  if (match) {
    const n = parseInt(match[1], 10)
    if (n >= 1 && n <= 5) return n
  }
  return 1
}

export default function NewCampaignWizard() {
  const { t } = useTranslation(['campaigns'])
  const location = useLocation()
  const navigate = useNavigate()
  const currentStep = parseStep(location.pathname)
  const [state, dispatch] = useWizardReducer()

  const stepLabels = [
    t('campaigns:wizard.steps.step1'),
    t('campaigns:wizard.steps.step2'),
    t('campaigns:wizard.steps.step3'),
    t('campaigns:wizard.steps.step4'),
    t('campaigns:wizard.steps.step5'),
  ]

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      <main className="px-gutter pb-12 pt-6 min-h-screen max-w-container-max mx-auto w-full relative">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-xs text-on-surface-variant font-body-sm text-body-sm mb-xs">
            <button
              type="button"
              onClick={() => navigate('/campaigns')}
              className="hover:text-primary transition-colors"
            >
              {t('campaigns:wizard.breadcrumb.campaigns')}
            </button>
            <Icon name="chevron_right" className="text-[16px]" />
            <span className="text-on-surface">{t('campaigns:wizard.breadcrumb.new')}</span>
          </div>

          {/* Title */}
          <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">
            {t('campaigns:wizard.title')}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-2xl">
            {t('campaigns:wizard.subtitle')}
          </p>

          {/* Wizard shell */}
          <div className="glass-panel rounded-xl p-lg md:p-xl flex flex-col gap-xl relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-overlay-md to-transparent rounded-t-xl" />

            {/* Stepper */}
            <div className="relative flex justify-between items-center" data-testid="stepper">
              {/* Line bg */}
              <div className="absolute left-0 top-[18px] w-full h-1 bg-surface-variant rounded-full -z-10" />
              {/* Active line */}
              <div
                className="absolute left-0 top-[18px] h-1 bg-primary rounded-full -z-10 shadow-[0_0_10px_rgba(173,198,255,0.5)] transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              />

              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1
                const isCompleted = stepNum < currentStep
                const isActive = stepNum === currentStep
                return (
                  <div
                    key={label}
                    data-testid={`step-indicator-${stepNum}`}
                    className={cn(
                      'flex flex-col items-center gap-xs',
                      !isActive && !isCompleted && 'opacity-50',
                    )}
                  >
                    <div
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center font-title-md text-title-md border-2 transition-all',
                        isCompleted
                          ? 'bg-primary border-primary text-on-primary shadow-[0_0_12px_rgba(173,198,255,0.4)]'
                          : isActive
                          ? 'bg-primary border-primary-fixed-dim text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.4)]'
                          : 'bg-surface-container border-outline-variant text-on-surface-variant',
                      )}
                    >
                      {isCompleted ? (
                        <Icon name="check" className="text-[16px]" />
                      ) : (
                        <span className="text-[14px] font-semibold">{stepNum}</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        'font-label-caps text-label-caps uppercase tracking-wider text-center hidden sm:block',
                        isActive ? 'text-primary' : 'text-on-surface-variant',
                      )}
                    >
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>

            <hr className="border-outline-variant/30 w-full" />

            {/* Step content */}
            <div>
              {currentStep === 1 && <Step1Details onNext={() => navigate(STEP_PATHS[1])} />}
              {currentStep === 2 && (
                <Step2Channels
                  onBack={() => navigate(STEP_PATHS[0])}
                  onNext={() => navigate(STEP_PATHS[2])}
                />
              )}
              {currentStep === 3 && (
                <Step3Audience
                  onBack={() => navigate(STEP_PATHS[1])}
                  onNext={() => navigate(STEP_PATHS[3])}
                />
              )}
              {currentStep === 4 && (
                <Step4Review
                  onBack={() => navigate(STEP_PATHS[2])}
                  onNext={() => navigate(STEP_PATHS[4])}
                />
              )}
              {currentStep === 5 && (
                <Step5Creative onBack={() => navigate(STEP_PATHS[3])} />
              )}
            </div>
          </div>
        </div>
      </main>
    </WizardContext.Provider>
  )
}
