import ExecutiveMetrics from "@/components/dashboard/executive-metrics"
import RegionalPerformance from "@/components/dashboard/regional-performance"
import LiveActivityFeed from "@/components/dashboard/live-feed"
import AIStrategicInsights from "@/components/ai/ai-strategic-insights"
import ConversionFunnel from "@/components/charts/funnel-chart"

export default function AdminPage() {
  return (
    <main className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Parallex Lifecycle Intelligence
          </h1>

          <p className="text-gray-400 mt-2">
            Executive Operational Overview
          </p>
        </div>

        <div className="bg-[#10263D] rounded-2xl px-5 py-3">
          <p className="text-sm text-gray-400">
            Revenue Opportunity
          </p>

          <h2 className="text-2xl font-bold text-[#D4A84F]">
            ₦482M
          </h2>
        </div>
      </div>

      <ExecutiveMetrics />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="section-card"> <ConversionFunnel /> </div>
        
        <div className="section-card">   <AIStrategicInsights /></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RegionalPerformance />
        </div>

        <LiveActivityFeed />
      </div>
    </main>
  )
}