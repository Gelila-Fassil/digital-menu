// This is a simple wrapper for the canvas-confetti library
// In a real project, you would install the package via npm
// but for this demo, we're using a simplified version

export function triggerConfetti(options: any = {}) {
  if (typeof window === "undefined") return

  // Default options
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  }

  const mergedOptions = { ...defaults, ...options }

  // Create canvas element
  const canvas = document.createElement("canvas")
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.pointerEvents = "none"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.zIndex = "999999"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Simple confetti effect
  const colors = ["#f97316", "#ea580c", "#f59e0b", "#d97706", "#b45309"]

  for (let i = 0; i < mergedOptions.particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 10 + 5
    const x = Math.random() * canvas.width
    const y = canvas.height * mergedOptions.origin.y
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 5 + 2

    setTimeout(() => {
      createParticle(ctx, x, y, size, color, angle, velocity)
    }, Math.random() * 500)
  }

  // Remove canvas after animation
  setTimeout(() => {
    document.body.removeChild(canvas)
  }, 5000)
}

function createParticle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  angle: number,
  velocity: number,
) {
  let particleX = x
  let particleY = y
  const gravity = 0.1
  let velocityY = Math.sin(angle) * velocity
  const velocityX = Math.cos(angle) * velocity

  function update() {
    particleX += velocityX
    particleY += velocityY
    velocityY += gravity

    // Draw particle
    ctx.beginPath()
    ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Continue animation if particle is still on screen
    if (particleY < ctx.canvas.height + size) {
      requestAnimationFrame(update)
    }
  }

  update()
}
