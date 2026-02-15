import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface Props {
  active: boolean
}

/**
 * Part 2 Section Divider - Managing Capacity
 */
export function Part2Capacity({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const partLabel = container.querySelector('.part-label')
    const title = container.querySelector('.section-title')
    const line = container.querySelector('.divider-line')

    gsap.fromTo(partLabel, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
    gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' })
    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 })

  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <p className="part-label text-violet-400 text-lg font-medium tracking-[0.3em] uppercase mb-6">
            Part 2
          </p>

          <div className="divider-line w-24 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-6 origin-center" />

          <h1 className="section-title text-6xl font-bold tracking-[0.06em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Managing Capacity
          </h1>
        </div>
      </div>
    </div>
  )
}
