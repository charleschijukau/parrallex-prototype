"use client"

import { useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="bg-surface p-6 rounded-3xl min-h-[380px] min-w-0">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-text">Onboarding Funnel</h2>
      </div>

      <div className="h-[320px] min-h-[320px] w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#00d492" />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </section>
  )
}