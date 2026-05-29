"use client"

import { useState } from "react"

export default function SimulatorPage() {
  const [status, setStatus] =
    useState("Waiting")

  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Onboarding Simulator
        </h1>

        <p className="text-gray-400 mt-2">
          Simulate customer onboarding scenarios
        </p>
      </div>

      <div className="bg-[#10263D] rounded-3xl p-6">
        <div className="grid grid-cols-3 gap-5">
          <button
            onClick={() =>
              setStatus("OTP Failure Triggered")
            }
            className="
              bg-[#081B2E]
              rounded-2xl
              p-5
            "
          >
            OTP Failure
          </button>

          <button
            onClick={() =>
              setStatus("NIN Timeout Triggered")
            }
            className="
              bg-[#081B2E]
              rounded-2xl
              p-5
            "
          >
            NIN Timeout
          </button>

          <button
            onClick={() =>
              setStatus("Recovery Flow Triggered")
            }
            className="
              bg-[#081B2E]
              rounded-2xl
              p-5
            "
          >
            Recovery Flow
          </button>
        </div>

        <div
          className="
            mt-8
            bg-[#0E2135]
            rounded-2xl
            p-6
          "
        >
          <p className="text-gray-400 text-sm">
            Current Simulation
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {status}
          </h2>
        </div>
      </div>
    </main>
  )
}