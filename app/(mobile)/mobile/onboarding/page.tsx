"use client"

import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <main
      className="
        min-h-screen
        bg-[#081B2E]
        text-white
        p-6
      "
    >
      <div className="max-w-md mx-auto pt-14">
        <div
          className="
            bg-[#10263D]
            rounded-3xl
            p-6
          "
        >
          <p className="text-sm text-[#00D492]">
            NIN Verified
          </p>

          <h1 className="text-3xl font-bold mt-3">
            David Okafor
          </h1>

          <p className="text-gray-400 mt-2">
            Your information was securely
            retrieved from NIMC.
          </p>

          <div className="mt-8 space-y-4">
            <input
              defaultValue="david@gmail.com"
              className="
                w-full
                bg-[#081B2E]
                rounded-2xl
                p-4
              "
            />

            <input
              defaultValue="Lekki, Lagos"
              className="
                w-full
                bg-[#081B2E]
                rounded-2xl
                p-4
              "
            />
          </div>

          <button
            onClick={() =>
              router.push("/mobile/dashboard")
            }
            className="
              mt-8
              w-full
              bg-[#005D4C]
              rounded-2xl
              py-5
            "
          >
            Complete Setup
          </button>
        </div>
      </div>
    </main>
  )
}