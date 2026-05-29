const agents = [
  {
    name: "Mary Johnson",
    region: "Lagos",
    active: 43,
    recovered: 120,
    sla: "98%",
  },

  {
    name: "James Musa",
    region: "Abuja",
    active: 31,
    recovered: 88,
    sla: "94%",
  },
]

export default function AgentsPage() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Recovery Agents
        </h1>

        <p className="text-gray-400 mt-2">
          CRM operational teams and SLA tracking
        </p>
      </div>

      <div className="space-y-5">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="
              bg-[#10263D]
              border border-[#17314D]
              rounded-3xl
              p-6
            "
          >
            <div
              className="
                flex items-center justify-between
              "
            >
              <div>
                <h2 className="text-2xl font-semibold">
                  {agent.name}
                </h2>

                <p className="text-gray-400">
                  {agent.region}
                </p>
              </div>

              <div
                className="
                  bg-[#005D4C]
                  rounded-full
                  px-4 py-2
                  text-sm
                "
              >
                SLA {agent.sla}
              </div>
            </div>

            <div
              className="
                grid grid-cols-2 gap-6
                mt-6
              "
            >
              <div
                className="
                  bg-[#0E2135]
                  rounded-2xl
                  p-5
                "
              >
                <p className="text-gray-400 text-sm">
                  Active Queue
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {agent.active}
                </h3>
              </div>

              <div
                className="
                  bg-[#0E2135]
                  rounded-2xl
                  p-5
                "
              >
                <p className="text-gray-400 text-sm">
                  Recoveries
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {agent.recovered}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}