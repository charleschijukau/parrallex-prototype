"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Bot,
  ShieldAlert,
  Bell,
  LineChart,
  Radio,
  Settings,
} from "lucide-react"

const items = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Pipeline",
    href: "/admin/pipeline",
    icon: Users,
  },
  {
    label: "AI Insights",
    href: "/admin/ai-insights",
    icon: Bot,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: LineChart,
  },
  {
    label: "Compliance",
    href: "/admin/compliance",
    icon: ShieldAlert,
  },
  {
    label: "Campaigns",
    href: "/admin/campaigns",
    icon: Radio,
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  return (
    <aside className="w-[280px] bg-[#081B2E] border-r border-[#17314D] h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Parallex Intelligence
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Lifecycle Operations Platform
        </p>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-slate-300 hover:bg-[#10263D] hover:text-white transition-all rounded-xl px-4 py-3"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}