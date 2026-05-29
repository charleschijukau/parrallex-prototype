import { customers } from "@/mock/customers"

export default function CustomerPage() {
  const customer = customers[0]

  return (
    <main className="p-8 space-y-8">
      <div className="
        flex items-center justify-between
      ">
        <div>
          <h1 className="text-4xl font-bold">
            {customer.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Lifecycle Intelligence Profile
          </p>
        </div>

        <div className="
          bg-[#10263D]
          rounded-2xl
          px-5 py-3
        ">
          <p className="text-sm text-gray-400">
            AI Recovery Score
          </p>

          <h2 className="text-3xl font-bold text-[#D4A84F]">
            {customer.aiScore}%
          </h2>
        </div>
      </div>

      <div className="
        grid grid-cols-1 xl:grid-cols-3 gap-6
      ">
        <div className="
          xl:col-span-2
          space-y-6
        ">
          <div className="
            bg-[#10263D]
            rounded-3xl
            p-6
          ">
            <h2 className="text-2xl font-bold mb-6">
              Identity Information
            </h2>

            <div className="
              grid grid-cols-2 gap-6
            ">
              <div>
                <p className="text-gray-400">Phone</p>
                <h3>{customer.phone}</h3>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <h3>{customer.email}</h3>
              </div>

              <div>
                <p className="text-gray-400">KYC Tier</p>
                <h3>{customer.kycTier}</h3>
              </div>

              <div>
                <p className="text-gray-400">Location</p>
                <h3>{customer.location}</h3>
              </div>
            </div>
          </div>

          <div className="
            bg-[#10263D]
            rounded-3xl
            p-6
          ">
            <h2 className="text-2xl font-bold mb-6">
              Activity Timeline
            </h2>

            <div className="space-y-5">
              {customer.timeline?.map((item) => (
                <div
                  key={item.event}
                  className="
                    border-l-2
                    border-[#005D4C]
                    pl-5
                  "
                >
                  <h3>{item.event}</h3>

                  <p className="text-gray-400 text-sm">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="
            bg-[#10263D]
            rounded-3xl
            p-6
          ">
            <h2 className="text-xl font-bold mb-4">
              AI Recommendations
            </h2>

            <div className="space-y-3">
              <div className="
                bg-[#0E2135]
                rounded-2xl
                p-4
              ">
                Send WhatsApp resume link
              </div>

              <div className="
                bg-[#0E2135]
                rounded-2xl
                p-4
              ">
                Assign premium recovery agent
              </div>

              <div className="
                bg-[#0E2135]
                rounded-2xl
                p-4
              ">
                Offer onboarding incentive
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}