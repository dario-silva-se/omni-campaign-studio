import type { Template } from '@/types'
import { createCrudService } from './crudService'
import { templatesFixture } from '@/mocks/fixtures/templates'

export const templateService = createCrudService<Template>('/templates', {
  fixtures: templatesFixture,
})
