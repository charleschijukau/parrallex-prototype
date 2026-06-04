'use client'
import { useDashboardStore } from '@/store'
import { timeAgo } from '@/lib/utils'
import { Bell, AlertTriangle, TrendingUp, Info, Megaphone, Clock } from 'lucide-react'
import { SectionCard, SectionHeader } from '@/components/shared/ui'
import type { NotificationType, Notification } from '@/types'

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  sla_breach: { icon: Clock,        color:'var(--danger)',  bg:'rgba(239,68,68,0.08)',  border:'rgba(239,68,68,0.18)' },
  flag:       { icon: AlertTriangle, color:'var(--warning)', bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.18)' },
  campaign:   { icon: Megaphone,    color:'#9BA8F0',         bg:'rgba(45,56,196,0.08)',  border:'rgba(45,56,196,0.20)' },
  system:     { icon: Info,         color:'var(--muted)',    bg:'rgba(136,144,200,0.08)',border:'rgba(136,144,200,0.15)' },
  conversion: { icon: TrendingUp,   color:'var(--success)', bg:'rgba(34,197,94,0.08)',  border:'rgba(34,197,94,0.18)' },
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markRead, setActiveNotification } = useDashboardStore()

  const handleClick = (n: Notification) => {
    markRead(n.id)
    setActiveNotification(n)
  }

  return (
    <div className="fade-up" style={{ maxWidth: 680 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <Bell size={20} style={{ color:'var(--px-gold-400)' }} />
            <h1 style={{ fontSize:22, fontWeight:700, color:'white' }}>Notifications</h1>
            {unreadCount > 0 && (
              <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'var(--danger)', color:'white' }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <p style={{ fontSize:13, color:'var(--muted)' }}>Click any notification to view full details and recommended actions.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            style={{ fontSize:12, fontWeight:600, color:'var(--px-gold-400)', background:'none', border:'none', cursor:'pointer', padding:'4px 0' }}>
            Mark all read
          </button>
        )}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {notifications.map(n => {
          const cfg = typeConfig[n.type]
          const Icon = cfg.icon
          return (
            <button key={n.id} onClick={() => handleClick(n)}
              style={{
                display:'flex', alignItems:'flex-start', gap:14,
                padding:'16px 18px', borderRadius:'var(--radius-lg)',
                border:`1px solid ${!n.read ? cfg.border : 'var(--border)'}`,
                background: !n.read ? cfg.bg : 'rgba(18,21,80,0.50)',
                cursor:'pointer', textAlign:'left', width:'100%',
                transition:'border-color 0.18s, transform 0.18s, background 0.18s',
                boxShadow: !n.read ? `0 2px 12px ${cfg.bg}` : 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.borderColor = cfg.border }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = !n.read ? cfg.border : 'var(--border)' }}>

              <div style={{ width:36, height:36, borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background: cfg.bg, border:`1px solid ${cfg.border}` }}>
                <Icon size={16} style={{ color: cfg.color }} />
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:4 }}>
                  <p style={{ fontSize:14, fontWeight: n.read ? 500 : 700, color: n.read ? 'var(--muted)' : 'white', lineHeight:1.3 }}>{n.title}</p>
                  <span style={{ fontSize:11, color:'var(--muted)', flexShrink:0, marginTop:1 }}>{timeAgo(n.timestamp)}</span>
                </div>
                <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.6 }}>{n.body}</p>
                <p style={{ fontSize:11, color:'var(--px-gold-400)', marginTop:6, fontWeight:600 }}>Click to view details →</p>
              </div>

              {!n.read && <span style={{ width:8, height:8, borderRadius:'50%', background:cfg.color, flexShrink:0, marginTop:4 }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}