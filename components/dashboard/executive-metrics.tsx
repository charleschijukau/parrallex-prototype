
import { analytics } from "@/mock/analytics"
import { Download, Users, Sparkles, ShieldCheck } from "lucide-react"
import { StatCard } from "@/components/shared/ui"

const cards = [
  { title: "App Downloads", value: analytics.downloads.toLocaleString(), icon: <Download /> },
  { title: "Phone Captures", value: analytics.phoneCaptures.toLocaleString(), icon: <Users /> },
  { title: "Recovery Lift", value: `${analytics.recoveryLift}%`, icon: <Sparkles /> },
  { title: "SLA Compliance", value: `${analytics.slaCompliance}%`, icon: <ShieldCheck /> },
]

export default function ExecutiveMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map(card => (
        <StatCard key={card.title} label={card.title} value={card.value} icon={card.icon} delta="+12.4% this week" deltaUp />
      ))}
    </div>
  )
}