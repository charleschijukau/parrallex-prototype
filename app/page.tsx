'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Copy, Check, Shield, Zap, BarChart3,
  Smartphone, Users, Brain, ChevronRight, ExternalLink,
  GitBranch, Megaphone, Bell, ShieldCheck, Settings, FlaskConical
} from 'lucide-react'

const CREDENTIALS = [
  { label: 'NIN (auto-fills profile)', value: 'NIN: 12345678901' },
  { label: 'Test phone number', value: '08012345678' },
  { label: 'WhatsApp OTP', value: '123456' },
  { label: 'PIN', value: '1234' },
]

const ADMIN_PAGES = [
  { href: '/admin', icon: BarChart3, label: 'Overview Dashboard', desc: 'Live metrics, funnel, pipeline snapshot', color: '#00d492' },
  { href: '/admin/pipeline', icon: GitBranch, label: 'Pipeline (S1 / S2 / S3)', desc: 'All 3 scenario tabs with mock records', color: '#38bdf8' },
  { href: '/admin/customers', icon: Users, label: 'Customer List', desc: 'Search, filter, click through to profile', color: '#a78bfa' },
  { href: '/admin/agents', icon: Users, label: 'Agents', desc: 'Capacity, SLA performance, assignments', color: '#ffb84d' },
  { href: '/admin/campaigns', icon: Megaphone, label: 'Campaigns', desc: 'Incentive campaigns across S1/S2/S3', color: '#f472b6' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics', desc: 'Funnel, geo, OTP, KYC breakdown', color: '#34d399' },
  { href: '/admin/ai-insights', icon: Brain, label: 'AI Insights', desc: 'Automated conversion & churn signals', color: '#00d492' },
  { href: '/admin/compliance', icon: ShieldCheck, label: 'Compliance', desc: 'NIN flags, KYC queue, NDPR audit', color: '#fb923c' },
  { href: '/admin/reports', icon: BarChart3, label: 'Reports', desc: 'Daily ops report, KPI table', color: '#60a5fa' },
  { href: '/admin/notifications', icon: Bell, label: 'Notifications', desc: 'SLA alerts, system events (3 unread)', color: '#ff6b6b' },
  { href: '/admin/simulator', icon: FlaskConical, label: 'Simulator', desc: 'Simulate onboarding events live', color: '#c084fc' },
  { href: '/admin/settings', icon: Settings, label: 'Settings', desc: 'SLA config, API keys, team management', color: '#94a3b8' },
]

const MOBILE_PAGES = [
  { href: '/mobile', label: 'Splash screen', desc: 'App landing & value prop' },
  { href: '/mobile/login', label: 'Phone entry', desc: 'Enter number with consent notice' },
  { href: '/mobile/otp', label: 'OTP verification', desc: 'WhatsApp OTP with fallback chain' },
  { href: '/mobile/onboarding', label: 'NIN pre-fill', desc: 'Profile auto-populated from NIN' },
  { href: '/mobile/dashboard', label: 'Dashboard', desc: 'Account home with nudge banner' },
  { href: '/mobile/transactions', label: 'Transactions', desc: 'Mock transaction history' },
  { href: '/mobile/rewards', label: 'Rewards', desc: 'Gamification & incentives' },
  { href: '/mobile/referrals', label: 'Referrals', desc: 'Referral programme screen' },
  { href: '/mobile/profile', label: 'Profile', desc: 'Account & KYC status' },
]

function CopyCard({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div onClick={copy} className="credential-card flex items-center justify-between gap-3 select-none">
      <div>
        <p className="text-xs mb-1" style={{ color: 'var(--muted)', fontFamily: 'inherit' }}>{label}</p>
        <p className="font-mono text-sm" style={{ color: 'var(--primary)' }}>{value}</p>
      </div>
      <div className="flex-shrink-0">
        {copied ? <Check size={14} style={{ color: 'var(--primary)' }} /> : <Copy size={14} style={{ color: 'var(--muted)' }} />}
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: 'linear-gradient(135deg,#00d492,#00a978)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16, color: '#071521'
          }}>PX</div>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>Parallex Bank</span>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11,
          padding: '4px 12px', borderRadius: 999, marginBottom: 20,
          background: 'rgba(0,212,146,0.10)', border: '1px solid rgba(0,212,146,0.20)',
          color: 'var(--primary)'
        }}>
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          Prototype · May 2026 · Confidential
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: 'white' }}>
          Mobile App Onboarding &<br />
          <span className="hero-gradient">Customer Lifecycle System</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 580, margin: '0 auto 32px', lineHeight: 1.7 }}>
          A fully integrated CRM back office and mobile onboarding flow — NIN API identity verification,
          three-scenario pipeline management, agent SLA tracking, and AI-powered engagement.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/admin" className="fintech-button" style={{ padding: '12px 28px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Open Back Office <ArrowRight size={16} />
          </Link>
          <Link href="/mobile" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', fontSize: 14, fontWeight: 600,
            borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)',
            color: 'white', background: 'rgba(255,255,255,0.05)',
            transition: 'background 0.2s'
          }}>
            <Smartphone size={16} /> Mobile Flow
          </Link>
        </div>
      </div>

      {/* Test credentials */}
      <div className="section-card fade-up" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(0,212,146,0.10)', border: '1px solid rgba(0,212,146,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={15} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>Test credentials</h2>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>Click any card to copy. Use these to walk through the mobile onboarding flow.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {CREDENTIALS.map(c => <CopyCard key={c.label} {...c} />)}
        </div>

        <div style={{
          marginTop: 16, padding: '12px 16px', borderRadius: 'var(--radius-md)',
          background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.12)',
          fontSize: 12, color: 'var(--muted)', lineHeight: 1.6
        }}>
          <strong style={{ color: '#38bdf8' }}>How to test:</strong>{' '}
          Go to <Link href="/mobile/login" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>/mobile/login</Link> → enter <code style={{ color: 'white' }}>08012345678</code> →
          OTP screen type <code style={{ color: 'white' }}>123456</code> → confirm auto-filled NIN profile →
          set PIN <code style={{ color: 'white' }}>1234</code> → reach dashboard.
          The CRM captures your session in real-time across all steps.
        </div>
      </div>

      {/* Admin pages */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>Back Office — Admin Pages</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>12 fully built pages with live mock data, charts, tables, and interactive controls.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
          {ADMIN_PAGES.map(({ href, icon: Icon, label, desc, color }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '14px 16px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'rgba(16,38,61,0.6)',
              transition: 'border-color 0.2s, background 0.2s',
              textDecoration: 'none'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}30`; (e.currentTarget as HTMLElement).style.background = `${color}08` }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'rgba(16,38,61,0.6)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</p>
              </div>
              <ChevronRight size={14} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 2 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile pages */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>Mobile — Onboarding Flow</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Complete end-to-end mobile journey — phone entry → NIN lookup → OTP → dashboard.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {MOBILE_PAGES.map(({ href, label, desc }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '12px 14px', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'rgba(16,38,61,0.5)',
              transition: 'border-color 0.2s, background 0.2s',
              textDecoration: 'none'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,146,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,146,0.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'rgba(16,38,61,0.5)' }}>
              <Smartphone size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 1 }}>{label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="section-card">
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 16 }}>System capabilities demonstrated</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {[
            { icon: Zap, label: 'NIN API identity at source', desc: 'Phone → NIN lookup → auto-fill. BVN fallback. Manual KYC flag.' },
            { icon: Shield, label: 'Progressive KYC', desc: 'Every exception silently flagged, resolved at point of transaction.' },
            { icon: GitBranch, label: 'Three-scenario pipeline', desc: 'S1 dormant, S2 incomplete, S3 no-data — each with automated responses.' },
            { icon: Users, label: 'CRM agent assignment', desc: 'Geographic + demographic auto-assign, SLA timer, escalation path.' },
            { icon: Megaphone, label: 'WhatsApp-first OTP', desc: 'Bypasses DND filters. SMS → voice fallback chain. Session preserved.' },
            { icon: Brain, label: 'AI-powered insights', desc: 'Conversion signals, churn risk, campaign timing recommendations.' },
            { icon: BarChart3, label: 'Daily ops reporting', desc: 'Funnel, agent SLA, conversion rate, capacity utilisation.' },
            { icon: ShieldCheck, label: 'NDPR consent architecture', desc: 'Layered, individually togglable consent. Timestamped audit trail.' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', gap: 10 }}>
              <Icon size={15} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 3 }}>{label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 48 }}>
        Prepared by Your Team · May 2026 · Confidential
      </p>
    </div>
  )
}