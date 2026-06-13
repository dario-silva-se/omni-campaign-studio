import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { connectionService } from '@/services/connectionService'
import type { ApiConnection } from '@/types'

export function useConnectionList() {
  return useQuery({
    queryKey: ['connections'],
    queryFn: () => connectionService.list(),
  })
}

export function useConnection(channel: string | undefined) {
  return useQuery({
    queryKey: ['connections', channel],
    queryFn: () => connectionService.getById(channel as string),
    enabled: !!channel,
  })
}

export function useReconnect() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (channel: string) =>
      connectionService.update(channel, {
        health: 'healthy',
        errorMessage: undefined,
      } as Partial<ApiConnection>),
    onSuccess: (_data, channel) => {
      queryClient.invalidateQueries({ queryKey: ['connections'] })
      queryClient.invalidateQueries({ queryKey: ['connections', channel] })
    },
  })
}
