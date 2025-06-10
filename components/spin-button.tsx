"use client"

import { useState, useEffect } from "react"
import { SpinGame } from "./spin-game"

export default function SpinButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Show the button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    // Set up animation interval
    const animationInterval = setInterval(() => {
      setIsAnimating((prev) => !prev)
    }, 1500)

    return () => {
      clearTimeout(timer)
      clearInterval(animationInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <button
        onClick={() => setIsGameOpen(true)}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center gap-3 ${
          isAnimating ? "animate-bounce" : ""
        }`}
        style={{
          boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)",
          border: "2px solid #fff",
        }}
      >
        <span className="animate-spin text-2xl">🎡</span>
        <div className="flex flex-col items-start">
          <span className="text-lg">Spin & Win!</span>
          <span className="text-xs text-amber-100">Win free items while you wait</span>
        </div>
      </button>

      {isGameOpen && <SpinGame onClose={() => setIsGameOpen(false)} />}
    </>
  )
}
