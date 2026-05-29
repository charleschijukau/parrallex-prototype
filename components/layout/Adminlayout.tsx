'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDashboardStore } from '@/store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, GitBranch, Users, UserCheck, BarChart3,
  Sparkles, Megaphone, Bell, ShieldCheck, TrendingUp,
  Settings, FlaskConical, Menu, X, ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/pipeline', label: 'Pipeline', icon: GitBranch },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/agents', label: 'Agents', icon: UserCheck },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/admin/ai-insights', label: 'AI Insights', icon: Sparkles },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/simulator', label: 'Simulator', icon: FlaskConical },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, unreadCount } = useDashboardStore()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside
        className={cn(
          'desktop-sidebar flex flex-col flex-shrink-0 transition-all duration-300 border-r',
          'sticky top-0 h-screen overflow-y-auto',
          sidebarCollapsed ? 'w-[72px]' : 'w-[220px]'
        )}
        style={{ borderColor: 'var(--border)', background: 'rgba(16,38,61,0.96)' }}
      >
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-4 py-5 border-b', sidebarCollapsed && 'justify-center px-0')}
          style={{ borderColor: 'var(--border)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs"
            style={{ background: 'linear-gradient(135deg,#00d492,#00a978)', color: '#071521' }}>
            PX
          </div>
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-semibold text-white leading-none">Parallex</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>Back Office</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact)
            return (
              <Link key={href} href={href}
                className={cn(
                  'sidebar-item flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all',
                  sidebarCollapsed && 'justify-center px-2',
                  active ? 'active text-white' : 'text-muted hover:text-white'
                )}>
                <Icon size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && <span>{label}</span>}
                {!sidebarCollapsed && label === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--danger)', color: 'white' }}>
                    {unreadCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 pb-4">
          <button onClick={toggleSidebar}
            className={cn('w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white/5',
              sidebarCollapsed && 'justify-center')}
            style={{ color: 'var(--muted)' }}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <><Menu size={16} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b"
          style={{ borderColor: 'var(--border)', background: 'rgba(7,21,33,0.92)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ background: 'rgba(0,212,146,0.1)', color: 'var(--primary)' }}>
              CRM · Prototype
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
            <div className="flex items-center gap-1.5">
              <span className="live-dot w-2 h-2" />
              <span className="text-xs">Live · 28 May 2026 · 09:41 WAT</span>
            </div>
            <Link href="/admin/notifications" className="relative">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold rounded-full"
                  style={{ background: 'var(--danger)', color: 'white' }}>
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold"
              style={{ background: 'rgba(0,212,146,0.15)', color: 'var(--primary)' }}>
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}