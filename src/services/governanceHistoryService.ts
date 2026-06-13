import type { GovernanceHistoryRow } from '@/types'
import { createCrudService } from './crudService'
import { governanceHistoryFixture } from '@/mocks/fixtures/approvals'

export const governanceHistoryService = createCrudService<GovernanceHistoryRow>(
  '/governance-history',
  { fixtures: governanceHistoryFixture },
)
