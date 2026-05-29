import Link from 'next/link'
import { ArrowLeft, CreditCard } from 'lucide-react'

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-[#081B2E] p-6 text-white">
      <Link href="/mobile/dashboard" className="inline-flex items-center gap-2 text-sm text-[#00D492] mb-6">
        <ArrowLeft size={16} /> Back to dashboard
      </Link>
      <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-3xl bg-[#00D492]/10 p-3">
            <CreditCard size={20} className="text-[#00D492]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Transactions</h1>
            <p className="text-sm text-muted mt-1">Recent activity from your account.</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-muted">
          <p>No transactions yet. Your first transfer will appear here.</p>
          <p className="text-white/70">Use a bank transfer or airtime purchase to get started.</p>
        </div>
      </div>
    </div>
  )
}
