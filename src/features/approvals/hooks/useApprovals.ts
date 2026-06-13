import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { approvalService } from '@/services/approvalService'
import type { Approval } from '@/types'

export function useApprovalList() {
  return useQuery({
    queryKey: ['approvals'],
    queryFn: () => approvalService.list(),
  })
}

export function useApproval(id: string | undefined) {
  return useQuery({
    queryKey: ['approvals', id],
    queryFn: () => approvalService.getById(id as string),
    enabled: !!id,
  })
}

export function useUpdateApproval() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Approval> }) =>
      approvalService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
    },
  })
}
