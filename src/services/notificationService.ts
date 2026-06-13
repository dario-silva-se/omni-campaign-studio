import { createCrudService } from './crudService'
import type { NotificationSettings } from '@/types'
import { notificationFixtures } from '@/mocks/fixtures/notifications'

export const notificationService = createCrudService<NotificationSettings>(
  '/notification-settings',
  { fixtures: notificationFixtures },
)
