import ExecutiveMetrics from "@/components/dashboard/executive-metrics"
import RegionalPerformance from "@/components/dashboard/regional-performance"

export default function AnalyticsPage() {
  return (
    <main className="p-8 space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">Analytics</h1>
          <p className="mt-2 text-sm text-muted">
            Operational intelligence and funnel performance across agents and regions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'New customers', value: '2,430' },
            { label: 'Conversion rate', value: '72.4%' },
            { label: 'Risk alerts', value: '54' },
          ].map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-surface-light bg-surface p-5">
              <p className="text-sm text-muted">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-text">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <ExecutiveMetrics />

      <RegionalPerformance />
    </main>
  )
}
