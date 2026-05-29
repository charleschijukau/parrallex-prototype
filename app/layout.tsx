
import "./globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title:
    "Parallex Lifecycle Intelligence Platform",

  description:
    "Enterprise onboarding and CRM intelligence",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="
            min-h-screen
            bg-[#071521]
            text-white
          "
        >
          <div className="container-shell page-shell page-padding p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}