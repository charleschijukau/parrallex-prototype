"use client"

import { customers } from "@/mock/customers"
import {
  ArrowUpRight,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

export default function PipelineTable() {
  return (
    <div className="bg-surface rounded-3xl p-6 border border-surface-light overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text">
            Live CRM Pipeline
          </h2>

          <p className="text-sm text-muted mt-1">
            Real-time onboarding recovery operations
          </p>
        </div>

        <button className="bg-primary hover:bg-primary/80 transition-all rounded-2xl px-5 py-3 text-sm font-medium text-black">
          View Full Pipeline
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-surface-light text-sm text-muted">
              <th className="text-left py-4 font-medium">Customer</th>
              <th className="text-left py-4 font-medium">Scenario</th>
              <th className="text-left py-4 font-medium">Status</th>
              <th className="text-left py-4 font-medium">AI Recovery</th>
              <th className="text-left py-4 font-medium">KYC</th>
              <th className="text-left py-4 font-medium">SLA</th>
              <th className="text-left py-4 font-medium">Transaction Likelihood</th>
              <th className="text-right py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-surface-light hover:bg-dark-bg transition-all"
              >
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-text">
                        {customer.name}
                      </h3>

                      <p className="text-sm text-muted">
                        {customer.phone}
                      </p>

                      <p className="text-xs text-muted mt-1">
                        {customer.location} • {customer.device}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <div className="bg-dark-bg inline-flex rounded-full px-3 py-1 text-sm text-text">
                    {customer.scenario}
                  </div>
                </td>

                <td className="py-5">
                  <div className="inline-flex items-center gap-2 bg-surface rounded-full px-3 py-1 text-sm text-text">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {customer.status.replaceAll("_", " ")}
                  </div>
                </td>

                <td className="py-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-secondary" />
                      <span className="font-semibold text-text">
                        {customer.aiScore}%
                      </span>
                    </div>

                    <div className="w-[120px] h-2 bg-dark-bg rounded-full">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{
                          width: `${customer.aiScore}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck size={16} />
                    <span>{customer.kycTier}</span>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-2 text-warning">
                    <Clock3 size={15} />
                    <span>{customer.slaRemaining}</span>
                  </div>
                </td>

                <td className="py-5">
                  <div>
                    <p className="font-semibold text-text">
                      {customer.transactionLikelihood}%
                    </p>

                    <p className="text-xs text-muted">
                      AI transaction prediction
                    </p>
                  </div>
                </td>

                <td className="py-5">
                  <div className="flex items-center justify-end gap-3">
                    <button className="bg-dark-bg hover:bg-surface-light transition-all rounded-2xl px-4 py-2 text-sm text-text">
                      WhatsApp
                    </button>

                    <button className="bg-primary hover:bg-primary/80 transition-all rounded-2xl px-4 py-2 text-sm text-black flex items-center gap-2 font-semibold">
                      Open
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
