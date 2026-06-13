import { useQuery } from '@tanstack/react-query'
import { governanceHistoryService } from '@/services/governanceHistoryService'

export function useGovernanceHistory() {
  return useQuery({
    queryKey: ['governance-history'],
    queryFn: () => governanceHistoryService.list(),
  })
}
