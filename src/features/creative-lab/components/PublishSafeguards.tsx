import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { ComplianceChecklist } from './ComplianceChecklist'
import type { ComplianceCheckItem, ComplianceSuggestion } from '@/types'

interface Props {
  complianceItems: ComplianceCheckItem[]
  suggestions: ComplianceSuggestion[]
  checkedIds: Set<string>
  onToggle: (id: string) => void
  onPublish: () => void
  canPublish: boolean
}

export function PublishSafeguards({
  complianceItems,
  suggestions,
  checkedIds,
  onToggle,
  onPublish,
  canPublish,
}: Props) {
  const { t } = useTranslation('creativeLab')

  return (
    <section className="w-[280px] flex-shrink-0 flex flex-col gap-md">
      <div className="glass-card flex-1 rounded-xl flex flex-col overflow-hidden relative">
        {/* Ambient background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

        {/* Header */}
        <div className="p-lg border-b border-outline-variant/10 bg-surface/50 backdrop-blur-md relative z-10">
          <h3 className="font-title-md text-title-md text-primary flex items-center gap-2">
            <Icon name="auto_fix_high" />
            {t('optimizer.title')}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 text-[13px]">
            {t('optimizer.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-md flex flex-col gap-4 relative z-10">
          {/* Compliance Checklist */}
          <div className="flex flex-col gap-3 mb-2">
            <h4 className="font-label-caps text-label-caps text-on-surface-variant/60 px-1">
              {t('optimizer.complianceTitle')}
            </h4>
            <ComplianceChecklist
              items={complianceItems}
              checkedIds={checkedIds}
              onToggle={onToggle}
            />
          </div>

          {/* Suggestions */}
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="bg-surface-container rounded-lg p-3 border border-outline-variant/10 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Icon
                  name={sug.type === 'warning' ? 'warning' : 'lightbulb'}
                  className={`mt-0.5 text-[18px] ${
                    sug.type === 'warning' ? 'text-secondary-container' : 'text-primary'
                  }`}
                />
                <div>
                  <h4 className="font-body-sm text-body-sm font-semibold text-on-surface">
                    {sug.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] mt-1">
                    {sug.description}
                  </p>
                  {sug.quickActions && sug.quickActions.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {sug.quickActions.map((action) => (
                        <button
                          key={action.value}
                          type="button"
                          className="px-2 py-1 bg-surface-variant rounded text-xs hover:bg-surface-bright transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* CTA: Run Full Analysis */}
          <div className="mt-auto pt-4">
            <button
              type="button"
              className="w-full py-2.5 rounded-lg border border-primary/30 text-primary font-title-md text-title-md !text-[13px] flex justify-center items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <Icon name="psychology" className="text-[16px]" />
              {t('optimizer.runFullAnalysis')}
            </button>
          </div>
        </div>
      </div>

      {/* Publish CTA */}
      <button
        type="button"
        disabled={!canPublish}
        onClick={onPublish}
        className="w-full py-3 rounded-xl bg-primary text-on-primary-container font-title-md text-title-md flex justify-center items-center gap-2 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90"
        aria-label={t('header.finalize')}
      >
        <Icon name="check_circle" className="text-[18px]" />
        {t('header.finalize')}
      </button>
    </section>
  )
}
