import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { SettingsCard, SettingsCardHeader, inputCls } from './SettingsCard'

const BAR_COLORS = ['bg-red-400', 'bg-amber-400', 'bg-amber-400', 'bg-green-400'] as const

function getScore(val: string): number {
  if (!val) return 0
  let score = 0
  if (val.length >= 8) score++
  if (/[A-Z]/.test(val)) score++
  if (/[0-9]/.test(val)) score++
  if (/[^A-Za-z0-9]/.test(val)) score++
  return score
}

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string
  placeholder: string
  value?: string
  onChange?: (v: string) => void
  show: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-label-caps uppercase text-on-surface-variant text-[11px] font-semibold tracking-wider">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={`${inputCls} pr-10`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Icon name={show ? 'visibility' : 'visibility_off'} className="text-[17px]" />
        </button>
      </div>
    </div>
  )
}

const SESSIONS = [
  { id: '1', device: 'Chrome — macOS', icon: 'computer', location: 'São Paulo, Brasil · Agora', current: true },
  { id: '2', device: 'Safari — iPhone 15 Pro', icon: 'phone_iphone', location: 'São Paulo, Brasil · Há 2 horas', current: false },
  { id: '3', device: 'Chrome — iPad Pro', icon: 'tablet_mac', location: 'Rio de Janeiro, Brasil · Há 1 dia', current: false },
] as const

export function SecurityTab() {
  const { t } = useTranslation('settings')
  const cp = 'userSettings.security.changePassword' as const
  const tf = 'userSettings.security.twoFactor' as const
  const se = 'userSettings.security.sessions' as const

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [newPwd, setNewPwd] = useState('')

  const score = getScore(newPwd)

  const strengthInfo = (() => {
    if (!newPwd) return { text: t(`${cp}.strengthEmpty`), color: 'text-on-surface-variant/60' }
    if (score === 1) return { text: t(`${cp}.strengthWeak`), color: 'text-red-400' }
    if (score === 2) return { text: t(`${cp}.strengthFair`), color: 'text-amber-400' }
    if (score === 3) return { text: t(`${cp}.strengthGood`), color: 'text-amber-400' }
    return { text: t(`${cp}.strengthStrong`), color: 'text-green-400' }
  })()

  return (
    <div className="space-y-lg">
      {/* ── Change password ── */}
      <SettingsCard>
        <SettingsCardHeader icon="lock_reset" title={t(`${cp}.title`)} subtitle={t(`${cp}.subtitle`)} />
        <div className="p-lg space-y-md max-w-md">
          <PasswordField
            label={t(`${cp}.currentPassword`)}
            placeholder={t(`${cp}.currentPasswordPlaceholder`)}
            show={showCurrent}
            onToggle={() => setShowCurrent((v) => !v)}
          />

          <div className="space-y-1.5">
            <PasswordField
              label={t(`${cp}.newPassword`)}
              placeholder={t(`${cp}.newPasswordPlaceholder`)}
              value={newPwd}
              onChange={setNewPwd}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
            />
            {/* Strength bars */}
            <div className="space-y-1 mt-1">
              <div className="flex gap-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-outline-variant/20 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-300',
                        BAR_COLORS[i],
                        i < score ? 'w-full' : 'w-0',
                      )}
                    />
                  </div>
                ))}
              </div>
              <p className={cn('text-[11px]', strengthInfo.color)}>{strengthInfo.text}</p>
            </div>
          </div>

          <PasswordField
            label={t(`${cp}.confirmPassword`)}
            placeholder={t(`${cp}.confirmPasswordPlaceholder`)}
            show={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
          />

          {/* Requirements */}
          <div className="glass-panel subtle-highlight rounded-xl p-md space-y-2">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              {t(`${cp}.requirementsTitle`)}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                t(`${cp}.reqMinLength`),
                t(`${cp}.reqUppercase`),
                t(`${cp}.reqNumber`),
                t(`${cp}.reqSpecial`),
              ].map((req) => (
                <div key={req} className="flex items-center gap-2 text-[12px] text-on-surface-variant/60">
                  <Icon name="check_circle" className="text-[14px] text-on-surface-variant/40" />
                  {req}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="w-full py-sm rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(173,198,255,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Icon name="lock_reset" className="text-[17px]" />
            {t(`${cp}.submit`)}
          </button>
        </div>
      </SettingsCard>

      {/* ── Two-Factor Auth ── */}
      <SettingsCard>
        <SettingsCardHeader
          icon="security"
          iconClass="text-amber-400"
          iconBg="bg-amber-500/10"
          title={t(`${tf}.title`)}
          subtitle={t(`${tf}.subtitle`)}
          action={
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 uppercase">
              {t(`${tf}.disabled`)}
            </span>
          }
        />
        <div className="p-lg grid grid-cols-1 md:grid-cols-3 gap-md">
          {[
            { icon: 'smartphone', title: t(`${tf}.appTitle`), desc: t(`${tf}.appDesc`), highlighted: true },
            { icon: 'sms', title: t(`${tf}.smsTitle`), desc: t(`${tf}.smsDesc`), highlighted: false },
            { icon: 'email', title: t(`${tf}.emailTitle`), desc: t(`${tf}.emailDesc`), highlighted: false },
          ].map(({ icon, title, desc, highlighted }) => (
            <div
              key={title}
              className="glass-panel subtle-highlight rounded-xl p-md flex flex-col gap-md hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', highlighted ? 'bg-primary/10' : 'bg-surface-container-high')}>
                <Icon name={icon} className={cn('text-[22px]', highlighted ? 'text-primary' : 'text-on-surface-variant')} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-on-surface">{title}</p>
                <p className="text-[12px] text-on-surface-variant/70 mt-1">{desc}</p>
              </div>
              <button
                type="button"
                className="mt-auto px-md py-xs rounded-lg border border-outline-variant/30 text-[12px] font-semibold text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all"
              >
                {t(`${tf}.configure`)}
              </button>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* ── Active sessions ── */}
      <SettingsCard>
        <SettingsCardHeader
          icon="devices"
          title={t(`${se}.title`)}
          subtitle={t(`${se}.subtitle`)}
          action={
            <button
              type="button"
              className="px-md py-xs rounded-lg border border-red-500/25 text-[12px] font-semibold text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1"
            >
              <Icon name="logout" className="text-[14px]" />
              {t(`${se}.terminateAll`)}
            </button>
          }
        />
        <div className="divide-y divide-white/5">
          {SESSIONS.map((session) => (
            <div key={session.id} className="px-lg py-md flex items-center gap-md">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  session.current ? 'bg-primary/10' : 'bg-surface-container-high',
                )}
              >
                <Icon
                  name={session.icon}
                  className={cn('text-[20px]', session.current ? 'text-primary' : 'text-on-surface-variant')}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-on-surface">{session.device}</p>
                  {session.current && (
                    <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-[10px] font-bold text-green-400 border border-green-500/20">
                      {t(`${se}.current`)}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-on-surface-variant/60 mt-0.5">{session.location}</p>
              </div>
              {session.current ? (
                <span className="text-[12px] text-on-surface-variant/40">—</span>
              ) : (
                <button
                  type="button"
                  className="px-md py-xs rounded-lg border border-red-500/20 text-[11px] font-semibold text-red-400 hover:bg-red-500/10 transition-all"
                >
                  {t(`${se}.terminate`)}
                </button>
              )}
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  )
}
