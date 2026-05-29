'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from 'recharts'

const data = [
  { name: 'Downloads', value: 5200 },
  { name: 'Phone Entry', value: 4200 },
  { name: 'OTP Verified', value: 3500 },
  { name: 'Completed', value: 2900 },
]

export default function FunnelChart() {
  return (
    <div className="bg-surface p-6 rounded-2xl h-[350px] min-h-0 min-w-0">
      <h2 className="text-xl font-bold mb-4 text-text">Onboarding Funnel</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#00d492" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}