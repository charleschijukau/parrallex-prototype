'use client'
import { aiInsights } from '@/mock/data'
import { SectionCard, SectionHeader, Badge, PrimaryButton } from '@/components/shared/ui'
import { cn, timeAgo } from '@/lib/utils'
import { Sparkles, TrendingUp, UserX, Megaphone, Users, ChevronRight } from 'lucide-react'
import type { AIInsight } from '@/types'

const categoryConfig = {
  conversion: { label: 'Conversion', icon: TrendingUp, color: 'text-success', bg: 'rgba(0,212,146,0.08)', border: 'rgba(0,212,146,0.15)' },
  churn_risk: { label: 'Churn risk', icon: UserX, color: 'text-danger', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.15)' },
  agent_efficiency: { label: 'Agent efficiency', icon: Users, color: 'text-warning', bg: 'rgba(255,184,77,0.08)', border: 'rgba(255,184,77,0.15)' },
  campaign: { label: 'Campaign', icon: Megaphone, color: 'text-blue-400', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.15)' },
}

function InsightCard({ insight }: { insight: AIInsight }) {
  const cat = categoryConfig[insight.category]
  const Icon = cat.icon
  return (
    <SectionCard>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
            <Icon size={14} className={cat.color} />
          </div>
          <Badge className={`${cat.color} text-xs`} style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
            {cat.label}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Impact</p>
          <p className="text-sm font-semibold" style={{ color: insight.impactScore >= 8 ? 'var(--primary)' : 'var(--warning)' }}>
            {insight.impactScore}/10
          </p>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white mb-2">{insight.title}</h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>{insight.summary}</p>

      <div className="p-3 rounded-xl mb-3" style={{ background: 'rgba(0,212,146,0.04)', border: '1px solid rgba(0,212,146,0.08)' }}>
        <p className="text-xs font-medium mb-1" style={{ color: 'var(--primary)' }}>Recommendation</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{insight.recommendation}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 w-20 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: `${insight.confidence}%`, background: 'var(--primary)' }} />
          </div>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>{insight.confidence}% confidence</span>
        </div>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{timeAgo(insight.createdAt)}</span>
      </div>

      <div className="flex gap-2 mt-3">
        <PrimaryButton small>Apply recommendation</PrimaryButton>
        <button className="text-xs px-3 py-1.5 rounded-xl border hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          Dismiss
        </button>
      </div>
    </SectionCard>
  )
}

export default function AIInsightsPage() {
  return (
    <div className="space-y-5 fade-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} style={{ color: 'var(--primary)' }} />
            <h1 className="text-xl font-semibold text-white">AI Insights</h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Automated analysis of your pipeline, agent performance, and campaign timing.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,212,146,0.1)', color: 'var(--primary)', border: '1px solid rgba(0,212,146,0.2)' }}>
          <span className="live-dot w-1.5 h-1.5" />
          Refreshed 2 min ago
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map(i => <InsightCard key={i.id} insight={i} />)}
      </div>
    </div>
  )
}