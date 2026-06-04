'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Smartphone } from 'lucide-react'

export default function MobilePage() {
  return (
    <div className="flex flex-col flex-1 px-6 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-auto">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
          style={{ background: 'linear-gradient(135deg,#00d492,#00a978)', color: '#071521' }}>
          PX
        </div>
        <span className="text-white font-semibold text-lg">Parallex Bank</span>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center py-12">
        <div className="w-20 h-20 rounded-3xl mb-6 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,rgba(0,212,146,0.2),rgba(0,212,146,0.05))', border: '1px solid rgba(0,212,146,0.15)' }}>
          <Smartphone size={36} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
          Banking made<br />
          <span className="hero-gradient">fast & simple</span>
        </h1>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted)' }}>
          Open your account in under 60 seconds. Your NIN does all the work.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-10">
        {[
          { icon: Zap, label: 'Open account in 60 seconds', sub: 'Your NIN pre-fills everything' },
          { icon: Shield, label: 'CBN-licensed & NDPR-compliant', sub: 'Your data is safe and protected' },
          { icon: Smartphone, label: 'Works on low bandwidth', sub: 'Built for Nigerian network conditions' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,146,0.1)' }}>
              <Icon size={16} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <Link href="/mobile/login"
          className="fintech-button w-full flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-2xl">
          Open my account <ArrowRight size={18} />
        </Link>
        <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
          Already have an account?{' '}
          <Link href="/mobile/login" className="font-medium" style={{ color: 'var(--primary)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}