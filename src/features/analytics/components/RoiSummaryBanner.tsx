import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { AnalyticsRoiSummary } from '@/types'

interface Props {
  roi: AnalyticsRoiSummary
}

export function RoiSummaryBanner({ roi }: Props) {
  const { t } = useTranslation('analytics')
  return (
    <div className="col-span-full glass-panel subtle-highlight p-xl rounded-xl flex flex-col md:flex-row justify-between items-center gap-lg border border-primary/40 shadow-sm dark:shadow-[0_0_15px_rgba(173,198,255,0.1)]">
      <div className="flex items-center gap-lg">
        <div className="p-4 bg-primary/20 rounded-full">
          <Icon name="payments" className="text-primary text-3xl" />
        </div>
        <div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase mb-1">
            {t('valueMetrics.roi.label')}
          </p>
          <h3 className="text-display-lg font-bold text-primary">{roi.estimatedRoi}</h3>
        </div>
      </div>
      <div className="flex gap-xl">
        <div className="text-right">
          <p className="text-xs text-on-surface-variant uppercase">
            {t('valueMetrics.roi.costPerLead')}
          </p>
          <p className="text-title-md font-bold">{roi.costPerLead}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-on-surface-variant uppercase">
            {t('valueMetrics.roi.customerAcquisitionCost')}
          </p>
          <p className="text-title-md font-bold text-green-400">{roi.customerAcquisitionCost}</p>
        </div>
      </div>
    </div>
  )
}
