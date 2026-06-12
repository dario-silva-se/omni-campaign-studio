import { useQuery } from '@tanstack/react-query'
import {
  analyticsValueMetricsService,
  campaignHealthService,
  leadLifecycleService,
} from '@/services/analyticsService'

export function useValueMetrics() {
  return useQuery({
    queryKey: ['analytics', 'value-metrics'],
    queryFn: () => analyticsValueMetricsService.getById('value-metrics'),
  })
}

export function useCampaignHealth() {
  return useQuery({
    queryKey: ['analytics', 'campaign-health'],
    queryFn: () => campaignHealthService.getById('campaign-health'),
  })
}

export function useLeadLifecycle() {
  return useQuery({
    queryKey: ['analytics', 'lead-lifecycle'],
    queryFn: () => leadLifecycleService.getById('lead-lifecycle'),
  })
}
