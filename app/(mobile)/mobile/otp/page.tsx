"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function OTPPage() {
  const router = useRouter()
  const { session, setOTPVerified, setStage } = useOnboardingStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session.phone) {
      router.replace('/mobile/login')
    }
  }, [router, session.phone])

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Enter the 6-digit verification code.')
      return
    }

    setError('')
    setOTPVerified()
    setStage('profile_confirm')
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push('/mobile/onboarding')
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/mobile/login" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <ArrowLeft size={18} className="text-white" />
        </Link>
        <div className="flex-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full" style={{ width: '50%', background: 'var(--primary)' }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>Step 2 of 4</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center" style={{ background: 'rgba(0,212,146,0.1)', border: '1px solid rgba(0,212,146,0.15)' }}>
          <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Enter OTP</h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
          A 6-digit code was sent to {session.phone || 'your phone'} via WhatsApp.
        </p>

        <div className="mb-4">
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--muted)' }}>Verification code</label>
          <input
            type="text"
            inputMode="numeric"
            value={code}
            onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }}
            placeholder="123456"
            className="w-full rounded-2xl border border-white/10 bg-[#081B2E] px-4 py-4 text-white text-base outline-none"
          />
          {error && <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{error}</p>}
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-4 text-sm text-muted">
          If you did not receive the code, try again in 30 seconds or use the fallback option on the next screen.
        </div>
      </div>

      <button
        onClick={handleVerify}
        disabled={code.length !== 6}
        className="fintech-button w-full flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-2xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
        <span>Verify code</span>
        <ArrowRight size={18} />
      </button>
    </div>
  )
}
