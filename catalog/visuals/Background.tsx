import { useRef, useEffect } from 'react'

interface BackgroundProps {
  variant?: 'default' | 'grid' | 'horizon' | 'nebula' | 'glow' | 'particles'
}

export function Background({ variant = 'default' }: BackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,15,30,1)_0%,rgba(0,0,0,1)_70%)]" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {variant === 'grid' && (
        <div className="absolute inset-0 bg-grid opacity-60" />
      )}

      {variant === 'horizon' && (
        <div className="absolute inset-0 bg-horizon opacity-70" />
      )}

      {variant === 'nebula' && (
        <div className="absolute inset-0 bg-nebula opacity-80" />
      )}

      {variant === 'glow' && (
        <>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[150px] animate-pulse-slow"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] animate-pulse-slow"
            style={{ animationDelay: '1.5s' }}
          />
        </>
      )}

      {variant === 'particles' && (
        <ParticleField />
      )}
    </div>
  )
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }

    const particles: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let animationId: number

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
