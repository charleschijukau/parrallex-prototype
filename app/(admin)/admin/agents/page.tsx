import { agents } from '@/mock/data'
import { ArrowRight, CheckCircle2, UserCheck } from 'lucide-react'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  available: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  busy: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  offline: 'text-slate-400 bg-slate-600/10 border-slate-600/20',
}

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Agents</h1>
            <p className="text-sm text-muted mt-2">Capacity, SLA performance, and recovery tracking for the CRM agent roster.</p>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/20">
            <UserCheck size={16} /> Back to overview <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-3xl border border-[#17314D] bg-[#10263D] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Agent</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{agent.name}</h2>
                <p className="mt-1 text-sm text-muted">{agent.zone}</p>
              </div>
              <div className={`rounded-full border px-3 py-2 text-xs font-semibold ${statusColors[agent.status]}`} style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {agent.status.toUpperCase()}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0B1A2D] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Assigned</p>
                <p className="mt-3 text-3xl font-semibold text-white">{agent.assigned}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#0B1A2D] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Capacity</p>
                <p className="mt-3 text-3xl font-semibold text-white">{agent.capacity}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[#081821] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Contacted</p>
                <p className="mt-3 text-2xl font-semibold text-white">{agent.contacted}</p>
              </div>
              <div className="rounded-3xl bg-[#081821] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Converted</p>
                <p className="mt-3 text-2xl font-semibold text-white">{agent.converted}</p>
              </div>
              <div className="rounded-3xl bg-[#081821] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">SLA</p>
                <p className="mt-3 text-2xl font-semibold text-white">{agent.slaCompliance}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
