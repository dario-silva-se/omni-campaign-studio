import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aiNewsService } from '@/services/aiNewsService'

const REFETCH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

export function useAiNewsList() {
  return useQuery({
    queryKey: ['ai-news'],
    queryFn: () => aiNewsService.list(),
    refetchInterval: REFETCH_INTERVAL_MS,
    staleTime: 4 * 60 * 1000,
    refetchOnWindowFocus: true,
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
