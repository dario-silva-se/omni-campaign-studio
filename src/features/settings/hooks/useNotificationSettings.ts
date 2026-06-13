import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/services/notificationService'
import type { NotificationSettings } from '@/types'

const SETTINGS_ID = 'notification-settings'
const QUERY_KEY = ['notification-settings']

export function useNotificationSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => notificationService.getById(SETTINGS_ID),
  })
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (patch: Partial<NotificationSettings>) =>
      notificationService.update(SETTINGS_ID, patch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
