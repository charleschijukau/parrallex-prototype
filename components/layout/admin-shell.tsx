"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  BarChart3,
  ShieldCheck,
  Radio,
  Brain,
  Menu,
  Search,
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Pipeline",
    href: "/admin/pipeline",
    icon: Radio,
  },

  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },

  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },

  {
    label: "Compliance",
    href: "/admin/compliance",
    icon: ShieldCheck,
  },

  {
    label: "AI Insights",
    href: "/admin/ai-insights",
    icon: Brain,
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

export default function AdminShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div
      className="
        flex
        min-h-screen
        bg-[#071521]
      "
    >
      {/* SIDEBAR */}

      <aside
      className=" desktop-sidebar hidden md:flex w-[290px] flex-col border-r border-white/5 bg-[#081B2E] transition-all duration-300 "
      >
        <div className="p-7">
          <div
            className="
              flex items-center gap-4
            "
          >
            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-gradient-to-br
                from-[#00D492]
                to-[#0EA5E9]
              "
            />

            <div>
              <h1
                className="
                  text-2xl font-black
                "
              >
                Parallex
              </h1>

              <p
                className="
                  text-sm text-gray-400
                "
              >
                Lifecycle OS
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon

            const active =
              pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-4
                  rounded-2xl
                  px-5 py-4
                  transition-all
                  ${
                    active
                      ? "bg-[#10263D] border border-[#17314D]"
                      : "hover:bg-[#0E2135]"
                  }
                `}
              >
                <Icon size={20} />

                <span>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-auto p-5">
          <div
            className="
              bg-[#10263D]
              rounded-3xl
              p-5
              border border-[#17314D]
            "
          >
            <div
              className="
                flex items-center gap-3
              "
            >
              <div
                className="
                  w-3 h-3
                  rounded-full
                  bg-[#00D492]
                  animate-pulse
                "
              />

              <div>
                <h3 className="font-semibold">
                  Recovery Engine Live
                </h3>

                <p
                  className="
                    text-sm text-gray-400
                  "
                >
                  AI monitoring active
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <div className="flex-1 flex flex-col">
        {/* HEADER */}

        <header
          className="
            sticky top-0 z-40
            border-b border-white/5
            bg-[#081B2E]/90
            backdrop-blur-xl
          "
        >
          <div
            className="
              h-[90px]
              px-8
              flex items-center justify-between
            "
          >
            <div
              className="
                flex items-center gap-4
              "
            >
              <button
                className="
                  xl:hidden
                  w-12 h-12
                  rounded-2xl
                  bg-[#10263D]
                  flex items-center justify-center
                "
              >
                <Menu />
              </button>

              <div>
                <h2
                  className="
                    text-2xl font-bold
                  "
                >
                  Parallex Command Center
                </h2>

                <p
                  className="
                    text-sm text-gray-400
                  "
                >
                  Customer Lifecycle Intelligence
                </p>
              </div>
            </div>

            <div
              className="
                flex items-center gap-5
              "
            >
              <div
                className="
                  hidden lg:flex
                  items-center gap-3
                  bg-[#10263D]
                  rounded-2xl
                  px-4 py-3
                  w-[340px]
                "
              >
                <Search size={18} />

                <input
                  placeholder="Search customers..."
                  className="
                    bg-transparent
                    w-full
                  "
                />
              </div>

              <button
                className="
                  relative
                  w-12 h-12
                  rounded-2xl
                  bg-[#10263D]
                  flex items-center justify-center
                "
              >
                <Bell />

                <div
                  className="
                    absolute top-2 right-2
                    w-2 h-2
                    rounded-full
                    bg-[#00D492]
                  "
                />
              </button>

              <div
                className="
                  flex items-center gap-3
                "
              >
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  className="
                    w-12 h-12
                    rounded-full
                  "
                />

                <div className="hidden md:block">
                  <h3 className="font-semibold">
                    Executive Admin
                  </h3>

                  <p
                    className="
                      text-sm text-gray-400
                    "
                  >
                    Operations Lead
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}

        <div
          className="
            flex-1
            p-8
          "
        >
          {children}
        </div>
      </div>
    </div>
  )
}