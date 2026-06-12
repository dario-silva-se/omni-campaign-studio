import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Campaign } from '@/types'
import { campaignService } from '@/services/campaignService'

export function useCampaignList() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignService.list(),
  })
}

export function useCreateCampaign() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Omit<Campaign, '_id'>) => campaignService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}
