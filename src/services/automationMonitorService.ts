import { createCrudService } from './crudService'
import { automationMonitorStatsFixture } from '@/mocks/fixtures/automations'
import type { AutomationMonitorStats } from '@/types'

export const automationMonitorService = createCrudService<AutomationMonitorStats>(
  '/automation-monitor',
  { fixtures: [automationMonitorStatsFixture] },
)
