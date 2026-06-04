'use client'
import { useState } from 'react'
import { SectionCard, SectionHeader, StatCard, TableWrap, Th, Td, TRow, Badge, FilterPills, PrimaryButton } from '@/components/shared/ui'
import { AlertTriangle, ShieldCheck, Users, FileText, CheckCircle, Clock } from 'lucide-react'
import { allCustomers } from '@/mock/data'
import { timeAgo } from '@/lib/utils'

const flagSummary = [
  { label:'Address discrepancy',  count:43, severity:'medium', icon:FileText,     desc:'NIN address differs from customer-entered address. Resolved at first transaction above tier threshold.' },
  { label:'NIN name mismatch',    count:11, severity:'high',   icon:AlertTriangle, desc:'NIN name does not match existing bank record. KYC remediation team notified. Account tradeable under tier limits.' },
  { label:'BVN-NIN not linked',   count:19, severity:'medium', icon:Users,         desc:'Customer\'s BVN and NIN appear unlinked. Customer guided to NIMC reconciliation. Transaction restrictions applied.' },
  { label:'SLA breach',           count:8,  severity:'high',   icon:Clock,         desc:'8 S2 records not contacted within the 6-hour SLA window. Immediate agent assignment required.' },
  { label:'Manual KYC pending',   count:28, severity:'low',    icon:ShieldCheck,   desc:'NIN and BVN lookup both failed. Customer entered manually. Account pending verification, tier 1 limits applied.' },
]

const consentLog = [
  { id:'c001', phone:'+234 803 *** 4421', whatsapp:true,  marketing:false, timestamp:'2026-05-24T08:12:00Z', ip:'197.211.x.x' },
  { id:'c002', phone:'+234 706 *** 8813', whatsapp:true,  marketing:true,  timestamp:'2026-05-22T14:33:00Z', ip:'197.210.x.x' },
  { id:'c003', phone:'+234 902 *** 2200', whatsapp:true,  marketing:false, timestamp:'2026-05-26T09:01:00Z', ip:'41.58.x.x'   },
  { id:'c101', phone:'+234 803 *** 5592', whatsapp:true,  marketing:false, timestamp:'2026-05-28T07:12:00Z', ip:'197.211.x.x' },
  { id:'c102', phone:'+234 706 *** 1134', whatsapp:true,  marketing:true,  timestamp:'2026-05-27T18:44:00Z', ip:'105.113.x.x' },
]

const severityColor: Record<string, { badge: string; row: string }> = {
  high:   { badge:'badge badge-danger',  row:'flag-high'   },
  medium: { badge:'badge badge-warning', row:'flag-medium'  },
  low:    { badge:'badge badge-info',    row:'flag-low'     },
}

export default function CompliancePage() {
  const [tab, setTab] = useState<'flags'|'consent'|'kyc'>('flags')
  const flagged = allCustomers.filter(c => c.flags.length > 0)

  return (
    <div className="fade-up" style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:'white' }}>Compliance</h1>
          <p style={{ fontSize:13, color:'var(--muted)', marginTop:4 }}>Progressive KYC flags, NDPR consent audit, and KYC queue management.</p>
        </div>
        <button className="ghost-button" style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', fontSize:13 }}>
          <FileText size={14} /> Export compliance report
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <StatCard label="Total flags open"     value={flagSummary.reduce((s,f) => s+f.count,0)} accent="red"   icon={<AlertTriangle size={15}/>} />
        <StatCard label="High severity"         value={flagSummary.filter(f=>f.severity==='high').reduce((s,f)=>s+f.count,0)} accent="red" delta="Requires immediate action" />
        <StatCard label="Consent records"       value="847"  accent="blue"  delta="100% of onboarded accounts" deltaUp />
        <StatCard label="KYC tier 1 accounts"  value="312"  accent="gold"  delta="Transaction limits applied" />
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border)', paddingBottom:0 }}>
        {(['flags','consent','kyc'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding:'9px 18px', fontSize:13, fontWeight:600, cursor:'pointer',
              background:'none', border:'none', borderBottom:`2px solid ${tab===t ? 'var(--px-gold-400)' : 'transparent'}`,
              color: tab===t ? 'white' : 'var(--muted)', marginBottom:-1, textTransform:'capitalize',
              transition:'color 0.18s, border-color 0.18s',
            }}>
            {t === 'kyc' ? 'KYC Queue' : t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {/* Flags tab */}
      {tab === 'flags' && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {flagSummary.map(f => {
            const Icon = f.icon
            const col = severityColor[f.severity]
            return (
              <div key={f.label} className={`flag-row ${col.row}`} style={{ justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12, flex:1 }}>
                  <div style={{ width:36, height:36, borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:'rgba(255,255,255,0.04)' }}>
                    <Icon size={16} style={{ color: f.severity === 'high' ? 'var(--danger)' : f.severity === 'medium' ? 'var(--warning)' : 'var(--info)' }} />
                  </div>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <p style={{ fontSize:14, fontWeight:600, color:'white' }}>{f.label}</p>
                      <span className={col.badge}>{f.severity}</span>
                    </div>
                    <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.6, maxWidth:520 }}>{f.desc}</p>
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontSize:22, fontWeight:700, color: f.severity==='high' ? 'var(--danger)' : f.severity==='medium' ? 'var(--warning)' : 'var(--info)' }}>{f.count}</p>
                  <p style={{ fontSize:11, color:'var(--muted)' }}>records</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Consent audit */}
      {tab === 'consent' && (
        <SectionCard>
          <SectionHeader title="NDPR consent records" subtitle="Timestamped consent for all onboarded accounts — auditable trail" />
          <div style={{ marginBottom:14, padding:'10px 14px', borderRadius:'var(--radius-md)', background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.15)', fontSize:12, color:'var(--muted)', display:'flex', alignItems:'center', gap:8 }}>
            <CheckCircle size={14} style={{ color:'var(--success)', flexShrink:0 }} />
            All 847 onboarded accounts have a timestamped, individually-toggled consent record stored. This constitutes the NDPR audit trail.
          </div>
          <TableWrap>
            <thead><tr>
              <Th>Phone</Th>
              <Th>WhatsApp & service comms</Th>
              <Th>Marketing comms</Th>
              <Th>Consented at</Th>
              <Th>IP (masked)</Th>
            </tr></thead>
            <tbody>
              {consentLog.map(c => (
                <TRow key={c.id}>
                  <Td><span style={{ color:'white', fontWeight:500 }}>{c.phone}</span></Td>
                  <Td><span className={c.whatsapp ? 'badge badge-success' : 'badge badge-danger'}>{c.whatsapp ? 'Accepted' : 'Declined'}</span></Td>
                  <Td><span className={c.marketing ? 'badge badge-success' : 'badge badge-muted'}>{c.marketing ? 'Accepted' : 'Declined'}</span></Td>
                  <Td><span style={{ color:'var(--muted)', fontSize:12 }}>{timeAgo(c.timestamp)}</span></Td>
                  <Td><span style={{ color:'var(--muted)', fontSize:12, fontFamily:'monospace' }}>{c.ip}</span></Td>
                </TRow>
              ))}
            </tbody>
          </TableWrap>
          <p style={{ fontSize:12, color:'var(--muted)', marginTop:12 }}>Showing 5 of 847 records</p>
        </SectionCard>
      )}

      {/* KYC Queue */}
      {tab === 'kyc' && (
        <SectionCard>
          <SectionHeader title="KYC remediation queue" subtitle="Accounts with unresolved flags requiring manual review" />
          <TableWrap>
            <thead><tr>
              <Th>Customer / contact</Th>
              <Th>Flag type</Th>
              <Th>KYC method</Th>
              <Th>Captured</Th>
              <Th>Note</Th>
              <Th>Action</Th>
            </tr></thead>
            <tbody>
              {flagged.map(c => c.flags.map((f,fi) => (
                <TRow key={`${c.id}-${fi}`}>
                  <Td>
                    <div style={{ fontWeight:500, color:'white', fontSize:13 }}>{c.name !== 'Unknown' ? c.name : c.maskedPhone}</div>
                    <div style={{ fontSize:11, color:'var(--muted)' }}>{c.zone}</div>
                  </Td>
                  <Td>
                    <span className={f.type === 'manual_kyc' ? 'badge badge-danger' : 'badge badge-warning'}>
                      {f.type.replace(/_/g,' ')}
                    </span>
                  </Td>
                  <Td><span className={c.kycMethod === 'NIN' ? 'badge badge-purple' : c.kycMethod === 'BVN' ? 'badge badge-gold' : 'badge badge-danger'}>{c.kycMethod}</span></Td>
                  <Td><span style={{ fontSize:12, color:'var(--muted)' }}>{timeAgo(c.capturedAt)}</span></Td>
                  <Td><span style={{ fontSize:11, color:'var(--muted)', maxWidth:180, display:'block' }}>{f.note}</span></Td>
                  <Td>
                    <button className="fintech-button" style={{ padding:'5px 12px', fontSize:11 }}>Resolve</button>
                  </Td>
                </TRow>
              )))}
            </tbody>
          </TableWrap>
        </SectionCard>
      )}
    </div>
  )
}