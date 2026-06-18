import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useExportReport } from '../hooks/useReports'
import type { ReportJob } from '@/types'

type ExportState = 'idle' | 'in-progress' | 'completed' | 'failed'
type Period = '7d' | '30d' | 'custom'

const PERIOD_KEYS: { value: Period; labelKey: string }[] = [
  { value: '7d', labelKey: 'reports:export.period7' },
  { value: '30d', labelKey: 'reports:export.period30' },
  { value: 'custom', labelKey: 'reports:export.periodCustom' },
]

interface ChannelOption {
  key: string
  labelKey: string
  iconName: string
  defaultChecked: boolean
}

const CHANNEL_OPTIONS: ChannelOption[] = [
  { key: 'linkedin', labelKey: 'common:channels.linkedin', iconName: 'account_tree', defaultChecked: true },
  { key: 'youtube', labelKey: 'common:channels.youtube', iconName: 'smart_display', defaultChecked: true },
  { key: 'telegram', labelKey: 'common:channels.telegram', iconName: 'send', defaultChecked: false },
]

interface SectionOption {
  key: string
  labelKey: string
  defaultChecked: boolean
}

const SECTION_OPTIONS: SectionOption[] = [
  { key: 'summary', labelKey: 'reports:export.sectionSummary', defaultChecked: true },
  { key: 'growth', labelKey: 'reports:export.sectionGrowth', defaultChecked: true },
  { key: 'channels', labelKey: 'reports:export.sectionChannels', defaultChecked: true },
  { key: 'topContent', labelKey: 'reports:export.sectionTopContent', defaultChecked: false },
]

export default function ExportReportPage() {
  const { t } = useTranslation(['reports', 'common'])
  const { mutate: exportReport, isPending } = useExportReport()

  const [exportState, setExportState] = useState<ExportState>('idle')
  const [progress, setProgress] = useState(0)
  const [completedJob, setCompletedJob] = useState<ReportJob | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [period, setPeriod] = useState<Period>('30d')
  const [channels, setChannels] = useState<Record<string, boolean>>(
    Object.fromEntries(CHANNEL_OPTIONS.map((c) => [c.key, c.defaultChecked]))
  )
  const [sections, setSections] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_OPTIONS.map((s) => [s.key, s.defaultChecked]))
  )

  const handleToggleChannel = (key: string) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleToggleSection = (key: string) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const startExport = () => {
    setExportState('in-progress')
    setProgress(0)

    // Animate progress: start at 20, increment to ~80 while mutation runs
    let prog = 20
    const tick = setInterval(() => {
      prog = Math.min(prog + 15, 80)
      setProgress(prog)
    }, 200)

    exportReport(
      {
        period,
        channels: Object.entries(channels).filter(([, v]) => v).map(([k]) => k),
        sections: Object.entries(sections).filter(([, v]) => v).map(([k]) => k),
      },
      {
        onSuccess: (job) => {
          clearInterval(tick)
          setProgress(100)
          setCompletedJob(job)
          setExportState('completed')
        },
        onError: (err) => {
          clearInterval(tick)
          setErrorMessage(err instanceof Error ? err.message : t('reports:export.errorUnknown'))
          setExportState('failed')
        },
      }
    )
  }

  const handleRetry = () => {
    setExportState('idle')
    setProgress(0)
    setErrorMessage(null)
    setCompletedJob(null)
  }

  const handleClose = () => {
    handleRetry()
  }

  return (
    <div className="max-w-7xl mx-auto p-xl">
      {/* Modal-style container matching spec screen */}
      <div className="w-full max-w-[700px] mx-auto glass-panel subtle-highlight rounded-xl overflow-hidden border border-outline-variant/20 flex flex-col">
        {/* Header */}
        <header className="px-xl py-lg border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
          <div className="flex items-center gap-md">
            <Icon name="picture_as_pdf" filled className="text-primary" />
            <h2 className="font-title-md text-title-md text-primary tracking-tight">
              {t('reports:export.title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Icon name="close" />
          </button>
        </header>

        {/* Body */}
        {exportState === 'idle' && (
          <div className="flex flex-col md:flex-row">
            {/* Left: Options */}
            <div className="flex-1 p-xl space-y-xl overflow-y-auto max-h-[600px]">
              {/* Period Selection */}
              <section className="space-y-md">
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  {t('reports:export.periodLabel')}
                </label>
                <div className="grid grid-cols-3 gap-md">
                  {PERIOD_KEYS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPeriod(p.value)}
                      className={`flex flex-col items-center gap-xs p-md rounded-lg border transition-all ${
                        period === p.value
                          ? 'border-primary bg-primary-container/10 text-primary'
                          : 'border-outline-variant bg-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="text-body-sm font-semibold">{t(p.labelKey)}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Channel Selection */}
              <section className="space-y-md">
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  {t('reports:export.channelsLabel')}
                </label>
                <div className="space-y-sm">
                  {CHANNEL_OPTIONS.map((ch) => (
                    <label
                      key={ch.key}
                      className="flex items-center gap-md p-md rounded-lg glass-panel border border-transparent hover:border-outline-variant cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={channels[ch.key]}
                        onChange={() => handleToggleChannel(ch.key)}
                        className="w-5 h-5 rounded border-outline-variant bg-surface accent-primary"
                      />
                      <Icon name={ch.iconName} className="text-on-surface-variant" />
                      <span className="text-body-lg flex-1">{t(ch.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Document Sections */}
              <section className="space-y-md">
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  {t('reports:export.sectionsLabel')}
                </label>
                <div className="grid grid-cols-2 gap-sm">
                  {SECTION_OPTIONS.map((sec) => (
                    <label key={sec.key} className="flex items-center gap-xs">
                      <input
                        type="checkbox"
                        checked={sections[sec.key]}
                        onChange={() => handleToggleSection(sec.key)}
                        className="w-4 h-4 rounded border-outline-variant bg-surface accent-primary"
                      />
                      <span className="text-body-sm">{t(sec.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: Preview */}
            <div className="w-full md:w-[260px] bg-surface-container-highest/20 p-xl border-l border-outline-variant flex flex-col items-center">
              <label className="font-label-caps text-label-caps text-outline uppercase tracking-widest self-start mb-lg">
                {t('reports:export.previewLabel')}
              </label>
              {/* PDF Thumbnail Mock */}
              <div className="relative w-full aspect-[3/4] bg-overlay-sm border border-outline-variant rounded-sm p-md overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-white rounded-sm shadow-inner opacity-90 p-md flex flex-col gap-sm overflow-hidden scale-90">
                  <div className="h-2 w-1/2 bg-gray-300 rounded-full" />
                  <div className="grid grid-cols-3 gap-xs mt-md">
                    <div className="h-8 bg-blue-100 rounded-sm" />
                    <div className="h-8 bg-blue-100 rounded-sm" />
                    <div className="h-8 bg-blue-100 rounded-sm" />
                  </div>
                  <div className="h-16 w-full bg-gray-100 rounded-sm mt-md flex items-end px-xs pb-xs">
                    <div className="w-full h-1/2 bg-blue-200 rounded-sm" />
                  </div>
                  <div className="space-y-xs mt-md">
                    <div className="h-1 w-full bg-gray-200 rounded-full" />
                    <div className="h-1 w-3/4 bg-gray-200 rounded-full" />
                    <div className="h-1 w-5/6 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="mt-lg text-center">
                <p className="text-body-sm text-on-surface-variant italic">{t('reports:export.previewSize')}</p>
                <p className="text-[10px] text-outline uppercase mt-xs font-bold tracking-tighter">
                  {t('reports:export.previewFormat')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* In-progress state */}
        {exportState === 'in-progress' && (
          <div className="flex flex-col items-center justify-center p-xl py-[60px] gap-lg">
            <div className="w-24 h-24 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
              <Icon name="picture_as_pdf" className="text-5xl text-primary" />
            </div>
            <div className="text-center">
              <p className="text-body-lg font-semibold">{t('reports:export.generating')}</p>
              <p className="text-body-sm text-on-surface-variant mt-xs">{t('reports:export.generatingDesc')}</p>
            </div>
            <ProgressBar
              value={progress}
              label={t('reports:export.progressLabel')}
              tone="primary"
              className="w-full max-w-xs"
            />
          </div>
        )}

        {/* Completed state */}
        {exportState === 'completed' && (
          <div className="flex flex-col items-center justify-center p-xl py-[60px] gap-lg">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20">
                <Icon name="check_circle" filled className="text-5xl text-primary" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 scale-125" />
            </div>
            <div className="text-center">
              <p className="text-body-lg font-semibold">{t('reports:export.successTitle')}</p>
              <p className="text-body-sm text-on-surface-variant mt-xs">{t('reports:export.successDesc')}</p>
            </div>
          </div>
        )}

        {/* Failed / error state */}
        {exportState === 'failed' && (
          <div className="flex flex-col items-center justify-center p-xl py-[40px] gap-lg text-center">
            <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center">
              <Icon name="error_outline" className="text-4xl text-error" />
            </div>
            <div>
              <h3 className="text-title-md font-bold text-on-surface">{t('reports:export.errorTitle')}</h3>
              <p className="text-body-sm text-on-surface-variant mt-xs max-w-xs mx-auto">
                {t('reports:export.errorDesc')}
              </p>
            </div>
            {errorMessage && (
              <div className="w-full max-w-xs bg-surface-container-high rounded-lg p-md">
                <Icon name="article" className="text-on-surface-variant text-2xl" />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="px-xl py-lg border-t border-outline-variant/20 bg-surface-container flex justify-end gap-md">
          {exportState === 'idle' && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-xl py-md text-body-lg font-semibold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
              >
                {t('reports:export.cancel')}
              </button>
              <button
                type="button"
                onClick={startExport}
                disabled={isPending}
                className="px-xl py-md rounded-lg bg-primary-container text-on-primary-container text-body-lg font-bold flex items-center gap-md shadow-[0_4px_20px_rgba(75,142,255,0.3)] hover:shadow-[0_8px_30px_rgba(75,142,255,0.5)] transition-all active:scale-95 disabled:opacity-60"
              >
                <Icon name="auto_awesome" />
                {t('reports:export.generate')}
              </button>
            </>
          )}

          {exportState === 'in-progress' && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-xl py-md text-body-lg font-semibold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
              >
                {t('reports:export.cancel')}
              </button>
              <button
                type="button"
                disabled
                className="px-xl py-md rounded-lg bg-primary-container/60 text-on-primary-container text-body-lg font-bold flex items-center gap-md opacity-60 cursor-not-allowed"
              >
                <Icon name="cached" className="animate-spin" />
                {t('reports:export.processing')}
              </button>
            </>
          )}

          {exportState === 'completed' && completedJob && (
            <>
              <button
                type="button"
                onClick={() => {
                  if (completedJob.downloadUrl) {
                    window.open(completedJob.downloadUrl, '_blank')
                  }
                }}
                className="px-xl py-md text-body-lg font-semibold text-on-surface-variant hover:text-on-surface transition-all active:scale-95"
              >
                {t('reports:export.openFile')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-xl py-md rounded-lg bg-primary-container text-on-primary-container text-body-lg font-bold flex items-center gap-md transition-all active:scale-95"
              >
                <Icon name="close" />
                {t('reports:export.close')}
              </button>
            </>
          )}

          {exportState === 'failed' && (
            <>
              <button
                type="button"
                onClick={handleRetry}
                className="px-xl py-md rounded-lg bg-primary-container/20 text-primary text-body-lg font-bold flex items-center gap-md transition-all active:scale-95 hover:bg-primary-container/30"
              >
                {t('reports:export.retry')}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-xl py-md rounded-lg border border-outline-variant/30 text-on-surface-variant text-body-lg font-semibold transition-all active:scale-95 hover:bg-surface-variant/20"
              >
                {t('reports:export.cancel')}
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  )
}
