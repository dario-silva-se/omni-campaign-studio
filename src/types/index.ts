export type Channel = 'linkedin' | 'youtube' | 'telegram'

export type CampaignStatus = 'active' | 'paused' | 'draft' | 'completed' | 'launching'

export interface Campaign {
  _id: string
  name: string
  status: CampaignStatus
  channels: Channel[]
  budget: number
  spend: number
  cpl: number
  cpm: number
  roas: number
  leads: number
  mql: number
  sql: number
  startDate: string
  endDate?: string
  audienceId?: string
  createdAt: string
  updatedAt: string
}

export interface AudienceSegment {
  _id: string
  name: string
  description: string
  size: number
  channels: Channel[]
  criteria: { field: string; operator: string; value: string }[]
  personas: string[]
  createdAt: string
  updatedAt: string
}

export type TemplateCategory = 'thought-leadership' | 'broadcast' | 'video-script' | 'lead-gen'

export interface Template {
  _id: string
  name: string
  channel: Channel
  category: TemplateCategory
  description: string
  body: string
  performanceScore: number
  usageCount: number
  thumbnailUrl?: string
  createdAt: string
}

export type PostStatus = 'scheduled' | 'published' | 'draft' | 'failed' | 'pending-approval'

export interface Post {
  _id: string
  title: string
  channel: Channel
  status: PostStatus
  content: string
  mediaUrl?: string
  scheduledFor?: string
  publishedAt?: string
  campaignId?: string
  metrics?: { impressions: number; clicks: number; engagement: number }
  createdAt: string
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes-requested'

export interface Approval {
  _id: string
  postId: string
  title: string
  channel: Channel
  status: ApprovalStatus
  requestedBy: string
  reviewers: { name: string; role: string; status: ApprovalStatus }[]
  comments: { author: string; message: string; createdAt: string }[]
  dueAt?: string
  createdAt: string
}

export type AlertSeverity = 'critical' | 'warning' | 'info'

export interface Alert {
  _id: string
  title: string
  description: string
  severity: AlertSeverity
  channel: Channel
  campaignId?: string
  metric?: string
  threshold?: number
  currentValue?: number
  acknowledged: boolean
  actions: { label: string; action: string }[]
  createdAt: string
}

export interface AutomationTrigger {
  _id: string
  name: string
  metric: 'cpm' | 'cpl' | 'roas' | 'ctr'
  operator: 'gt' | 'lt'
  threshold: number
  action: 'pause-campaign' | 'reallocate-budget' | 'notify'
  enabled: boolean
  lastFiredAt?: string
  estimatedImpact?: { adSpendSaved: number; roasRecovery: number; leadQualityLift: number }
}

export type ConnectionHealth = 'healthy' | 'expiring' | 'error' | 'disconnected'

export interface ApiConnection {
  _id: string
  channel: Channel
  accountName: string
  health: ConnectionHealth
  tokenExpiresAt?: string
  lastSyncAt?: string
  errorMessage?: string
  scopes: string[]
}

export interface NotificationSettings {
  _id: string
  slackEnabled: boolean
  telegramEnabled: boolean
  emailEnabled: boolean
  criticalOnly: boolean
  quietHours?: { start: string; end: string }
  routes: { severity: AlertSeverity; channels: string[] }[]
}

export type ReportJobStatus = 'queued' | 'in-progress' | 'completed' | 'failed'

export interface ReportJob {
  _id: string
  name: string
  format: 'pdf'
  status: ReportJobStatus
  progress: number
  downloadUrl?: string
  errorMessage?: string
  createdAt: string
}

export interface AnalyticsSummary {
  campaignsRunning: number
  leadsCaptured: number
  totalSpend: number
  roas: number
  mqlToSqlRate: number
  byChannel: { channel: Channel; leads: number; spend: number; roi: number }[]
}

// Dashboard

export type DashboardSignalSource = 'linkedin' | 'youtube' | 'telegram'

export interface DashboardSignal {
  _id: string
  source: DashboardSignalSource
  title: string
  description?: string
  /** For linkedin: "Author: @handle · @handle2 · date" */
  author: string
  publishedAt?: string
  views?: number
  /** LinkedIn only: high signal badge label e.g. "Alta" */
  badge?: string
  /** Telegram only: growth/activity text shown below description */
  activityNote?: string
  /** Telegram only: category tag shown as a badge e.g. "Crescimento" */
  categoryTag?: string
}

export interface DashboardStatCard {
  icon: string
  label: string
  value: string
  trend: string
  trendPositive: boolean
  sparklinePoints: string
}

export interface DashboardData {
  _id: string
  greetingName: string
  campaignsRunning: number
  leadsCaptured: number
  stats: DashboardStatCard[]
  signals: DashboardSignal[]
  radarUpdatedAt: string
}
