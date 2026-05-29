export default function MobileDashboard() {
  return (
    <main className="
      min-h-screen
      bg-[#081B2E]
      p-5
      text-white
    ">
      <div className="
        bg-gradient-to-r
        from-[#005D4C]
        to-[#0C7B66]
        rounded-3xl
        p-6
      ">
        <p className="text-sm opacity-80">
          Available Balance
        </p>

        <h1 className="text-4xl font-bold mt-3">
          ₦245,000
        </h1>

        <div className="
          mt-6
          flex items-center gap-3
        ">
          <button className="
            bg-white/20
            rounded-xl
            px-4 py-2
          ">
            Transfer
          </button>

          <button className="
            bg-white/20
            rounded-xl
            px-4 py-2
          ">
            Airtime
          </button>

          <button className="
            bg-white/20
            rounded-xl
            px-4 py-2
          ">
            Pay Bills
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          Smart Rewards
        </h2>

        <div className="
          mt-4
          bg-[#10263D]
          rounded-3xl
          p-5
        ">
          <h3 className="font-semibold">
            Complete your first transfer
          </h3>

          <p className="text-gray-400 mt-2">
            Enjoy zero transfer charges for 30 days.
          </p>

          <div className="
            mt-5
            h-3
            bg-[#0E2135]
            rounded-full
          ">
            <div className="
              w-[70%]
              h-full
              bg-[#D4A84F]
              rounded-full
            " />
          </div>
        </div>
      </div>
    </main>
  )
}