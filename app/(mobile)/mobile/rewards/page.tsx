import Link from 'next/link'
import { ArrowLeft, Gift } from 'lucide-react'

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-[#081B2E] p-6 text-white">
      <Link href="/mobile/dashboard" className="inline-flex items-center gap-2 text-sm text-[#00D492] mb-6">
        <ArrowLeft size={16} /> Back to dashboard
      </Link>
      <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-3xl bg-[#00D492]/10 p-3">
            <Gift size={20} className="text-[#00D492]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Rewards</h1>
            <p className="text-sm text-muted mt-1">Cashback, bonuses, and referral incentives.</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-muted">
          <p>You have no rewards yet. Start earning by making transfers and inviting friends.</p>
          <p className="text-white/70">Join our referral program to earn ₦500 per successful sign-up.</p>
        </div>
      </div>
    </div>
  )
}
