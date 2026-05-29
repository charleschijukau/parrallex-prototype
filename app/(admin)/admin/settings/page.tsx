export default function SettingsPage() {
  return (
    <main className="p-8 space-y-8">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="mt-2 text-sm text-muted">
            Configure core system behavior, security policies, and monitoring thresholds.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-surface-light bg-surface p-6 space-y-7">
            <div>
              <h2 className="text-xl font-semibold">System configuration</h2>
              <p className="text-sm text-muted mt-2">
                Adjust SLA targets, OTP policies, and risk controls for the back office.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-muted">SLA window</label>
                <input
                  defaultValue="15 mins"
                  className="w-full rounded-2xl border border-white/10 bg-[#081B2E] px-4 py-4 text-white outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted">OTP retry limit</label>
                <input
                  defaultValue="3"
                  className="w-full rounded-2xl border border-white/10 bg-[#081B2E] px-4 py-4 text-white outline-none"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-muted">Session expiry</label>
                  <select className="w-full rounded-2xl border border-white/10 bg-[#081B2E] px-4 py-4 text-white outline-none">
                    <option>30 mins</option>
                    <option>60 mins</option>
                    <option>120 mins</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted">Risk threshold</label>
                  <input
                    defaultValue="High"
                    className="w-full rounded-2xl border border-white/10 bg-[#081B2E] px-4 py-4 text-white outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-surface-light bg-surface p-6">
              <p className="text-sm text-muted uppercase tracking-[0.18em]">Operational score</p>
              <h2 className="text-5xl font-bold mt-3">89</h2>
              <p className="text-sm text-muted mt-2">
                Strong uptime and SLA response. Keep monitoring endpoint latency and retry events.
              </p>
            </div>

            <div className="rounded-3xl border border-surface-light bg-surface p-6 space-y-4">
              <h3 className="text-lg font-semibold">Quick actions</h3>
              <div className="rounded-2xl bg-[#081B2E] p-4 text-sm text-muted">
                Update workflow timers, review OTP delivery success, and validate compliance rules for new agents.
              </div>
              <button className="w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-black transition hover:opacity-95">
                Save configuration
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
