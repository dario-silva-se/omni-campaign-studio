import { useQuery } from '@tanstack/react-query'
import { creativeDraftService } from '@/services/creativeService'

export function useCreativeDraft(id: string) {
  return useQuery({
    queryKey: ['creative-draft', id],
    queryFn: () => creativeDraftService.getById(id),
  })
}
