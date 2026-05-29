import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    otp: '4452',
    delivery: 'WhatsApp Delivered',
  })
}