import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Find or create user
    let user = await User.findOne({ email })
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({ email, lastSpin: new Date() })
      return NextResponse.json({ message: 'First spin successful!' }, { status: 200 })
    }

    // Check if 24 hours have passed since last spin
    const now = new Date()
    const lastSpin = user.lastSpin
    const hoursSinceLastSpin = lastSpin 
      ? (now.getTime() - lastSpin.getTime()) / (1000 * 60 * 60)
      : 24 // If no last spin, treat as if 24 hours have passed

    if (hoursSinceLastSpin < 24) {
      const hoursLeft = Math.ceil(24 - hoursSinceLastSpin)
      return NextResponse.json(
        { 
          error: `You can only spin once every 24 hours. Try again in ${hoursLeft} hours.`,
          hoursLeft 
        },
        { status: 403 }
      )
    }

    // Update lastSpin timestamp
    user.lastSpin = now
    await user.save()

    return NextResponse.json({ message: 'Spin successful!' }, { status: 200 })

  } catch (error) {
    console.error('Spin API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 