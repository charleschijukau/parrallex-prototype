'use client'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── Section Card ─────────────────────────────────────────────────────
export function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('section-card', className)}>
      {children}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  delta?: string
  deltaUp?: boolean
  icon?: ReactNode
  accent?: 'green' | 'gold' | 'blue' | 'red'
}

const accentMap = {
  green: 'rgba(0,212,146,0.12)',
  gold: 'rgba(212,168,79,0.12)',
  blue: 'rgba(56,189,248,0.12)',
  red: 'rgba(255,107,107,0.12)',
}

export function StatCard({ label, value, delta, deltaUp, icon, accent = 'green' }: StatCardProps) {
  return (
    <div className="metric-card section-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: accentMap[accent], pointerEvents: 'none', borderRadius: 'inherit' }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{label}</p>
          {icon && <div className="opacity-60">{icon}</div>}
        </div>
        <p className="text-2xl font-semibold text-white">{value}</p>
        {delta && (
          <p className={cn('text-xs mt-1', deltaUp ? 'text-success' : 'text-danger')}>
            {delta}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────
export function Badge({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', className)} style={style}>
      {children}
    </span>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────
interface ProgressBarProps {
  pct: number
  color?: string
  height?: number
  showPct?: boolean
}

export function ProgressBar({ pct, color, height = 4, showPct = true }: ProgressBarProps) {
  const safe = Math.min(100, Math.max(0, pct))
  const bg = color ?? (safe >= 70 ? '#00d492' : safe >= 40 ? '#ffb84d' : '#ff6b6b')
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-full overflow-hidden" style={{ height, background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${safe}%`, background: bg }} />
      </div>
      {showPct && <span className="text-xs w-8 text-right" style={{ color: 'var(--muted)' }}>{Math.round(safe)}%</span>}
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ─── Table wrapper ────────────────────────────────────────────────────
export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  )
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th className={cn('px-4 py-3 text-left text-xs font-medium border-b whitespace-nowrap', className)}
      style={{ color: 'var(--muted)', borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' }}>
      {children}
    </th>
  )
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn('px-4 py-3 border-b align-middle', className)}
      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
      {children}
    </td>
  )
}

export function TRow({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <tr onClick={onClick}
      className={cn('transition-colors', onClick && 'cursor-pointer', className)}
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={e => { if (onClick) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
      onMouseLeave={e => { if (onClick) (e.currentTarget as HTMLElement).style.background = '' }}>
      {children}
    </tr>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-sm" style={{ color: 'var(--muted)' }}>{message}</p>
    </div>
  )
}

// ─── Filter pill row ──────────────────────────────────────────────────
export function FilterPills({ options, active, onChange }: {
  options: { value: string; label: string }[]
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)}
          className={cn('px-3 py-1 rounded-full text-xs font-medium transition-all border',
            active === o.value
              ? 'text-white border-primary/40'
              : 'text-muted border-white/10 hover:border-white/20 hover:text-white'
          )}
          style={active === o.value ? { background: 'rgba(0,212,146,0.12)' } : { background: 'transparent' }}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ─── Primary button ───────────────────────────────────────────────────
export function PrimaryButton({ children, onClick, className, small }: {
  children: ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button onClick={onClick}
      className={cn('fintech-button flex items-center gap-2 font-medium transition-all', small ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm', className)}>
      {children}
    </button>
  )
}

// ─── Ghost button ─────────────────────────────────────────────────────
export function GhostButton({ children, onClick, className, small }: {
  children: ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button onClick={onClick}
      className={cn('flex items-center gap-2 font-medium rounded-xl border text-sm transition-all hover:bg-white/5',
        small ? 'px-3 py-1 text-xs' : 'px-4 py-2', className)}
      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
      {children}
    </button>
  )
}