import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

// Pages are added by their tasks; until then routes point to PagePlaceholder.
function PagePlaceholder() {
  return <div className="p-lg text-on-surface-variant">…</div>
}

function PageLoader() {
  return <div role="status" aria-live="polite" className="p-lg text-on-surface-variant">Carregando…</div>
}

const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'))
const CampaignHealthPage = lazy(() => import('@/features/analytics/pages/CampaignHealthPage'))
const LeadLifecyclePage = lazy(() => import('@/features/analytics/pages/LeadLifecyclePage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="analytics/campaign-health" element={<CampaignHealthPage />} />
          <Route path="analytics/lead-lifecycle" element={<LeadLifecyclePage />} />
          <Route path="audiences" element={<PagePlaceholder />} />
          <Route path="audiences/new" element={<PagePlaceholder />} />
          <Route path="audiences/:id/edit" element={<PagePlaceholder />} />
          <Route path="templates" element={<PagePlaceholder />} />
          <Route path="templates/:id" element={<PagePlaceholder />} />
          <Route path="creative-lab" element={<PagePlaceholder />} />
          <Route path="content-generation" element={<PagePlaceholder />} />
          <Route path="campaigns" element={<PagePlaceholder />} />
          <Route path="campaigns/new/step-1" element={<PagePlaceholder />} />
          <Route path="campaigns/new/step-2" element={<PagePlaceholder />} />
          <Route path="campaigns/new/step-3" element={<PagePlaceholder />} />
          <Route path="campaigns/new/step-4" element={<PagePlaceholder />} />
          <Route path="campaigns/new/step-5" element={<PagePlaceholder />} />
          <Route path="campaigns/launching" element={<PagePlaceholder />} />
          <Route path="campaigns/launched" element={<PagePlaceholder />} />
          <Route path="posts" element={<PagePlaceholder />} />
          <Route path="posts/new" element={<PagePlaceholder />} />
          <Route path="posts/schedule/:channel" element={<PagePlaceholder />} />
          <Route path="posts/:id" element={<PagePlaceholder />} />
          <Route path="approvals" element={<PagePlaceholder />} />
          <Route path="approvals/history" element={<PagePlaceholder />} />
          <Route path="approvals/:id" element={<PagePlaceholder />} />
          <Route path="approvals/:id/request-changes" element={<PagePlaceholder />} />
          <Route path="alerts" element={<PagePlaceholder />} />
          <Route path="alerts/:id" element={<PagePlaceholder />} />
          <Route path="automations" element={<PagePlaceholder />} />
          <Route path="automations/monitor" element={<PagePlaceholder />} />
          <Route path="system/data-flow" element={<PagePlaceholder />} />
          <Route path="settings/connections" element={<PagePlaceholder />} />
          <Route path="settings/connections/:channel" element={<PagePlaceholder />} />
          <Route path="settings/notifications" element={<PagePlaceholder />} />
          <Route path="reports/export" element={<PagePlaceholder />} />
          <Route path="*" element={<PagePlaceholder />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
