import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AudienceSegment } from '@/types'
import { audienceService } from '@/services/audienceService'

export function useAudienceList() {
  return useQuery({
    queryKey: ['audiences'],
    queryFn: () => audienceService.list(),
  })
}

export function useAudience(id: string | undefined) {
  return useQuery({
    queryKey: ['audiences', id],
    queryFn: () => audienceService.getById(id!),
    enabled: !!id,
  })
}

export function useCreateAudience() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Omit<AudienceSegment, '_id'>) => audienceService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audiences'] })
    },
  })
}

export function useUpdateAudience() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AudienceSegment> }) =>
      audienceService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audiences'] })
    },
  })
}
