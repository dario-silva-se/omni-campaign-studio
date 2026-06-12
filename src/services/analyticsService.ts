import { createCrudService } from './crudService'
import type { AnalyticsValueMetrics, CampaignHealthRoi, LeadLifecycleAttribution } from '@/types'
import {
  analyticsValueMetricsFixture,
  campaignHealthRoiFixture,
  leadLifecycleFixture,
} from '@/mocks/fixtures/analytics'

export const analyticsValueMetricsService = createCrudService<AnalyticsValueMetrics>(
  '/analytics/value-metrics',
  { fixtures: [analyticsValueMetricsFixture] },
)

export const campaignHealthService = createCrudService<CampaignHealthRoi>(
  '/analytics/campaign-health',
  { fixtures: [campaignHealthRoiFixture] },
)

export const leadLifecycleService = createCrudService<LeadLifecycleAttribution>(
  '/analytics/lead-lifecycle',
  { fixtures: [leadLifecycleFixture] },
)
