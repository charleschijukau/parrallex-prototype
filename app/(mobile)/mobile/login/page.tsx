'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

export default function MobileLoginPage() {
  const router = useRouter()
  const { setPhone } = useOnboardingStore()
  const [phone, setPhoneInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    if (phone.length < 11) { setError('Please enter a valid 11-digit Nigerian phone number.'); return }
    setError('')
    setLoading(true)
    setPhone(phone)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    router.push('/mobile/otp')
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/mobile" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <ArrowLeft size={18} className="text-white" />
        </Link>
        <div className="flex-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full" style={{ width: '25%', background: 'var(--primary)' }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>Step 1 of 4</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center" style={{ background: 'rgba(0,212,146,0.1)', border: '1px solid rgba(0,212,146,0.15)' }}>
          <Phone size={22} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Enter your number</h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
          We'll send a verification code via WhatsApp. Your NIN details will be retrieved automatically.
        </p>

        {/* Phone input */}
        <div className="mb-2">
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--muted)' }}>Phone number</label>
          <div className="flex items-center gap-0 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 px-4 py-4 border-r flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="text-sm">🇳🇬</span>
              <span className="text-sm font-medium text-white">+234</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={e => { setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 11)); setError('') }}
              placeholder="08012345678"
              className="flex-1 px-4 py-4 bg-transparent text-white placeholder-muted text-base"
              style={{ outline: 'none', fontSize: 16 }}
            />
          </div>
          {error && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{error}</p>}
        </div>

        {/* Consent */}
        <div className="mt-5 p-3 rounded-xl text-xs leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--muted)' }}>
          By continuing, you agree that Parallex Bank may contact you on this number to assist with your account setup.
        </div>

        {/* NIN info */}
        <div className="mt-3 p-3 rounded-xl text-xs leading-relaxed flex items-start gap-2" style={{ background: 'rgba(0,212,146,0.04)', border: '1px solid rgba(0,212,146,0.08)', color: 'var(--muted)' }}>
          <span style={{ color: 'var(--primary)', flexShrink: 0 }}>ⓘ</span>
          We'll retrieve your name, date of birth, and registered address from your NIN record. You won't need to type them in.
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        disabled={loading || phone.length < 11}
        className="fintech-button w-full flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-2xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/></svg>
            Sending code...
          </span>
        ) : (
          <><span>Send verification code</span><ArrowRight size={18} /></>
        )}
      </button>
    </div>
  )
}