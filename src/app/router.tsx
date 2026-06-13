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
const AudiencesPage = lazy(() => import('@/features/audiences/pages/AudiencesPage'))
const NewAudiencePage = lazy(() => import('@/features/audiences/pages/NewAudiencePage'))
const EditSegmentPage = lazy(() => import('@/features/audiences/pages/EditSegmentPage'))
const TemplateLibraryPage = lazy(() => import('@/features/templates/pages/TemplateLibraryPage'))
const TemplateDetailPage = lazy(() => import('@/features/templates/pages/TemplateDetailPage'))
const CreativeLabPage = lazy(() => import('@/features/creative-lab/pages/CreativeLabPage'))
const ContentGenerationPage = lazy(() => import('@/features/content-generation/pages/ContentGenerationPage'))
const CampaignsPage = lazy(() => import('@/features/campaigns/pages/CampaignsPage'))
const NewCampaignWizard = lazy(() => import('@/features/campaigns/pages/NewCampaignWizard'))
const LaunchProgressPage = lazy(() => import('@/features/campaigns/pages/LaunchProgressPage'))
const LaunchSuccessPage = lazy(() => import('@/features/campaigns/pages/LaunchSuccessPage'))
const PostsOverviewPage = lazy(() => import('@/features/posts/pages/PostsOverviewPage'))
const NewPostPage = lazy(() => import('@/features/posts/pages/NewPostPage'))
const SchedulePostPage = lazy(() => import('@/features/posts/pages/SchedulePostPage'))
const PostDetailPage = lazy(() => import('@/features/posts/pages/PostDetailPage'))
const ApprovalsPage = lazy(() => import('@/features/approvals/pages/ApprovalsPage'))
const ApprovalDetailPage = lazy(() => import('@/features/approvals/pages/ApprovalDetailPage'))
const GovernanceHistoryPage = lazy(() => import('@/features/approvals/pages/GovernanceHistoryPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="analytics/campaign-health" element={<CampaignHealthPage />} />
          <Route path="analytics/lead-lifecycle" element={<LeadLifecyclePage />} />
          <Route path="audiences" element={<AudiencesPage />} />
          <Route path="audiences/new" element={<NewAudiencePage />} />
          <Route path="audiences/:id/edit" element={<EditSegmentPage />} />
          <Route path="templates" element={<TemplateLibraryPage />} />
          <Route path="templates/:id" element={<TemplateDetailPage />} />
          <Route path="creative-lab" element={<CreativeLabPage />} />
          <Route path="content-generation" element={<ContentGenerationPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/new/step-1" element={<NewCampaignWizard />} />
          <Route path="campaigns/new/step-2" element={<NewCampaignWizard />} />
          <Route path="campaigns/new/step-3" element={<NewCampaignWizard />} />
          <Route path="campaigns/new/step-4" element={<NewCampaignWizard />} />
          <Route path="campaigns/new/step-5" element={<NewCampaignWizard />} />
          <Route path="campaigns/launching" element={<LaunchProgressPage />} />
          <Route path="campaigns/launched" element={<LaunchSuccessPage />} />
          <Route path="posts" element={<PostsOverviewPage />} />
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="posts/schedule/:channel" element={<SchedulePostPage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="approvals/history" element={<GovernanceHistoryPage />} />
          <Route path="approvals/:id" element={<ApprovalDetailPage />} />
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
