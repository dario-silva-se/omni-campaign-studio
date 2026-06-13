import type { Approval } from '@/types'
import { createCrudService } from './crudService'
import { approvalsFixture } from '@/mocks/fixtures/approvals'

export const approvalService = createCrudService<Approval>('/approvals', {
  fixtures: approvalsFixture,
})
