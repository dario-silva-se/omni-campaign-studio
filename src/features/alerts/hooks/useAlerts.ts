import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService } from '@/services/alertService'
import type { Alert } from '@/types'

export function useAlertList() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: () => alertService.list(),
  })
}

export function useAlert(id: string | undefined) {
  return useQuery({
    queryKey: ['alerts', id],
    queryFn: () => alertService.getById(id as string),
    enabled: !!id,
  })
}

export function useUpdateAlert() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Alert> }) =>
      alertService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })
}
