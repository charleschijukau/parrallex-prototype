import ExecutiveMetrics from "@/components/dashboard/executive-metrics"
import RegionalPerformance from "@/components/dashboard/regional-performance"
import { SectionHeader, StatCard, SectionCard } from '@/components/shared/ui'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Analytics" subtitle="Operational intelligence and funnel performance across agents and regions." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard compact label="New customers" value="2,430" />
        <StatCard compact label="Conversion rate" value="72.4%" />
        <StatCard compact label="Risk alerts" value="54" />
      </div>

      <SectionCard>
        <ExecutiveMetrics />
      </SectionCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RegionalPerformance />
        </div>
      </div>
    </div>
  )
}
