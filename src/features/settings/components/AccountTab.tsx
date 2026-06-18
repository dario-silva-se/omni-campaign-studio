import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SettingsCard, SettingsCardHeader } from './SettingsCard'

const LANG_OPTIONS = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es', label: 'Español' },
]

const TZ_OPTIONS = [
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (UTC−3)' },
  { value: 'America/New_York', label: 'America/New_York (UTC−5)' },
  { value: 'Europe/Lisbon', label: 'Europe/Lisbon (UTC+0)' },
]

const DATE_OPTIONS = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/AAAA' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'AAAA-MM-DD' },
]

const CURRENCY_OPTIONS = [
  { value: 'BRL', label: 'BRL — Real Brasileiro (R$)' },
  { value: 'USD', label: 'USD — Dólar Americano ($)' },
  { value: 'EUR', label: 'EUR — Euro (€)' },
]

export function AccountTab() {
  const { t } = useTranslation('settings')
  const pref = 'userSettings.account.preferences' as const
  const notif = 'userSettings.account.notifications' as const
  const plan = 'userSettings.account.plan' as const
  const dz = 'userSettings.account.dangerZone' as const

  const [toggles, setToggles] = useState({
    campaigns: true,
    approvals: true,
    reports: false,
    tips: false,
  })

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  const notifItems: { key: keyof typeof toggles; icon: string; titleKey: string; descKey: string; active: boolean }[] = [
    { key: 'campaigns', icon: 'campaign', titleKey: `${notif}.campaigns`, descKey: `${notif}.campaignsDesc`, active: true },
    { key: 'approvals', icon: 'check_circle', titleKey: `${notif}.approvals`, descKey: `${notif}.approvalsDesc`, active: true },
    { key: 'reports', icon: 'bar_chart', titleKey: `${notif}.reports`, descKey: `${notif}.reportsDesc`, active: false },
    { key: 'tips', icon: 'tips_and_updates', titleKey: `${notif}.tips`, descKey: `${notif}.tipsDesc`, active: false },
  ]

  return (
    <div className="space-y-lg">
      {/* ── General preferences ── */}
      <SettingsCard>
        <SettingsCardHeader icon="tune" title={t(`${pref}.title`)} subtitle={t(`${pref}.subtitle`)} />
        <div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-md">
          <Select label={t(`${pref}.language`)} options={LANG_OPTIONS} defaultValue="pt-BR" />
          <Select label={t(`${pref}.timezone`)} options={TZ_OPTIONS} defaultValue="America/Sao_Paulo" />
          <Select label={t(`${pref}.dateFormat`)} options={DATE_OPTIONS} defaultValue="DD/MM/YYYY" />
          <Select label={t(`${pref}.currency`)} options={CURRENCY_OPTIONS} defaultValue="BRL" />
        </div>
        <div className="px-lg pb-lg flex justify-end">
          <button
            type="button"
            className="px-lg py-sm rounded-xl bg-primary text-on-primary text-[13px] font-semibold hover:shadow-[0_0_20px_rgba(173,198,255,0.2)] transition-all active:scale-95 flex items-center gap-2"
          >
            <Icon name="save" className="text-[15px]" />
            {t(`${pref}.save`)}
          </button>
        </div>
      </SettingsCard>

      {/* ── Notification preferences ── */}
      <SettingsCard>
        <SettingsCardHeader
          icon="notifications_active"
          title={t(`${notif}.title`)}
          subtitle={t(`${notif}.subtitle`)}
        />
        <div className="p-lg space-y-sm">
          {notifItems.map(({ key, icon, titleKey, descKey, active }) => (
            <div
              key={key}
              className="p-md bg-surface-container rounded-xl border border-outline-variant/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-md">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-primary/10' : 'bg-surface-container-high'}`}
                >
                  <Icon
                    name={icon}
                    className={`text-[18px] ${active ? 'text-primary' : 'text-on-surface-variant'}`}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-on-surface">{t(titleKey)}</p>
                  <p className="text-[12px] text-on-surface-variant/60">{t(descKey)}</p>
                </div>
              </div>
              <Toggle label={t(titleKey)} checked={toggles[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* ── Plan & billing ── */}
      <SettingsCard>
        <SettingsCardHeader icon="workspace_premium" title={t(`${plan}.title`)} subtitle={t(`${plan}.subtitle`)} />
        <div className="p-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-lg">
            <div className="flex items-center gap-md">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(150deg,#4b8eff,#2a6fdb)' }}
              >
                <Icon name="workspace_premium" filled className="text-white text-[22px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[16px] font-bold text-on-surface">{t(`${plan}.planName`)}</p>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">
                    {t(`${plan}.status`)}
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant/60 mt-0.5">{t(`${plan}.nextBilling`)}</p>
              </div>
            </div>
            <button
              type="button"
              className="self-start md:self-auto px-md py-sm rounded-xl border border-outline-variant/30 text-[13px] font-semibold text-on-surface-variant hover:bg-surface-variant/20 transition-all flex items-center gap-2"
            >
              <Icon name="receipt_long" className="text-[15px]" />
              {t(`${plan}.viewInvoices`)}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="glass-panel subtle-highlight rounded-xl p-md space-y-sm">
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-on-surface-variant/70">{t(`${plan}.activeCampaigns`)}</p>
                <p className="text-[13px] font-bold text-on-surface">12 / 50</p>
              </div>
              <ProgressBar value={24} label={t(`${plan}.activeCampaigns`)} />
            </div>
            <div className="glass-panel subtle-highlight rounded-xl p-md space-y-sm">
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-on-surface-variant/70">{t(`${plan}.generatedPosts`)}</p>
                <p className="text-[13px] font-bold text-on-surface">847 / 2.000</p>
              </div>
              <ProgressBar value={42} label={t(`${plan}.generatedPosts`)} />
            </div>
            <div className="glass-panel subtle-highlight rounded-xl p-md space-y-sm">
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-on-surface-variant/70">{t(`${plan}.teamMembers`)}</p>
                <p className="text-[13px] font-bold text-on-surface">4 / 15</p>
              </div>
              <ProgressBar value={27} label={t(`${plan}.teamMembers`)} />
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* ── Danger zone ── */}
      <div className="glass-panel subtle-highlight rounded-2xl overflow-hidden border border-red-500/20 bg-red-500/[0.04]">
        <div className="px-lg py-md border-b border-red-500/15 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <Icon name="warning" className="text-red-400 text-[17px]" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-red-300">{t(`${dz}.title`)}</h3>
            <p className="text-[12px] text-on-surface-variant/70">{t(`${dz}.subtitle`)}</p>
          </div>
        </div>
        <div className="p-lg space-y-md">
          {/* Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md rounded-xl border border-red-500/10 bg-red-500/5">
            <div>
              <p className="text-[13px] font-semibold text-on-surface">{t(`${dz}.exportTitle`)}</p>
              <p className="text-[12px] text-on-surface-variant/60 mt-0.5">{t(`${dz}.exportDesc`)}</p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 px-md py-sm rounded-xl border border-outline-variant/30 text-[13px] font-semibold text-on-surface-variant hover:bg-surface-variant/20 transition-all flex items-center gap-2"
            >
              <Icon name="download" className="text-[15px]" />
              {t(`${dz}.export`)}
            </button>
          </div>

          {/* Deactivate */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md rounded-xl border border-red-500/10 bg-red-500/5">
            <div>
              <p className="text-[13px] font-semibold text-on-surface">{t(`${dz}.deactivateTitle`)}</p>
              <p className="text-[12px] text-on-surface-variant/60 mt-0.5">{t(`${dz}.deactivateDesc`)}</p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 px-md py-sm rounded-xl border border-amber-500/25 text-[13px] font-semibold text-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-2"
            >
              <Icon name="pause_circle" className="text-[15px]" />
              {t(`${dz}.deactivate`)}
            </button>
          </div>

          {/* Delete */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md rounded-xl border border-red-500/20 bg-red-500/5">
            <div>
              <p className="text-[13px] font-semibold text-red-300">{t(`${dz}.deleteTitle`)}</p>
              <p className="text-[12px] text-on-surface-variant/60 mt-0.5">{t(`${dz}.deleteDesc`)}</p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 px-md py-sm rounded-xl bg-red-500/15 border border-red-500/30 text-[13px] font-semibold text-red-400 hover:bg-red-500/25 transition-all flex items-center gap-2"
            >
              <Icon name="delete_forever" className="text-[15px]" />
              {t(`${dz}.delete`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
