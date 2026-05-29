export default function SettingsPage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <div className="bg-[#10263D] rounded-3xl p-6">
        <h2 className="text-xl font-semibold">
          System Configuration
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm text-gray-400">
              SLA Window
            </label>

            <input
              className="
                mt-2
                w-full
                bg-[#081B2E]
                rounded-2xl
                p-4
              "
              defaultValue="15 mins"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              OTP Retry Limit
            </label>

            <input
              className="
                mt-2
                w-full
                bg-[#081B2E]
                rounded-2xl
                p-4
              "
              defaultValue="3"
            />
          </div>
        </div>
      </div>
    </main>
  )
}