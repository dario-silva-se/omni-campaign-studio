import { createCrudService } from './crudService'
import { connectionsFixture } from '@/mocks/fixtures/connections'
import type { ApiConnection } from '@/types'

export const connectionService = createCrudService<ApiConnection>('/connections', {
  fixtures: connectionsFixture,
})
