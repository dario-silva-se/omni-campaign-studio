import { createCrudService } from './crudService'
import { apiClient, isMockMode } from './apiClient'
import type { ReportJob } from '@/types'
import { reportFixtures } from '@/mocks/fixtures/reports'

export const reportService = createCrudService<ReportJob>('/reports', {
  fixtures: reportFixtures,
})

/**
 * Mock duration in ms for the export animation.
 * Override in tests: setMockExportDurationMs(50)
 */
export let mockExportDurationMs = 1500

export function setMockExportDurationMs(ms: number) {
  mockExportDurationMs = ms
}

/**
 * Test-only flag: when true the mock runExport will throw an error.
 * Never read from production code — call setMockForceError(true) in a test
 * and reset to false in afterEach.
 */
let _mockForceError = false

export function setMockForceError(value: boolean) {
  _mockForceError = value
}

export interface ExportOptions {
  period: '7d' | '30d' | 'custom'
  channels: string[]
  sections: string[]
}

export async function runExport(options: ExportOptions): Promise<ReportJob> {
  if (isMockMode()) {
    await new Promise<void>((resolve) => setTimeout(resolve, mockExportDurationMs))
    if (_mockForceError) {
      throw new Error('Falha ao processar os dados')
    }
    const job: ReportJob = {
      _id: `report-${Date.now()}`,
      name: `Relatório PDF - ${new Date().toLocaleDateString('pt-BR')}`,
      format: 'pdf',
      status: 'completed',
      progress: 100,
      downloadUrl: '/reports/latest.pdf',
      createdAt: new Date().toISOString(),
    }
    return job
  }
  const { data } = await apiClient.post<ReportJob>('/reports/export', options)
  return data
}
