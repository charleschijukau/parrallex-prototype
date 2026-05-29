"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()

  const [phone, setPhone] =
    useState("")

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
          Welcome
        </h1>

        <p className="text-gray-400 mt-3">
          Enter your phone number
        </p>

        <div className="mt-10">
          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="+234"
            className="
              w-full
              bg-[#10263D]
              rounded-2xl
              p-5
              outline-none
            "
          />

          <button
            onClick={() =>
              router.push("/mobile/otp")
            }
            className="
              mt-6
              w-full
              bg-[#005D4C]
              rounded-2xl
              py-5
            "
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  )
}
