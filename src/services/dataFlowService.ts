import { createCrudService } from './crudService'
import { dataFlowFixture } from '@/mocks/fixtures/automations'
import type { DataFlowData } from '@/types'

export const dataFlowService = createCrudService<DataFlowData>('/data-flow', {
  fixtures: [dataFlowFixture],
})
