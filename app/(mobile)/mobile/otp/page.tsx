"use client"

import { useRouter } from "next/navigation"

export default function OTPPage() {
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
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-4xl font-bold">
          Verify OTP
        </h1>

        <p className="text-gray-400 mt-3">
          OTP sent via WhatsApp
        </p>

        <div className="
          mt-10
          flex gap-3
        ">
          {[1,2,3,4].map((n) => (
            <input
              key={n}
              className="
                w-16 h-16
                rounded-2xl
                bg-[#10263D]
                text-center
                text-2xl
              "
            />
          ))}
        </div>

        <button
          onClick={() =>
            router.push("/mobile/onboarding")
          }
          className="
            mt-8
            w-full
            bg-[#005D4C]
            rounded-2xl
            py-5
          "
        >
          Verify
        </button>
      </div>
    </main>
  )
}
