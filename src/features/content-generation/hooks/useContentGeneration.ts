import { useQuery, useMutation } from '@tanstack/react-query'
import { contentGenerationService, generateContent } from '@/services/creativeService'

export function useContentGenerationData() {
  return useQuery({
    queryKey: ['content-generation'],
    queryFn: () => contentGenerationService.getById('content-generation'),
  })
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: (prompt: string | undefined) => generateContent(prompt),
  })
}
