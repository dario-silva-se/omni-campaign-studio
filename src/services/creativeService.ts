import type { CreativeLabDraft, ContentGenerationData } from '@/types'
import { createCrudService } from './crudService'
import { apiClient, isMockMode } from './apiClient'
import { creativeLabDraftFixture, contentGenerationFixture, generatedContentFixture } from '@/mocks/fixtures/creatives'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const creativeDraftService = createCrudService<CreativeLabDraft>('/creatives', {
  fixtures: [creativeLabDraftFixture],
})

export const contentGenerationService = createCrudService<ContentGenerationData>(
  '/content-generation',
  { fixtures: [contentGenerationFixture] },
)

export async function generateContent(_prompt?: string): Promise<{ content: string }> {
  if (isMockMode()) {
    await delay(300)
    return { ...generatedContentFixture }
  }
  const { data } = await apiClient.post<{ content: string }>('/creatives/generate', { prompt: _prompt })
  return data
}
