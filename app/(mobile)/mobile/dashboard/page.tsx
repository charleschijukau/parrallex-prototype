"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useOnboardingStore } from '@/store'
import { ArrowRight, Activity, ShieldCheck } from 'lucide-react'

const quickActions = [
  { href: '/mobile/transactions', label: 'Transactions' },
  { href: '/mobile/rewards', label: 'Rewards' },
  { href: '/mobile/referrals', label: 'Referrals' },
  { href: '/mobile/profile', label: 'Profile' },
]

const activities = [
  { label: 'Transfer completed', value: '₦12,500', time: '2h ago' },
  { label: 'Airtime top-up', value: '₦1,200', time: 'Yesterday' },
  { label: 'Referral bonus earned', value: '₦500', time: '3 days ago' },
]

export default function MobileDashboard() {
  const router = useRouter()
  const { session } = useOnboardingStore()
  const name = session.ninData ? `${session.ninData.firstName}` : 'Customer'

  useEffect(() => {
    if (session.stage !== 'dashboard') {
      router.replace('/mobile/login')
    }
  }, [router, session.stage])

  return (
    <main className="min-h-screen bg-[#081B2E] p-5 text-white">
      <div className="rounded-3xl bg-gradient-to-r from-[#005D4C] to-[#0C7B66] p-6">
        <p className="text-sm opacity-80">Welcome back, {name}</p>
        <h1 className="text-4xl font-bold mt-3">₦245,000</h1>
        <p className="mt-3 text-sm opacity-80">Available balance</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mobile/transactions" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">Transactions</Link>
          <Link href="/mobile/rewards" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">Rewards</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Progress</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full bg-[#00D492]/10 p-3">
              <Activity size={18} className="text-[#00D492]" />
            </div>
            <div>
              <p className="text-lg font-semibold">First transfer goal</p>
              <p className="text-sm text-muted">70% complete</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Verification</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full bg-[#0EA5E9]/10 p-3">
              <ShieldCheck size={18} className="text-[#0EA5E9]" />
            </div>
            <div>
              <p className="text-lg font-semibold">NIN verified</p>
              <p className="text-sm text-muted">Secure onboarding complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-[#10263D] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <p className="text-sm text-muted">Jump to the most important screens.</p>
          </div>
          <ArrowRight size={18} className="text-[#00D492]" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="rounded-3xl border border-white/10 bg-[#081B2E] p-4 text-white transition hover:border-white/20">
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <p className="text-sm text-muted">Last 7 days</p>
        </div>
        <div className="space-y-3">
          {activities.map((item) => (
            <div key={item.label} className="rounded-3xl bg-[#10263D] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted mt-1">{item.time}</p>
                </div>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
