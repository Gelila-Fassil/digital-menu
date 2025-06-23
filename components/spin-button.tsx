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
        className={`fixed bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold p-0 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 z-50 flex flex-col items-center justify-center
    w-20 h-20 md:w-32 md:h-32 md:bottom-8 md:right-8 overflow-hidden ${
          isAnimating ? "animate-bounce" : ""
        }`}
        style={{
          minWidth: "0",
          width: undefined,
          height: undefined,
          boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)",
          border: "2px solid #fff",
        }}
      >
        <span className="animate-spin text-xl md:text-3xl leading-none">🎡</span>
        <span className="text-[10px] md:text-base leading-tight text-center px-0 block max-w-[60px] md:max-w-[90px] whitespace-normal break-words">
          Spin & Win!
          <br />
          <span className="text-[8px] md:text-xs text-amber-100">Win free items</span>
        </span>
      </button>

      {isGameOpen && <SpinGame onClose={() => setIsGameOpen(false)} />}
    </>
  )
}
