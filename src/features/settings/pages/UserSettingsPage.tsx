import { useTranslation } from 'react-i18next'
import { Tabs } from '@/components/ui/Tabs'
import { Icon } from '@/components/ui/Icon'
import { ProfileTab } from '../components/ProfileTab'
import { SecurityTab } from '../components/SecurityTab'
import { AccountTab } from '../components/AccountTab'

export default function UserSettingsPage() {
  const { t } = useTranslation('settings')

  return (
    <div className="max-w-5xl mx-auto p-xl space-y-lg">
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-on-surface">{t('userSettings.title')}</h2>
        <p className="text-[14px] text-on-surface-variant mt-1">{t('userSettings.subtitle')}</p>
      </div>

      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Trigger value="profile" className="flex items-center gap-2">
            <Icon name="person" className="text-[17px]" />
            {t('userSettings.tabs.profile')}
          </Tabs.Trigger>
          <Tabs.Trigger value="security" className="flex items-center gap-2">
            <Icon name="lock" className="text-[17px]" />
            {t('userSettings.tabs.security')}
          </Tabs.Trigger>
          <Tabs.Trigger value="account" className="flex items-center gap-2">
            <Icon name="manage_accounts" className="text-[17px]" />
            {t('userSettings.tabs.account')}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfileTab />
        </Tabs.Panel>
        <Tabs.Panel value="security">
          <SecurityTab />
        </Tabs.Panel>
        <Tabs.Panel value="account">
          <AccountTab />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
