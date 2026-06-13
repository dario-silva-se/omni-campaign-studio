import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { ApprovalComplianceItem } from '@/types'

interface ComplianceChecklistProps {
  items: ApprovalComplianceItem[]
}

export function ComplianceChecklist({ items }: ComplianceChecklistProps) {
  const { t } = useTranslation('approvals')

  return (
    <div>
      <h3 className="text-label-caps uppercase text-on-surface-variant tracking-widest mb-md">
        {t('detail.complianceChecklist')}
      </h3>
      <div className="space-y-sm">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-sm">
            <span
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                item.checked
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-error/20 text-error'
              }`}
            >
              <Icon name={item.checked ? 'check' : 'close'} className="text-xs" />
            </span>
            <span className="text-sm text-on-surface">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
