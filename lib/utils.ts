import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SLAStatus, KYCMethod, Scenario, NudgeStatus, CustomerStatus } from '@/types'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

// Dates
export function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' })
}
export function formatDateTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-NG', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
}
export function timeAgo(iso: string | null): string {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// Labels
export function scenarioLabel(s: Scenario) {
  return {
    S1: 'App downloaded — no data',
    S2: 'Onboarding incomplete',
    S3: 'Onboarded — not transacting',
  }[s]
}
export function kycMethodLabel(m: KYCMethod) {
  return { NIN: 'NIN verified', BVN: 'BVN fallback', Manual: 'Manual KYC' }[m]
}
export function nudgeLabel(n: NudgeStatus | null) {
  if (!n) return '—'
  return { sent_opened:'Sent — opened', sent_no_reply:'Sent — no reply', scheduled:'Scheduled', not_sent:'Not sent', second_due:'2nd nudge due' }[n]
}
export function stageLabel(stage: string | null) {
  if (!stage) return '—'
  return ({ phone:'Phone entry', otp:'OTP step', profile_confirm:'Profile confirm', consent:'Consent screen', pin:'PIN setup', dashboard:'Dashboard' } as any)[stage] ?? stage
}

// Badge classes
export function kycBadgeColor(m: KYCMethod) {
  return { NIN:'badge badge-purple', BVN:'badge badge-gold', Manual:'badge badge-danger' }[m]
}
export function scenarioBadgeColor(s: Scenario) {
  return { S1:'badge badge-blue', S2:'badge badge-warning', S3:'badge badge-success' }[s]
}
export function statusBadgeColor(s: CustomerStatus) {
  return { active:'badge badge-success', dormant:'badge badge-warning', pending:'badge badge-info', flagged:'badge badge-danger' }[s]
}
export function nudgeBadgeColor(n: NudgeStatus | null) {
  if (!n) return 'badge badge-muted'
  return { sent_opened:'badge badge-success', sent_no_reply:'badge badge-warning', scheduled:'badge badge-blue', not_sent:'badge badge-muted', second_due:'badge badge-gold' }[n]
}
export function slaColor(s: SLAStatus | null) {
  if (!s) return 'var(--muted)'
  return { ok:'var(--success)', warning:'var(--warning)', breach:'var(--danger)' }[s]
}

// Numbers
export function formatNumber(n: number) { return new Intl.NumberFormat('en-NG').format(n) }
export function formatPct(n: number)    { return `${Math.round(n)}%` }
export function formatNGN(n: number)    { return `₦${new Intl.NumberFormat('en-NG').format(n)}` }
