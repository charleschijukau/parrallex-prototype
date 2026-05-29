'use client'
import { useDashboardStore } from '@/store'
import { SectionCard, SectionHeader, PrimaryButton } from '@/components/shared/ui'
import { cn, timeAgo } from '@/lib/utils'
import { Bell, AlertTriangle, CheckCircle, Info, Megaphone, TrendingUp } from 'lucide-react'
import type { NotificationType } from '@/types'

const typeIcon: Record<NotificationType, React.ElementType> = {
  sla_breach: AlertTriangle,
  flag: AlertTriangle,
  campaign: Megaphone,
  system: Info,
  conversion: TrendingUp,
}

const severityStyles = {
  danger: { bg: 'rgba(255,107,107,0.06)', border: 'rgba(255,107,107,0.12)', dot: 'bg-danger' },
  warning: { bg: 'rgba(255,184,77,0.06)', border: 'rgba(255,184,77,0.12)', dot: 'bg-warning' },
  success: { bg: 'rgba(0,212,146,0.06)', border: 'rgba(0,212,146,0.12)', dot: 'bg-success' },
  info: { bg: 'rgba(56,189,248,0.06)', border: 'rgba(56,189,248,0.12)', dot: 'bg-blue-400' },
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markRead } = useDashboardStore()

  return (
    <div className="space-y-5 fade-up max-w-2xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-white" />
            <h1 className="text-xl font-semibold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--danger)', color: 'white' }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>System alerts, SLA breaches, and campaign updates</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs transition-opacity hover:opacity-80" style={{ color: 'var(--primary)' }}>
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const style = severityStyles[n.severity]
          const Icon = typeIcon[n.type]
          return (
            <div key={n.id}
              className={cn('p-4 rounded-2xl border cursor-pointer transition-all hover:opacity-90', !n.read && 'ring-1')}
              style={{
                background: n.read ? 'rgba(16,38,61,0.5)' : style.bg,
                borderColor: n.read ? 'var(--border)' : style.border,
                ringColor: n.read ? 'transparent' : style.border,
              }}
              onClick={() => markRead(n.id)}>
              <div className="flex items-start gap-3">
                <div className={cn('w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5')}
                  style={{ background: style.bg, border: `1px solid ${style.border}` }}>
                  <Icon size={13} className={`${style.dot.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-medium', n.read ? 'text-muted' : 'text-white')}>{n.title}</p>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>{timeAgo(n.timestamp)}</span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--muted)' }}>{n.body}</p>
                </div>
                {!n.read && <span className={cn('w-2 h-2 rounded-full flex-shrink-0 mt-1.5', style.dot)} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}