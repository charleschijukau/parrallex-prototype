'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { allCustomers } from '@/mock/data'
import { SectionCard, SectionHeader, FilterPills, TableWrap, Th, Td, TRow, Badge, GhostButton } from '@/components/shared/ui'
import { cn, kycBadgeColor, scenarioBadgeColor, statusBadgeColor, nudgeBadgeColor, nudgeLabel, formatDateTime, timeAgo } from '@/lib/utils'
import { Search, Download } from 'lucide-react'
import type { Scenario } from '@/types'

export default function CustomersPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [scenarioFilter, setScenarioFilter] = useState('all')

  const filtered = allCustomers.filter(c => {
    const matchScenario = scenarioFilter === 'all' || c.scenario === scenarioFilter
    const q = search.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.maskedPhone.includes(q) || c.zone.toLowerCase().includes(q)
    return matchScenario && matchSearch
  })

  return (
    <div className="space-y-6 fade-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Customers</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{allCustomers.length} total records in pipeline</p>
        </div>
        <GhostButton><Download size={14} /> Export CSV</GhostButton>
      </div>

      <SectionCard>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, phone, zone..."
              className="fintech-input text-sm pl-9 py-2 text-white placeholder-muted"
              style={{ fontSize: 13 }}
            />
          </div>
          <FilterPills
            options={[
              { value: 'all', label: 'All scenarios' },
              { value: 'S1', label: 'S1' },
              { value: 'S2', label: 'S2' },
              { value: 'S3', label: 'S3' },
            ]}
            active={scenarioFilter} onChange={setScenarioFilter} />
        </div>

        <TableWrap>
          <thead>
            <tr>
              <Th>Customer / contact</Th>
              <Th>Scenario</Th>
              <Th>KYC method</Th>
              <Th>Zone</Th>
              <Th>Captured</Th>
              <Th>Status</Th>
              <Th>Nudge</Th>
              <Th>Flags</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <TRow key={c.id} onClick={() => router.push(`/admin/customers/${c.id}`)}>
                <Td>
                  <div className="font-medium text-white">{c.name !== 'Unknown' ? c.name : c.maskedPhone}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{c.gender} · {c.age} yrs</div>
                </Td>
                <Td><Badge className={scenarioBadgeColor(c.scenario)}>{c.scenario}</Badge></Td>
                <Td><Badge className={kycBadgeColor(c.kycMethod)}>{c.kycMethod}</Badge></Td>
                <Td><span className="text-xs" style={{ color: 'var(--muted)' }}>{c.zone}</span></Td>
                <Td><span className="text-xs" style={{ color: 'var(--muted)' }}>{timeAgo(c.capturedAt)}</span></Td>
                <Td><Badge className={statusBadgeColor(c.status)}>{c.status}</Badge></Td>
                <Td><Badge className={nudgeBadgeColor(c.nudgeStatus)}>{nudgeLabel(c.nudgeStatus)}</Badge></Td>
                <Td>
                  {c.flags.length > 0 ? (
                    <span className="text-xs text-warning font-medium">{c.flags.length} flag{c.flags.length > 1 ? 's' : ''}</span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>—</span>
                  )}
                </Td>
              </TRow>
            ))}
          </tbody>
        </TableWrap>
        <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>Showing {filtered.length} of {allCustomers.length} records</p>
      </SectionCard>
    </div>
  )
}