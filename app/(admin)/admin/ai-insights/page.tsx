const insights = [
  {
    title: 'High Recovery Probability',
    customer: 'David Okafor',
    score: '92%',
  },
  {
    title: 'Dormancy Risk',
    customer: 'Sarah Musa',
    score: '87%',
  },
]

export default function AIInsightsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Lifecycle Intelligence</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item) => (
          <div
            key={item.customer}
            className="bg-[#10263D] rounded-2xl p-6"
          >
            <p className="text-gray-400">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">
              {item.customer}
            </h2>
            <p className="mt-3 text-green-400">
              AI Confidence: {item.score}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}