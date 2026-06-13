import { useMutation } from '@tanstack/react-query'
import { runExport } from '@/services/reportService'
import type { ExportOptions } from '@/services/reportService'

export function useExportReport() {
  return useMutation({
    mutationFn: (options: ExportOptions) => runExport(options),
  })
}
