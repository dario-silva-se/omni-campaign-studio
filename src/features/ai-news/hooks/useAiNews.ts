import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aiNewsService } from '@/services/aiNewsService'

export function useAiNewsList() {
  return useQuery({
    queryKey: ['ai-news'],
    queryFn: () => aiNewsService.list(),
  })
}

export function useToggleBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, bookmarked }: { id: string; bookmarked: boolean }) =>
      aiNewsService.update(id, { bookmarked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-news'] })
    },
  })
}
