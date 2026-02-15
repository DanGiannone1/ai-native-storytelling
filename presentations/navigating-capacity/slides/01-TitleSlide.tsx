import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background } from '@catalog/visuals'
import { Icon } from '@catalog/primitives'

interface TitleSlideProps {
  active: boolean
}

export function TitleSlide({ active }: TitleSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const convergence = container.querySelector('.convergence-effect')
    const mainTitle = container.querySelector('.main-title')
    const bentoBoxes = container.querySelectorAll('.bento-box')

    gsap.fromTo(convergence, { opacity: 1 }, { opacity: 0.25, duration: 2, delay: 1.5 })
    gsap.fromTo(mainTitle, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 0.5, ease: 'power2.out' })
    gsap.fromTo(bentoBoxes, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 1.2, ease: 'back.out(1.4)' })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="nebula" />

        {/* Convergence animation effect */}
        <div className="convergence-effect absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <defs>
              <radialGradient id="convergenceGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <filter id="finalGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <circle cx="500" cy="300" r="200" fill="url(#convergenceGlow)" />

            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180)
              const startX = 500 + Math.cos(angle) * 600
              const startY = 300 + Math.sin(angle) * 400
              const colors = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24']
              const color = colors[i % colors.length]

              return (
                <circle key={i} r={3 + (i % 3)} fill={color} filter="url(#finalGlow)">
                  <animate attributeName="cx" values={`${startX};500`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${startY};300`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                </circle>
              )
            })}

            {[...Array(8)].map((_, i) => {
              const startAngle = i * 45
              const spiralPath = `M ${500 + Math.cos(startAngle * Math.PI / 180) * 400} ${300 + Math.sin(startAngle * Math.PI / 180) * 300} Q ${500 + Math.cos((startAngle + 90) * Math.PI / 180) * 200} ${300 + Math.sin((startAngle + 90) * Math.PI / 180) * 150} 500 300`

              return (
                <circle key={`spiral-${i}`} r="2" fill="#a78bfa" opacity="0.8">
                  <animateMotion dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" path={spiralPath} begin={`${i * 0.3}s`} />
                </circle>
              )
            })}
          </svg>
        </div>

        {/* Title content */}
        <div className="z-10 text-center px-8">
          <h1 className="main-title text-5xl md:text-6xl font-bold tracking-wide leading-tight mb-10">
            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              Navigating Model Selection
            </span>
            <br />
            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              & Capacity
            </span>
          </h1>

          {/* Bento grid */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bento-box p-5 rounded-xl bg-white/5 border border-orange-500/20 backdrop-blur-sm flex flex-col items-center gap-3">
              <Icon name="Zap" size={28} className="text-orange-400" />
              <span className="text-white/80 text-sm font-medium">Capacity Reality</span>
            </div>
            <div className="bento-box p-5 rounded-xl bg-white/5 border border-cyan-500/20 backdrop-blur-sm flex flex-col items-center gap-3">
              <Icon name="Cpu" size={28} className="text-cyan-400" />
              <span className="text-white/80 text-sm font-medium">Model Selection</span>
            </div>
            <div className="bento-box p-5 rounded-xl bg-white/5 border border-violet-500/20 backdrop-blur-sm flex flex-col items-center gap-3">
              <Icon name="Target" size={28} className="text-violet-400" />
              <span className="text-white/80 text-sm font-medium">Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
