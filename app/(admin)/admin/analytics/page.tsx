import ExecutiveMetrics from "@/components/dashboard/executive-metrics"
import RegionalPerformance from "@/components/dashboard/regional-performance"

export default function AnalyticsPage() {
  return (
    <main className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-400 mt-2">
          Operational intelligence and funnel analytics
        </p>
      </div>

      <ExecutiveMetrics />

      <RegionalPerformance />
    </main>
  )
}