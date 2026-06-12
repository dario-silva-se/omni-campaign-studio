import { useQuery } from '@tanstack/react-query'
import { templateService } from '@/services/templateService'

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => templateService.list(),
  })
}

export function useTemplate(id: string | undefined) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => templateService.getById(id!),
    enabled: !!id,
  })
}
