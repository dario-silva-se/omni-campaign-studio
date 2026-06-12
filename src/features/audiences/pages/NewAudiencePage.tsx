import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { useCreateAudience } from '../hooks/useAudiences'

const LOCATION_OPTIONS = [
  { value: 'global', label: 'Global (All)' },
  { value: 'north-america', label: 'North America' },
  { value: 'latam', label: 'Latin America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
]

const AGE_OPTIONS = [
  { value: '', label: 'Any Age' },
  { value: '18-24', label: '18 - 24' },
  { value: '25-34', label: '25 - 34' },
  { value: '35-44', label: '35 - 44' },
  { value: '45+', label: '45+' },
]

const INDUSTRY_OPTIONS = [
  { value: '', label: 'Any Industry' },
  { value: 'software', label: 'Software / IT' },
  { value: 'marketing', label: 'Marketing / Advertising' },
  { value: 'finance', label: 'Finance' },
]

export default function NewAudiencePage() {
  const { t } = useTranslation(['audiences', 'common'])
  const navigate = useNavigate()
  const createAudience = useCreateAudience()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('global')
  const [ageRange, setAgeRange] = useState('')
  const [industry, setIndustry] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(['SaaS Development', 'Venture Capital'])
  const [clickedLink, setClickedLink] = useState(false)
  const [engagedLinkedIn, setEngagedLinkedIn] = useState(false)

  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    createAudience.mutate(
      {
        name: name.trim(),
        description,
        locationOption: location,
        ageRangeOption: ageRange,
        industry,
        interests: tags,
        interactionClickedLink: clickedLink,
        interactionEngagedLinkedIn: engagedLinkedIn,
        size: 0,
        channels: [],
        criteria: [],
        personas: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { onSuccess: () => navigate('/audiences') },
    )
  }

  return (
    <main className="px-gutter pb-12 pt-6 min-h-screen max-w-5xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-on-surface-variant/60 font-body-sm text-body-sm mb-sm">
        <Link to="/campaigns" className="hover:text-primary transition-colors">
          {t('audiences:create.breadcrumbCampaigns')}
        </Link>
        <Icon name="chevron_right" className="text-[16px]" />
        <Link to="/audiences" className="hover:text-primary transition-colors">
          {t('audiences:create.breadcrumbAudience')}
        </Link>
        <Icon name="chevron_right" className="text-[16px]" />
        <span className="text-on-surface">{t('audiences:create.breadcrumbCreate')}</span>
      </div>

      {/* Page title */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          {t('audiences:create.title')}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
          {t('audiences:create.subtitle')}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="glass-panel rounded-xl p-lg space-y-xl">

          {/* Section 1: Basic Details */}
          <div className="space-y-md border-b border-white/5 pb-xl">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-sm">
              <Icon name="id_card" className="text-[20px]" />
              {t('audiences:create.sectionBasic')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="md:col-span-2">
                <Input
                  label={t('audiences:create.segmentName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('audiences:create.segmentNamePlaceholder')}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label={t('audiences:create.description')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('audiences:create.descriptionPlaceholder')}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Demographics */}
          <div className="space-y-md border-b border-white/5 pb-xl">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-sm">
              <Icon name="public" className="text-[20px]" />
              {t('audiences:create.sectionDemographics')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <Select
                label={t('audiences:create.location')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={LOCATION_OPTIONS}
              />
              <Select
                label={t('audiences:create.ageRange')}
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                options={AGE_OPTIONS}
              />
              <Select
                label={t('audiences:create.industry')}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                options={INDUSTRY_OPTIONS}
              />
            </div>
          </div>

          {/* Section 3: Interests & Keywords */}
          <div className="space-y-md border-b border-white/5 pb-xl">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-sm">
              <Icon name="psychology" className="text-[20px]" />
              {t('audiences:create.sectionInterests')}
            </h3>
            <div className="space-y-sm">
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={t('audiences:create.interestsPlaceholder')}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-xl pr-md py-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-sm mt-sm">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-xs px-sm py-xs bg-primary/10 border border-primary/20 rounded-full text-primary font-body-sm text-[13px]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-on-surface transition-colors"
                      aria-label={`Remove ${tag}`}
                    >
                      <Icon name="close" className="text-[14px]" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="flex items-center gap-xs px-sm py-xs bg-surface-container border border-white/10 rounded-full text-on-surface-variant font-body-sm text-[13px] hover:bg-white/5 cursor-pointer transition-colors border-dashed"
                >
                  <Icon name="add" className="text-[14px]" />
                  {t('audiences:create.addMore')}
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Interaction History */}
          <div className="space-y-md">
            <h3 className="font-title-md text-title-md text-primary flex items-center gap-sm">
              <Icon name="history" className="text-[20px]" />
              {t('audiences:create.sectionInteraction')}
            </h3>
            <div className="space-y-sm">
              <label className="flex items-start gap-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={clickedLink}
                  onChange={(e) => setClickedLink(e.target.checked)}
                  className="mt-1 w-4 h-4 border border-white/20 rounded bg-surface-dim accent-primary cursor-pointer"
                />
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                    {t('audiences:create.clickedLink')}
                  </p>
                  <p className="text-xs text-on-surface-variant/60">
                    {t('audiences:create.clickedLinkHint')}
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-sm cursor-pointer group">
                <input
                  type="checkbox"
                  checked={engagedLinkedIn}
                  onChange={(e) => setEngagedLinkedIn(e.target.checked)}
                  className="mt-1 w-4 h-4 border border-white/20 rounded bg-surface-dim accent-primary cursor-pointer"
                />
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                    {t('audiences:create.engagedLinkedIn')}
                  </p>
                  <p className="text-xs text-on-surface-variant/60">
                    {t('audiences:create.engagedLinkedInHint')}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end items-center gap-md mt-lg pt-md">
          <button
            type="button"
            onClick={() => navigate('/audiences')}
            className="px-lg py-sm rounded-lg font-title-md text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all"
          >
            {t('audiences:create.cancel')}
          </button>
          <Button
            type="submit"
            variant="primary"
            leadingIcon="save"
            disabled={createAudience.isPending}
          >
            {t('audiences:create.saveSegment')}
          </Button>
        </div>
      </form>
    </main>
  )
}
