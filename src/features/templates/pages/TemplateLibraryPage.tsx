import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/components/ui/Icon'
import { TemplateCard } from '../components/TemplateCard'
import { useTemplates } from '../hooks/useTemplates'
import type { Channel } from '@/types'

type FilterValue = 'all' | Channel

const FILTERS: { value: FilterValue; key: string }[] = [
  { value: 'all', key: 'library.filterAll' },
  { value: 'linkedin', key: 'library.filterLinkedIn' },
  { value: 'youtube', key: 'library.filterYouTube' },
  { value: 'telegram', key: 'library.filterTelegram' },
]

export default function TemplateLibraryPage() {
  const { t } = useTranslation(['templates', 'common'])
  const { data, isLoading, isError } = useTemplates()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  if (isError) return <div role="alert" className="p-lg text-error">{t('common:errorState')}</div>
  if (isLoading || !data) return <div className="p-lg text-on-surface-variant">{t('common:loading')}</div>

  const filtered = data.filter((tpl) => {
    const matchesChannel = activeFilter === 'all' || tpl.channel === activeFilter
    const matchesSearch = search.trim() === '' || tpl.name.toLowerCase().includes(search.toLowerCase())
    return matchesChannel && matchesSearch
  })

  return (
    <div className="p-gutter md:p-xl space-y-xl max-w-container-max w-full">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div className="flex space-x-sm overflow-x-auto w-full md:w-auto pb-base md:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className={
                activeFilter === f.value
                  ? 'px-md py-xs rounded-full bg-primary/20 text-primary border border-primary/30 font-body-sm text-body-sm whitespace-nowrap'
                  : 'px-md py-xs rounded-full bg-surface-container hover:bg-surface-variant border border-outline-variant/30 text-on-surface-variant font-body-sm text-body-sm transition-colors whitespace-nowrap'
              }
            >
              {t(f.key)}
            </button>
          ))}
        </div>

        {/* Desktop search */}
        <div className="relative w-64 group hidden md:block">
          <Icon name="search" className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            className="w-full bg-surface-container border border-outline-variant/30 rounded-full py-xs pl-xl pr-sm text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
        </div>

        {/* Mobile search */}
        <div className="relative w-full md:hidden">
          <Icon name="search" className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            className="w-full bg-surface-container border border-outline-variant/30 rounded-full py-xs pl-xl pr-sm text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Bento grid of template cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filtered.map((tpl) => (
          <TemplateCard key={tpl._id} template={tpl} />
        ))}
      </div>
    </div>
  )
}
