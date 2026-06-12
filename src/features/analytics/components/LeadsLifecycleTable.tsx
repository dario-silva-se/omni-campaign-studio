import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import type { LeadLifecycleLead, LeadStage } from '@/types'

interface Props {
  leads: LeadLifecycleLead[]
}

const STAGE_STYLES: Record<LeadStage, { bg: string; text: string; border: string; dot: string }> = {
  'sql-crm-synced': {
    bg: 'bg-[#4CAF50]/15',
    text: 'text-[#4CAF50]',
    border: 'border-[#4CAF50]/20',
    dot: 'bg-[#4CAF50]',
  },
  'mql-nurture': {
    bg: 'bg-[#FF9800]/15',
    text: 'text-[#FF9800]',
    border: 'border-[#FF9800]/20',
    dot: 'bg-[#FF9800]',
  },
  'lead-discovery': {
    bg: 'bg-outline-variant/30',
    text: 'text-on-surface-variant',
    border: 'border-outline-variant/20',
    dot: 'bg-outline',
  },
}

const SOURCE_ICON: Record<string, { icon: string; color: string }> = {
  linkedin: { icon: 'work', color: 'text-[#0A66C2]' },
  youtube: { icon: 'play_arrow', color: 'text-[#FF0000]' },
  telegram: { icon: 'send', color: 'text-[#26A5E4]' },
}

export function LeadsLifecycleTable({ leads }: Props) {
  const { t } = useTranslation('analytics')

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
      <div className="p-lg border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest/50">
        <h3 className="font-title-md text-title-md text-on-surface font-semibold">
          {t('leadLifecycle.recentLeads.title')}
        </h3>
        <button type="button" className="text-primary font-body-sm text-body-sm hover:underline">
          {t('leadLifecycle.recentLeads.viewAll')}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-highest/20">
              <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {t('leadLifecycle.recentLeads.columns.lead')}
              </th>
              <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {t('leadLifecycle.recentLeads.columns.sourceTouch')}
              </th>
              <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {t('leadLifecycle.recentLeads.columns.qualityScore')}
              </th>
              <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {t('leadLifecycle.recentLeads.columns.currentStage')}
              </th>
              <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">
                {t('leadLifecycle.recentLeads.columns.lastActive')}
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm divide-y divide-outline-variant/10">
            {leads.map((lead) => {
              const stage = STAGE_STYLES[lead.stage]
              const src = SOURCE_ICON[lead.sourceTouchChannel] ?? SOURCE_ICON.linkedin
              return (
                <tr
                  key={lead._id}
                  className="table-row-zebra hover:bg-surface-variant/30 transition-colors group"
                >
                  <td className="py-md px-md">
                    <div className="flex items-center gap-sm">
                      <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface border border-outline-variant/30 font-bold text-xs shrink-0">
                        {lead.initials}
                      </div>
                      <div>
                        <div className="text-on-surface font-medium group-hover:text-primary transition-colors cursor-pointer">
                          {lead.name}
                        </div>
                        <div className="text-on-surface-variant text-[12px]">{lead.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-md px-md">
                    <div className="flex items-center gap-xs text-on-surface-variant">
                      <Icon name={src.icon} className={`text-[16px] ${src.color}`} />
                      {lead.sourceTouch}
                    </div>
                  </td>
                  <td className="py-md px-md">
                    <div className="flex items-center gap-xs">
                      <span className="text-on-surface font-semibold">{lead.qualityScore}</span>
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((star) => (
                          <Icon
                            key={star}
                            name="star"
                            filled
                            className={`text-[14px] ${star <= lead.qualityStars ? 'text-secondary' : 'text-on-surface-variant/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-md px-md">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium border ${stage.bg} ${stage.text} ${stage.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                      {t(`leadLifecycle.recentLeads.stages.${
                        lead.stage === 'sql-crm-synced'
                          ? 'sqlCrmSynced'
                          : lead.stage === 'mql-nurture'
                          ? 'mqlNurture'
                          : 'leadDiscovery'
                      }`)}
                    </span>
                  </td>
                  <td className="py-md px-md text-right text-on-surface-variant">
                    {lead.lastActive}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="p-sm border-t border-outline-variant/10 flex justify-center bg-surface-container-lowest/30">
        <div className="flex gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
          >
            <Icon name="chevron_left" className="text-[18px]" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded flex items-center justify-center bg-primary/20 text-primary border border-primary/30"
          >
            1
          </button>
          {[2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
          >
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
