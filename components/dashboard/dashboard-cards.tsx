import { Card } from '@/components/ui/card'

const stats = [
  {
    title: 'Downloads',
    value: '5,240',
  },
  {
    title: 'Completion Rate',
    value: '78%',
  },
  {
    title: 'Recovery Lift',
    value: '+41%',
  },
  {
    title: 'OTP Success',
    value: '96%',
  },
]

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="bg-[#10263D] border-[#1D3A59] p-6 rounded-2xl"
        >
          <p className="text-[#94a3b8]">{stat.title}</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{stat.value}</h2>
        </Card>
      ))}
    </div>
  )
}