import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface ClosingProps {
  active: boolean
}

interface Badge {
  icon: IconName
  label: string
  color: string
}

const badges: Badge[] = [
  { icon: 'Globe', label: 'Multi-Cloud', color: '#0078d4' },
  { icon: 'Activity', label: 'Real-Time', color: '#22d3ee' },
  { icon: 'RefreshCw', label: 'Self-Healing', color: '#34d399' },
]

export const Closing = ({ active }: ClosingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const convergence = container.querySelector('.convergence-effect')
    const logo = container.querySelector('.brand-logo')
    const title = container.querySelector('.brand-title')
    const tagline = container.querySelector('.brand-tagline')
    const badgeEls = container.querySelectorAll('.badge-item')

    gsap.fromTo(convergence, { opacity: 1 }, { opacity: 0.4, duration: 1.5, delay: 1 })
    gsap.fromTo(logo, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "power2.out" })
    gsap.fromTo(title, { opacity: 0, y: 30, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.8, ease: "power2.out" })
    gsap.fromTo(tagline, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.2 })
    gsap.fromTo(badgeEls, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: 1.5, ease: "power2.out" })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="nebula" />

        {/* Convergence Effect */}
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

            {/* Converging particles from edges */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180)
              const startX = 500 + Math.cos(angle) * 600
              const startY = 300 + Math.sin(angle) * 400
              const colors = ['#0078d4', '#22d3ee', '#34d399', '#64748b']
              const color = colors[i % colors.length]

              return (
                <circle key={i} r={2 + (i % 3)} fill={color} filter="url(#finalGlow)">
                  <animate attributeName="cx" values={`${startX};500`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${startY};300`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                </circle>
              )
            })}

            {/* Spiral particles */}
            {[...Array(4)].map((_, i) => {
              const startAngle = i * 90
              const spiralPath = `M ${500 + Math.cos(startAngle * Math.PI / 180) * 400} ${300 + Math.sin(startAngle * Math.PI / 180) * 300} Q ${500 + Math.cos((startAngle + 90) * Math.PI / 180) * 200} ${300 + Math.sin((startAngle + 90) * Math.PI / 180) * 150} 500 300`

              return (
                <circle key={`spiral-${i}`} r="2" fill="#a78bfa" opacity="0.8">
                  <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" path={spiralPath} begin={`${i * 0.4}s`} />
                </circle>
              )
            })}
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 text-center">
          {/* Logo */}
          <div className="brand-logo flex justify-center mb-10">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-[60px] animate-pulse-slow" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center shadow-[0_0_100px_-20px_rgba(34,211,238,0.6)]">
                <div className="absolute inset-1 rounded-full bg-deck-bg" />
                <Icon name="Cpu" size={56} strokeWidth={0.75} className="text-cyan-400 relative z-10" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="brand-title text-6xl md:text-7xl font-bold tracking-[0.2em] uppercase mb-6">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>

          {/* Tagline */}
          <p className="brand-tagline text-xl md:text-2xl text-white/70 font-normal mb-14 tracking-wide">
            Autonomous operations, unified control
          </p>

          {/* Badges */}
          <div className="flex justify-center gap-6">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="badge-item flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  backgroundColor: `${badge.color}15`,
                  border: `1px solid ${badge.color}40`,
                }}
              >
                <Icon name={badge.icon} size={18} strokeWidth={1.5} style={{ color: badge.color }} />
                <span className="text-sm font-medium" style={{ color: badge.color }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
