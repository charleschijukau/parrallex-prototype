
import { analytics } from "@/mock/analytics"
import {
  Download,
  Users,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

const cards = [
  {
    title: "App Downloads",
    value: analytics.downloads.toLocaleString(),
    icon: Download,
  },

  {
    title: "Phone Captures",
    value: analytics.phoneCaptures.toLocaleString(),
    icon: Users,
  },

  {
    title: "Recovery Lift",
    value: `${analytics.recoveryLift}%`,
    icon: Sparkles,
  },

  {
    title: "SLA Compliance",
    value: `${analytics.slaCompliance}%`,
    icon: ShieldCheck,
  },
]

export default function ExecutiveMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div key={card.title} className="bg-surface rounded-3xl border border-surface-light p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3 text-text">
                  {card.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-dark-bg flex items-center justify-center">
                <Icon className="text-secondary" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-primary">
                +12.4% this week
              </p>

              <p className="text-xs text-muted">
                Live
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}