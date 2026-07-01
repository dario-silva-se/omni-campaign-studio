import { Icon } from '@/components/ui/Icon'

interface BrandStat {
  value: string
  label: string
}

interface BrandBenefit {
  text: string
}

interface AuthBrandPanelProps {
  /** Gradient orientation flips between the two screens for visual variety. */
  variant?: 'login' | 'register'
  kicker: string
  headline: string
  /** Login uses a paragraph + stats; register uses a benefit checklist + footer. */
  subtext?: string
  stats?: BrandStat[]
  benefits?: BrandBenefit[]
  footer?: string
}

/**
 * Cinematic Precision brand panel — the dark, glowing left side of the auth
 * split layout. Shared between Login and Register so both screens stay in sync.
 */
export function AuthBrandPanel({
  variant = 'login',
  kicker,
  headline,
  subtext,
  stats,
  benefits,
  footer,
}: AuthBrandPanelProps) {
  const isLogin = variant === 'login'
  return (
    <div
      className="relative hidden w-[42%] shrink-0 overflow-hidden border-r border-overlay-sm lg:block"
      style={{
        background: isLogin
          ? 'linear-gradient(155deg, #0d1a36 0%, #0a0f1d 45%, #120a26 100%)'
          : 'linear-gradient(155deg, #120a26 0%, #0a0f1d 50%, #0d1a36 100%)',
      }}
    >
      {/* drifting grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(173,198,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(173,198,255,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: isLogin
            ? 'radial-gradient(120% 90% at 30% 20%, #000 30%, transparent 80%)'
            : 'radial-gradient(120% 90% at 70% 80%, #000 30%, transparent 80%)',
          WebkitMaskImage: isLogin
            ? 'radial-gradient(120% 90% at 30% 20%, #000 30%, transparent 80%)'
            : 'radial-gradient(120% 90% at 70% 80%, #000 30%, transparent 80%)',
        }}
      />
      {/* glow orbs */}
      <div
        className="pointer-events-none absolute size-80 animate-pulse rounded-full blur-2xl"
        style={{
          top: isLogin ? '-80px' : '-70px',
          left: isLogin ? '-60px' : 'auto',
          right: isLogin ? 'auto' : '-80px',
          background: isLogin
            ? 'radial-gradient(circle, rgba(75,142,255,0.55), transparent 65%)'
            : 'radial-gradient(circle, rgba(134,59,255,0.5), transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute size-80 animate-pulse rounded-full blur-2xl [animation-duration:5s]"
        style={{
          bottom: '-90px',
          right: isLogin ? '-70px' : 'auto',
          left: isLogin ? 'auto' : '-70px',
          background: isLogin
            ? 'radial-gradient(circle, rgba(134,59,255,0.45), transparent 65%)'
            : 'radial-gradient(circle, rgba(75,142,255,0.45), transparent 65%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-xl">
        <div className="flex items-center gap-sm">
          <span className="grid size-10 place-items-center rounded-lg border border-overlay-md bg-overlay-sm">
            <Icon name="bolt" filled className="text-[24px] text-[#c7b3ff]" />
          </span>
          <span className="text-body-lg font-semibold text-white">Campaign Studio</span>
        </div>

        <div>
          <p className="mb-sm text-label-caps uppercase text-[#adc6ff]">{kicker}</p>
          <h2 className="text-balance text-[38px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {headline}
          </h2>

          {subtext && (
            <p className="mt-md max-w-[330px] text-body-lg leading-relaxed text-on-surface-variant/85">
              {subtext}
            </p>
          )}

          {benefits && (
            <ul className="mt-lg flex flex-col gap-sm">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-center gap-sm text-body-sm text-on-surface-variant/90">
                  <Icon name="check_circle" className="text-[20px] text-[#7dffb0]" />
                  {b.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        {stats && (
          <div className="flex gap-lg">
            {stats.map((s, i) => (
              <div key={s.label} className="flex gap-lg">
                {i > 0 && <div className="w-px bg-overlay-md" />}
                <div>
                  <div className="text-[22px] font-bold tracking-[-0.02em] text-white">{s.value}</div>
                  <div className="mt-0.5 text-body-sm text-outline">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {footer && <p className="text-body-sm leading-relaxed text-outline">{footer}</p>}
      </div>
    </div>
  )
}
