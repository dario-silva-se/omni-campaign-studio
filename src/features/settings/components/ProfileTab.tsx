import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { SettingsCard, SettingsCardHeader, inputCls } from './SettingsCard'

export function ProfileTab() {
  const { t } = useTranslation('settings')
  const pi = 'userSettings.profile.personalInfo' as const
  const s = 'userSettings.profile.social' as const

  return (
    <div className="space-y-lg">
      {/* ── Avatar + name ── */}
      <SettingsCard className="p-lg flex flex-col sm:flex-row items-center sm:items-start gap-lg">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center text-3xl font-bold text-on-primary shadow-[0_0_0_3px_rgba(173,198,255,0.3),0_0_20px_rgba(75,142,255,0.25)]">
            M
          </div>
          <button
            type="button"
            aria-label={t('userSettings.profile.changePhoto')}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all"
          >
            <Icon name="photo_camera" className="text-on-surface-variant text-[14px]" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-[18px] font-bold text-on-surface">Matheus Carvalho</h3>
          <p className="text-[13px] text-on-surface-variant mt-0.5">matheus@empresa.com.br</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary uppercase tracking-wider">
              {t('userSettings.profile.roleAdmin')}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
              {t('userSettings.profile.statusActive')}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="self-start sm:self-auto px-md py-sm rounded-xl border border-outline-variant/30 text-[13px] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 transition-all flex items-center gap-2"
        >
          <Icon name="upload" className="text-[16px]" />
          {t('userSettings.profile.changePhoto')}
        </button>
      </SettingsCard>

      {/* ── Personal info ── */}
      <SettingsCard>
        <SettingsCardHeader
          icon="badge"
          title={t(`${pi}.title`)}
          subtitle={t(`${pi}.subtitle`)}
        />
        <div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-md">
          <Input label={t(`${pi}.firstName`)} defaultValue="Matheus" />
          <Input label={t(`${pi}.lastName`)} defaultValue="Carvalho" />

          {/* Email with verified icon overlay */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label-caps uppercase text-on-surface-variant text-[11px] font-semibold tracking-wider">
              {t(`${pi}.email`)}
            </label>
            <div className="relative">
              <input
                type="email"
                defaultValue="matheus@empresa.com.br"
                className={`${inputCls} pr-8`}
              />
              <Icon name="verified" filled className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-[16px]" />
            </div>
          </div>

          <Input label={t(`${pi}.phone`)} type="tel" placeholder={t(`${pi}.phonePlaceholder`)} />

          <div className="md:col-span-2">
            <Textarea
              label={t(`${pi}.bio`)}
              placeholder={t(`${pi}.bioPlaceholder`)}
              defaultValue="Marketing Manager focado em campanhas omnichannel e automação de conteúdo."
              rows={3}
            />
          </div>

          <Input label={t(`${pi}.position`)} defaultValue="Marketing Manager" />
          <Input label={t(`${pi}.company`)} defaultValue="Empresa Ltda" />
        </div>

        <div className="px-lg pb-lg flex justify-end gap-sm">
          <button
            type="button"
            className="px-md py-sm rounded-xl border border-outline-variant/30 text-[13px] font-semibold text-on-surface-variant hover:bg-surface-variant/20 transition-all"
          >
            {t(`${pi}.cancel`)}
          </button>
          <button
            type="button"
            className="px-lg py-sm rounded-xl bg-primary text-on-primary text-[13px] font-semibold hover:shadow-[0_0_20px_rgba(173,198,255,0.2)] transition-all active:scale-95 flex items-center gap-2"
          >
            <Icon name="save" className="text-[15px]" />
            {t(`${pi}.save`)}
          </button>
        </div>
      </SettingsCard>

      {/* ── Social links ── */}
      <SettingsCard>
        <SettingsCardHeader
          icon="share"
          title={t(`${s}.title`)}
          subtitle={t(`${s}.subtitle`)}
        />
        <div className="p-lg space-y-sm">
          {/* LinkedIn */}
          <div className="flex items-center gap-sm">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0,119,181,0.15)', border: '1px solid rgba(0,119,181,0.25)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077b5" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <input type="url" className={inputCls} placeholder={t(`${s}.linkedinPlaceholder`)} />
          </div>

          {/* X (Twitter) */}
          <div className="flex items-center gap-sm">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-on-surface" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.264 5.636 5.9-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <input type="url" className={inputCls} placeholder={t(`${s}.xPlaceholder`)} />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-sm">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(36,211,102,0.12)', border: '1px solid rgba(36,211,102,0.2)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#24d366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <input type="url" className={inputCls} placeholder={t(`${s}.whatsappPlaceholder`)} />
          </div>
        </div>

        <div className="px-lg pb-lg flex justify-end">
          <button
            type="button"
            className="px-lg py-sm rounded-xl bg-primary text-on-primary text-[13px] font-semibold hover:shadow-[0_0_20px_rgba(173,198,255,0.2)] transition-all active:scale-95 flex items-center gap-2"
          >
            <Icon name="save" className="text-[15px]" />
            {t(`${s}.save`)}
          </button>
        </div>
      </SettingsCard>
    </div>
  )
}
