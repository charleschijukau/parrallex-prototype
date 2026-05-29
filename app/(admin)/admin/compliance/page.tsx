export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Compliance Center</h1>
        <p className="mt-2 text-sm text-muted">
          Monitor KYC health, identify mismatches, and surface high-risk cases for review.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: 'Pending KYC', value: '1,284', tone: 'text-primary' },
          { label: 'NIN Mismatch', value: '204', tone: 'text-warning' },
          { label: 'API Failures', value: '18', tone: 'text-danger' },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-surface-light bg-surface p-6">
            <p className="text-sm text-muted">{card.label}</p>
            <h2 className="text-4xl font-bold mt-3 text-text">{card.value}</h2>
            <p className={`mt-4 text-sm ${card.tone}`}>Trending stable</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-surface-light bg-surface p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">Case review queue</h2>
            <p className="text-sm text-muted mt-2">
              Highest-risk cases are being surfaced in real time for agent review.
            </p>
          </div>
          <button className="rounded-2xl bg-primary px-4 py-3 font-semibold text-black transition hover:opacity-95">
            Review flagged cases
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full text-left text-sm text-muted">
            <thead className="bg-[#081B2E] text-xs uppercase tracking-[0.2em] text-muted">
              <tr>
                <th className="px-5 py-4">Case</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Assigned</th>
                <th className="px-5 py-4">Priority</th>
              </tr>
            </thead>
            <tbody>
              {[
                { caseName: 'NIN mismatch', status: 'Pending', assigned: 'Team A', priority: 'High' },
                { caseName: 'Duplicate account', status: 'Review', assigned: 'Team B', priority: 'Medium' },
                { caseName: 'API timeout', status: 'Open', assigned: 'Ops', priority: 'Low' },
              ].map((row) => (
                <tr key={row.caseName} className="border-t border-white/10 bg-[#081B2E]">
                  <td className="px-5 py-4 text-white">{row.caseName}</td>
                  <td className="px-5 py-4">{row.status}</td>
                  <td className="px-5 py-4">{row.assigned}</td>
                  <td className="px-5 py-4">{row.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
