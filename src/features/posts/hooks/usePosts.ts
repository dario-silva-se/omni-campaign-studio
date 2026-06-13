import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '@/services/postService'
import type { Post } from '@/types'

export function usePostList() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.list(),
  })
}

export function usePost(id: string | undefined) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getById(id as string),
    enabled: !!id,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Omit<Post, '_id'>) => postService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useSchedulePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, scheduledFor }: { id: string; scheduledFor: string }) =>
      postService.update(id, { status: 'scheduled', scheduledFor }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
