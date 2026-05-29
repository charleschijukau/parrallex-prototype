
export default function MobileShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mobile-shell">
        <div className="p-6">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="font-black text-xl text-text">
                Parallex
              </h1>

              <p className="text-xs text-muted">
                Smart Banking
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-text">
              <div className="live-dot" />
              Connected
            </div>
          </div>

          {children}
        </div>
      </div>
    </main>
  )
}
