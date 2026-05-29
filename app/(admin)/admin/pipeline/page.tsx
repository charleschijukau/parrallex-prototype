'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { s1Customers, s2Customers, s3Devices, agents } from '@/mock/data'
import { SectionCard, SectionHeader, FilterPills, TableWrap, Th, Td, TRow, Badge, ProgressBar, PrimaryButton, GhostButton } from '@/components/shared/ui'
import { cn, formatDateTime, timeAgo, stageLabel, nudgeLabel, kycBadgeColor, nudgeBadgeColor, scenarioBadgeColor } from '@/lib/utils'
import { Send, UserPlus, Smartphone, Phone, Eye, ChevronRight } from 'lucide-react'
import type { Customer, DeviceRecord } from '@/types'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'S1', label: 'S1 — Onboarded, dormant', count: 644, color: '#00d492' },
  { id: 'S2', label: 'S2 — Incomplete', count: 312, color: '#ffb84d' },
  { id: 'S3', label: 'S3 — No data', count: 437, color: '#38bdf8' },
]

export default function PipelinePage() {
  const [tab, setTab] = useState('overview')
  const [s1Filter, setS1Filter] = useState('all')
  const [s2Filter, setS2Filter] = useState('all')
  const router = useRouter()

  return (
    <div className="space-y-5 fade-up">
      <div>
        <h1 className="text-xl font-semibold text-white">Pipeline</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>All three onboarding scenarios — live view</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b pb-0" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn('flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px',
              tab === t.id ? 'text-white' : 'border-transparent hover:text-white')}
            style={{ borderBottomColor: tab === t.id ? 'var(--primary)' : 'transparent', color: tab === t.id ? 'white' : 'var(--muted)' }}>
            {t.label}
            {'count' in t && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: `${t.color}20`, color: t.color }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { scenario: 'S1', label: 'Onboarded — not transacting', count: 644, color: '#00d492', desc: 'Goal: drive first transaction. Method: in-app nudges, cashback incentive.', tab: 'S1' },
            { scenario: 'S2', label: 'Incomplete — dropped mid-flow', count: 312, color: '#ffb84d', desc: 'Goal: get customer to return and complete. Method: WhatsApp nudge D+1, agent call via CRM.', tab: 'S2' },
            { scenario: 'S3', label: 'App downloaded — no data', count: 437, color: '#38bdf8', desc: 'Goal: re-engage via in-app push. Method: push with completion incentive, gamification.', tab: 'S3' },
          ].map(s => (
            <SectionCard key={s.scenario} className="cursor-pointer hover:border-white/10 transition-all" >
              <div className="flex items-start justify-between mb-3">
                <Badge className={scenarioBadgeColor(s.scenario as any)}>{s.scenario}</Badge>
                <button onClick={() => setTab(s.tab)} className="text-xs flex items-center gap-1 transition-opacity hover:opacity-80" style={{ color: 'var(--primary)' }}>
                  View <ChevronRight size={12} />
                </button>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{s.count.toLocaleString()}</p>
              <p className="text-sm font-medium text-white mb-2">{s.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
            </SectionCard>
          ))}
        </div>
      )}

      {/* S1 */}
      {tab === 'S1' && (
        <SectionCard>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <FilterPills
              options={[
                { value: 'all', label: 'All' },
                { value: 'tier1', label: 'Tier 1' },
                { value: 'tier2', label: 'Tier 2' },
                { value: 'nudge_sent', label: 'Nudge sent' },
              ]}
              active={s1Filter} onChange={setS1Filter} />
            <PrimaryButton small><Send size={12} /> Send nudge batch</PrimaryButton>
          </div>
          <TableWrap>
            <thead>
              <tr>
                <Th>Customer</Th>
                <Th>Phone</Th>
                <Th>KYC tier</Th>
                <Th>Onboarded</Th>
                <Th>Dormant</Th>
                <Th>Last activity</Th>
                <Th>Nudge status</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {s1Customers.map(c => (
                <TRow key={c.id} onClick={() => router.push(`/admin/customers/${c.id}`)}>
                  <Td>
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{c.zone}</div>
                  </Td>
                  <Td><span style={{ color: 'var(--muted)' }}>{c.maskedPhone}</span></Td>
                  <Td><Badge className="bg-white/5 text-muted border border-white/10">Tier {c.kycTier}</Badge></Td>
                  <Td><span style={{ color: 'var(--muted)' }}>{c.onboardedAt ? new Date(c.onboardedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) : '—'}</span></Td>
                  <Td><span style={{ color: 'var(--muted)' }}>{c.dormantDays} days</span></Td>
                  <Td><span style={{ color: 'var(--muted)' }} className="text-xs">{c.lastActivity ?? '—'}</span></Td>
                  <Td><Badge className={nudgeBadgeColor(c.nudgeStatus)}>{nudgeLabel(c.nudgeStatus)}</Badge></Td>
                  <Td><button className="text-xs px-2 py-1 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}><Eye size={12} /></button></Td>
                </TRow>
              ))}
            </tbody>
          </TableWrap>
          <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>Showing {s1Customers.length} of 644 records</p>
        </SectionCard>
      )}

      {/* S2 */}
      {tab === 'S2' && (
        <SectionCard>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <FilterPills
              options={[
                { value: 'all', label: 'All' },
                { value: 'sla_risk', label: 'SLA at risk' },
                { value: 'unassigned', label: 'Unassigned' },
              ]}
              active={s2Filter} onChange={setS2Filter} />
            <PrimaryButton small><UserPlus size={12} /> Bulk assign</PrimaryButton>
          </div>
          <TableWrap>
            <thead>
              <tr>
                <Th>Contact</Th>
                <Th>NIN status</Th>
                <Th>Drop-off stage</Th>
                <Th>Captured</Th>
                <Th>SLA remaining</Th>
                <Th>Agent</Th>
                <Th>WA nudge</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {s2Customers.map(c => {
                const agent = agents.find(a => a.id === c.assignedAgentId)
                return (
                  <TRow key={c.id} onClick={() => router.push(`/admin/customers/${c.id}`)}>
                    <Td>
                      <div className="font-medium text-white">{c.maskedPhone}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>{c.zone} · {c.gender}, {c.age}</div>
                    </Td>
                    <Td><Badge className={kycBadgeColor(c.kycMethod)}>{c.kycMethod}</Badge></Td>
                    <Td><span className="text-xs" style={{ color: 'var(--muted)' }}>{stageLabel(c.dropOffStage)}</span></Td>
                    <Td><span className="text-xs" style={{ color: 'var(--muted)' }}>{timeAgo(c.capturedAt)}</span></Td>
                    <Td>
                      {c.slaStatus === 'breach' ? (
                        <span className="text-xs font-semibold text-danger">BREACH</span>
                      ) : (
                        <div className="w-24">
                          <ProgressBar pct={c.slaPct ?? 0} showPct={false} />
                          <span className="text-xs mt-0.5 block" style={{ color: 'var(--muted)' }}>{c.slaHoursRemaining}h left</span>
                        </div>
                      )}
                    </Td>
                    <Td>
                      {agent ? (
                        <span className="text-xs text-white">{agent.name.split(' ')[0]} {agent.name.split(' ')[1][0]}.</span>
                      ) : (
                        <span className="text-xs text-danger">Unassigned</span>
                      )}
                    </Td>
                    <Td><Badge className={nudgeBadgeColor(c.nudgeStatus)}>{nudgeLabel(c.nudgeStatus)}</Badge></Td>
                    <Td>
                      <button className={cn('text-xs px-2 py-1 rounded-lg border transition-colors',
                        c.slaStatus === 'breach' || c.slaStatus === 'warning'
                          ? 'border-primary/30 text-primary hover:bg-primary/10'
                          : 'border-white/10 text-muted hover:bg-white/5')}
                        style={{ borderColor: c.slaStatus === 'breach' ? 'var(--danger)' : undefined, color: c.slaStatus === 'breach' ? 'var(--danger)' : undefined }}>
                        <Phone size={12} />
                      </button>
                    </Td>
                  </TRow>
                )
              })}
            </tbody>
          </TableWrap>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Showing {s2Customers.length} of 312 records ·{' '}
              <span className="text-danger font-medium">8 SLA breaches</span>
            </p>
          </div>
        </SectionCard>
      )}

      {/* S3 */}
      {tab === 'S3' && (
        <SectionCard>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <FilterPills
              options={[
                { value: 'all', label: 'All' },
                { value: 'push_not_sent', label: 'Push not sent' },
                { value: 'reopened', label: 'Re-opened app' },
              ]}
              active="all" onChange={() => {}} />
            <PrimaryButton small><Smartphone size={12} /> Send push batch</PrimaryButton>
          </div>
          <div className="mb-4 p-3 rounded-xl flex items-start gap-2 text-xs" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.12)', color: '#94a3b8' }}>
            <Smartphone size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            437 devices have the app installed but have not entered a phone number. No PII available — re-engagement is push notification only.
          </div>
          <TableWrap>
            <thead>
              <tr>
                <Th>Device ID</Th>
                <Th>Platform</Th>
                <Th>Installed</Th>
                <Th>Last opened</Th>
                <Th>Opens</Th>
                <Th>Push status</Th>
                <Th>Incentive shown</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {s3Devices.map(d => (
                <TRow key={d.id}>
                  <Td><span style={{ color: 'var(--muted)' }}>{d.deviceId}</span></Td>
                  <Td>
                    <span className="flex items-center gap-1.5 text-xs capitalize" style={{ color: 'var(--muted)' }}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', d.platform === 'ios' ? 'bg-blue-400' : 'bg-success')} />
                      {d.platform}
                    </span>
                  </Td>
                  <Td><span style={{ color: 'var(--muted)' }} className="text-xs">{timeAgo(d.installDate)}</span></Td>
                  <Td><span style={{ color: 'var(--muted)' }} className="text-xs">{timeAgo(d.lastOpened)}</span></Td>
                  <Td><span className="font-semibold text-white">{d.opens}</span></Td>
                  <Td><Badge className={nudgeBadgeColor(d.pushStatus)}>{nudgeLabel(d.pushStatus)}</Badge></Td>
                  <Td><span style={{ color: 'var(--muted)' }} className="text-xs">{d.incentiveShown}</span></Td>
                  <Td>
                    <button className="text-xs px-2 py-1 rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                      Push
                    </button>
                  </Td>
                </TRow>
              ))}
            </tbody>
          </TableWrap>
          <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>Showing {s3Devices.length} of 437 devices</p>
        </SectionCard>
      )}
    </div>
  )
}