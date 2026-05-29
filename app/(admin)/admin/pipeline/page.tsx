import CustomerCard from "@/components/crm/customer-card"
import { customers } from "@/mock/customers"

const columns = [
  {
    title: "New Capture",
    status: "NEW_CAPTURE",
  },

  {
    title: "OTP Pending",
    status: "OTP_PENDING",
  },

  {
    title: "Incomplete",
    status: "INCOMPLETE",
  },

  {
    title: "Assigned",
    status: "ASSIGNED",
  },

  {
    title: "Dormant",
    status: "DORMANT",
  },

  {
    title: "Recovered",
    status: "RECOVERED",
  },
]

export default function PipelinePage() {
  return (
    <main className="
      p-8
      min-h-screen
      bg-[#081B2E]
      text-white
    ">
      <div className="
        flex items-center justify-between
        mb-8
      ">
        <div>
          <h1 className="
            text-4xl font-bold
          ">
            CRM Recovery Pipeline
          </h1>

          <p className="
            text-gray-400 mt-2
          ">
            Lifecycle intelligence operations center
          </p>
        </div>

        <div className="
          flex items-center gap-3
        ">
          <button className="
            bg-[#10263D]
            rounded-2xl
            px-5 py-3
          ">
            Export Report
          </button>

          <button className="
            bg-[#005D4C]
            rounded-2xl
            px-5 py-3
          ">
            Run AI Recovery
          </button>
        </div>
      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-6
        gap-4
      ">
        {columns.map((column) => (
          <div
            key={column.title}
            className="
              bg-[#10263D]
              rounded-3xl
              p-4
              min-h-[700px]
            "
          >
            <div className="
              flex items-center justify-between
              mb-5
            ">
              <h2 className="
                font-semibold
              ">
                {column.title}
              </h2>

              <div className="
                bg-[#081B2E]
                rounded-full
                px-3 py-1
                text-sm
              ">
                {
                  customers.filter(
                    (c) => c.status === column.status
                  ).length
                }
              </div>
            </div>

            <div className="space-y-4">
              {customers
                .filter(
                  (customer) =>
                    customer.status === column.status
                )
                .map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}