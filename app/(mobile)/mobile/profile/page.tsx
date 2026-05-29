import Link from 'next/link'
import { ArrowLeft, User } from 'lucide-react'
import { useOnboardingStore } from '@/store'

export default function ProfilePage() {
  const { session } = useOnboardingStore()
  const user = session.ninData ?? {
    firstName: 'Customer',
    lastName: '',
    nin: '───────────',
    dob: '—',
    registeredAddress: '—',
    state: '—',
  }

  return (
    <div className="min-h-screen bg-[#081B2E] p-6 text-white">
      <Link href="/mobile/dashboard" className="inline-flex items-center gap-2 text-sm text-[#00D492] mb-6">
        <ArrowLeft size={16} /> Back to dashboard
      </Link>
      <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl bg-[#00D492]/10 p-3">
            <User size={20} className="text-[#00D492]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="text-sm text-muted mt-1">Confirm your account details.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-[#081B2E] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Name</p>
            <p className="mt-2 text-white">{user.firstName} {user.lastName}</p>
          </div>
          <div className="rounded-3xl bg-[#081B2E] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">NIN</p>
            <p className="mt-2 text-white">{user.nin}</p>
          </div>
          <div className="rounded-3xl bg-[#081B2E] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">DOB</p>
            <p className="mt-2 text-white">{user.dob}</p>
          </div>
          <div className="rounded-3xl bg-[#081B2E] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Address</p>
            <p className="mt-2 text-white">{user.registeredAddress}</p>
            <p className="text-xs text-muted mt-2">{user.state}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
