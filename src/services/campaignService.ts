import { createCrudService } from './crudService'
import { campaignsFixture } from '@/mocks/fixtures/campaigns'
import type { Campaign } from '@/types'

export const campaignService = createCrudService<Campaign>('/campaigns', { fixtures: campaignsFixture })
