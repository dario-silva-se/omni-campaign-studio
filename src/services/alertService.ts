import { createCrudService } from './crudService'
import { alertsFixture } from '@/mocks/fixtures/alerts'
import type { Alert } from '@/types'

export const alertService = createCrudService<Alert>('/alerts', {
  fixtures: alertsFixture,
})
