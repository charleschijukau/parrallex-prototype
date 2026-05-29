import type {
  Customer, Agent, DailyOverview, Campaign,
  Notification, AIInsight, DeviceRecord
} from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────
const zones = ['Lagos Island', 'Ikeja, Lagos', 'Lekki, Lagos', 'Abuja FCT', 'Port Harcourt', 'Kano', 'Enugu', 'Ibadan', 'Aba', 'Benin City']
const names = ['Adaeze Okonkwo', 'Emeka Nwosu', 'Fatimah Bello', 'Chukwuemeka Eze', 'Ngozi Adeyemi', 'Babatunde Fashola', 'Chidinma Okeke', 'Yusuf Abdullahi', 'Ifeoma Nwachukwu', 'Kunle Adesanya', 'Amara Obi', 'Suleiman Garba', 'Blessing Eze', 'Tunde Afolabi', 'Chiamaka Obi', 'Obinna Dike', 'Hauwa Musa', 'Seun Olatunji', 'Aisha Bello', 'Chidi Eze']
const lastActivities = ['Viewed loan section', 'Opened dashboard', 'Added beneficiary', 'Checked balance', 'Browsed airtime top-up', 'None since signup', 'Viewed transfer section']

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function maskPhone(p: string) { return p.slice(0, 8) + '***' + p.slice(-4) }
function daysAgo(n: number) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString() }
function hoursAgo(n: number) { const d = new Date(); d.setHours(d.getHours() - n); return d.toISOString() }
function randomPhone() { return `+234 ${['803','706','815','902','701','814','808'][Math.floor(Math.random()*7)]} ${Math.floor(1000+Math.random()*9000)} ${Math.floor(1000+Math.random()*9000)}` }

// ─── S1 Customers ─────────────────────────────────────────────────────
export const s1Customers: Customer[] = [
  { id: 'c001', name: 'Adaeze Okonkwo', phone: '+234 803 5544 4421', maskedPhone: '+234 803 *** 4421', gender: 'F', age: 28, zone: 'Lagos Island', city: 'Lagos', state: 'Lagos', kycTier: 2, kycMethod: 'NIN', scenario: 'S1', status: 'dormant', onboardedAt: daysAgo(4), capturedAt: daysAgo(4), dropOffStage: null, dormantDays: 4, lastActivity: 'Viewed loan section', assignedAgentId: 'a001', nudgeStatus: 'sent_opened', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
  { id: 'c002', name: 'Emeka Nwosu', phone: '+234 706 8813 8813', maskedPhone: '+234 706 *** 8813', gender: 'M', age: 32, zone: 'Ikeja, Lagos', city: 'Lagos', state: 'Lagos', kycTier: 1, kycMethod: 'NIN', scenario: 'S1', status: 'dormant', onboardedAt: daysAgo(6), capturedAt: daysAgo(6), dropOffStage: null, dormantDays: 6, lastActivity: 'Opened dashboard', assignedAgentId: 'a002', nudgeStatus: 'sent_no_reply', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
  { id: 'c003', name: 'Fatimah Bello', phone: '+234 902 2200 2200', maskedPhone: '+234 902 *** 2200', gender: 'F', age: 25, zone: 'Abuja FCT', city: 'Abuja', state: 'FCT', kycTier: 2, kycMethod: 'NIN', scenario: 'S1', status: 'active', onboardedAt: daysAgo(2), capturedAt: daysAgo(2), dropOffStage: null, dormantDays: 2, lastActivity: 'Added beneficiary', assignedAgentId: null, nudgeStatus: 'scheduled', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
  { id: 'c004', name: 'Chukwuemeka Eze', phone: '+234 815 6601 6601', maskedPhone: '+234 815 *** 6601', gender: 'M', age: 38, zone: 'Port Harcourt', city: 'Port Harcourt', state: 'Rivers', kycTier: 1, kycMethod: 'NIN', scenario: 'S1', status: 'dormant', onboardedAt: daysAgo(8), capturedAt: daysAgo(8), dropOffStage: null, dormantDays: 8, lastActivity: 'None since signup', assignedAgentId: 'a003', nudgeStatus: 'second_due', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
  { id: 'c005', name: 'Ngozi Adeyemi', phone: '+234 701 3317 3317', maskedPhone: '+234 701 *** 3317', gender: 'F', age: 30, zone: 'Lekki, Lagos', city: 'Lagos', state: 'Lagos', kycTier: 2, kycMethod: 'BVN', scenario: 'S1', status: 'active', onboardedAt: daysAgo(1), capturedAt: daysAgo(1), dropOffStage: null, dormantDays: 1, lastActivity: 'Checked balance', assignedAgentId: null, nudgeStatus: 'not_sent', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
  { id: 'c006', name: 'Babatunde Fashola', phone: '+234 814 4412 4412', maskedPhone: '+234 814 *** 4412', gender: 'M', age: 44, zone: 'Ikeja, Lagos', city: 'Lagos', state: 'Lagos', kycTier: 2, kycMethod: 'NIN', scenario: 'S1', status: 'dormant', onboardedAt: daysAgo(10), capturedAt: daysAgo(10), dropOffStage: null, dormantDays: 10, lastActivity: 'Browsed airtime top-up', assignedAgentId: 'a004', nudgeStatus: 'sent_no_reply', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [{ type: 'address_discrepancy', note: 'Customer entered Surulere; NIN shows Ikeja', resolvedAt: null }] },
  { id: 'c007', name: 'Chidinma Okeke', phone: '+234 808 5591 5591', maskedPhone: '+234 808 *** 5591', gender: 'F', age: 23, zone: 'Enugu', city: 'Enugu', state: 'Enugu', kycTier: 1, kycMethod: 'NIN', scenario: 'S1', status: 'dormant', onboardedAt: daysAgo(5), capturedAt: daysAgo(5), dropOffStage: null, dormantDays: 5, lastActivity: 'Opened dashboard', assignedAgentId: 'a003', nudgeStatus: 'sent_opened', slaStatus: null, slaHoursRemaining: null, slaPct: null, firstTransactionAt: null, flags: [] },
]

// ─── S2 Customers ─────────────────────────────────────────────────────
export const s2Customers: Customer[] = [
  { id: 'c101', name: 'Unknown', phone: '+234 803 5592 5592', maskedPhone: '+234 803 *** 5592', gender: 'F', age: 28, zone: 'Lagos', city: 'Lagos', state: 'Lagos', kycTier: 1, kycMethod: 'NIN', scenario: 'S2', status: 'pending', onboardedAt: null, capturedAt: hoursAgo(2), dropOffStage: 'otp', dormantDays: null, lastActivity: null, assignedAgentId: 'a001', nudgeStatus: 'sent_opened', slaStatus: 'ok', slaHoursRemaining: 4, slaPct: 78, firstTransactionAt: null, flags: [] },
  { id: 'c102', name: 'Unknown', phone: '+234 706 1134 1134', maskedPhone: '+234 706 *** 1134', gender: 'M', age: 34, zone: 'Abuja', city: 'Abuja', state: 'FCT', kycTier: 1, kycMethod: 'BVN', scenario: 'S2', status: 'pending', onboardedAt: null, capturedAt: hoursAgo(15), dropOffStage: 'profile_confirm', dormantDays: null, lastActivity: null, assignedAgentId: 'a002', nudgeStatus: 'sent_no_reply', slaStatus: 'warning', slaHoursRemaining: 1.5, slaPct: 35, firstTransactionAt: null, flags: [] },
  { id: 'c103', name: 'Unknown', phone: '+234 815 9908 9908', maskedPhone: '+234 815 *** 9908', gender: 'M', age: 41, zone: 'Kano', city: 'Kano', state: 'Kano', kycTier: 1, kycMethod: 'NIN', scenario: 'S2', status: 'pending', onboardedAt: null, capturedAt: hoursAgo(3), dropOffStage: 'consent', dormantDays: null, lastActivity: null, assignedAgentId: 'a003', nudgeStatus: 'scheduled', slaStatus: 'ok', slaHoursRemaining: 5.5, slaPct: 92, firstTransactionAt: null, flags: [] },
  { id: 'c104', name: 'Unknown', phone: '+234 902 7723 7723', maskedPhone: '+234 902 *** 7723', gender: 'F', age: 22, zone: 'Lagos', city: 'Lagos', state: 'Lagos', kycTier: 1, kycMethod: 'Manual', scenario: 'S2', status: 'flagged', onboardedAt: null, capturedAt: hoursAgo(11), dropOffStage: 'phone', dormantDays: null, lastActivity: null, assignedAgentId: null, nudgeStatus: 'not_sent', slaStatus: 'breach', slaHoursRemaining: 0, slaPct: 100, firstTransactionAt: null, flags: [{ type: 'manual_kyc', note: 'NIN lookup failed after 2 attempts', resolvedAt: null }] },
  { id: 'c105', name: 'Unknown', phone: '+234 701 4450 4450', maskedPhone: '+234 701 *** 4450', gender: 'M', age: 29, zone: 'Port Harcourt', city: 'Port Harcourt', state: 'Rivers', kycTier: 1, kycMethod: 'NIN', scenario: 'S2', status: 'pending', onboardedAt: null, capturedAt: hoursAgo(1), dropOffStage: 'pin', dormantDays: null, lastActivity: null, assignedAgentId: 'a001', nudgeStatus: 'sent_opened', slaStatus: 'ok', slaHoursRemaining: 5, slaPct: 88, firstTransactionAt: null, flags: [] },
  { id: 'c106', name: 'Unknown', phone: '+234 814 3312 3312', maskedPhone: '+234 814 *** 3312', gender: 'M', age: 36, zone: 'Ibadan', city: 'Ibadan', state: 'Oyo', kycTier: 1, kycMethod: 'NIN', scenario: 'S2', status: 'pending', onboardedAt: null, capturedAt: hoursAgo(4), dropOffStage: 'otp', dormantDays: null, lastActivity: null, assignedAgentId: 'a004', nudgeStatus: 'scheduled', slaStatus: 'warning', slaHoursRemaining: 2, slaPct: 42, firstTransactionAt: null, flags: [] },
]

// ─── S3 Devices ───────────────────────────────────────────────────────
export const s3Devices: DeviceRecord[] = [
  { id: 'd001', deviceId: 'DEV-**4821', platform: 'android', installDate: daysAgo(2), lastOpened: hoursAgo(1), opens: 6, pushStatus: 'sent_opened', incentiveShown: 'Free transfers 30 days' },
  { id: 'd002', deviceId: 'DEV-**3302', platform: 'ios', installDate: daysAgo(3), lastOpened: hoursAgo(2), opens: 4, pushStatus: 'scheduled', incentiveShown: 'Progress reward' },
  { id: 'd003', deviceId: 'DEV-**7714', platform: 'android', installDate: daysAgo(4), lastOpened: daysAgo(1), opens: 2, pushStatus: 'sent_no_reply', incentiveShown: 'Free transfers 30 days' },
  { id: 'd004', deviceId: 'DEV-**0091', platform: 'android', installDate: hoursAgo(3), lastOpened: hoursAgo(1), opens: 1, pushStatus: 'not_sent', incentiveShown: 'Referral reward' },
  { id: 'd005', deviceId: 'DEV-**5583', platform: 'ios', installDate: daysAgo(5), lastOpened: daysAgo(2), opens: 3, pushStatus: 'second_due', incentiveShown: 'Progress reward' },
  { id: 'd006', deviceId: 'DEV-**2291', platform: 'android', installDate: daysAgo(1), lastOpened: hoursAgo(5), opens: 2, pushStatus: 'sent_no_reply', incentiveShown: 'Cashback ₦500' },
  { id: 'd007', deviceId: 'DEV-**8841', platform: 'ios', installDate: daysAgo(3), lastOpened: hoursAgo(6), opens: 1, pushStatus: 'not_sent', incentiveShown: 'Free transfers 30 days' },
]

// ─── Agents ───────────────────────────────────────────────────────────
export const agents: Agent[] = [
  { id: 'a001', name: 'Adaora Maduka', initials: 'AM', zone: 'Lagos Zone', gender: 'F', ageRange: '26–35', status: 'busy', assigned: 34, capacity: 40, contacted: 28, converted: 9, slaCompliance: 94 },
  { id: 'a002', name: 'Tunde Afolabi', initials: 'TA', zone: 'Abuja Zone', gender: 'M', ageRange: '26–45', status: 'available', assigned: 29, capacity: 40, contacted: 21, converted: 6, slaCompliance: 76 },
  { id: 'a003', name: 'Chiamaka Obi', initials: 'CO', zone: 'South-East', gender: 'F', ageRange: '18–35', status: 'busy', assigned: 38, capacity: 40, contacted: 31, converted: 12, slaCompliance: 89 },
  { id: 'a004', name: 'Babajide Ige', initials: 'BI', zone: 'Lagos Zone', gender: 'M', ageRange: '18–35', status: 'available', assigned: 22, capacity: 40, contacted: 18, converted: 5, slaCompliance: 91 },
  { id: 'a005', name: 'Rukayat Olusanya', initials: 'RO', zone: 'South-West', gender: 'F', ageRange: '26–45', status: 'available', assigned: 18, capacity: 40, contacted: 15, converted: 4, slaCompliance: 88 },
  { id: 'a006', name: 'Emeka Obi', initials: 'EO', zone: 'South-South', gender: 'M', ageRange: '18–35', status: 'offline', assigned: 0, capacity: 40, contacted: 0, converted: 0, slaCompliance: 0 },
]

// ─── Daily Overview ───────────────────────────────────────────────────
export const dailyOverview: DailyOverview = {
  downloads: 1284,
  downloadsDelta: 18,
  completed: 847,
  completionRate: 66,
  pending: 312,
  pendingNew: 24,
  firstTransactions: 203,
  firstTransactionRate: 24,
  funnelTrend: [
    { date: '22 May', downloads: 980, completed: 601, transacted: 120 },
    { date: '23 May', downloads: 1020, completed: 644, transacted: 145 },
    { date: '24 May', downloads: 1105, completed: 712, transacted: 163 },
    { date: '25 May', downloads: 1190, completed: 755, transacted: 177 },
    { date: '26 May', downloads: 1210, completed: 790, transacted: 188 },
    { date: '27 May', downloads: 1250, completed: 811, transacted: 196 },
    { date: '28 May', downloads: 1284, completed: 847, transacted: 203 },
  ],
  scenarioCounts: { s1: 644, s2: 312, s3: 437 },
  otpDelivery: { whatsapp: 91, sms: 7, voice: 2, failed: 0 },
  identity: { nin: 731, bvn: 88, manual: 28, otpRecovered: 14 },
  agentPipeline: { assigned: 312, contacted: 204, slaCompliance: 87, converted: 67 },
  complianceFlags: { addressDiscrepancy: 43, ninMismatch: 11, bvnNinUnlinked: 19, slaBreached: 8 },
}

// ─── Campaigns ────────────────────────────────────────────────────────
export const campaigns: Campaign[] = [
  { id: 'camp001', name: 'First transaction cashback', type: 'cashback', status: 'active', targetScenario: 'S1', incentiveValue: '₦500 on first txn', sent: 644, opened: 489, converted: 112, startDate: daysAgo(7), endDate: daysAgo(-14) },
  { id: 'camp002', name: 'Complete your setup', type: 'completion_incentive', status: 'active', targetScenario: 'S2', incentiveValue: 'Free transfers 30 days', sent: 312, opened: 201, converted: 67, startDate: daysAgo(5), endDate: daysAgo(-10) },
  { id: 'camp003', name: 'Referral programme — May', type: 'referral', status: 'active', targetScenario: 'S1', incentiveValue: '₦1,000 per referral', sent: 400, opened: 312, converted: 44, startDate: daysAgo(14), endDate: daysAgo(-7) },
  { id: 'camp004', name: 'Re-engage dormant users', type: 'reactivation', status: 'paused', targetScenario: 'S1', incentiveValue: 'Airtime cashback 10%', sent: 230, opened: 88, converted: 18, startDate: daysAgo(21), endDate: daysAgo(-0) },
  { id: 'camp005', name: 'Download nudge push', type: 'completion_incentive', status: 'active', targetScenario: 'S3', incentiveValue: 'Free transfers 30 days', sent: 437, opened: 189, converted: 31, startDate: daysAgo(3), endDate: daysAgo(-7) },
  { id: 'camp006', name: 'June cashback launch', type: 'cashback', status: 'draft', targetScenario: 'S1', incentiveValue: 'TBD — pending compliance', sent: 0, opened: 0, converted: 0, startDate: daysAgo(-3), endDate: daysAgo(-17) },
]

// ─── Notifications ────────────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'n001', type: 'sla_breach', title: 'SLA breach — 8 records', body: '8 pending accounts have not been contacted within the SLA window. Immediate action required.', timestamp: hoursAgo(1), read: false, severity: 'danger' },
  { id: 'n002', type: 'conversion', title: '67 conversions today', body: 'Agents have converted 67 pending accounts to completed today, 12% above yesterday.', timestamp: hoursAgo(2), read: false, severity: 'success' },
  { id: 'n003', type: 'flag', title: 'NIN mismatch detected', body: '11 accounts have NIN name mismatches. KYC remediation team notified automatically.', timestamp: hoursAgo(3), read: true, severity: 'warning' },
  { id: 'n004', type: 'campaign', title: 'Campaign: Complete your setup', body: 'WhatsApp nudge batch delivered to 201 of 312 S2 accounts (64% delivery rate).', timestamp: hoursAgo(4), read: true, severity: 'info' },
  { id: 'n005', type: 'system', title: 'NIN API — 99.2% uptime today', body: 'NIMC NIN API performing normally. 2 timeout retries logged.', timestamp: hoursAgo(6), read: true, severity: 'info' },
  { id: 'n006', type: 'sla_breach', title: 'Agent Tunde Afolabi — SLA at risk', body: 'Agent capacity at 72%. SLA compliance dropped to 76%. Consider reassigning 5 records.', timestamp: hoursAgo(8), read: true, severity: 'warning' },
]

// ─── AI Insights ──────────────────────────────────────────────────────
export const aiInsights: AIInsight[] = [
  { id: 'ai001', category: 'conversion', title: 'S1 accounts in Lekki — high intent signal', summary: '34 dormant S1 accounts in Lekki have browsed the loan or transfer section 3+ times in the last 48h but have not transacted.', recommendation: 'Send a targeted WhatsApp nudge with a ₦500 cashback on first transfer. Projected conversion: 18–22 accounts.', confidence: 84, impactScore: 9, createdAt: hoursAgo(1) },
  { id: 'ai002', category: 'agent_efficiency', title: 'Agent Tunde Afolabi — SLA risk', summary: 'Agent is at 72% capacity with 76% SLA compliance, below the 85% threshold. 8 records are approaching SLA breach.', recommendation: 'Reassign 8 records from Tunde to Babajide Ige who is at 55% capacity and 91% SLA compliance.', confidence: 91, impactScore: 7, createdAt: hoursAgo(2) },
  { id: 'ai003', category: 'churn_risk', title: '22 S1 accounts at 10-day dormancy', summary: '22 accounts have been on the dashboard for 10+ days with zero transactions. Historical data suggests <8% convert after day 12.', recommendation: 'Escalate to agent call immediately with a time-limited incentive offer (expiry within 48h).', confidence: 78, impactScore: 8, createdAt: hoursAgo(4) },
  { id: 'ai004', category: 'campaign', title: 'S3 push notification — optimal send time', summary: 'S3 devices show 3× higher open rates for push notifications sent between 7:30–9:00 AM and 7:00–9:00 PM WAT.', recommendation: 'Reschedule the next S3 push batch to 08:00 WAT tomorrow. Current schedule (14:00) has historically 41% lower open rate.', confidence: 88, impactScore: 6, createdAt: hoursAgo(5) },
]

// ─── All customers ────────────────────────────────────────────────────
export const allCustomers: Customer[] = [...s1Customers, ...s2Customers]

export const getCustomerById = (id: string) =>
  allCustomers.find(c => c.id === id) ?? null

export const getAgentById = (id: string) =>
  agents.find(a => a.id === id) ?? null