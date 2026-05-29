import { dailyOverview, agents } from '@/mock/data'
import Link from 'next/link'
import { ArrowRight, BarChart3, TrendingUp, ShieldCheck, Users } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Reports</h1>
          <p className="text-sm text-muted mt-2">Daily operational insights, funnel performance, and KPI summaries for the back office.</p>
        </div>
        <Link href="/admin" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/20">
          <BarChart3 size={16} /> Back to overview <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Total downloads</p>
          <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.downloads}</p>
          <p className="text-sm text-muted mt-2">{dailyOverview.downloadsDelta}% vs yesterday</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.completed}</p>
          <p className="text-sm text-muted mt-2">Completion rate {dailyOverview.completionRate}%</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.pending}</p>
          <p className="text-sm text-muted mt-2">New: {dailyOverview.pendingNew}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">First transactions</p>
          <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.firstTransactions}</p>
          <p className="text-sm text-muted mt-2">Rate {dailyOverview.firstTransactionRate}%</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted">Scenario funnel</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">S1 / S2 / S3 workload</h2>
            </div>
            <TrendingUp size={20} className="text-[#00D492]" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-[#081B2E] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">S1</p>
              <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.scenarioCounts.s1}</p>
            </div>
            <div className="rounded-3xl bg-[#081B2E] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">S2</p>
              <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.scenarioCounts.s2}</p>
            </div>
            <div className="rounded-3xl bg-[#081B2E] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">S3</p>
              <p className="mt-3 text-3xl font-semibold text-white">{dailyOverview.scenarioCounts.s3}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#0EA5E9]" />
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted">Compliance flags</p>
              <p className="mt-2 text-white">{dailyOverview.complianceFlags.addressDiscrepancy} address mismatches · {dailyOverview.complianceFlags.ninMismatch} NIN mismatches</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-3xl bg-[#081B2E] p-4">
              <p className="text-xs text-muted">BVN / NIN unresolved</p>
              <p className="mt-2 text-white">{dailyOverview.complianceFlags.bvnNinUnlinked}</p>
            </div>
            <div className="rounded-3xl bg-[#081B2E] p-4">
              <p className="text-xs text-muted">SLA breaches</p>
              <p className="mt-2 text-white">{dailyOverview.complianceFlags.slaBreached}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#10263D] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Top agents</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Conversion leaders</h2>
          </div>
          <Users size={20} className="text-[#00D492]" />
        </div>
        <div className="space-y-3">
          {agents.slice(0, 3).map((agent) => (
            <div key={agent.id} className="rounded-3xl bg-[#081B2E] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{agent.name}</p>
                  <p className="text-sm text-muted">{agent.zone}</p>
                </div>
                <p className="text-lg font-semibold text-white">{agent.converted} conv.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
