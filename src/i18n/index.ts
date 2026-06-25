import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptBRCommon from './locales/pt-BR/common.json'
import enCommon from './locales/en/common.json'
import ptBRDashboard from './locales/pt-BR/dashboard.json'
import enDashboard from './locales/en/dashboard.json'
import ptBRAnalytics from './locales/pt-BR/analytics.json'
import enAnalytics from './locales/en/analytics.json'
import ptBRAudiences from './locales/pt-BR/audiences.json'
import enAudiences from './locales/en/audiences.json'
import ptBRTemplates from './locales/pt-BR/templates.json'
import enTemplates from './locales/en/templates.json'
import ptBRCreativeLab from './locales/pt-BR/creativeLab.json'
import enCreativeLab from './locales/en/creativeLab.json'
import ptBRContentGeneration from './locales/pt-BR/contentGeneration.json'
import enContentGeneration from './locales/en/contentGeneration.json'
import ptBRCampaigns from './locales/pt-BR/campaigns.json'
import enCampaigns from './locales/en/campaigns.json'
import ptBRPosts from './locales/pt-BR/posts.json'
import enPosts from './locales/en/posts.json'
import ptBRApprovals from './locales/pt-BR/approvals.json'
import enApprovals from './locales/en/approvals.json'
import ptBRAlerts from './locales/pt-BR/alerts.json'
import enAlerts from './locales/en/alerts.json'
import ptBRAutomations from './locales/pt-BR/automations.json'
import enAutomations from './locales/en/automations.json'
import ptBRConnections from './locales/pt-BR/connections.json'
import enConnections from './locales/en/connections.json'
import ptBRSettings from './locales/pt-BR/settings.json'
import enSettings from './locales/en/settings.json'
import ptBRReports from './locales/pt-BR/reports.json'
import enReports from './locales/en/reports.json'
import ptBRAiNews from './locales/pt-BR/aiNews.json'
import enAiNews from './locales/en/aiNews.json'

export const defaultNS = 'common'
export const resources = {
  'pt-BR': { common: ptBRCommon, dashboard: ptBRDashboard, analytics: ptBRAnalytics, audiences: ptBRAudiences, templates: ptBRTemplates, creativeLab: ptBRCreativeLab, contentGeneration: ptBRContentGeneration, campaigns: ptBRCampaigns, posts: ptBRPosts, approvals: ptBRApprovals, alerts: ptBRAlerts, automations: ptBRAutomations, connections: ptBRConnections, settings: ptBRSettings, reports: ptBRReports, aiNews: ptBRAiNews },
  en: { common: enCommon, dashboard: enDashboard, analytics: enAnalytics, audiences: enAudiences, templates: enTemplates, creativeLab: enCreativeLab, contentGeneration: enContentGeneration, campaigns: enCampaigns, posts: enPosts, approvals: enApprovals, alerts: enAlerts, automations: enAutomations, connections: enConnections, settings: enSettings, reports: enReports, aiNews: enAiNews },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Default to pt-BR unless the user has explicitly stored a preference in
    // localStorage. Navigator language is intentionally ignored — this is a
    // pt-BR product and auto-detecting en-US (e.g. in headless/CI environments)
    // creates a jarring mixed-language experience.
    lng: (typeof localStorage !== 'undefined' && localStorage.getItem('i18nextLng')) || 'pt-BR',
    fallbackLng: 'pt-BR',
    defaultNS,
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage'], caches: ['localStorage'] },
  })

export function useLocale(): string {
  const { i18n: i18nInstance } = useTranslation()
  return i18nInstance.language ?? 'pt-BR'
}

export default i18n
