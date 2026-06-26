import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { useDashboard } from '../hooks/useDashboard'
import { ResultsSummaryCard } from '../components/ResultsSummaryCard'
import { SignalSourceCard } from '../components/SignalSourceCard'
import type { DashboardSignal, DashboardSignalSource } from '@/types'

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
  const { data, isLoading, isError } = useDashboard()

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  const signalsBySource = groupSignalsBySource(data.signals ?? [])

  return (
    <>
      {/* Main content canvas — the global AppHeader supplies the top bar. */}
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
          <button
            type="button"
            className="self-start md:self-auto inline-flex items-center gap-xs rounded-full border border-outline-variant/30 px-md py-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Icon name="sync" className="text-[18px]" />
            <span className="text-xs font-semibold">{t('dashboard:header.syncButton')}</span>
          </button>
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
