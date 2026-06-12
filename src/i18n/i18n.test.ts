import i18n from './index'

describe('i18n', () => {
  it('defaults to pt-BR', () => {
    expect(i18n.language).toBe('pt-BR')
    expect(i18n.t('common:nav.dashboard')).toBe('Dashboard')
    expect(i18n.t('common:nav.campaigns')).toBe('Campanhas')
  })
  it('switches to english', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('common:nav.campaigns')).toBe('Campaigns')
    await i18n.changeLanguage('pt-BR')
  })
})
