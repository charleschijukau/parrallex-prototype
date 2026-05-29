import Link from "next/link"

const demos = [
  {
    title: "Executive Dashboard",
    href: "/admin",
    description:
      "Lifecycle intelligence command center",
  },

  {
    title: "CRM Pipeline",
    href: "/admin/pipeline",
    description:
      "Recovery pipeline and onboarding operations",
  },

  {
    title: "Customers",
    href: "/admin/customers",
    description:
      "Customer lifecycle intelligence profiles",
  },

  {
    title: "AI Insights",
    href: "/admin/analytics",
    description:
      "Predictive analytics and AI monitoring",
  },

  {
    title: "Compliance Center",
    href: "/admin/compliance",
    description:
      "Progressive KYC and risk management",
  },

  {
    title: "Simulator",
    href: "/admin/simulator",
    description:
      "Simulate onboarding edge-case scenarios",
  },

  {
    title: "Mobile Experience",
    href: "/mobile",
    description:
      "Customer onboarding and banking flow",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#081B2E] text-white p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#10263D] border border-[#17314D] rounded-full px-4 py-2 text-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00D492]" />
            Parallex Bank Demo Environment
          </div>

          <h1 className="text-6xl font-black leading-tight max-w-5xl text-white">
            Mobile Onboarding &
            Customer Lifecycle
            Intelligence Platform
          </h1>

          <p className="text-xl text-[#94a3b8] mt-6 max-w-3xl">
            Enterprise onboarding recovery,
            AI-driven CRM intelligence,
            progressive KYC operations,
            and customer lifecycle management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group bg-[#10263D] border border-[#17314D] rounded-3xl p-7 hover:border-[#00D492] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#081B2E] flex items-center justify-center mb-6 group-hover:scale-110 transition-all text-[#00D492]">
                →
              </div>

              <h2 className="text-2xl font-bold text-white">
                {demo.title}
              </h2>

              <p className="text-[#94a3b8] mt-3 leading-relaxed">
                {demo.description}
              </p>

              <div className="mt-8 text-[#00D492] text-sm font-semibold">
                Open Demo
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 bg-[#10263D] border border-[#17314D] rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white">
            Demo Test Credentials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#081B2E] rounded-2xl p-5">
              <p className="text-[#94a3b8] text-sm">
                Executive Access
              </p>

              <h3 className="mt-3 font-semibold text-white">
                executive@parallex.demo
              </h3>

              <p className="mt-2 text-sm text-white">
                Password: 123456
              </p>
            </div>

            <div className="bg-[#081B2E] rounded-2xl p-5">
              <p className="text-[#94a3b8] text-sm">
                Agent Access
              </p>

              <h3 className="mt-3 font-semibold text-white">
                agent@parallex.demo
              </h3>

              <p className="mt-2 text-sm text-white">
                Password: 123456
              </p>
            </div>

            <div className="bg-[#081B2E] rounded-2xl p-5">
              <p className="text-[#94a3b8] text-sm">
                Compliance Access
              </p>

              <h3 className="mt-3 font-semibold text-white">
                compliance@parallex.demo
              </h3>

              <p className="mt-2 text-sm text-white">
                Password: 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}