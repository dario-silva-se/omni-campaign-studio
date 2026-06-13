import type { ReportJob } from '@/types'

export const reportFixtures: ReportJob[] = [
  {
    _id: 'report-001',
    name: 'Relatório Mensal - Outubro 2025',
    format: 'pdf',
    status: 'completed',
    progress: 100,
    downloadUrl: '/reports/report-001.pdf',
    createdAt: '2025-10-01T00:00:00.000Z',
  },
  {
    _id: 'report-error',
    name: 'Relatório com Erro',
    format: 'pdf',
    status: 'failed',
    progress: 0,
    errorMessage: 'Falha ao processar os dados',
    createdAt: '2025-10-02T00:00:00.000Z',
    forceError: true,
  },
]
