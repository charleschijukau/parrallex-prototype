'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDashboardStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, GitBranch, Users, UserCheck, BarChart3,
  Sparkles, Megaphone, Bell, ShieldCheck, TrendingUp,
  Settings, FlaskConical, ChevronLeft, ChevronRight
} from 'lucide-react'
import NotificationDrawer from '@/components/shared/NotificationDrawer'

const navItems = [
  { href: '/admin',              label: 'Overview',      icon: LayoutDashboard, exact: true },
  { href: '/admin/pipeline',     label: 'Pipeline',      icon: GitBranch },
  { href: '/admin/customers',    label: 'Customers',     icon: Users },
  { href: '/admin/agents',       label: 'Agents',        icon: UserCheck },
  { href: '/admin/campaigns',    label: 'Campaigns',     icon: Megaphone },
  { href: '/admin/analytics',    label: 'Analytics',     icon: TrendingUp },
  { href: '/admin/ai-insights',  label: 'AI Insights',   icon: Sparkles },
  { href: '/admin/reports',      label: 'Reports',       icon: BarChart3 },
  { href: '/admin/compliance',   label: 'Compliance',    icon: ShieldCheck },
  { href: '/admin/notifications',label: 'Notifications', icon: Bell },
  { href: '/admin/simulator',    label: 'Simulator',     icon: FlaskConical },
  { href: '/admin/settings',     label: 'Settings',      icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, unreadCount } = useDashboardStore()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarCollapsed ? 68 : 212,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'width 0.28s cubic-bezier(0.22,1,0.36,1)',
        background: 'linear-gradient(180deg, rgba(18,21,80,0.98) 0%, rgba(7,9,31,0.99) 100%)',
        borderRight: '1px solid var(--border)',
        zIndex: 20,
      }}>
        {/* Logo */}
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          padding: sidebarCollapsed ? '20px 0' : '20px 16px',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid var(--border)',
        }}>
          {/* Logo mark — Parallex P circle */}
          <div style={{
            width:34, height:34, borderRadius:10, flexShrink:0,
            background:'linear-gradient(135deg, var(--px-blue-700), var(--px-blue-500))',
            border:'1.5px solid var(--border-gold)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:800, fontSize:15, color:'var(--px-gold-400)',
            boxShadow:'0 4px 14px rgba(27,32,135,0.45)',
            letterSpacing:'-0.02em',
          }}>P</div>
          {!sidebarCollapsed && (
            <div style={{ overflow:'hidden' }}>
              <p style={{ fontSize:13, fontWeight:700, color:'white', lineHeight:1.1, whiteSpace:'nowrap' }}>Parallex Bank</p>
              <p style={{ fontSize:10, color:'var(--muted)', marginTop:2, letterSpacing:'0.04em' }}>BACK OFFICE</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'10px 8px', display:'flex', flexDirection:'column', gap:2 }}>
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact)
            return (
              <Link key={href} href={href}
                className={cn('sidebar-item', active && 'active')}
                style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start', paddingLeft: sidebarCollapsed ? 0 : 12 }}
                title={sidebarCollapsed ? label : undefined}>
                <div style={{ position:'relative', flexShrink:0 }}>
                  <Icon size={17} />
                  {label === 'Notifications' && unreadCount > 0 && (
                    <span style={{
                      position:'absolute', top:-5, right:-5,
                      width:14, height:14, borderRadius:'50%',
                      background:'var(--danger)', color:'white',
                      fontSize:8, fontWeight:700,
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>{unreadCount}</span>
                  )}
                </div>
                {!sidebarCollapsed && <span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{label}</span>}
                {!sidebarCollapsed && label === 'Notifications' && unreadCount > 0 && (
                  <span style={{
                    marginLeft:'auto', fontSize:10, fontWeight:700,
                    padding:'2px 6px', borderRadius:999,
                    background:'var(--danger)', color:'white',
                  }}>{unreadCount}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse btn */}
        <div style={{ padding:'8px', borderTop:'1px solid var(--border)' }}>
          <button onClick={toggleSidebar}
            style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-end',
              gap:6, padding:'8px 12px', borderRadius:'var(--radius-md)',
              background:'transparent', color:'var(--muted)', fontSize:12,
              transition:'background 0.18s, color 0.18s', cursor:'pointer', border:'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'white' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}>
            {sidebarCollapsed ? <ChevronRight size={15} /> : <><span>Collapse</span><ChevronLeft size={15} /></>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Topbar */}
        <header style={{
          position:'sticky', top:0, zIndex:10,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 24px', height:56,
          background:'rgba(7,9,31,0.92)', backdropFilter:'blur(16px)',
          borderBottom:'1px solid var(--border)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, letterSpacing:'0.05em',
              background:'var(--px-gold-a08)', color:'var(--px-gold-400)', border:'1px solid var(--border-gold)' }}>
              PROTOTYPE · DEMO
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:12, color:'var(--muted)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span className="live-dot" style={{ width:6, height:6 }} />
              <span style={{ fontSize:11 }}>Live · 28 May 2026 · 09:41 WAT</span>
            </div>
            <NotificationBell />
            <div style={{
              width:30, height:30, borderRadius:'50%',
              background:'var(--px-blue-a20)', border:'1px solid var(--border-blue)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:11, fontWeight:700, color:'#9BA8F0',
            }}>AD</div>
          </div>
        </header>

        <main style={{ flex:1, padding:24, overflowY:'auto' }}>
          {children}
        </main>
      </div>

      <NotificationDrawer />
    </div>
  )
}

function NotificationBell() {
  const { unreadCount, setActiveNotification, notifications } = useDashboardStore()
  return (
    <button onClick={() => setActiveNotification(notifications[0])}
      style={{ position:'relative', background:'none', border:'none', cursor:'pointer', color:'var(--muted)', padding:4 }}
      title="Notifications">
      <Bell size={17} />
      {unreadCount > 0 && (
        <span style={{
          position:'absolute', top:-2, right:-2,
          width:16, height:16, borderRadius:'50%',
          background:'var(--danger)', color:'white',
          fontSize:9, fontWeight:700,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>{unreadCount}</span>
      )}
    </button>
  )
}
