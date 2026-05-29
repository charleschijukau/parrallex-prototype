import { NextResponse } from "next/server"
import { customers } from "../../../mock/customers"

export async function GET() {
	return NextResponse.json({ customers })
}
