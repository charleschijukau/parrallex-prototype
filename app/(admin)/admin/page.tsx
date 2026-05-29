'use client'
import Link from 'next/link'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { dailyOverview } from '@/mock/data'
import { StatCard, SectionCard, SectionHeader, ProgressBar, Badge } from '@/components/shared/ui'
import { formatNumber, formatPct } from '@/lib/utils'
import { Download, CheckCircle, Clock, ArrowRight, Zap, AlertTriangle, ShieldCheck, Users } from 'lucide-react'

const PIE_COLORS = ['#00d492', '#ffb84d', '#38bdf8']

export default function AdminPage() {
  const d = dailyOverview

  return (
    <div className="space-y-6 fade-up">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-semibold text-white">Good morning, Admin</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Wednesday, 28 May 2026 · Parallex Bank Onboarding Pipeline</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="App downloads" value={formatNumber(d.downloads)} delta={`↑ ${d.downloadsDelta}% vs yesterday`} deltaUp icon={<Download size={16} />} accent="green" />
        <StatCard label="Onboarding completed" value={formatNumber(d.completed)} delta={`${d.completionRate}% completion rate`} deltaUp icon={<CheckCircle size={16} />} accent="blue" />
        <StatCard label="Pending (incomplete)" value={formatNumber(d.pending)} delta={`↑ ${d.pendingNew} new since midnight`} icon={<Clock size={16} />} accent="gold" />
        <StatCard label="First transactions today" value={formatNumber(d.firstTransactions)} delta={`${d.firstTransactionRate}% of onboarded`} deltaUp icon={<Zap size={16} />} accent="green" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Funnel trend */}
        <SectionCard>
          <SectionHeader title="Funnel — last 7 days" subtitle="Downloads → Completed → Transacted" />
          <div className="flex gap-4 mb-4 flex-wrap">
            {[{ label: 'Downloads', color: '#1a3a6b' }, { label: 'Completed', color: '#38bdf8' }, { label: 'Transacted', color: '#00d492' }].map(l => (
              <span key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={d.funnelTrend}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted)' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ background: '#10263d', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, fontSize: 12 }} labelStyle={{ color: 'white' }} />
              <Line type="monotone" dataKey="downloads" stroke="#1a3a6b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="completed" stroke="#38bdf8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="transacted" stroke="#00d492" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Scenario pipeline */}
        <SectionCard>
          <SectionHeader title="Pipeline by scenario" subtitle="Current active records" />
          <div className="flex items-center gap-6">
            <PieChart width={160} height={160}>
              <Pie data={[
                { name: 'S1', value: d.scenarioCounts.s1 },
                { name: 'S2', value: d.scenarioCounts.s2 },
                { name: 'S3', value: d.scenarioCounts.s3 },
              ]} cx={75} cy={75} innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                {PIE_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-3">
              {[
                { label: 'S1 — Onboarded, dormant', value: d.scenarioCounts.s1, color: '#00d492', href: '/admin/pipeline?tab=S1' },
                { label: 'S2 — Incomplete', value: d.scenarioCounts.s2, color: '#ffb84d', href: '/admin/pipeline?tab=S2' },
                { label: 'S3 — No data', value: d.scenarioCounts.s3, color: '#38bdf8', href: '/admin/pipeline?tab=S3' },
              ].map(item => (
                <Link key={item.label} href={item.href} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{formatNumber(item.value)}</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: 'var(--muted)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* 3-col stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* OTP delivery */}
        <SectionCard>
          <SectionHeader title="OTP delivery" subtitle="Today" />
          <div className="space-y-3">
            {[
              { label: 'WhatsApp (primary)', pct: d.otpDelivery.whatsapp },
              { label: 'SMS fallback', pct: d.otpDelivery.sms },
              { label: 'Voice fallback', pct: d.otpDelivery.voice },
            ].map(row => (
              <div key={row.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                </div>
                <ProgressBar pct={row.pct} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Identity verification */}
        <SectionCard>
          <SectionHeader title="Identity verification" subtitle="Today" />
          <div className="space-y-2">
            {[
              { label: 'NIN API verified', value: d.identity.nin, badge: 'NIN', color: 'bg-purple-900/40 text-purple-300' },
              { label: 'BVN fallback', value: d.identity.bvn, badge: 'BVN', color: 'bg-yellow-900/40 text-yellow-300' },
              { label: 'Manual KYC flag', value: d.identity.manual, badge: 'Manual', color: 'bg-red-900/40 text-red-300' },
              { label: 'OTP session recovered', value: d.identity.otpRecovered, badge: null, color: '' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>{row.label}</span>
                <div className="flex items-center gap-2">
                  {row.badge && <Badge className={row.color}>{row.badge}</Badge>}
                  <span className="text-sm font-semibold text-white">{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Compliance flags */}
        <SectionCard>
          <SectionHeader title="Compliance flags" subtitle="Requiring review" />
          <div className="space-y-2">
            {[
              { label: 'Address discrepancy', value: d.complianceFlags.addressDiscrepancy, icon: <AlertTriangle size={14} />, color: 'text-warning' },
              { label: 'NIN name mismatch', value: d.complianceFlags.ninMismatch, icon: <ShieldCheck size={14} />, color: 'text-warning' },
              { label: 'BVN-NIN not linked', value: d.complianceFlags.bvnNinUnlinked, icon: <Users size={14} />, color: 'text-warning' },
              { label: 'SLA breach (uncontacted)', value: d.complianceFlags.slaBreached, icon: <Clock size={14} />, color: 'text-danger' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <span className={row.color}>{row.icon}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{row.label}</span>
                </div>
                <span className={cn('text-sm font-semibold', row.color)}>{row.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Agent pipeline quick glance */}
      <SectionCard>
        <SectionHeader
          title="Agent pipeline — today"
          action={<Link href="/admin/agents" className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: 'var(--primary)' }}>View agents <ArrowRight size={12} /></Link>}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Records assigned', value: d.agentPipeline.assigned },
            { label: 'Contacts made', value: d.agentPipeline.contacted },
            { label: 'SLA compliance', value: formatPct(d.agentPipeline.slaCompliance) },
            { label: 'Converted to complete', value: d.agentPipeline.converted },
          ].map(item => (
            <div key={item.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-xl font-semibold text-white">{item.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}