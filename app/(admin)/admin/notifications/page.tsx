export default function NotificationsPage() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      <div className="mt-8 space-y-4">
        <div className="bg-[#10263D] rounded-2xl p-5">
          WhatsApp OTP delivery successful
        </div>

        <div className="bg-[#10263D] rounded-2xl p-5">
          Dormant account recovery triggered
        </div>

        <div className="bg-[#10263D] rounded-2xl p-5">
          AI escalation generated
        </div>
      </div>
    </main>
  )
}