import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { ComplianceCheckItem } from '@/types'

interface Props {
  items: ComplianceCheckItem[]
  checkedIds: Set<string>
  onToggle: (id: string) => void
}

export function ComplianceChecklist({ items, checkedIds, onToggle }: Props) {
  const { t } = useTranslation('creativeLab')

  // Separate base items from platform-specific items
  const baseItems = items.filter(
    (item) => !item.label.includes('LinkedIn') && !item.label.includes('YouTube'),
  )
  const platformItems = items.filter(
    (item) => item.label.includes('LinkedIn') || item.label.includes('YouTube'),
  )

  const renderItem = (item: ComplianceCheckItem) => {
    const isChecked = item.autoChecked || checkedIds.has(item.id)
    const isError = !isChecked && item.required
    const isPending = !isChecked && !item.required

    return (
      <div key={item.id} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.autoChecked ? (
            <Icon name="check_circle" className="text-primary text-[18px]" />
          ) : isPending ? (
            <Icon name="radio_button_unchecked" className="text-on-surface-variant/40 text-[18px]" />
          ) : isError && !checkedIds.has(item.id) ? (
            <Icon name="error" className="text-secondary-container text-[18px]" />
          ) : (
            <Icon name="check_circle" className="text-primary text-[18px]" />
          )}
          {item.autoChecked ? (
            <span className="text-[12px] text-on-surface">{item.label}</span>
          ) : (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary cursor-pointer"
                checked={checkedIds.has(item.id)}
                onChange={() => onToggle(item.id)}
                aria-label={item.label}
              />
              <span
                className={`text-[12px] ${
                  isPending ? 'text-on-surface-variant' : 'text-on-surface'
                }`}
              >
                {item.label}
              </span>
            </label>
          )}
        </div>
        {item.autoChecked && item.note && (
          <span
            className={`text-[10px] ${
              item.note === t('optimizer.verified')
                ? 'text-primary'
                : 'text-on-surface-variant'
            }`}
          >
            {item.note}
          </span>
        )}
        {!item.autoChecked && item.actionLabel && !checkedIds.has(item.id) && (
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            className="text-[10px] text-primary hover:underline"
          >
            {item.actionLabel}
          </button>
        )}
        {!item.autoChecked && item.required && item.note && (
          <span className="text-[10px] text-on-surface-variant/40">{item.note}</span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/10 flex flex-col gap-3">
      {baseItems.map(renderItem)}
      {platformItems.length > 0 && (
        <div className="pt-2 mt-2 border-t border-outline-variant/10 flex flex-col gap-3">
          <h5 className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-wider">
            {t('optimizer.platformSpecifics')}
          </h5>
          {platformItems.map(renderItem)}
        </div>
      )}
    </div>
  )
}
