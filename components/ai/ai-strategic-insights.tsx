const insights = [
  {
    title: "High Recovery Opportunity",
    description:
      "Customers in Lagos aged 25-34 show 73% recovery likelihood after WhatsApp follow-up.",
  },

  {
    title: "Dormancy Spike Detected",
    description:
      "Dormancy increased 12% in Abuja after onboarding step 4.",
  },

  {
    title: "Network Impact",
    description:
      "Poor network quality contributes to 31% of OTP abandonment.",
  },
]

export default function AIStrategicInsights() {
  return (
    <div className="bg-surface rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text">
            AI Strategic Intelligence
          </h2>

          <p className="text-muted text-sm mt-1">
            Simulated predictive lifecycle insights
          </p>
        </div>

        <div className="bg-primary text-black rounded-full px-4 py-2 text-sm font-semibold">
          AI ACTIVE
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="border border-surface-light rounded-2xl p-5"
          >
            <h3 className="font-semibold text-lg text-text">
              {insight.title}
            </h3>

            <p className="text-muted mt-2">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}