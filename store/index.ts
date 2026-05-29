'use client'
import { create } from 'zustand'
import type { Customer, Agent, Notification } from '@/types'
import { notifications as mockNotifications } from '@/mock/data'

interface DashboardStore {
  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void

  // Notifications
  notifications: Notification[]
  unreadCount: number
  markAllRead: () => void
  markRead: (id: string) => void

  // Customer selection
  selectedCustomer: Customer | null
  setSelectedCustomer: (c: Customer | null) => void

  // Agent selection
  selectedAgent: Agent | null
  setSelectedAgent: (a: Agent | null) => void

  // Pipeline filters
  s1Filter: string
  s2Filter: string
  s3Filter: string
  setS1Filter: (f: string) => void
  setS2Filter: (f: string) => void
  setS3Filter: (f: string) => void

  // Active tab on pipeline page
  pipelineTab: 'overview' | 'S1' | 'S2' | 'S3'
  setPipelineTab: (t: 'overview' | 'S1' | 'S2' | 'S3') => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  markAllRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  markRead: (id) => set(s => {
    const updated = s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    return { notifications: updated, unreadCount: updated.filter(n => !n.read).length }
  }),

  selectedCustomer: null,
  setSelectedCustomer: (c) => set({ selectedCustomer: c }),

  selectedAgent: null,
  setSelectedAgent: (a) => set({ selectedAgent: a }),

  s1Filter: 'all',
  s2Filter: 'all',
  s3Filter: 'all',
  setS1Filter: (f) => set({ s1Filter: f }),
  setS2Filter: (f) => set({ s2Filter: f }),
  setS3Filter: (f) => set({ s3Filter: f }),

  pipelineTab: 'overview',
  setPipelineTab: (t) => set({ pipelineTab: t }),
}))

// ─── Mobile onboarding session store ─────────────────────────────────
import type { OnboardingSession, NINData } from '@/types'

interface OnboardingStore {
  session: OnboardingSession
  setPhone: (phone: string) => void
  setOTPVerified: () => void
  setNINData: (data: NINData) => void
  setBVNFallback: () => void
  setStage: (stage: OnboardingSession['stage']) => void
  setConsent: (marketing: boolean, whatsapp: boolean) => void
  resetSession: () => void
}

const defaultSession: OnboardingSession = {
  phone: '',
  otpVerified: false,
  ninData: null,
  bvnFallback: false,
  stage: 'phone',
  consentMarketing: false,
  consentWhatsapp: true,
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  session: defaultSession,
  setPhone: (phone) => set(s => ({ session: { ...s.session, phone } })),
  setOTPVerified: () => set(s => ({ session: { ...s.session, otpVerified: true, stage: 'profile_confirm' } })),
  setNINData: (ninData) => set(s => ({ session: { ...s.session, ninData } })),
  setBVNFallback: () => set(s => ({ session: { ...s.session, bvnFallback: true } })),
  setStage: (stage) => set(s => ({ session: { ...s.session, stage } })),
  setConsent: (consentMarketing, consentWhatsapp) => set(s => ({ session: { ...s.session, consentMarketing, consentWhatsapp } })),
  resetSession: () => set({ session: defaultSession }),
}))