export default function CampaignsPage() {
  return (
    <main className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Campaigns
        </h1>

        <p className="text-gray-400 mt-2">
          Engagement and recovery campaigns
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#10263D] rounded-3xl p-6">
          <h2 className="text-xl font-semibold">
            WhatsApp Recovery
          </h2>

          <p className="text-gray-400 mt-3">
            Day 1 onboarding recovery workflow
          </p>

          <button className="mt-6 bg-[#005D4C] rounded-2xl px-5 py-3">
            Launch Campaign
          </button>
        </div>

        <div className="bg-[#10263D] rounded-3xl p-6">
          <h2 className="text-xl font-semibold">
            Dormancy Reactivation
          </h2>

          <p className="text-gray-400 mt-3">
            Cashback-driven reactivation campaign
          </p>

          <button className="mt-6 bg-[#005D4C] rounded-2xl px-5 py-3">
            Activate
          </button>
        </div>
      </div>
    </main>
  )
}