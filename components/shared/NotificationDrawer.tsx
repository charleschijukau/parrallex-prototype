'use client'
import { useDashboardStore } from '@/store'
import { X, AlertTriangle, TrendingUp, Info, Megaphone, ShieldAlert, Clock, CheckCircle } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import type { Notification, NotificationType } from '@/types'

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  sla_breach: { icon: Clock,        color:'var(--danger)',  bg:'rgba(239,68,68,0.08)',  border:'rgba(239,68,68,0.18)' },
  flag:       { icon: AlertTriangle, color:'var(--warning)', bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.18)' },
  campaign:   { icon: Megaphone,    color:'#9BA8F0',         bg:'rgba(45,56,196,0.08)',  border:'rgba(45,56,196,0.20)' },
  system:     { icon: Info,         color:'var(--muted)',    bg:'rgba(136,144,200,0.08)',border:'rgba(136,144,200,0.15)' },
  conversion: { icon: TrendingUp,   color:'var(--success)', bg:'rgba(34,197,94,0.08)',  border:'rgba(34,197,94,0.18)' },
}

const detailCopy: Record<string, { headline: string; details: string; action: string }> = {
  n001: {
    headline: 'SLA Breach — Immediate Action Required',
    details: '8 pending accounts have not been contacted within the 6-hour SLA window. The CRM SLA timer has elapsed for these records. Customer data is fully captured in the system; the only outstanding step is agent contact. Leaving these unresolved reduces the probability of onboarding completion by an estimated 40%.',
    action: 'Go to Pipeline → S2 → filter by "SLA at risk" to see all affected records. Assign to available agents Babajide Ige (55% capacity) or Rukayat Olusanya (45% capacity).',
  },
  n002: {
    headline: '67 Conversions — Above Target',
    details: '67 S2 (incomplete onboarding) accounts were successfully converted to completed accounts today by the agent team, representing a 12% improvement over yesterday\'s 60 conversions. Chiamaka Obi (South-East zone) led with 12 conversions, above her daily average of 8.',
    action: 'Review agent performance in the Agents page. Consider redistributing records from lower-performing zones to high-conversion agents.',
  },
  n003: {
    headline: 'NIN Name Mismatch — KYC Remediation Required',
    details: '11 accounts have been flagged because the name on the customer\'s NIN record does not match an existing bank record. Per the progressive KYC framework, onboarding has not been blocked — accounts are created and trading normally under tier limits. The KYC remediation team has been notified automatically.',
    action: 'Go to Compliance → NIN Mismatch queue to review all 11 records. Each requires manual KYC team resolution before the tier restriction is lifted.',
  },
  n004: {
    headline: 'Campaign Nudge Batch Delivered',
    details: 'The "Complete your setup" WhatsApp nudge campaign successfully delivered to 201 of 312 S2 accounts (64.4% delivery rate). The remaining 111 had DND filters active on their primary number — SMS fallback was triggered for 78 of those, with a 61% delivery rate. 33 remain uncontacted.',
    action: 'Review uncontacted S2 records in the Pipeline. Consider scheduling a voice OTP for persistent DND cases.',
  },
  n005: {
    headline: 'NIN API — System Healthy',
    details: 'The NIMC NIN API is performing normally today with 99.2% uptime. 2 timeout events occurred at 06:14 and 07:33 WAT; both triggered automatic retry logic and resolved on the second attempt. No customer journeys were blocked. BVN fallback was not required for any of the retry cases.',
    action: 'No action required. Monitor API status in Settings → Integrations.',
  },
  n006: {
    headline: 'Agent SLA Compliance at Risk',
    details: 'Agent Tunde Afolabi (Abuja Zone) has SLA compliance at 76%, below the 85% bank threshold. He currently has 29 of 40 capacity records assigned. Analysis shows 8 records are within 2 hours of SLA breach. The system has not yet auto-reassigned because reassignment requires supervisor approval per the current configuration.',
    action: 'Go to Agents → Tunde Afolabi → Reassign 8 at-risk records to Babajide Ige or Rukayat Olusanya. Or update Settings → CRM → Auto-Reassign Threshold to allow automatic handling.',
  },
}

export default function NotificationDrawer() {
  const { activeNotification, setActiveNotification, markRead, notifications } = useDashboardStore()

  if (!activeNotification) return null

  const cfg = typeConfig[activeNotification.type]
  const Icon = cfg.icon
  const detail = detailCopy[activeNotification.id] ?? { headline: activeNotification.title, details: activeNotification.body, action: 'Review in the relevant section of the back office.' }

  const idx = notifications.findIndex(n => n.id === activeNotification.id)
  const prev = idx > 0 ? notifications[idx - 1] : null
  const next = idx < notifications.length - 1 ? notifications[idx + 1] : null

  const open = (n: Notification) => { markRead(n.id); setActiveNotification(n) }

  return (
    <>
      {/* Overlay */}
      <div className="notif-drawer-overlay fade-in" onClick={() => setActiveNotification(null)} />

      {/* Drawer */}
      <div className="notif-drawer">
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background: cfg.bg, border:`1px solid ${cfg.border}` }}>
              <Icon size={15} style={{ color: cfg.color }} />
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--muted)' }}>Notification Detail</p>
              <p style={{ fontSize:11, color:'var(--muted-dark)', marginTop:1 }}>{timeAgo(activeNotification.timestamp)}</p>
            </div>
          </div>
          <button onClick={() => setActiveNotification(null)}
            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:6, cursor:'pointer', color:'var(--muted)', display:'flex', alignItems:'center' }}>
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding:'24px' }}>
          {/* Severity */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:999, marginBottom:16, background: cfg.bg, border:`1px solid ${cfg.border}`, color: cfg.color, letterSpacing:'0.05em', textTransform:'uppercase' }}>
            <Icon size={11} />
            {activeNotification.severity.toUpperCase()}
          </div>

          <h2 style={{ fontSize:17, fontWeight:700, color:'white', marginBottom:12, lineHeight:1.35 }}>{detail.headline}</h2>

          <p style={{ fontSize:13, color:'var(--text-secondary, #C8CEED)', lineHeight:1.75, marginBottom:20 }}>{detail.details}</p>

          {/* Recommended action */}
          <div style={{ padding:'16px', borderRadius:'var(--radius-md)', background:'var(--px-gold-a08)', border:'1px solid var(--border-gold)', marginBottom:24 }}>
            <p style={{ fontSize:11, fontWeight:700, color:'var(--px-gold-400)', marginBottom:6, letterSpacing:'0.05em', textTransform:'uppercase' }}>Recommended action</p>
            <p style={{ fontSize:13, color:'var(--text-secondary, #C8CEED)', lineHeight:1.65 }}>{detail.action}</p>
          </div>

          {/* Mark read button */}
          {!activeNotification.read && (
            <button onClick={() => markRead(activeNotification.id)}
              className="fintech-button"
              style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 20px', fontSize:13, marginBottom:24, width:'100%', justifyContent:'center' }}>
              <CheckCircle size={14} /> Mark as read
            </button>
          )}

          {/* Nav between notifications */}
          {(prev || next) && (
            <div>
              <p style={{ fontSize:11, fontWeight:600, color:'var(--muted)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.06em' }}>Other notifications</p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[prev, next].filter(Boolean).map(n => {
                  const c2 = typeConfig[n!.type]; const I2 = c2.icon
                  return (
                    <button key={n!.id} onClick={() => open(n!)}
                      style={{
                        display:'flex', alignItems:'flex-start', gap:10, padding:'12px 14px',
                        borderRadius:'var(--radius-md)', border:`1px solid ${n!.id === activeNotification.id ? 'var(--border-gold)' : 'var(--border)'}`,
                        background: n!.read ? 'rgba(255,255,255,0.02)' : c2.bg,
                        cursor:'pointer', textAlign:'left', transition:'border-color 0.2s',
                      }}>
                      <I2 size={13} style={{ color: c2.color, flexShrink:0, marginTop:2 }} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:12, fontWeight:600, color:'white', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n!.title}</p>
                        <p style={{ fontSize:11, color:'var(--muted)' }}>{timeAgo(n!.timestamp)}</p>
                      </div>
                      {!n!.read && <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--danger)', flexShrink:0, marginTop:4 }} />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}