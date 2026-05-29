'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { getCustomerById, getAgentById } from '@/mock/data'
import { SectionCard, SectionHeader, Badge, ProgressBar, PrimaryButton, GhostButton } from '@/components/shared/ui'
import { cn, kycBadgeColor, scenarioBadgeColor, statusBadgeColor, nudgeBadgeColor, nudgeLabel, stageLabel, formatDate, timeAgo } from '@/lib/utils'
import { ArrowLeft, Phone, MessageCircle, AlertTriangle, ShieldCheck, User } from 'lucide-react'

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const customer = getCustomerById(id)

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-white text-lg">Customer not found</p>
        <GhostButton onClick={() => router.back()}><ArrowLeft size={14} /> Back</GhostButton>
      </div>
    )
  }

  const agent = customer.assignedAgentId ? getAgentById(customer.assignedAgentId) : null

  return (
    <div className="space-y-5 fade-up max-w-3xl">
      <div className="flex items-center gap-3">
        <GhostButton small onClick={() => router.back()}><ArrowLeft size={13} /></GhostButton>
        <div>
          <h1 className="text-xl font-semibold text-white">{customer.name !== 'Unknown' ? customer.name : customer.maskedPhone}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={scenarioBadgeColor(customer.scenario)}>{customer.scenario}</Badge>
            <Badge className={statusBadgeColor(customer.status)}>{customer.status}</Badge>
            {customer.flags.length > 0 && <Badge className="bg-warning/10 text-warning border border-warning/20"><AlertTriangle size={10} /> {customer.flags.length} flag</Badge>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identity */}
        <SectionCard>
          <SectionHeader title="Identity & KYC" />
          <div className="space-y-3">
            {[
              { label: 'Phone', value: customer.maskedPhone },
              { label: 'Gender', value: customer.gender === 'M' ? 'Male' : 'Female' },
              { label: 'Age', value: `${customer.age} yrs` },
              { label: 'Zone', value: customer.zone },
              { label: 'KYC method', value: <Badge className={kycBadgeColor(customer.kycMethod)}>{customer.kycMethod}</Badge> },
              { label: 'KYC tier', value: `Tier ${customer.kycTier}` },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>{row.label}</span>
                <span className="text-sm text-white font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Journey */}
        <SectionCard>
          <SectionHeader title="Journey" />
          <div className="space-y-3">
            {[
              { label: 'Captured', value: timeAgo(customer.capturedAt) },
              { label: 'Onboarded', value: customer.onboardedAt ? timeAgo(customer.onboardedAt) : '—' },
              { label: 'Drop-off stage', value: stageLabel(customer.dropOffStage) },
              { label: 'Dormant days', value: customer.dormantDays != null ? `${customer.dormantDays} days` : '—' },
              { label: 'Last activity', value: customer.lastActivity ?? '—' },
              { label: 'First transaction', value: customer.firstTransactionAt ? timeAgo(customer.firstTransactionAt) : 'Not yet' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>{row.label}</span>
                <span className="text-sm text-white font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CRM / SLA */}
        <SectionCard>
          <SectionHeader title="CRM assignment" />
          {agent ? (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                style={{ background: 'rgba(0,212,146,0.15)', color: 'var(--primary)' }}>
                {agent.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{agent.name}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{agent.zone}</p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 rounded-xl text-xs text-danger" style={{ background: 'rgba(255,107,107,0.06)', border: '1px solid rgba(255,107,107,0.12)' }}>
              Not yet assigned — SLA timer running
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span style={{ color: 'var(--muted)' }}>SLA status</span>
              <span className={cn('font-medium',
                customer.slaStatus === 'ok' ? 'text-success' :
                  customer.slaStatus === 'warning' ? 'text-warning' :
                    customer.slaStatus === 'breach' ? 'text-danger' : 'text-muted')}>
                {customer.slaStatus ?? '—'}
              </span>
            </div>
            {customer.slaPct != null && <ProgressBar pct={customer.slaPct} />}
          </div>
          <div className="flex gap-2 mt-4">
            <PrimaryButton small><Phone size={12} /> Call now</PrimaryButton>
            <GhostButton small><MessageCircle size={12} /> WhatsApp</GhostButton>
          </div>
        </SectionCard>

        {/* Nudge / engagement */}
        <SectionCard>
          <SectionHeader title="Nudge & engagement" />
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>Nudge status</span>
              <Badge className={nudgeBadgeColor(customer.nudgeStatus)}>{nudgeLabel(customer.nudgeStatus)}</Badge>
            </div>
          </div>
          {customer.flags.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-white mb-2">Compliance flags</p>
              {customer.flags.map((f, i) => (
                <div key={i} className="p-3 rounded-xl mb-2 text-xs" style={{ background: 'rgba(255,184,77,0.06)', border: '1px solid rgba(255,184,77,0.12)' }}>
                  <div className="flex items-center gap-1.5 mb-1 text-warning font-medium">
                    <AlertTriangle size={11} />
                    {f.type.replace(/_/g, ' ')}
                  </div>
                  <p style={{ color: 'var(--muted)' }}>{f.note}</p>
                  {f.resolvedAt && <p className="text-success mt-1">Resolved {timeAgo(f.resolvedAt)}</p>}
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}