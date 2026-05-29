// ─── Customer & Pipeline ────────────────────────────────────────────
export type Scenario = 'S1' | 'S2' | 'S3'
export type KYCTier = 1 | 2 | 3
export type KYCMethod = 'NIN' | 'BVN' | 'Manual'
export type OnboardingStage = 'phone' | 'otp' | 'profile_confirm' | 'consent' | 'pin' | 'dashboard'
export type CustomerStatus = 'active' | 'dormant' | 'pending' | 'flagged'
export type AgentStatus = 'available' | 'busy' | 'offline'
export type SLAStatus = 'ok' | 'warning' | 'breach'
export type NudgeStatus = 'sent_opened' | 'sent_no_reply' | 'scheduled' | 'not_sent' | 'second_due'
export type Platform = 'android' | 'ios'

export interface Customer {
  id: string
  name: string
  phone: string
  maskedPhone: string
  gender: 'M' | 'F'
  age: number
  zone: string
  city: string
  state: string
  kycTier: KYCTier
  kycMethod: KYCMethod
  scenario: Scenario
  status: CustomerStatus
  onboardedAt: string | null
  capturedAt: string
  dropOffStage: OnboardingStage | null
  dormantDays: number | null
  lastActivity: string | null
  assignedAgentId: string | null
  nudgeStatus: NudgeStatus | null
  slaStatus: SLAStatus | null
  slaHoursRemaining: number | null
  slaPct: number | null
  firstTransactionAt: string | null
  flags: CustomerFlag[]
  nin?: string
  bvn?: string
}

export interface CustomerFlag {
  type: 'address_discrepancy' | 'nin_mismatch' | 'bvn_nin_unlinked' | 'otp_failure' | 'manual_kyc'
  note: string
  resolvedAt: string | null
}

export interface DeviceRecord {
  id: string
  deviceId: string
  platform: Platform
  installDate: string
  lastOpened: string
  opens: number
  pushStatus: NudgeStatus
  incentiveShown: string
}

// ─── Agents ─────────────────────────────────────────────────────────
export interface Agent {
  id: string
  name: string
  initials: string
  zone: string
  gender: 'M' | 'F'
  ageRange: string
  status: AgentStatus
  assigned: number
  capacity: number
  contacted: number
  converted: number
  slaCompliance: number
}

// ─── Analytics & Reports ─────────────────────────────────────────────
export interface FunnelDataPoint {
  date: string
  downloads: number
  completed: number
  transacted: number
}

export interface ScenarioPipelineCount {
  s1: number
  s2: number
  s3: number
}

export interface OTPDeliveryStats {
  whatsapp: number
  sms: number
  voice: number
  failed: number
}

export interface IdentityVerificationStats {
  nin: number
  bvn: number
  manual: number
  otpRecovered: number
}

export interface AgentPipelineStats {
  assigned: number
  contacted: number
  slaCompliance: number
  converted: number
}

export interface ComplianceFlags {
  addressDiscrepancy: number
  ninMismatch: number
  bvnNinUnlinked: number
  slaBreached: number
}

export interface DailyOverview {
  downloads: number
  downloadsDelta: number
  completed: number
  completionRate: number
  pending: number
  pendingNew: number
  firstTransactions: number
  firstTransactionRate: number
  funnelTrend: FunnelDataPoint[]
  scenarioCounts: ScenarioPipelineCount
  otpDelivery: OTPDeliveryStats
  identity: IdentityVerificationStats
  agentPipeline: AgentPipelineStats
  complianceFlags: ComplianceFlags
}

// ─── Campaigns ───────────────────────────────────────────────────────
export type CampaignStatus = 'active' | 'draft' | 'paused' | 'completed'
export type CampaignType = 'completion_incentive' | 'cashback' | 'referral' | 'reactivation'

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  targetScenario: Scenario
  incentiveValue: string
  sent: number
  opened: number
  converted: number
  startDate: string
  endDate: string
}

// ─── Notifications ────────────────────────────────────────────────────
export type NotificationType = 'sla_breach' | 'flag' | 'campaign' | 'system' | 'conversion'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  timestamp: string
  read: boolean
  severity: 'info' | 'warning' | 'danger' | 'success'
}

// ─── Mobile onboarding flow ───────────────────────────────────────────
export interface OnboardingSession {
  phone: string
  otpVerified: boolean
  ninData: NINData | null
  bvnFallback: boolean
  stage: OnboardingStage
  consentMarketing: boolean
  consentWhatsapp: boolean
}

export interface NINData {
  nin: string
  firstName: string
  lastName: string
  dob: string
  gender: 'M' | 'F'
  registeredAddress: string
  state: string
}

// ─── AI Insights ──────────────────────────────────────────────────────
export interface AIInsight {
  id: string
  category: 'conversion' | 'churn_risk' | 'agent_efficiency' | 'campaign'
  title: string
  summary: string
  recommendation: string
  confidence: number
  impactScore: number
  createdAt: string
}