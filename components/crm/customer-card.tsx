
"use client"

import { Customer } from "@/mock/customers"
import { motion } from "framer-motion"

interface Props {
  customer: Customer
}

export default function CustomerCard({
  customer,
}: Props) {
  return (
    <motion.div
      layout
      whileHover={{
        y: -4,
      }}
      className="bg-[#0E2135] border border-[#17314D] rounded-3xl p-4 space-y-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-white">
              {customer.name}
            </h3>

            <p className="text-sm text-[#94a3b8]">
              {customer.location}
            </p>
          </div>
        </div>

        <div className="bg-[#00D492]/20 text-[#00D492] text-xs px-3 py-1 rounded-full font-semibold">
          {customer.aiScore}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted">
            Scenario
          </p>

          <h4 className="text-white">{customer.scenario}</h4>
        </div>

        <div>
          <p className="text-muted">
            SLA
          </p>

          <h4 className="text-white">{customer.slaRemaining}</h4>
        </div>

        <div>
          <p className="text-muted">
            KYC
          </p>

          <h4 className="text-white">{customer.kycTier}</h4>
        </div>

        <div>
          <p className="text-muted">
            Risk
          </p>

          <h4 className="text-white">{customer.riskScore}%</h4>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-[#94a3b8]">
            Onboarding Completion
          </p>

          <p className="text-sm text-white">
            {customer.onboardingCompletion}%
          </p>
        </div>

        <div className="h-2 bg-[#081B2E] rounded-full">
          <div
            className="h-full bg-[#D4A84F] rounded-full"
            style={{
              width: `${customer.onboardingCompletion}%`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex-1 bg-[#00D492] hover:bg-[#00C082] transition-all rounded-2xl py-2 text-sm font-semibold text-black"
        >
          Open Profile
        </button>

        <button
          className="flex-1 bg-[#10263D] hover:bg-[#17314D] transition-all rounded-2xl py-2 text-sm text-white"
        >
          WhatsApp
        </button>
      </div>
    </motion.div>
  )
}