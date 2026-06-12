import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
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

export const defaultNS = 'common'
export const resources = {
  'pt-BR': { common: ptBRCommon, dashboard: ptBRDashboard, analytics: ptBRAnalytics, audiences: ptBRAudiences, templates: ptBRTemplates, creativeLab: ptBRCreativeLab, contentGeneration: ptBRContentGeneration },
  en: { common: enCommon, dashboard: enDashboard, analytics: enAnalytics, audiences: enAudiences, templates: enTemplates, creativeLab: enCreativeLab, contentGeneration: enContentGeneration },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Force pt-BR in test environment so jsdom's navigator.language ('en-US')
    // doesn't override the default. In production, LanguageDetector takes over.
    lng: import.meta.env.MODE === 'test' ? 'pt-BR' : undefined,
    fallbackLng: 'pt-BR',
    defaultNS,
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

export default i18n
