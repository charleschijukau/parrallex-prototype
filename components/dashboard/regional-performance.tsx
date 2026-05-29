"use client"

import { SectionCard } from '@/components/shared/ui'

const regions = [
  {
    state: "Lagos",
    completion: 84,
    recoveries: 1220,
    dormant: 212,
  },

  {
    state: "Abuja",
    completion: 71,
    recoveries: 810,
    dormant: 154,
  },

  {
    state: "Port Harcourt",
    completion: 62,
    recoveries: 504,
    dormant: 201,
  },

  {
    state: "Kano",
    completion: 58,
    recoveries: 301,
    dormant: 112,
  },
]

export default function RegionalPerformance() {
  return (
    <SectionCard>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Regional Performance</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Recovery and onboarding performance by region</p>
      </div>

      <div className="space-y-4">
        {regions.map(region => (
          <div key={region.state} className="bg-dark-bg rounded-2xl p-4 border border-surface-light">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base text-white">{region.state}</h3>
                <p className="text-sm text-muted">{region.recoveries} recoveries</p>
              </div>

              <div className="text-right">
                <h4 className="text-xl font-bold text-white">{region.completion}%</h4>
                <p className="text-xs text-muted">Completion rate</p>
              </div>
            </div>

            <div className="h-3 bg-dark-bg rounded-full">
              <div className="h-full bg-secondary rounded-full" style={{ width: `${region.completion}%` }} />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted">Dormant Accounts</span>
              <span className="text-white">{region.dormant}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}