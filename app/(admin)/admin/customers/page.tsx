import { customers } from "@/mock/customers"

export default function CustomersPage() {
  return (
    <main className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Customers
        </h1>

        <p className="text-gray-400 mt-2">
          Customer lifecycle intelligence records
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="
              bg-[#10263D]
              rounded-3xl
              border border-[#17314D]
              p-6
            "
          >
            <div className="flex items-center gap-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="
                  w-14 h-14 rounded-full
                "
              />

              <div>
                <h2 className="font-semibold text-lg">
                  {customer.name}
                </h2>

                <p className="text-sm text-gray-400">
                  {customer.phone}
                </p>
              </div>
            </div>

            <div
              className="
                mt-6
                grid grid-cols-2 gap-4
                text-sm
              "
            >
              <div>
                <p className="text-gray-500">
                  Scenario
                </p>

                <h3>{customer.scenario}</h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Status
                </p>

                <h3>{customer.status}</h3>
              </div>

              <div>
                <p className="text-gray-500">
                  AI Score
                </p>

                <h3>{customer.aiScore}%</h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Risk
                </p>

                <h3>{customer.riskScore}%</h3>
              </div>
            </div>

            <button
              className="
                mt-6
                w-full
                bg-[#005D4C]
                rounded-2xl
                py-3
              "
            >
              Open Customer
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}