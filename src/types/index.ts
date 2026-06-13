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
  // Optional display fields used by campaign control table
  routine?: string
  routineIcon?: string
  keyword?: string
  respondidos?: number
  contentLabel?: string
  contentUrl?: string
}

// Campaign Wizard

export type WizardChannelOption = 'email' | 'social-media' | 'sms' | 'ads'
export type WizardObjective = 'lead-gen' | 'engagement' | 'sales'

export interface WizardStep1State {
  name: string
  description: string
  objective: WizardObjective
  priority: boolean
}

export interface WizardStep2State {
  channels: WizardChannelOption[]
}

export interface WizardStep3State {
  selectedSegmentId: string | null
  location: string
  ageRange: string
  interests: string[]
  behaviorClickedLinkedIn: boolean
  behaviorOpenedEmail: boolean
  behaviorNewLeads: boolean
}

export interface WizardStep4State {
  confirmed: boolean
}

export interface WizardStep5State {
  format: string
  headline: string
  primaryText: string
  cta: string
}

export interface WizardState {
  step1: WizardStep1State
  step2: WizardStep2State
  step3: WizardStep3State
  step4: WizardStep4State
  step5: WizardStep5State
}

export type WizardAction =
  | { type: 'SET_STEP1'; payload: Partial<WizardStep1State> }
  | { type: 'SET_STEP2'; payload: Partial<WizardStep2State> }
  | { type: 'SET_STEP3'; payload: Partial<WizardStep3State> }
  | { type: 'SET_STEP4'; payload: Partial<WizardStep4State> }
  | { type: 'SET_STEP5'; payload: Partial<WizardStep5State> }
  | { type: 'RESET' }

export interface AudienceSegment {
  _id: string
  name: string
  /** Short category label shown as a pill above the card title */
  tag?: string
  /** Tailwind color token name for the tag pill (e.g. 'primary', 'secondary-container') */
  tagColor?: string
  description: string
  size: number
  /** Formatted size string shown on the card, e.g. '2.4M' */
  sizeLabel?: string
  /** Human-readable location string */
  location?: string
  /** Human-readable age range string */
  ageRange?: string
  /** Free-text interest / keyword tags */
  interests?: string[]
  channels: Channel[]
  criteria: { field: string; operator: string; value: string }[]
  personas: string[]
  // Audience builder fields (new / edit form)
  locationOption?: string
  ageRangeOption?: string
  industry?: string
  interactionClickedLink?: boolean
  interactionEngagedLinkedIn?: boolean
  createdAt: string
  updatedAt: string
}

export type TemplateCategory = 'thought-leadership' | 'broadcast' | 'video-script' | 'lead-gen'

// Templates

export interface LinkedInTemplateDetail {
  headline: string
  contentBody: string
  hashtags: string[]
  authorName: string
  authorTitle: string
  estimatedEngagement: number
  bestPractices: { label: string; passed: boolean }[]
  sentimentTone: { label: string; value: string }[]
}

export interface TelegramTemplateDetail {
  messageType: 'broadcast' | 'poll' | 'bot-interaction'
  interactiveButtons: { label: string; url: string }[]
  estimatedReach: string
  estimatedClicks: string
  complianceItems: { label: string; status: 'ok' | 'warn' | 'error' }[]
}

export interface YouTubeTemplateDetail {
  hook: string
  introValueProp: string
  mainBody: string
  thumbnailStrategy: string
  tags: string[]
  estimatedCtr: string
  scriptPacing: string
  retentionScore: string
  viralChecklist: { label: string; description: string; passed: boolean }[]
}

export interface Template {
  _id: string
  name: string
  channel: Channel
  category: TemplateCategory
  description: string
  body: string
  performanceScore: number
  usageCount: number
  /** Formatted usage count for display, e.g. "2.4k" */
  usageLabel?: string
  thumbnailUrl?: string
  createdAt: string
  // Channel-specific detail data (populated only on templates that have a detail screen)
  linkedInDetail?: LinkedInTemplateDetail
  telegramDetail?: TelegramTemplateDetail
  youTubeDetail?: YouTubeTemplateDetail
}

export type PostStatus = 'scheduled' | 'published' | 'draft' | 'failed' | 'pending-approval'

// Posts

export interface PostHistoryEvent {
  event: string
  actor: string
  timeAgo: string
  type: 'publish' | 'approve' | 'edit' | 'schedule'
  quote?: string
  note?: string
  badge?: string
}

export interface LinkedInPostDetail {
  totalImpressions: string
  impressionsTrend: string
  impressionsTrendPositive: boolean
  engagementRate: string
  engagementTrend: string
  engagementTrendPositive: boolean
  clicks: string
  clicksTrend: string
  clicksTrendPositive: boolean
  shares: string
  sharesTrend: string
  sharesTrendPositive: boolean
  authorName: string
  authorTitle: string
  targetAudience: string
  publicationDate: string
  postStatus: string
  history: PostHistoryEvent[]
}

export interface YouTubePostDetail {
  views: string
  viewsTrend: string
  viewsTrendPositive: boolean
  watchTimeHrs: string
  watchTimeTrend: string
  watchTimeTrendPositive: boolean
  subGrowth: string
  subGrowthTrend: string
  subGrowthTrendPositive: boolean
  avgViewDuration: string
  avgViewTrend: string
  avgViewTrendPositive: boolean
  audienceRetentionAvg: string
  category: string
  visibility: string
  language: string
  description: string
  tags: string[]
  likes: string
  comments: string
  shares: string
  sentimentPositive: string
  channelName: string
  trafficSources: { label: string; pct: number }[]
}

export interface TelegramPostDetail {
  totalReach: string
  reachTrend: string
  reachTrendPositive: boolean
  forwardCount: string
  reactionCount: string
  velocityBars: number[]
  targetChannel: string
  publicationDate: string
  referralId: string
  history: (PostHistoryEvent & { badge?: string })[]
}

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
  linkedInDetail?: LinkedInPostDetail
  youTubeDetail?: YouTubePostDetail
  telegramDetail?: TelegramPostDetail
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes-requested'

// Approvals

export interface ApprovalActivityItem {
  _id: string
  text: string
  timeAgo: string
  /** Material Symbol icon name */
  icon: string
  /** Tailwind color token for icon and bg, e.g. 'primary' | 'tertiary' | 'error' */
  colorToken: string
}

export interface ApprovalDashboardStats {
  scheduledToday: number
}

export interface ApprovalReviewer {
  name: string
  role: string
  status: ApprovalStatus
  avatarInitials?: string
}

export interface ApprovalComment {
  author: string
  role?: string
  message: string
  createdAt: string
  /** If present, this is a system-generated alert comment */
  isAlert?: boolean
  replies?: { author: string; role?: string; message: string; createdAt: string }[]
}

export interface ApprovalHistoryEvent {
  event: string
  actor: string
  timeAgo: string
}

export interface ApprovalComplianceItem {
  id: string
  label: string
  checked: boolean
}

export interface ApprovalCampaignContext {
  targetAudience: string
  channel: string
}

export interface Approval {
  _id: string
  postId: string
  title: string
  channel: Channel
  status: ApprovalStatus
  requestedBy: string
  /** e.g. "Sarah Jenkins", "Alex Chen" */
  requestedByName?: string
  /** e.g. "2h ago" */
  timeAgo?: string
  /** urgency label: 'critical' | 'normal' */
  urgency?: 'critical' | 'normal'
  reviewers: ApprovalReviewer[]
  comments: ApprovalComment[]
  historyEvents?: ApprovalHistoryEvent[]
  complianceItems?: ApprovalComplianceItem[]
  campaignContext?: ApprovalCampaignContext
  /** Post content snippet (used in dashboard feed for text posts) */
  contentSnippet?: string
  /** For media posts: thumbnail placeholder color class */
  thumbnailColorClass?: string
  dueAt?: string
  createdAt: string
}

export interface GovernanceHistoryRow {
  _id: string
  contentName: string
  contentId: string
  channel: string
  decision: 'approved' | 'rejected' | 'changes-requested'
  approver: string
  date: string
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

// Analytics

export interface AnalyticsKpi {
  icon: string
  colorClass: string
  label: string
  value: string
  trendValue: string
  trendPositive: boolean
  barWidthPct: number
}

export interface AnalyticsRoiSummary {
  estimatedRoi: string
  costPerLead: string
  customerAcquisitionCost: string
}

export interface AnalyticsChartBar {
  /** height as Tailwind fraction class e.g. 'h-2/3' */
  heightClass: string
}

export interface AnalyticsChannelLinkedIn {
  cLevelPct: number
  directorPct: number
  ctrVideoContent: string
}

export interface AnalyticsChannelYouTube {
  avgViewDuration: string
  retentionRate: string
  watchTimeHours: string
}

export interface AnalyticsChannelTelegram {
  readRatePct: string
  linkClicks: string
  memberRetentionPct: string
}

export interface AnalyticsTopContent {
  _id: string
  title: string
  channel: Channel
  reach: number
  clicks: number
  status: 'active' | 'finished'
}

export interface AnalyticsValueMetrics {
  _id: 'value-metrics'
  roi: AnalyticsRoiSummary
  kpis: AnalyticsKpi[]
  chartBars: AnalyticsChartBar[]
  xAxisLabels: string[]
  linkedin: AnalyticsChannelLinkedIn
  youtube: AnalyticsChannelYouTube
  telegram: AnalyticsChannelTelegram
  topContent: AnalyticsTopContent[]
}

// Campaign Health

export interface CampaignHealthFunnelStage {
  label: string
  value: number
  barWidthPct: number
  colorClass: string
}

export interface CampaignHealthChannelRow {
  _id: string
  name: string
  icon: string
  iconColorClass: string
  spend: string
  cpaSql: string
  cpaChange: string
  cpaChangePositive: boolean
  status: 'optimal' | 'scaling' | 'fatigue'
}

export type AiActionDotColor = 'secondary-container' | 'primary' | 'outline-variant'

export interface CampaignHealthAiAction {
  _id: string
  title: string
  description: string
  timeAgo: string
  dotColor: AiActionDotColor
}

export interface CampaignHealthRoi {
  _id: 'campaign-health'
  pipelineAmount: string
  blendedRoas: string
  budgetBurn: string
  roiTrendPct: string
  chartBars: AnalyticsChartBar[]
  funnelStages: CampaignHealthFunnelStage[]
  mqlToSqlRate: string
  channelRows: CampaignHealthChannelRow[]
  aiActions: CampaignHealthAiAction[]
}

// Lead Lifecycle

export type LeadStage = 'sql-crm-synced' | 'mql-nurture' | 'lead-discovery'

export interface LeadSourceAttribution {
  source: Channel
  label: string
  pct: number
  colorHex: string
}

export interface LeadLifecycleLead {
  _id: string
  initials: string
  name: string
  company: string
  sourceTouch: string
  sourceTouchChannel: Channel
  qualityScore: number
  qualityStars: number
  stage: LeadStage
  lastActive: string
}

export interface LeadLifecycleAttribution {
  _id: 'lead-lifecycle'
  sources: LeadSourceAttribution[]
  avgTimeToSqlDays: number
  avgTimeToSqlTrendPct: string
  avgQualityScore: number
  avgQualityOutOf: number
  leads: LeadLifecycleLead[]
}

// Creative Lab

export type CreativeFormat = 'single-image' | 'carousel' | 'video' | 'story-reel'
export type CreativePublishContext = 'company-page' | 'personal-profile'

export interface ComplianceCheckItem {
  id: string
  label: string
  /** Whether the item is automatically validated (no user action required) */
  autoChecked: boolean
  /** For auto-checked items, an optional display note */
  note?: string
  /** Whether this is a required check that must pass before publishing */
  required: boolean
  /** For non-auto items that have an action button */
  actionLabel?: string
}

export interface ComplianceSuggestion {
  id: string
  type: 'warning' | 'tip'
  title: string
  description: string
  quickActions?: { label: string; value: string }[]
}

export interface CreativeAsset {
  id: string
  name: string
  type: 'image' | 'video'
  /** Percentage loaded/processed (0-100) */
  progress?: number
}

export interface CreativeLabDraft {
  _id: string
  title: string
  format: CreativeFormat
  publishContext: CreativePublishContext
  assets: CreativeAsset[]
  headline: string
  primaryText: string
  cta: string
  complianceItems: ComplianceCheckItem[]
  suggestions: ComplianceSuggestion[]
  createdAt: string
  updatedAt: string
}

// Content Generation

export type ContentPostStatus = 'draft' | 'scheduled' | 'published'

export interface GeneratedPost {
  _id: string
  content: string
  channel: Channel
  status: ContentPostStatus
  scheduledFor?: string
  publishedAt?: string
}

export interface ContentGenerationStats {
  generated: number
  scheduled: number
  published: number
}

export interface ContentGenerationData {
  _id: 'content-generation'
  stats: ContentGenerationStats
  drafts: GeneratedPost[]
  scheduled: GeneratedPost[]
  published: GeneratedPost[]
}
