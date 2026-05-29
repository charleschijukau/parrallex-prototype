export default function CompliancePage() {
  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Compliance Center
        </h1>

        <p className="text-gray-400 mt-2">
          Progressive KYC monitoring
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#10263D] rounded-3xl p-6">
          <p className="text-gray-400 text-sm">
            Pending KYC
          </p>

          <h2 className="text-4xl font-bold mt-2">
            1,284
          </h2>
        </div>

        <div className="bg-[#10263D] rounded-3xl p-6">
          <p className="text-gray-400 text-sm">
            NIN Mismatch
          </p>

          <h2 className="text-4xl font-bold mt-2">
            204
          </h2>
        </div>

        <div className="bg-[#10263D] rounded-3xl p-6">
          <p className="text-gray-400 text-sm">
            API Failures
          </p>

          <h2 className="text-4xl font-bold mt-2">
            18
          </h2>
        </div>
      </div>
    </main>
  )
}