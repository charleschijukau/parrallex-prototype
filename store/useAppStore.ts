import { create } from 'zustand'

interface AppState {
  otpVerified: boolean
  setOtpVerified: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  otpVerified: false,
  setOtpVerified: (value) => set({ otpVerified: value }),
}))