import type { Metadata } from 'next'
import AdminLayout from '@/components/layout/Adminlayout'

export const metadata: Metadata = {
  title: 'Parallex CRM — Back Office',
  description: 'Onboarding & Customer Lifecycle Management',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}