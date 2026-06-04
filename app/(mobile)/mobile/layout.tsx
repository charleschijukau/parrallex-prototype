import type { Metadata } from 'next'
import MobileShell from '@/components/mobile/mobile-shell'

export const metadata: Metadata = {
  title: 'Parallex Bank',
  description: 'Mobile Onboarding',
}

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileShell>{children}</MobileShell>
      
  )
}