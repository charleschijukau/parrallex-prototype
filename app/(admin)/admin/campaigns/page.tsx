'use client'
import { campaigns } from '@/mock/data'
import { SectionCard, SectionHeader, StatCard, TableWrap, Th, Td, TRow, Badge, ProgressBar, PrimaryButton, GhostButton } from '@/components/shared/ui'
import { scenarioBadgeColor, formatDate } from '@/lib/utils'
import { Megaphone, Plus, Pause, Play, BarChart2 } from 'lucide-react'
import type { CampaignStatus, CampaignType } from '@/types'

const statusColor: Record<CampaignStatus, string> = {
  active: 'bg-success/10 text-success border-success/20',
  draft: 'bg-muted/10 text-muted border-white/10',
  paused: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const typeLabel: Record<CampaignType, string> = {
  completion_incentive: 'Completion incentive',
  cashback: 'Cashback',
  referral: 'Referral',
  reactivation: 'Reactivation',
}

export default function CampaignsPage() {
  const active = campaigns.filter(c => c.status === 'active')
  const totalSent = campaigns.reduce((s, c) => s + c.sent, 0)
  const totalConverted = campaigns.reduce((s, c) => s + c.converted, 0)
  const convRate = totalSent > 0 ? Math.round((totalConverted / totalSent) * 100) : 0

  return (
    <div className="space-y-5 fade-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Campaigns</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Incentive, nudge, and re-engagement campaigns across all scenarios</p>
        </div>
        <PrimaryButton><Plus size={14} /> New campaign</PrimaryButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active campaigns" value={active.length} accent="green" icon={<Megaphone size={14} />} />
        <StatCard label="Total sent" value={totalSent.toLocaleString()} accent="blue" />
        <StatCard label="Total conversions" value={totalConverted.toLocaleString()} delta="↑ 8% vs last week" deltaUp accent="green" />
        <StatCard label="Overall conv. rate" value={`${convRate}%`} accent="gold" />
      </div>

      <SectionCard>
        <SectionHeader title="All campaigns" />
        <TableWrap>
          <thead>
            <tr>
              <Th>Campaign</Th>
              <Th>Type</Th>
              <Th>Scenario</Th>
              <Th>Incentive</Th>
              <Th>Sent</Th>
              <Th>Opened</Th>
              <Th>Converted</Th>
              <Th>Conv. rate</Th>
              <Th>Status</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(c => {
              const cr = c.sent > 0 ? Math.round((c.converted / c.sent) * 100) : 0
              const or = c.sent > 0 ? Math.round((c.opened / c.sent) * 100) : 0
              return (
                <TRow key={c.id}>
                  <Td>
                    <div className="font-medium text-white text-sm">{c.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                      {formatDate(c.startDate)} → {formatDate(c.endDate)}
                    </div>
                  </Td>
                  <Td><span className="text-xs" style={{ color: 'var(--muted)' }}>{typeLabel[c.type]}</span></Td>
                  <Td><Badge className={scenarioBadgeColor(c.targetScenario)}>{c.targetScenario}</Badge></Td>
                  <Td><span className="text-xs text-white">{c.incentiveValue}</span></Td>
                  <Td><span className="text-white font-medium">{c.sent.toLocaleString()}</span></Td>
                  <Td>
                    <div className="space-y-1">
                      <span className="text-white font-medium">{c.opened.toLocaleString()}</span>
                      <div className="w-16"><ProgressBar pct={or} showPct={false} /></div>
                    </div>
                  </Td>
                  <Td><span className="text-white font-medium">{c.converted.toLocaleString()}</span></Td>
                  <Td>
                    <span className={cr >= 20 ? 'text-success font-semibold' : cr >= 10 ? 'text-warning' : 'text-muted'}>
                      {c.sent > 0 ? `${cr}%` : '—'}
                    </span>
                  </Td>
                  <Td><Badge className={`border ${statusColor[c.status]}`}>{c.status}</Badge></Td>
                  <Td>
                    <div className="flex gap-1">
                      {c.status === 'active' && (
                        <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: 'var(--muted)' }}><Pause size={12} /></button>
                      )}
                      {c.status === 'paused' && (
                        <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: 'var(--primary)' }}><Play size={12} /></button>
                      )}
                      <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ color: 'var(--muted)' }}><BarChart2 size={12} /></button>
                    </div>
                  </Td>
                </TRow>
              )
            })}
          </tbody>
        </TableWrap>
      </SectionCard>
    </div>
  )
}