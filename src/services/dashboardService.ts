import { createCrudService } from './crudService'
import type { DashboardData } from '@/types'
import { dashboardFixture } from '@/mocks/fixtures/dashboard'

export const dashboardService = createCrudService<DashboardData>('/dashboard', {
  fixtures: dashboardFixture,
})
