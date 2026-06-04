'use client'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── Section Card ─────────────────────────────────────────────────
export function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('section-card', className)}>{children}</div>
}

// ─── Stat / Metric Card ───────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  delta?: string
  deltaUp?: boolean
  icon?: ReactNode
  accent?: 'gold' | 'blue' | 'green' | 'red'
}
const accentBg: Record<string, string> = {
  gold:  'rgba(201,148,58,0.09)',
  blue:  'rgba(45,56,196,0.12)',
  green: 'rgba(34,197,94,0.09)',
  red:   'rgba(239,68,68,0.09)',
}
export function StatCard({ label, value, delta, deltaUp, icon, accent = 'gold' }: StatCardProps) {
  return (
    <div className="metric-card" style={{ position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background: accentBg[accent], pointerEvents:'none', borderRadius:'inherit' }} />
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <p style={{ fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</p>
          {icon && <div style={{ opacity:0.55, color:'var(--px-gold-400)' }}>{icon}</div>}
        </div>
        <p style={{ fontSize:26, fontWeight:700, color:'white', lineHeight:1.1 }}>{value}</p>
        {delta && (
          <p style={{ fontSize:11, marginTop:5, color: deltaUp ? 'var(--success)' : 'var(--danger)', fontWeight:500 }}>
            {delta}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('badge', className)}>{children}</span>
}

// ─── Progress Bar ─────────────────────────────────────────────────
export function ProgressBar({ pct, color, showPct = true }: { pct: number; color?: string; showPct?: boolean }) {
  const safe = Math.min(100, Math.max(0, pct))
  const bg = color ?? (safe >= 70 ? 'var(--success)' : safe >= 40 ? 'var(--warning)' : 'var(--danger)')
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div className="progress-track" style={{ flex:1 }}>
        <div className="progress-fill" style={{ width:`${safe}%`, background: bg }} />
      </div>
      {showPct && <span style={{ fontSize:11, color:'var(--muted)', minWidth:28, textAlign:'right' }}>{Math.round(safe)}%</span>}
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
      <div>
        <h2 style={{ fontSize:15, fontWeight:700, color:'white' }}>{title}</h2>
        {subtitle && <p style={{ fontSize:12, color:'var(--muted)', marginTop:3 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ─── Table Components ─────────────────────────────────────────────
export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div style={{ width:'100%', overflowX:'auto', borderRadius:16, border:'1px solid var(--border)' }}>
      <table className="data-table">{children}</table>
    </div>
  )
}
export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={className}>{children}</th>
}
export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={className}>{children}</td>
}
export function TRow({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <tr className={cn(onClick && 'clickable', className)} onClick={onClick}>{children}</tr>
  )
}

// ─── Filter Pills ─────────────────────────────────────────────────
export function FilterPills({ options, active, onChange }: {
  options: { value: string; label: string }[]
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)}
          style={{
            padding:'5px 14px', borderRadius:999, fontSize:12, fontWeight:600,
            border:`1px solid ${active === o.value ? 'var(--border-gold)' : 'var(--border)'}`,
            background: active === o.value ? 'var(--px-gold-a08)' : 'transparent',
            color: active === o.value ? 'var(--px-gold-400)' : 'var(--muted)',
            cursor:'pointer', transition:'all 0.18s',
          }}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

// ─── Primary Button ───────────────────────────────────────────────
export function PrimaryButton({ children, onClick, className, small, disabled }: {
  children: ReactNode; onClick?: () => void; className?: string; small?: boolean; disabled?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={cn('fintech-button', className)}
      style={{ display:'inline-flex', alignItems:'center', gap:6, padding: small ? '6px 14px' : '10px 20px', fontSize: small ? 12 : 14 }}>
      {children}
    </button>
  )
}

// ─── Ghost Button ─────────────────────────────────────────────────
export function GhostButton({ children, onClick, className, small }: {
  children: ReactNode; onClick?: () => void; className?: string; small?: boolean
}) {
  return (
    <button onClick={onClick}
      className={cn('ghost-button', className)}
      style={{ display:'inline-flex', alignItems:'center', gap:6, padding: small ? '5px 12px' : '9px 18px', fontSize: small ? 12 : 13 }}>
      {children}
    </button>
  )
}

// ─── Empty State ──────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ padding:'48px 0', textAlign:'center' }}>
      <p style={{ fontSize:13, color:'var(--muted)' }}>{message}</p>
    </div>
  )
}