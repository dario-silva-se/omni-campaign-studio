import type { AudienceSegment } from '@/types'
import { createCrudService } from './crudService'
import { audiencesFixture } from '@/mocks/fixtures/audiences'

export const audienceService = createCrudService<AudienceSegment>('/audiences', {
  fixtures: audiencesFixture,
})
