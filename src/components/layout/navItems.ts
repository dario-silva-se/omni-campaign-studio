export interface NavItem {
  labelKey: string // common:nav.*
  icon: string
  to: string
}

export interface NavSection {
  labelKey: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    labelKey: 'nav.sectionMain',
    items: [
      { labelKey: 'nav.dashboard', icon: 'dashboard', to: '/' },
      { labelKey: 'nav.analytics', icon: 'monitoring', to: '/analytics' },
      { labelKey: 'nav.audiences', icon: 'groups', to: '/audiences' },
      { labelKey: 'nav.templates', icon: 'folder_special', to: '/templates' },
      { labelKey: 'nav.creativeLab', icon: 'movie_edit', to: '/creative-lab' },
      { labelKey: 'nav.contentGeneration', icon: 'auto_awesome', to: '/content-generation' },
      { labelKey: 'nav.campaigns', icon: 'rocket_launch', to: '/campaigns' },
      { labelKey: 'nav.posts', icon: 'calendar_month', to: '/posts' },
      { labelKey: 'nav.aiNews', icon: 'auto_stories', to: '/ai-news' },
    ],
  },
  {
    labelKey: 'nav.sectionGovernance',
    items: [
      { labelKey: 'nav.approvals', icon: 'verified', to: '/approvals' },
      { labelKey: 'nav.alerts', icon: 'notifications_active', to: '/alerts' },
      { labelKey: 'nav.automations', icon: 'bolt', to: '/automations' },
    ],
  },
  {
    labelKey: 'nav.sectionSystem',
    items: [
      { labelKey: 'nav.settings', icon: 'settings', to: '/settings' },
      { labelKey: 'nav.connections', icon: 'hub', to: '/settings/connections' },
      { labelKey: 'nav.notifications', icon: 'notifications', to: '/settings/notifications' },
    ],
  },
]
