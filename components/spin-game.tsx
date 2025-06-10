"use client"

import { useState, useRef, useEffect } from "react"

interface Prize {
  id: number
  text: string
  color: string
  probability: number
}

const prizes: Prize[] = [
  { id: 1, text: "Free Dessert", color: "#f97316", probability: 15 },
  { id: 2, text: "Free Drink", color: "#ea580c", probability: 15 },
  { id: 3, text: "10% Off", color: "#f59e0b", probability: 20 },
  { id: 4, text: "Try Again", color: "#d97706", probability: 30 },
  { id: 5, text: "Free Appetizer", color: "#b45309", probability: 10 },
  { id: 6, text: "20% Off", color: "#92400e", probability: 10 },
]

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function SpinGame({ onClose }: { onClose: () => void }) {
  const [spinning, setSpinning] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const [rotation, setRotation] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError(null)
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (newEmail) {
      validateEmail(newEmail)
    } else {
      setEmailError(null)
    }
  }

  const handleSpin = async () => {
    if (spinning || isChecking) return
    if (!validateEmail(email)) return

    setIsChecking(true)
    setError(null)

    try {
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        setIsChecking(false)
        return
      }

      // If API call successful, proceed with spinning
      setError(null)
      setSpinning(true)
      setResult(null)
      setCelebrating(false)

      // Start the wheel animation immediately
      const segmentAngle = 360 / prizes.length
      const extraRotations = 3 + Math.floor(Math.random() * 3)
      const fullRotations = extraRotations * 360
      const randomSegment = Math.floor(Math.random() * prizes.length)
      const targetAngle = 360 - randomSegment * segmentAngle
      const finalRotation = rotation + fullRotations + targetAngle
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        setRotation(finalRotation)
      })

      const selectedPrize = prizes[randomSegment]

      // Show result after animation
      setTimeout(() => {
        setSpinning(false)
        setIsChecking(false)
        setResult(selectedPrize)
        if (selectedPrize.text !== "Try Again") {
          setCelebrating(true)
        }
      }, 3000) // Reduced from 5000ms to 3000ms for faster feedback

    } catch (err) {
      setError('Failed to process spin. Please try again.')
      setIsChecking(false)
      console.error('Spin error:', err)
    }
  }

  // Simple celebration effect
  useEffect(() => {
    if (celebrating && resultRef.current) {
      const element = resultRef.current
      element.style.animation = "none"
      // Trigger reflow
      void element.offsetWidth
      element.style.animation = "pulse 1s ease-in-out 3"
    }
  }, [celebrating])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        @keyframes highlight {
          0% { background-color: rgba(249, 115, 22, 0.1); }
          50% { background-color: rgba(249, 115, 22, 0.3); }
          100% { background-color: rgba(249, 115, 22, 0.1); }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-amber-800 font-serif">Spin & Win</h2>
          <p className="text-amber-600 mt-2">Spin the wheel for a chance to win prizes while you wait!</p>
        </div>

        {/* Email input with validation */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              emailError 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-amber-500'
            }`}
            disabled={spinning || isChecking}
          />
          {emailError && (
            <p className="mt-2 text-red-600 text-sm">{emailError}</p>
          )}
        </div>

        <div className="relative mx-auto mb-8" style={{ width: "300px", height: "300px" }}>
          {/* Wheel background with segments - no offset */}
          <div
            className="absolute inset-0 rounded-full border-4 border-amber-800 overflow-hidden"
            style={{
              transform: "rotate(0deg)",
              background: `conic-gradient(
                ${prizes[0].color} 0deg ${360 / prizes.length}deg, 
                ${prizes[1].color} ${360 / prizes.length}deg ${(2 * 360) / prizes.length}deg, 
                ${prizes[2].color} ${(2 * 360) / prizes.length}deg ${(3 * 360) / prizes.length}deg, 
                ${prizes[3].color} ${(3 * 360) / prizes.length}deg ${(4 * 360) / prizes.length}deg, 
                ${prizes[4].color} ${(4 * 360) / prizes.length}deg ${(5 * 360) / prizes.length}deg, 
                ${prizes[5].color} ${(5 * 360) / prizes.length}deg 360deg
              )`,
            }}
          />

          {/* Spinning overlay with dividers and text */}
          <div
            ref={wheelRef}
            className="absolute inset-0 rounded-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 5s cubic-bezier(0.1, 0.05, 0.05, 1.0)" : "none",
            }}
          >
            {/* Divider lines */}
            {prizes.map((_, index) => {
              const angle = (index * 360) / prizes.length
              return (
                <div
                  key={`divider-${index}`}
                  className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white"
                  style={{
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    transformOrigin: "bottom center",
                  }}
                />
              )
            })}

            {/* Prize labels that rotate with the wheel */}
            {prizes.map((prize, index) => {
              const angle = (index * 360) / prizes.length
              const labelAngle = angle + 360 / prizes.length / 2

              // Calculate position using trigonometry
              const radius = 90 // Distance from center (0-150, where 150 is edge)
              const radian = (labelAngle * Math.PI) / 180
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius

              return (
                <div
                  key={`label-${index}`}
                  className="absolute top-1/2 left-1/2 bg-black bg-opacity-40 px-2 py-1 rounded text-white font-bold text-xs whitespace-nowrap"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                  }}
                >
                  {prize.text}
                </div>
              )
            })}
          </div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-amber-800 z-10"></div>

          {/* Pointer - made larger and more prominent */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-amber-800 drop-shadow-lg"></div>
          </div>
        </div>

        {result ? (
          <div
            ref={resultRef}
            className={`text-center mb-6 rounded-lg border-2 p-6 ${
              result.text === "Try Again"
                ? "bg-amber-50 border-amber-200"
                : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300"
            }`}
            style={{
              boxShadow: result.text !== "Try Again" ? "0 0 15px rgba(249, 115, 22, 0.3)" : "none",
            }}
          >
            <h3 className="text-2xl font-bold text-amber-800">
              {result.text === "Try Again" ? "Better luck next time!" : "You won! 🎉"}
            </h3>
            <p className="text-amber-700 text-lg mt-2">
              {result.text === "Try Again"
                ? "Give it another spin!"
                : "Show this to our staff to get your prize. Thank you for coming! Come next time."}
            </p>
          </div>
        ) : null}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSpin}
            disabled={spinning || isChecking}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 ${
              spinning || isChecking
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:scale-105 active:scale-95"
            }`}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">🎡</span>
                Spinning...
              </span>
            ) : isChecking ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Checking...
              </span>
            ) : (
              "Spin Now!"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={spinning || isChecking}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 ${
              spinning || isChecking
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700 hover:scale-105 active:scale-95"
            }`}
          >
            Close
          </button>
        </div>

        {/* Show error message if any */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function SpinWithCheck() {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [allowed, setAllowed] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/spin-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (data.allowed) {
      setAllowed(true)
    } else {
      setError(data.message)
    }
  }

  if (allowed) {
    return <SpinGame onClose={() => setAllowed(false)} />
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enter your details to spin</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 rounded font-bold"
        disabled={loading}
      >
        {loading ? "Checking..." : "Spin!"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  )
}
