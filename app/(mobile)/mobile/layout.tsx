import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parallex Bank',
  description: 'Mobile Onboarding',
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell flex flex-col min-h-screen" style={{ background: 'linear-gradient(180deg, #10263d, #071521)' }}>
      {children}
    </div>
  )
}