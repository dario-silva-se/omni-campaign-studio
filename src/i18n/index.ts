import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptBRCommon from './locales/pt-BR/common.json'
import enCommon from './locales/en/common.json'
import ptBRDashboard from './locales/pt-BR/dashboard.json'
import enDashboard from './locales/en/dashboard.json'

export const defaultNS = 'common'
export const resources = {
  'pt-BR': { common: ptBRCommon, dashboard: ptBRDashboard },
  en: { common: enCommon, dashboard: enDashboard },
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
