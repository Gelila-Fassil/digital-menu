import { NextResponse } from "next/server"

type SpinRecord = { name: string; phone: string; lastSpin: number }

// In-memory store (replace with a DB in production)
const spins: SpinRecord[] = []

export async function POST(request: Request) {
  const { name, phone } = (await request.json()) as { name: string; phone: string }

  if (!name || !phone) {
    return NextResponse.json({ allowed: false, message: "Name and phone required" }, { status: 400 })
  }

  const now = Date.now()
  const record = spins.find(r => r.phone === phone)

  if (record && (now - record.lastSpin) < 24 * 60 * 60 * 1000) {
    // Less than 24 hours since last spin
    return NextResponse.json({ allowed: false, message: "You can only spin once every 24 hours. Please come back tomorrow!" }, { status: 200 })
  }

  if (record) {
    record.lastSpin = now
    record.name = name
  } else {
    spins.push({ name, phone, lastSpin: now })
  }

  return NextResponse.json({ allowed: true }, { status: 200 })

} 