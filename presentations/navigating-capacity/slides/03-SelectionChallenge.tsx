import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * The Model Selection Challenge - Visualized as COMPLEXITY
 * A branching path visualization showing how model selection
 * has become a maze of confusing choices and tradeoffs.
 */
export function SelectionChallenge({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const startNode = container.querySelector('.start-node')
    const lines = container.querySelectorAll('.connection-line')
    const challenges = container.querySelectorAll('.challenge-node')

    // Title
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    // Start node appears
    gsap.fromTo(startNode,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: 'back.out(1.5)' }
    )

    // Lines draw outward from center
    lines.forEach((line, i) => {
      const length = (line as SVGLineElement).getTotalLength?.() || 300
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 0.4,
        delay: 0.9 + i * 0.1,
        ease: 'power2.out'
      })
    })

    // Challenge nodes appear after their lines draw
    gsap.fromTo(challenges,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: 1.1, ease: 'back.out(1.4)' }
    )

  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  const challenges = [
    {
      icon: 'Brain' as const,
      label: 'Reasoning Models',
      description: 'GPT-5 series fundamentally changes compute profile',
      color: '#f97316',
      position: { x: -300, y: -120 },
    },
    {
      icon: 'Server' as const,
      label: 'Capacity Constraints',
      description: 'First choice model is often unavailable',
      color: '#ef4444',
      position: { x: 300, y: -120 },
    },
    {
      icon: 'TrendingUp' as const,
      label: 'Migration Complexity',
      description: 'Upgrade paths are unclear and shifting',
      color: '#eab308',
      position: { x: -300, y: 120 },
    },
    {
      icon: 'Eye' as const,
      label: 'Variant Confusion',
      description: 'Chat, mini, experimental, GA—hard to track',
      color: '#8b5cf6',
      position: { x: 300, y: 120 },
    },
    {
      icon: 'BarChart' as const,
      label: 'Evaluation Gaps',
      description: 'Robust eval frameworks exist but not yet prioritized',
      color: '#10b981',
      position: { x: 0, y: 220 },
    },
  ]

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-page grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Scattered question marks for confusion effect */}
      {[
        { x: '8%', y: '15%' }, { x: '88%', y: '20%' }, { x: '5%', y: '75%' },
        { x: '92%', y: '80%' }, { x: '15%', y: '45%' }, { x: '85%', y: '50%' },
      ].map((pos, i) => (
        <span
          key={i}
          className="absolute text-white/10 text-6xl font-light select-none"
          style={{ left: pos.x, top: pos.y }}
        >
          ?
        </span>
      ))}

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Model Selection Challenge
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Why picking the right model is harder than ever
          </p>
        </div>

        {/* Branching Path Visualization */}
        <div className="relative w-[800px] h-[500px]">
          {/* SVG paths connecting center to challenges */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
            <defs>
              {challenges.map((c, i) => (
                <linearGradient key={i} id={`path-grad-${i}`} gradientUnits="userSpaceOnUse"
                  x1="400" y1="220" x2={400 + c.position.x} y2={220 + c.position.y}>
                  <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
                  <stop offset="100%" stopColor={c.color} stopOpacity="0.6" />
                </linearGradient>
              ))}
            </defs>

            {/* Animated branching paths */}
            {challenges.map((c, i) => {
              const startX = 400
              const startY = 220
              const endX = 400 + c.position.x
              const endY = 220 + c.position.y

              return (
                <line
                  key={i}
                  className="connection-line"
                  x1={startX} y1={startY} x2={endX} y2={endY}
                  stroke={`url(#path-grad-${i})`}
                  strokeWidth="2"
                />
              )
            })}
          </svg>

          {/* Center start node - "Your Model Choice" */}
          <div className="start-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-xl" />
              <div className="relative w-32 h-32 rounded-full bg-black border-2 border-cyan-500/50 flex flex-col items-center justify-center">
                <Icon name="Cpu" size={40} className="text-cyan-400 mb-2" />
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">Model</span>
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">Choice</span>
              </div>
            </div>
          </div>

          {/* Challenge nodes - ALL SAME SIZE */}
          {challenges.map((c, i) => (
            <div
              key={i}
              className="challenge-node absolute w-[260px]"
              style={{
                left: `calc(50% + ${c.position.x}px)`,
                top: `calc(50% + ${c.position.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="flex items-center gap-4 px-5 py-4 rounded-xl border bg-black/60 backdrop-blur-sm"
                style={{ borderColor: `${c.color}50` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}25` }}
                >
                  <Icon name={c.icon} size={24} style={{ color: c.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-base font-semibold block" style={{ color: c.color }}>
                    {c.label}
                  </span>
                  <span className="text-white/60 text-sm leading-tight block mt-1">
                    {c.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
