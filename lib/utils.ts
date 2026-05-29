import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SLAStatus, KYCMethod, Scenario, NudgeStatus, CustomerStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Date & Time ─────────────────────────────────────────────────────
export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function timeAgo(iso: string | null): string {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ─── Labels & Display ─────────────────────────────────────────────────
export function scenarioLabel(s: Scenario) {
  return { S1: 'Onboarded — not transacting', S2: 'Incomplete onboarding', S3: 'No data entered' }[s]
}

export function kycMethodLabel(m: KYCMethod) {
  return { NIN: 'NIN verified', BVN: 'BVN fallback', Manual: 'Manual KYC' }[m]
}

export function nudgeLabel(n: NudgeStatus | null) {
  if (!n) return '—'
  return {
    sent_opened: 'Sent — opened',
    sent_no_reply: 'Sent — no reply',
    scheduled: 'Scheduled',
    not_sent: 'Not sent',
    second_due: '2nd nudge due',
  }[n]
}

export function stageLabel(stage: string | null) {
  if (!stage) return '—'
  return {
    phone: 'Phone entry',
    otp: 'OTP step',
    profile_confirm: 'Profile confirm',
    consent: 'Consent screen',
    pin: 'PIN setup',
    dashboard: 'Dashboard',
  }[stage] ?? stage
}

// ─── Color helpers (Tailwind classes) ────────────────────────────────
export function slaColor(status: SLAStatus | null) {
  if (!status) return ''
  return { ok: 'text-success', warning: 'text-warning', breach: 'text-danger' }[status]
}

export function slaBgColor(pct: number) {
  if (pct >= 70) return 'bg-success'
  if (pct >= 40) return 'bg-warning'
  return 'bg-danger'
}

export function kycBadgeColor(method: KYCMethod) {
  return {
    NIN: 'bg-purple-900/40 text-purple-300 border border-purple-700/30',
    BVN: 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/30',
    Manual: 'bg-red-900/40 text-red-300 border border-red-700/30',
  }[method]
}

export function scenarioBadgeColor(s: Scenario) {
  return {
    S1: 'bg-success/10 text-success border border-success/20',
    S2: 'bg-warning/10 text-warning border border-warning/20',
    S3: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  }[s]
}

export function statusBadgeColor(status: CustomerStatus) {
  return {
    active: 'bg-success/10 text-success',
    dormant: 'bg-warning/10 text-warning',
    pending: 'bg-blue-500/10 text-blue-400',
    flagged: 'bg-danger/10 text-danger',
  }[status]
}

export function nudgeBadgeColor(n: NudgeStatus | null) {
  if (!n) return 'bg-muted/10 text-muted'
  return {
    sent_opened: 'bg-success/10 text-success',
    sent_no_reply: 'bg-warning/10 text-warning',
    scheduled: 'bg-blue-500/10 text-blue-400',
    not_sent: 'bg-muted/10 text-muted',
    second_due: 'bg-orange-500/10 text-orange-400',
  }[n]
}

// ─── Numbers ──────────────────────────────────────────────────────────
export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-NG').format(n)
}

export function formatPct(n: number) {
  return `${Math.round(n)}%`
}