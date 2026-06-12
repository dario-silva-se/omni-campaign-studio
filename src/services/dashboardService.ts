import { createCrudService } from './crudService'
import type { DashboardData } from '@/mocks/fixtures/dashboard'
import { dashboardFixture } from '@/mocks/fixtures/dashboard'

export const dashboardService = createCrudService<DashboardData>('/dashboard', {
  fixtures: dashboardFixture,
})
