import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    predictions: [
      {
        customer: "David Okafor",
        recoveryProbability: 92,
        nextAction: "Send WhatsApp Resume Link",
      },

      {
        customer: "Amina Bello",
        recoveryProbability: 78,
        nextAction: "Offer Cashback Incentive",
      },
    ],
  })
}