import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { AudienceCard } from '../components/AudienceCard'
import { useAudienceList } from '../hooks/useAudiences'

export default function AudiencesPage() {
  const { t } = useTranslation(['audiences', 'common'])
  const navigate = useNavigate()
  const { data, isLoading, isError } = useAudienceList()
  const [search, setSearch] = useState('')

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  const filtered = search.trim()
    ? data.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : data

  return (
    <main className="px-gutter pb-12 pt-6 min-h-screen max-w-container-max mx-auto w-full relative">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-lg relative z-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-xs">
            {t('audiences:list.title')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {t('audiences:list.subtitle')}
          </p>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-sm w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Icon
              name="search"
              className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 text-sm"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('audiences:list.searchPlaceholder')}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg pl-xl pr-sm py-sm text-body-sm text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <button
            type="button"
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-sm py-sm flex items-center gap-xs text-body-sm text-on-surface hover:bg-surface-variant/50 transition-colors"
          >
            <Icon name="filter_list" className="text-sm" />
            {t('audiences:list.filters')}
          </button>

          {/* Sort */}
          <button
            type="button"
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-sm py-sm flex items-center gap-xs text-body-sm text-on-surface hover:bg-surface-variant/50 transition-colors"
          >
            <Icon name="sort" className="text-sm" />
            {t('audiences:list.sort')}
          </button>

          {/* Create */}
          <Button
            variant="primary"
            leadingIcon="add"
            onClick={() => navigate('/audiences/new')}
            className="ml-auto md:ml-0"
          >
            {t('audiences:list.createSegment')}
          </Button>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg relative z-10">
        {filtered.map((segment) => (
          <AudienceCard key={segment._id} segment={segment} />
        ))}

        {/* "Create new" placeholder card */}
        <button
          type="button"
          onClick={() => navigate('/audiences/new')}
          className="glass-panel rounded-xl p-lg flex flex-col items-center justify-center gap-sm border-dashed border-2 hover:border-primary/50 transition-colors group min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-surface-variant/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon name="add" className="text-on-surface-variant group-hover:text-primary transition-colors" />
          </div>
          <span className="font-title-md text-title-md text-on-surface-variant group-hover:text-on-surface transition-colors">
            {t('audiences:list.newCustomSegment')}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant text-center opacity-60">
            {t('audiences:list.newCustomSegmentHint')}
          </span>
        </button>
      </div>
    </main>
  )
}
