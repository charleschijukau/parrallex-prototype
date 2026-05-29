"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store'
import { ArrowLeft, ArrowRight, User, Shield } from 'lucide-react'
import Link from 'next/link'

const defaultNINData = {
  nin: '12345678901',
  firstName: 'David',
  lastName: 'Okafor',
  dob: '14 Jan 1992',
  gender: 'M',
  registeredAddress: 'Lekki Phase 1, Lagos',
  state: 'Lagos',
}

export default function OnboardingPage() {
  const router = useRouter()
  const { session, setNINData, setStage } = useOnboardingStore()
  const [ninData, setLocalNinData] = useState(defaultNINData)

  useEffect(() => {
    if (!session.otpVerified) {
      router.replace('/mobile/login')
      return
    }

    if (session.ninData) {
      setLocalNinData(session.ninData)
    }
  }, [router, session.ninData, session.otpVerified])

  const handleComplete = async () => {
    setNINData(ninData)
    setStage('dashboard')
    await new Promise((resolve) => setTimeout(resolve, 600))
    router.push('/mobile/dashboard')
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/mobile/otp" className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <ArrowLeft size={18} className="text-white" />
        </Link>
        <div className="flex-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full" style={{ width: '75%', background: 'var(--primary)' }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>Step 3 of 4</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center" style={{ background: 'rgba(0,212,146,0.1)', border: '1px solid rgba(0,212,146,0.15)' }}>
          <User size={22} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Confirm your profile</h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
          Your NIN record has been verified. Confirm the details below before we complete your account setup.
        </p>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">NIN</p>
            <p className="mt-2 text-white">{ninData.nin}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Name</p>
                <p className="mt-2 text-white">{ninData.firstName} {ninData.lastName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">DOB</p>
                <p className="mt-2 text-white">{ninData.dob}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Registered address</p>
            <p className="mt-2 text-white">{ninData.registeredAddress}</p>
            <p className="text-xs text-muted mt-2">State: {ninData.state}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5 flex items-center gap-3">
            <Shield size={18} className="text-primary" />
            <p className="text-sm text-muted">Your identity is verified by NIMC. We only use this information for onboarding and compliance.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="fintech-button w-full flex items-center justify-center gap-2 py-4 text-base font-semibold rounded-2xl mt-6 transition-all">
        Complete setup <ArrowRight size={18} />
      </button>
    </div>
  )
}
