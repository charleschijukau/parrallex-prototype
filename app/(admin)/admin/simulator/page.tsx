"use client"

import { useState } from 'react'
import { ArrowRight, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

const scenarios = [
  {
    id: 'otp-failure',
    label: 'OTP failure',
    description: 'Simulate a WhatsApp OTP delivery issue and the fallback chain to SMS and manual support.',
    result: 'Fallback triggered: SMS sent, customer redirected to manual verification queue.',
  },
  {
    id: 'nin-timeout',
    label: 'NIN timeout',
    description: 'Simulate NIN API delays and show how the workflow handles delayed identity retrieval.',
    result: 'Timeout captured, case escalated to KYC review and pending customer outreach.',
  },
  {
    id: 'recovery-flow',
    label: 'Recovery flow',
    description: 'Simulate an account recovery scenario for a customer stuck in S2 with manual KYC review.',
    result: 'Recovery path initiated: agent assignment, consent audit, and priority follow-up.',
  },
]

export default function SimulatorPage() {
  const [activeId, setActiveId] = useState(scenarios[0].id)
  const active = scenarios.find((item) => item.id === activeId) ?? scenarios[0]

  return (
    <main className="p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Onboarding Simulator</h1>
          <p className="text-sm text-muted mt-2">Run onboarding experiments, test exception handling, and validate SLA response.</p>
        </div>
        <Link href="/admin" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/20">
          <RefreshCcw size={16} /> Return to overview <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-[#10263D] p-6">
          <h2 className="text-sm uppercase tracking-[0.24em] text-muted">Scenario menu</h2>
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveId(scenario.id)}
              className={`w-full rounded-3xl border px-4 py-4 text-left transition ${active.id === scenario.id ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-[#081B2E] text-muted hover:border-white/20 hover:bg-white/5'}`}>
              <p className="font-semibold">{scenario.label}</p>
              <p className="mt-2 text-xs leading-relaxed">{scenario.description}</p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#10263D] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Selected simulation</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{active.label}</h2>
            </div>
            <div className="rounded-full bg-[#081B2E] px-3 py-2 text-xs uppercase tracking-[0.24em] text-muted">Live test</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#081B2E] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Impact</p>
              <p className="mt-3 text-3xl font-semibold text-white">High</p>
            </div>
            <div className="rounded-3xl bg-[#081B2E] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">SLA risk</p>
              <p className="mt-3 text-3xl font-semibold text-white">Moderate</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-[#081B2E] p-6">
            <p className="text-sm text-muted">Behavior</p>
            <p className="mt-3 text-white leading-relaxed">{active.result}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Last run</p>
              <p className="mt-3 text-white">2 minutes ago</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#081B2E] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Next action</p>
              <p className="mt-3 text-white">Review SLA breach queue</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
