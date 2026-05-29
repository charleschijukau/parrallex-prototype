"use client"

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
    <div className="bg-surface rounded-3xl border border-surface-light p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text">
          Regional Performance
        </h2>

        <p className="text-sm text-muted mt-1">
          Recovery and onboarding performance by region
        </p>
      </div>

      <div className="space-y-5">
        {regions.map((region) => (
          <div
            key={region.state}
            className="bg-dark-bg rounded-2xl p-5 border border-surface-light"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-text">
                  {region.state}
                </h3>

                <p className="text-sm text-muted">
                  {region.recoveries} recoveries
                </p>
              </div>

              <div className="text-right">
                <h4 className="text-2xl font-bold text-text">
                  {region.completion}%
                </h4>

                <p className="text-xs text-muted">
                  Completion rate
                </p>
              </div>
            </div>

            <div className="h-3 bg-dark-bg rounded-full">
              <div
                className="h-full bg-secondary rounded-full"
                style={{
                  width: `${region.completion}%`,
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">
                Dormant Accounts
              </span>

              <span className="text-text">{region.dormant}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}