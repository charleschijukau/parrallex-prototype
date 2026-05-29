"use client"

import { useRouter } from 'next/navigation'
import { agents } from '@/mock/data'
import { Users } from 'lucide-react'

export default function QuickDemoLogin() {
  const router = useRouter()

  function quickLogin(id: string) {
    // set demo auth cookie and remember demo user id
    document.cookie = `parallex-demo-auth=true; path=/`
    document.cookie = `parallex-demo-user=${id}; path=/`
    router.push('/admin')
  }

  // pick first three agents as demo admin users
  const demoUsers = agents.slice(0, 3)

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#081B2E] p-4 text-sm text-muted">
      <div className="mb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9]">
          <Users size={16} />
        </div>
        <div>
          <p className="text-xs text-muted">Demo admin accounts</p>
          <p className="text-white font-medium">Select a demo user to preview the back office</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {demoUsers.map((u) => (
          <button key={u.id} onClick={() => quickLogin(u.id)}
            className="text-left rounded-2xl border border-white/6 bg-transparent px-3 py-3 hover:bg-white/5">
            <p className="font-semibold text-white">{u.name}</p>
            <p className="text-xs text-muted">Zone: {u.zone} · Capacity {u.capacity}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
