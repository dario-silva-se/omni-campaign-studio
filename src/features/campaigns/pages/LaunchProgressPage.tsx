import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/cn'

interface Stage {
  labelKey: string
  descKey: string
  durationMs: number
}

const STAGES: Stage[] = [
  { labelKey: 'launch.stages.compliance', descKey: 'launch.stages.complianceDesc', durationMs: 1500 },
  { labelKey: 'launch.stages.mediaAssets', descKey: 'launch.stages.mediaAssetsDesc', durationMs: 1500 },
  { labelKey: 'launch.stages.linkedinApi', descKey: 'launch.stages.linkedinApiDesc', durationMs: 2000 },
  { labelKey: 'launch.stages.youtubeUpload', descKey: 'launch.stages.youtubeUploadDesc', durationMs: 1000 },
]

const TOTAL_MS = STAGES.reduce((s, st) => s + st.durationMs, 0)

type StageStatus = 'done' | 'in-progress' | 'pending'

function stageStatus(stageIdx: number, activeIdx: number): StageStatus {
  if (stageIdx < activeIdx) return 'done'
  if (stageIdx === activeIdx) return 'in-progress'
  return 'pending'
}

export default function LaunchProgressPage() {
  const { t } = useTranslation('campaigns')
  const navigate = useNavigate()
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    let elapsed = 0
    let stageIdx = 0

    function advanceStage() {
      if (stageIdx >= STAGES.length) {
        setProgress(100)
        return
      }
      setActiveStage(stageIdx)
      const stageDuration = STAGES[stageIdx].durationMs
      const id = setTimeout(() => {
        elapsed += stageDuration
        setProgress(Math.round((elapsed / TOTAL_MS) * 100))
        stageIdx++
        advanceStage()
      }, stageDuration)
      timerIds.current.push(id)
    }

    advanceStage()

    // Navigate after total + small buffer
    const navId = setTimeout(() => {
      navigate('/campaigns/launched')
    }, TOTAL_MS + 400)
    timerIds.current.push(navId)

    return () => {
      timerIds.current.forEach(clearTimeout)
      timerIds.current = []
    }
  }, [navigate])

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="w-full max-w-[800px] px-lg flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-xl">
          <p className="font-label-caps text-label-caps text-primary tracking-widest mb-xs uppercase">
            {t('launch.initializing')}
          </p>
          <h2 className="font-display-lg text-display-lg text-on-surface" style={{
            background: 'linear-gradient(90deg, #adc6ff 0%, #ffffff 50%, #adc6ff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('launch.title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">
            "Project Nova - Q4 Push" {t('launch.subtitle')}
          </p>
        </div>

        {/* Central visualization */}
        <div className="relative w-48 h-48 mb-xl flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-primary/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="relative z-10 w-20 h-20 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shadow-[0_0_40px_rgba(75,142,255,0.2)]">
            <Icon name="rocket_launch" className="text-[40px] text-primary" filled />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[500px] mb-lg">
          <ProgressBar value={progress} label={t('launch.title')} tone="primary" />
        </div>

        {/* Status checklist */}
        <div className="w-full max-w-[500px] glass-panel rounded-xl p-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          <div className="space-y-md">
            {STAGES.map((stage, idx) => {
              const status = stageStatus(idx, activeStage)
              return (
                <div
                  key={stage.labelKey}
                  className={cn(
                    'flex items-start gap-sm',
                    status === 'pending' && 'opacity-40',
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border',
                      status === 'done' && 'bg-green-500/10 border-green-500/20',
                      status === 'in-progress' && 'bg-primary/10 border-primary/30 relative',
                      status === 'pending' && 'bg-surface-variant border-outline-variant/30',
                    )}
                  >
                    {status === 'done' && (
                      <Icon name="check" className="text-[14px] text-green-400 font-bold" />
                    )}
                    {status === 'in-progress' && (
                      <svg className="absolute inset-0 w-full h-full text-primary animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="2" />
                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                      </svg>
                    )}
                    {status === 'pending' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant" />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p
                      className={cn(
                        'font-body-lg text-body-lg leading-tight',
                        status === 'in-progress' ? 'text-primary font-semibold' : 'text-on-surface',
                      )}
                    >
                      {t(stage.labelKey)}
                    </p>
                    <p
                      className={cn(
                        'font-body-sm text-body-sm mt-0.5',
                        status === 'in-progress' ? 'text-primary/70' : 'text-on-surface-variant opacity-60',
                      )}
                    >
                      {t(stage.descKey)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Abort */}
        <div className="mt-xl">
          <button
            type="button"
            className="font-label-caps text-label-caps text-error opacity-70 hover:opacity-100 hover:bg-error/10 px-md py-sm rounded-lg transition-all border border-transparent hover:border-error/20 flex items-center gap-xs"
          >
            <Icon name="cancel" className="text-[16px]" />
            {t('launch.abort')}
          </button>
        </div>
      </div>
    </main>
  )
}
