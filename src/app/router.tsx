import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

// Pages are added by their tasks; until then routes point to PagePlaceholder.
function PagePlaceholder() {
  return <div className="p-lg text-on-surface-variant">…</div>
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
const AlertsPage = lazy(() => import('@/features/alerts/pages/AlertsPage'))
const AlertDetailPage = lazy(() => import('@/features/alerts/pages/AlertDetailPage'))
const LogicBuilderPage = lazy(() => import('@/features/automations/pages/LogicBuilderPage'))
const AutomationMonitorPage = lazy(() => import('@/features/automations/pages/AutomationMonitorPage'))
const DataFlowPage = lazy(() => import('@/features/automations/pages/DataFlowPage'))
const ConnectionsPage = lazy(() => import('@/features/connections/pages/ConnectionsPage'))
const ConnectionDetailPage = lazy(() => import('@/features/connections/pages/ConnectionDetailPage'))
const NotificationSettingsPage = lazy(() => import('@/features/settings/pages/NotificationSettingsPage'))
const ExportReportPage = lazy(() => import('@/features/reports/pages/ExportReportPage'))

export function AppRoutes() {
  return (
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
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="alerts/:id" element={<AlertDetailPage />} />
          <Route path="automations" element={<LogicBuilderPage />} />
          <Route path="automations/monitor" element={<AutomationMonitorPage />} />
          <Route path="system/data-flow" element={<DataFlowPage />} />
          <Route path="settings/connections" element={<ConnectionsPage />} />
          <Route path="settings/connections/:channel" element={<ConnectionDetailPage />} />
          <Route path="settings/notifications" element={<NotificationSettingsPage />} />
          <Route path="reports/export" element={<ExportReportPage />} />
          <Route path="*" element={<PagePlaceholder />} />
        </Route>
      </Routes>
  )
}
