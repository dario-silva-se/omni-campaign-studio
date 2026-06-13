import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { automationService } from '@/services/automationService'
import { automationMonitorService } from '@/services/automationMonitorService'
import { dataFlowService } from '@/services/dataFlowService'
import type { AutomationTrigger } from '@/types'

export function useAutomationList() {
  return useQuery({
    queryKey: ['automations'],
    queryFn: () => automationService.list(),
  })
}

export function useUpdateAutomation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AutomationTrigger> }) =>
      automationService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] })
    },
  })
}

export function useAutomationMonitor() {
  return useQuery({
    queryKey: ['automation-monitor'],
    queryFn: async () => {
      const list = await automationMonitorService.list()
      return list[0]
    },
  })
}

export function useDataFlow() {
  return useQuery({
    queryKey: ['data-flow'],
    queryFn: async () => {
      const list = await dataFlowService.list()
      return list[0]
    },
  })
}
