import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import type React from 'react'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useAudience, useUpdateAudience } from '../hooks/useAudiences'

export default function EditSegmentPage() {
  const { t } = useTranslation(['audiences', 'common'])
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isError } = useAudience(id)

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  return <EditSegmentForm id={id!} initialName={data.name} initialDescription={data.description} />
}

interface EditSegmentFormProps {
  id: string
  initialName: string
  initialDescription: string
}

function EditSegmentForm({ id, initialName, initialDescription }: EditSegmentFormProps) {
  const { t } = useTranslation(['audiences', 'common'])
  const navigate = useNavigate()
  const updateAudience = useUpdateAudience()

  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !name.trim()) return
    updateAudience.mutate(
      { id, payload: { name: name.trim(), description } },
      { onSuccess: () => navigate('/audiences') },
    )
  }

  return (
    /* Overlay backdrop */
    <div className="flex-1 overflow-y-auto p-md md:p-xl flex items-center justify-center min-h-screen bg-black/40 backdrop-blur-sm">
      {/* Modal panel */}
      <div className="glass-panel w-full max-w-2xl rounded-xl p-xl shadow-2xl flex flex-col gap-lg relative">
        {/* Ambient glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start z-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
              {t('audiences:edit.title')}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t('audiences:edit.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/audiences')}
            aria-label={t('common:actions.close')}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-sm rounded-full hover:bg-overlay-sm"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg z-10 mt-md">
          <div className="flex flex-col gap-xs">
            <label
              htmlFor="segment-name"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase"
            >
              {t('audiences:edit.segmentName')}
            </label>
            <input
              id="segment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-input-bg border border-overlay-md rounded-lg px-md py-sm text-on-surface font-body-lg text-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/50"
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label
              htmlFor="segment-desc"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase"
            >
              {t('audiences:edit.description')}
            </label>
            <textarea
              id="segment-desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-input-bg border border-overlay-md rounded-lg px-md py-sm text-on-surface font-body-lg text-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-on-surface-variant/50"
            />
          </div>

          {/* Footer actions */}
          <div className="flex justify-end gap-md mt-xl pt-lg border-t border-overlay-md">
            <button
              type="button"
              onClick={() => navigate('/audiences')}
              className="px-xl py-sm rounded-lg border border-overlay-md text-on-surface font-title-md text-title-md hover:bg-overlay-sm transition-colors"
            >
              {t('audiences:edit.cancel')}
            </button>
            <Button
              type="submit"
              variant="primary"
              disabled={updateAudience.isPending}
            >
              {t('audiences:edit.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
