import { createCrudService } from './crudService'
import { automationTriggersFixture } from '@/mocks/fixtures/automations'
import type { AutomationTrigger } from '@/types'

export const automationService = createCrudService<AutomationTrigger>('/automations', {
  fixtures: automationTriggersFixture,
})
