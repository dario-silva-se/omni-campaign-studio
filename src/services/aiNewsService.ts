import { createCrudService } from './crudService'
import { aiNewsFixture } from '@/mocks/fixtures/aiNews'
import type { AiNewsArticle } from '@/types'

export const aiNewsService = createCrudService<AiNewsArticle>('/ai-news', { fixtures: aiNewsFixture })
