import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useDashboard } from '../hooks/useDashboard'
import { ResultsSummaryCard } from '../components/ResultsSummaryCard'
import { SignalSourceCard } from '../components/SignalSourceCard'
import type { DashboardSignal, DashboardSignalSource } from '@/mocks/fixtures/dashboard'

function groupSignalsBySource(
  signals: DashboardSignal[],
): Record<DashboardSignalSource, DashboardSignal[]> {
  return {
    linkedin: signals.filter((s) => s.source === 'linkedin'),
    youtube: signals.filter((s) => s.source === 'youtube'),
    telegram: signals.filter((s) => s.source === 'telegram'),
  }
}

export default function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { data, isLoading } = useDashboard()

  if (isLoading || !data) {
    return (
      <div className="p-lg text-on-surface-variant" role="status" aria-live="polite">
        {t('common:loading')}
      </div>
    )
  }

  const signalsBySource = groupSignalsBySource(data.signals)

  return (
    <>
      {/* Page-level header bar (tabs + actions) — replaces generic TopBar for this page */}
      <header
        className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center w-full px-gutter h-16 shrink-0"
        aria-label={t('dashboard:header.tabDashboard')}
      >
        <div className="flex items-center">
          {/* Mobile menu toggle is handled by AppLayout */}
          <nav className="hidden md:flex space-x-md" aria-label="page-tabs">
            <a
              href="#"
              className="text-primary border-b-2 border-primary pb-4 pt-4 px-2 font-body-sm font-semibold transition-all"
              aria-current="page"
            >
              {t('dashboard:header.tabDashboard')}
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-primary pb-4 pt-4 px-2 font-body-sm transition-all"
            >
              {t('dashboard:header.tabAnalytics')}
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-sm">
          <button
            type="button"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant flex items-center border border-outline-variant/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Icon name="sync" className="text-[18px] mr-xs" />
            <span className="text-xs font-semibold">{t('dashboard:header.syncButton')}</span>
          </button>
          <button
            type="button"
            aria-label={t('common:nav.notifications')}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Icon name="notifications" />
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 w-2 h-2 bg-secondary-container rounded-full"
            />
          </button>
          <button
            type="button"
            aria-label={t('dashboard:header.toggleTheme')}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Icon name="contrast" />
          </button>
        </div>
      </header>

      {/* Main content canvas */}
      <main className="p-gutter md:p-lg space-y-lg max-w-container-max mx-auto w-full pb-24">
        {/* Welcome / greeting section */}
        <section
          className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant/20 pb-md"
          aria-label="greeting"
        >
          <div>
            <p className="text-outline-variant font-label-caps text-label-caps uppercase mb-1 flex items-center">
              <span className="w-4 h-[1px] bg-outline-variant mr-2" />
              {t('dashboard:header.panelLabel')} · {t('dashboard:header.dayLabel')}
            </p>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
              {t('dashboard:greeting.prefix')} {data.greetingName}.
            </h2>
            <p className="text-on-surface-variant font-body-sm">
              {data.campaignsRunning} {t('dashboard:greeting.campaignsRunning')} ·{' '}
              {data.leadsCaptured} {t('dashboard:greeting.leadsCaptured')}
            </p>
          </div>
        </section>

        {/* Results summary — 4 stat tiles */}
        <ResultsSummaryCard stats={data.stats} />

        {/* Radar de Hoje — 3 signal source columns */}
        <section
          className="pt-md border-t border-outline-variant/10"
          aria-label={t('dashboard:radar.title')}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-md gap-sm">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface flex items-center">
                {t('dashboard:radar.title')}
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-secondary-container ml-xs animate-pulse"
                />
              </h3>
              <span className="text-xs text-outline-variant">
                {t('dashboard:radar.updatedAt')} {data.radarUpdatedAt}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            <SignalSourceCard
              source="linkedin"
              signals={signalsBySource.linkedin}
              label={t('dashboard:sources.linkedin')}
            />
            <SignalSourceCard
              source="youtube"
              signals={signalsBySource.youtube}
              label={t('dashboard:sources.youtube')}
            />
            <SignalSourceCard
              source="telegram"
              signals={signalsBySource.telegram}
              label={t('dashboard:sources.telegram')}
            />
          </div>
        </section>
      </main>
    </>
  )
}
