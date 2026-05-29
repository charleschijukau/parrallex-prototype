
import Link from "next/link"

export default function MobilePage() {
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
        <div className="text-center">
          <div
            className="
              w-24 h-24
              rounded-3xl
              bg-[#10263D]
              mx-auto
              mb-8
            "
          />

          <h1 className="text-5xl font-black">
            Parallex
          </h1>

          <p className="text-gray-400 mt-4">
            Banking that adapts to you
          </p>
        </div>

        <div className="mt-16 space-y-4">
          <Link
            href="/mobile/login"
            className="
              block
              w-full
              bg-[#005D4C]
              rounded-2xl
              py-5
              text-center
              font-semibold
            "
          >
            Start Onboarding
          </Link>

          <Link
            href="/mobile/resume"
            className="
              block
              w-full
              bg-[#10263D]
              rounded-2xl
              py-5
              text-center
            "
          >
            Resume Application
          </Link>
        </div>
      </div>
    </main>
  )
}
