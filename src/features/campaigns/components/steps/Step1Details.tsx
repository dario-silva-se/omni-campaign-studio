import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { useWizard } from '../../wizardContext'
import { cn } from '@/lib/cn'
import type { WizardObjective } from '@/types'

interface Props {
  onNext: () => void
}

const OBJECTIVES: { value: WizardObjective; icon: string; labelKey: string; descKey: string }[] = [
  { value: 'lead-gen', icon: 'group_add', labelKey: 'wizard.step1.objectives.leadGen', descKey: 'wizard.step1.objectives.leadGenDesc' },
  { value: 'engagement', icon: 'thumb_up', labelKey: 'wizard.step1.objectives.engagement', descKey: 'wizard.step1.objectives.engagementDesc' },
  { value: 'sales', icon: 'shopping_cart', labelKey: 'wizard.step1.objectives.sales', descKey: 'wizard.step1.objectives.salesDesc' },
]

export default function Step1Details({ onNext }: Props) {
  const { t } = useTranslation('campaigns')
  const navigate = useNavigate()
  const { state, dispatch } = useWizard()
  const { name, description, objective, priority } = state.step1
  const [error, setError] = useState('')

  function handleNext() {
    if (!name.trim()) {
      setError(t('wizard.step1.nameRequired'))
      return
    }
    setError('')
    onNext()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
      {/* Left: main inputs */}
      <div className="col-span-1 md:col-span-8 flex flex-col gap-lg">
        {/* Campaign name */}
        <div className="flex flex-col gap-xs">
          <label
            className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2"
            htmlFor="campaign-name"
          >
            {t('wizard.step1.name')}
            <span className="text-error">*</span>
          </label>
          <input
            id="campaign-name"
            type="text"
            value={name}
            onChange={(e) => {
              dispatch({ type: 'SET_STEP1', payload: { name: e.target.value } })
              if (error) setError('')
            }}
            placeholder={t('wizard.step1.namePlaceholder')}
            className={cn(
              'bg-input-bg border font-body-lg text-body-lg rounded-DEFAULT px-md py-sm w-full placeholder:text-outline-variant focus:outline-none transition-all',
              error
                ? 'border-error focus:border-error focus:ring-1 focus:ring-error/20'
                : 'border-overlay-md focus:border-primary focus:ring-1 focus:ring-primary/20',
            )}
          />
          {error ? (
            <p className="font-body-sm text-body-sm text-error mt-1">{error}</p>
          ) : (
            <p className="font-body-sm text-body-sm text-on-surface-variant/60 mt-1">
              {t('wizard.step1.nameHint')}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-xs mt-sm">
          <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="campaign-desc">
            {t('wizard.step1.description')}
          </label>
          <textarea
            id="campaign-desc"
            value={description}
            onChange={(e) => dispatch({ type: 'SET_STEP1', payload: { description: e.target.value } })}
            placeholder={t('wizard.step1.descriptionPlaceholder')}
            rows={4}
            className="bg-input-bg border border-overlay-md font-body-lg text-body-lg rounded-DEFAULT px-md py-sm w-full placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 resize-none transition-all"
          />
        </div>
      </div>

      {/* Right: objectives + priority */}
      <div className="col-span-1 md:col-span-4 flex flex-col gap-lg">
        {/* Objective */}
        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            {t('wizard.step1.objective')}
          </span>
          <div className="grid grid-cols-1 gap-sm">
            {OBJECTIVES.map(({ value, icon, labelKey, descKey }) => {
              const isSelected = objective === value
              return (
                <label key={value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="objective"
                    value={value}
                    checked={isSelected}
                    onChange={() => dispatch({ type: 'SET_STEP1', payload: { objective: value } })}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      'rounded-lg p-md flex items-start gap-sm transition-all duration-200',
                      'bg-[rgba(42,42,42,0.6)] backdrop-blur-[16px] border',
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-outline-variant/50',
                    )}
                  >
                    <div className="mt-1">
                      <Icon
                        name={icon}
                        className={cn('text-[20px]', isSelected ? 'text-primary' : 'text-on-surface-variant')}
                        filled={isSelected}
                      />
                    </div>
                    <div>
                      <p
                        className={cn(
                          'font-title-md text-title-md mb-1',
                          isSelected ? 'text-primary' : 'text-on-surface',
                        )}
                      >
                        {t(labelKey)}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{t(descKey)}</p>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Priority toggle */}
        <div className="bg-[rgba(42,42,42,0.6)] backdrop-blur-[16px] border border-overlay-sm rounded-lg p-md flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-on-surface flex items-center gap-xs">
              {t('wizard.step1.priority')}
              <Icon name="star" className="text-secondary text-[18px]" filled />
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {t('wizard.step1.priorityHint')}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={priority}
              onChange={(e) => dispatch({ type: 'SET_STEP1', payload: { priority: e.target.checked } })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-outline-variant/30 peer-checked:bg-primary relative" />
          </label>
        </div>
      </div>

      {/* Action buttons */}
      <div className="col-span-1 md:col-span-12 mt-xl flex items-center justify-end gap-md pt-lg border-t border-outline-variant/20">
        <button
          type="button"
          onClick={() => navigate('/campaigns')}
          className="font-body-lg text-body-lg font-semibold px-lg py-sm rounded-DEFAULT border border-outline-variant/50 text-on-surface hover:bg-surface-variant transition-colors"
        >
          {t('wizard.navigation.cancel')}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="font-body-lg text-body-lg font-semibold px-lg py-sm rounded-DEFAULT bg-primary dark:bg-gradient-to-b dark:from-primary dark:to-primary-container text-on-primary dark:text-on-primary-container shadow-md dark:shadow-[0_0_15px_rgba(75,142,255,0.3)] hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(75,142,255,0.5)] transition-all flex items-center gap-xs group"
        >
          {t('wizard.navigation.next')}
          <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform text-[20px]" />
        </button>
      </div>
    </div>
  )
}
