'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { SectionCard, SectionHeader, StatCard, ProgressBar } from '@/components/shared/ui'
import { dailyOverview } from '@/mock/data'
import { TrendingUp, TrendingDown } from 'lucide-react'

const weeklyFunnel = [
  { day:'Mon', downloads:1020, completed:644, transacted:145, slaOk:89 },
  { day:'Tue', downloads:1105, completed:712, transacted:163, slaOk:91 },
  { day:'Wed', downloads:1190, completed:755, transacted:177, slaOk:87 },
  { day:'Thu', downloads:1210, completed:790, transacted:188, slaOk:93 },
  { day:'Fri', downloads:1250, completed:811, transacted:196, slaOk:88 },
  { day:'Sat', downloads:1284, completed:847, transacted:203, slaOk:87 },
  { day:'Sun', downloads:1320, completed:880, transacted:218, slaOk:90 },
]

const geoData = [
  { state:'Lagos',        accounts:312, pct:37 },
  { state:'Abuja FCT',   accounts:141, pct:17 },
  { state:'Rivers',      accounts:108, pct:13 },
  { state:'Kano',        accounts:83,  pct:10 },
  { state:'Oyo',         accounts:75,  pct:9  },
  { state:'Enugu',       accounts:58,  pct:7  },
  { state:'Others',      accounts:70,  pct:8  },
]

const kycBreakdown = [
  { name:'NIN verified', value:731, color:'#9BA8F0' },
  { name:'BVN fallback', value:88,  color:'var(--px-gold-400)' },
  { name:'Manual KYC',   value:28,  color:'var(--danger)' },
]

const otpByHour = [
  { h:'6am',success:42,fail:3 }, { h:'7am',success:88,fail:5 }, { h:'8am',success:134,fail:8 },
  { h:'9am',success:109,fail:6 }, { h:'10am',success:97,fail:4 }, { h:'11am',success:78,fail:3 },
  { h:'12pm',success:65,fail:2 }, { h:'1pm',success:54,fail:3 }, { h:'2pm',success:48,fail:2 },
  { h:'3pm',success:61,fail:4 }, { h:'4pm',success:72,fail:3 }, { h:'5pm',success:58,fail:2 },
]

const GOLD = 'var(--px-gold-400)'
const BLUE = '#6B7AEE'
const TT = { contentStyle:{ background:'#121550', border:'1px solid rgba(201,148,58,0.22)', borderRadius:12, fontSize:12 }, labelStyle:{ color:'white' } }

export default function AnalyticsPage() {
  const d = dailyOverview
  const convRate = Math.round((d.completed / d.downloads) * 100)
  const txRate   = Math.round((d.firstTransactions / d.completed) * 100)

  return (
    <div className="fade-up" style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div>
        <h1 style={{ fontSize:22, fontWeight:700, color:'white' }}>Analytics</h1>
        <p style={{ fontSize:13, color:'var(--muted)', marginTop:4 }}>Funnel performance, geographic distribution, OTP delivery, and KYC breakdown.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <StatCard label="Completion rate" value={`${convRate}%`} delta="↑ 3pp vs last week" deltaUp accent="gold" icon={<TrendingUp size={15}/>} />
        <StatCard label="Txn activation rate" value={`${txRate}%`} delta="↑ 5pp vs last week" deltaUp accent="blue" icon={<TrendingUp size={15}/>} />
        <StatCard label="NIN success rate" value="87%" delta="Stable" accent="green" />
        <StatCard label="OTP delivery (WA)" value="91%" delta="↑ 2pp — DND bypass working" deltaUp accent="gold" />
      </div>

      {/* Funnel trend + OTP by hour */}
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        <SectionCard>
          <SectionHeader title="Weekly funnel" subtitle="Downloads → Completed → Transacted" />
          <div style={{ display:'flex', gap:16, marginBottom:12, flexWrap:'wrap' }}>
            {[{c:'#2D38C4',l:'Downloads'},{c:GOLD,l:'Completed'},{c:'var(--success)',l:'Transacted'}].map(i => (
              <span key={i.l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'var(--muted)' }}>
                <span style={{ width:10, height:10, borderRadius:3, background:i.c, display:'inline-block' }} />{i.l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={weeklyFunnel}>
              <defs>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2D38C4" stopOpacity={0.25}/><stop offset="95%" stopColor="#2D38C4" stopOpacity={0}/></linearGradient>
                <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={GOLD} stopOpacity={0.25}/><stop offset="95%" stopColor={GOLD} stopOpacity={0}/></linearGradient>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--success)" stopOpacity={0.20}/><stop offset="95%" stopColor="var(--success)" stopOpacity={0}/></linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize:11, fill:'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:'var(--muted)' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip {...TT} />
              <Area type="monotone" dataKey="downloads" stroke="#2D38C4" strokeWidth={2} fill="url(#gB)" dot={false} />
              <Area type="monotone" dataKey="completed" stroke={GOLD}    strokeWidth={2} fill="url(#gG)" dot={false} />
              <Area type="monotone" dataKey="transacted" stroke="var(--success)" strokeWidth={2} fill="url(#gS)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard>
          <SectionHeader title="OTP delivery by hour" subtitle="Success vs failure count" />
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={otpByHour} barGap={2}>
              <XAxis dataKey="h" tick={{ fontSize:9, fill:'var(--muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:'var(--muted)' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip {...TT} />
              <Bar dataKey="success" fill={GOLD} radius={[3,3,0,0]} name="Success" />
              <Bar dataKey="fail" fill="var(--danger)" radius={[3,3,0,0]} name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Geo + KYC breakdown */}
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        <SectionCard>
          <SectionHeader title="Geographic distribution" subtitle="Onboarded accounts by state" />
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {geoData.map(g => (
              <div key={g.state}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:13, color:'white', fontWeight:500 }}>{g.state}</span>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>{g.accounts} accounts · {g.pct}%</span>
                </div>
                <ProgressBar pct={g.pct} color="var(--px-gold-400)" showPct={false} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <SectionHeader title="KYC method split" subtitle="Identity verification today" />
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <PieChart width={160} height={160}>
              <Pie data={kycBreakdown} cx={75} cy={75} innerRadius={52} outerRadius={70} dataKey="value" paddingAngle={4}>
                {kycBreakdown.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
            <div style={{ width:'100%', marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
              {kycBreakdown.map(k => (
                <div key={k.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:10, height:10, borderRadius:3, background:k.color, display:'inline-block' }} />
                    <span style={{ fontSize:12, color:'var(--muted)' }}>{k.name}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:'white' }}>{k.value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* SLA compliance trend */}
      <SectionCard>
        <SectionHeader title="Agent SLA compliance — daily" subtitle="% of records contacted within SLA window" />
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={weeklyFunnel}>
            <XAxis dataKey="day" tick={{ fontSize:11, fill:'var(--muted)' }} axisLine={false} tickLine={false} />
            <YAxis domain={[80,100]} tick={{ fontSize:11, fill:'var(--muted)' }} axisLine={false} tickLine={false} width={36} unit="%" />
            <Tooltip {...TT} formatter={(v: any) => [`${v}%`, 'SLA compliance']} />
            <Line type="monotone" dataKey="slaOk" stroke={GOLD} strokeWidth={2.5} dot={{ fill:GOLD, r:4 }} name="SLA compliance" />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  )
}