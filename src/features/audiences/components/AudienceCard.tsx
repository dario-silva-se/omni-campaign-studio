import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import type { AudienceSegment } from '@/types'
import { cn } from '@/lib/cn'

interface AudienceCardProps {
  segment: AudienceSegment
}

/** Tiny bar-chart purely decorative – shows growth bars as seen in the spec.
 *  Opacity progression: 0.20 / 0.40 / 0.60 / 0.80 / 1.0 / 1.0 (last bar also gets a glow).
 *  Inline style handles opacity so the dynamic colorClass isn't broken by Tailwind purging
 *  opacity-utility combinations at build time.
 */
function SparkBars({ colorClass }: { colorClass: string }) {
  const heights = ['30%', '50%', '40%', '70%', '90%', '100%']
  const opacities = [0.20, 0.40, 0.60, 0.80, 1.0, 1.0]
  return (
    <div className="flex-1 h-12 flex items-end justify-end gap-1 pb-1">
      {heights.map((h, i) => {
        const isLast = i === heights.length - 1
        return (
          <div
            key={i}
            className={cn('w-2 rounded-t-sm', colorClass)}
            style={{
              height: h,
              opacity: opacities[i],
              ...(isLast ? { boxShadow: '0 0 10px rgba(173,198,255,0.5)' } : {}),
            }}
          />
        )
      })}
    </div>
  )
}

export function AudienceCard({ segment }: AudienceCardProps) {
  const { t } = useTranslation('audiences')
  const navigate = useNavigate()

  const tagColorMap: Record<string, { dot: string; text: string; spark: string }> = {
    primary: {
      dot: 'bg-primary animate-pulse',
      text: 'text-primary',
      spark: 'bg-primary',
    },
    'secondary-container': {
      dot: 'bg-secondary-container',
      text: 'text-secondary-container',
      spark: 'bg-secondary-container',
    },
    tertiary: {
      dot: 'bg-tertiary',
      text: 'text-tertiary',
      spark: 'bg-tertiary',
    },
  }

  const colors = tagColorMap[segment.tagColor ?? 'primary'] ?? tagColorMap['primary']

  return (
    <div className="glass-panel rounded-xl p-lg relative group overflow-hidden">
      {/* Subtle top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Card header: tag + title + hover actions */}
      <div className="flex justify-between items-start mb-md relative z-10">
        <div>
          {segment.tag && (
            <div className="flex items-center gap-xs mb-1">
              <span className={cn('w-2 h-2 rounded-full', colors.dot)} />
              <span className={cn('font-label-caps text-label-caps uppercase', colors.text)}>
                {segment.tag}
              </span>
            </div>
          )}
          <h3 className="font-title-md text-title-md text-on-surface">{segment.name}</h3>
        </div>

        {/* Hover action buttons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-xs bg-surface-container-highest/80 backdrop-blur-md rounded-lg p-xs border border-outline-variant/20">
          <button
            type="button"
            aria-label={t('list.editAction')}
            onClick={() => navigate(`/audiences/${segment._id}/edit`)}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <Icon name="edit" className="text-sm" />
          </button>
          <button
            type="button"
            aria-label={t('list.duplicateAction')}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <Icon name="content_copy" className="text-sm" />
          </button>
          <button
            type="button"
            aria-label={t('list.deleteAction')}
            className="text-on-surface-variant hover:text-error transition-colors p-1"
          >
            <Icon name="delete" className="text-sm" />
          </button>
        </div>
      </div>

      {/* Size + sparkline */}
      <div className="flex items-end gap-md mb-lg relative z-10 border-b border-outline-variant/10 pb-md">
        <div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block mb-1">
            {t('list.estimatedSize')}
          </span>
          <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            {segment.sizeLabel ?? segment.size.toLocaleString()}
          </span>
        </div>
        <SparkBars colorClass={colors.spark} />
      </div>

      {/* Criteria rows */}
      <div className="space-y-sm relative z-10">
        {segment.location && (
          <div className="flex items-center gap-sm text-body-sm">
            <Icon name="location_on" className="text-sm text-on-surface-variant" />
            <span className="text-on-surface-variant w-20">{t('list.location')}</span>
            <span className="text-on-surface font-medium">{segment.location}</span>
          </div>
        )}
        {segment.ageRange && (
          <div className="flex items-center gap-sm text-body-sm">
            <Icon name="cake" className="text-sm text-on-surface-variant" />
            <span className="text-on-surface-variant w-20">{t('list.age')}</span>
            <span className="text-on-surface font-medium">{segment.ageRange}</span>
          </div>
        )}
        {segment.interests && segment.interests.length > 0 && (
          <div className="flex items-center gap-sm text-body-sm">
            <Icon name="interests" className="text-sm text-on-surface-variant" />
            <span className="text-on-surface-variant w-20">{t('list.interests')}</span>
            <div className="flex gap-xs flex-wrap">
              {segment.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-surface-variant/50 border border-outline-variant/20 px-2 py-0.5 rounded text-xs text-on-surface"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
