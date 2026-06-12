import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { useCampaignList } from '../hooks/useCampaigns'
import type { CampaignStatus } from '@/types'
import { cn } from '@/lib/cn'

type TabFilter = 'all' | 'active' | 'paused' | 'completed'
type ChannelFilter = 'linkedin' | 'youtube' | 'telegram' | null

const CHANNEL_COLORS: Record<string, string> = {
  linkedin: 'text-[#0077b5]',
  youtube: 'text-[#FF0000]',
  telegram: 'text-[#0088cc]',
}

const CHANNEL_ICONS: Record<string, string> = {
  linkedin: 'work',
  youtube: 'smart_display',
  telegram: 'send',
}

function statusIsActive(status: CampaignStatus) {
  return status === 'active' || status === 'launching'
}

export default function CampaignsPage() {
  const { t } = useTranslation(['campaigns', 'common'])
  const navigate = useNavigate()
  const { data, isLoading, isError } = useCampaignList()
  const [tab, setTab] = useState<TabFilter>('active')
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>(null)

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  const filtered = data.filter((c) => {
    const tabMatch =
      tab === 'all' ||
      (tab === 'active' && statusIsActive(c.status)) ||
      (tab === 'paused' && c.status === 'paused') ||
      (tab === 'completed' && c.status === 'completed')
    const channelMatch = !channelFilter || c.channels.includes(channelFilter)
    return tabMatch && channelMatch
  })

  const counts = {
    all: data.length,
    active: data.filter((c) => statusIsActive(c.status)).length,
    paused: data.filter((c) => c.status === 'paused').length,
    completed: data.filter((c) => c.status === 'completed').length,
  }

  const totalLeads = data.reduce((s, c) => s + c.leads, 0)

  return (
    <main className="px-gutter pb-12 pt-6 min-h-screen max-w-container-max mx-auto w-full relative">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 space-y-lg">
        {/* Page header & actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {t('campaigns:control.subtitle')}
          </p>
          <button
            type="button"
            onClick={() => navigate('/campaigns/new/step-1')}
            className="shrink-0 bg-gradient-to-b from-secondary-container to-[#d94a00] hover:from-[#ff6e1f] hover:to-secondary-container text-white font-body-sm !text-[15px] px-lg py-sm rounded-lg shadow-[0_4px_14px_0_rgba(255,94,7,0.39)] transition-all flex items-center gap-xs font-semibold border border-[#ff8340]/30 hover:scale-[1.02] active:scale-95"
          >
            <Icon name="add" className="text-[18px]" />
            {t('campaigns:control.newCampaign')}
          </button>
        </div>

        {/* Tabs + channel filter */}
        <div className="flex flex-wrap items-center justify-between gap-md border-b border-outline-variant/20 pb-xs">
          <div className="flex space-x-1">
            {(['all', 'active', 'paused', 'completed'] as const).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setTab(tabKey)}
                className={cn(
                  'px-sm py-2 rounded-t-lg font-body-sm text-body-sm font-medium transition-colors flex items-center gap-xs relative',
                  tab === tabKey
                    ? 'text-primary font-semibold border-b-2 border-primary bg-surface-container-high/30 top-[1px]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30',
                )}
              >
                {t(`campaigns:control.tabs.${tabKey}`)}
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px]',
                    tab === tabKey ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest',
                  )}
                >
                  {counts[tabKey]}
                </span>
              </button>
            ))}
          </div>

          {/* Channel filter */}
          <div className="flex items-center gap-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant mr-xs">
              {t('campaigns:control.filter')}
            </span>
            <div className="flex bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-1">
              {(['linkedin', 'youtube', 'telegram'] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setChannelFilter(channelFilter === ch ? null : ch)}
                  className={cn(
                    'px-3 py-1.5 rounded-md font-body-sm text-body-sm flex items-center gap-xs transition-colors',
                    channelFilter === ch
                      ? 'bg-surface-container-high text-on-surface shadow-sm border border-outline-variant/20'
                      : 'text-on-surface-variant hover:text-on-surface',
                  )}
                >
                  <Icon name={CHANNEL_ICONS[ch]} className="text-[16px]" />
                  <span className="capitalize">{ch.charAt(0).toUpperCase() + ch.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign table */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-lowest/50 backdrop-blur-md">
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant w-16">
                    {t('campaigns:control.table.status')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant">
                    {t('campaigns:control.table.routine')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant">
                    {t('campaigns:control.table.platform')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant">
                    {t('campaigns:control.table.targetContent')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant">
                    {t('campaigns:control.table.keyword')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant text-right">
                    {t('campaigns:control.table.respondidos')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant text-right">
                    {t('campaigns:control.table.leads')}
                  </th>
                  <th className="py-sm px-md font-label-caps text-label-caps text-on-surface-variant text-center w-12" />
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {filtered.map((campaign) => {
                  const isOn = statusIsActive(campaign.status)
                  const channel = campaign.channels[0]
                  return (
                    <tr
                      key={campaign._id}
                      className="border-b border-outline-variant/10 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                      {/* Toggle */}
                      <td className="py-md px-md">
                        <div
                          className={cn(
                            'w-10 h-5 rounded-full flex items-center p-0.5 relative shadow-inner',
                            isOn ? 'bg-secondary-container' : 'bg-surface-variant/30 border border-outline-variant/30',
                          )}
                        >
                          <div
                            className={cn(
                              'w-4 h-4 rounded-full shadow-sm absolute transition-transform',
                              isOn ? 'bg-white right-0.5' : 'bg-outline-variant left-0.5',
                            )}
                          />
                        </div>
                      </td>

                      {/* Routine */}
                      <td className="py-md px-md">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest border border-outline-variant/30 font-mono text-[12px] text-on-surface-variant">
                          {campaign.routineIcon && (
                            <Icon name={campaign.routineIcon} className="text-[14px]" />
                          )}
                          {campaign.routine ?? campaign._id}
                        </span>
                      </td>

                      {/* Platform */}
                      <td className="py-md px-md">
                        <div
                          className={cn(
                            'flex items-center gap-1.5',
                            channel ? CHANNEL_COLORS[channel] : 'text-on-surface-variant',
                            !isOn && 'opacity-70',
                          )}
                        >
                          <Icon name={channel ? CHANNEL_ICONS[channel] : 'campaign'} className="text-[18px]" />
                          <span className="font-medium capitalize">{channel}</span>
                        </div>
                      </td>

                      {/* Target content */}
                      <td className="py-md px-md max-w-xs">
                        <div className="flex flex-col gap-1">
                          <p
                            className={cn(
                              'font-medium truncate group-hover:text-primary transition-colors',
                              !isOn && 'text-on-surface/50',
                            )}
                          >
                            {campaign.name}
                          </p>
                          {campaign.contentLabel && (
                            <span className="text-[11px] text-on-surface-variant/70 italic">
                              {campaign.contentLabel}
                            </span>
                          )}
                          {campaign.contentUrl && (
                            <span className="text-[12px] text-on-surface-variant/70 truncate">
                              {campaign.contentUrl}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Keyword */}
                      <td className="py-md px-md">
                        {campaign.keyword && (
                          <span
                            className={cn(
                              'px-2 py-1 rounded border border-outline-variant/20',
                              isOn
                                ? 'bg-surface-variant/50 text-tertiary-fixed-dim'
                                : 'bg-surface-variant/20 border-outline-variant/10 text-on-surface-variant/50',
                            )}
                          >
                            {campaign.keyword}
                          </span>
                        )}
                      </td>

                      {/* Respondidos */}
                      <td
                        className={cn(
                          'py-md px-md text-right font-medium',
                          !isOn && 'text-on-surface-variant/50',
                        )}
                      >
                        {campaign.respondidos != null && campaign.respondidos > 0
                          ? campaign.respondidos.toLocaleString()
                          : '--'}
                      </td>

                      {/* Leads */}
                      <td
                        className={cn(
                          'py-md px-md text-right font-bold',
                          isOn ? 'text-primary' : 'text-on-surface-variant/50',
                        )}
                      >
                        {campaign.leads.toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="py-md px-md text-center">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant opacity-0 group-hover:opacity-100 hover:bg-surface-variant/50 transition-all"
                        >
                          <Icon name="more_horiz" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="py-sm px-md bg-surface-container-lowest/30 border-t border-outline-variant/10 flex justify-between items-center">
            <span className="font-body-sm text-[13px] text-on-surface-variant">
              {t('campaigns:control.footer.showing', { count: filtered.length, total: data.length })}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-md flex items-center justify-center text-on-surface-variant opacity-50 cursor-not-allowed"
              >
                <Icon name="chevron_left" className="text-[18px]" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-md flex items-center justify-center text-on-surface hover:bg-surface-variant/50 transition-colors"
              >
                <Icon name="chevron_right" className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Summary bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Total leads */}
          <div className="glass-panel p-md rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {t('campaigns:control.summary.totalLeads')}
            </h3>
            <div className="flex items-end gap-sm">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">
                {totalLeads.toLocaleString()}
              </span>
              <span className="flex items-center text-[12px] font-medium text-[#4ade80] mb-2 bg-[#4ade80]/10 px-1.5 py-0.5 rounded">
                <Icon name="trending_up" className="text-[14px]" />
                24%
              </span>
            </div>
          </div>

          {/* Avg conversion */}
          <div className="glass-panel p-md rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-tertiary/10 rounded-full blur-2xl group-hover:bg-tertiary/20 transition-all" />
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {t('campaigns:control.summary.avgConversion')}
            </h3>
            <div className="flex items-end gap-sm">
              <span className="font-display-lg text-display-lg text-on-surface tracking-tight">38.5%</span>
              <span className="flex items-center text-[12px] font-medium text-[#4ade80] mb-2 bg-[#4ade80]/10 px-1.5 py-0.5 rounded">
                <Icon name="trending_up" className="text-[14px]" />
                8%
              </span>
            </div>
          </div>

          {/* Active channels */}
          <div className="glass-panel p-md rounded-xl relative overflow-hidden flex flex-col justify-between">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {t('campaigns:control.summary.activeChannels')}
            </h3>
            <div className="flex items-center gap-md mt-auto">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#0077b5] border-2 border-background flex items-center justify-center text-white">
                  <Icon name="work" className="text-[16px]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FF0000] border-2 border-background flex items-center justify-center text-white">
                  <Icon name="smart_display" className="text-[16px]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0088cc] border-2 border-background flex items-center justify-center text-white">
                  <Icon name="send" className="text-[16px]" />
                </div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                {t('campaigns:control.summary.apisConnected')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
