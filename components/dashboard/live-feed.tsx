"use client"

import { useEffect, useState } from "react"

const events = [
  "OTP delivered successfully to customer in Lagos",
  "Dormant customer recovered after WhatsApp follow-up",
  "AI flagged high conversion opportunity in Abuja",
  "KYC escalation created for NIN mismatch",
  "Agent Mary Johnson recovered onboarding session",
  "Push notification campaign activated",
]

export default function LiveActivityFeed() {
  const [feed, setFeed] = useState(events)

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((prev) => [
        events[
          Math.floor(Math.random() * events.length)
        ],
        ...prev,
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface rounded-3xl border border-surface-light p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text">
          Live Activity
        </h2>

        <p className="text-muted text-sm mt-1">
          Real-time onboarding events
        </p>
      </div>

      <div className="space-y-4">
        {feed.slice(0, 7).map((event, index) => (
          <div
            key={index}
            className="bg-dark-bg border border-surface-light rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />

              <div>
                <p className="text-sm text-text">
                  {event}
                </p>

                <p className="text-xs text-muted mt-2">
                  Just now
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}