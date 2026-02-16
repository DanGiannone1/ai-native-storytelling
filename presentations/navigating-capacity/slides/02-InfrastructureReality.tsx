import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface Props {
  active: boolean
}

/**
 * The Capacity Reality - Visualized as PRESSURE
 * Three forces with animated particles flowing toward a central core
 * that continuously pulses/shrinks under pressure.
 */
export function InfrastructureReality({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const core = container.querySelector('.capacity-core')
    const constraints = container.querySelectorAll('.constraint-card')

    // Title
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    // Core appears
    gsap.fromTo(core, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: 'back.out(1.5)' })

    // Constraints appear
    gsap.fromTo(constraints,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, delay: 0.8, ease: 'back.out(1.4)' }
    )

  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  const constraints = [
    {
      headline: 'Supply constrained through 2028',
      subtext: 'GPU, memory & energy shortages are structural—not temporary',
      color: '#f97316',
      position: { x: 0, y: -170 }, // top
    },
    {
      headline: 'Microsoft prioritizing internally',
      subtext: 'Having to choose between internal products and enterprise customers',
      color: '#ef4444',
      position: { x: -280, y: 150 }, // bottom-left
    },
    {
      headline: '100× demand explosion',
      subtext: 'Production AI agents running 24/7 coming online',
      color: '#eab308',
      position: { x: 280, y: 150 }, // bottom-right
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

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Capacity Reality
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            2025–2028: Pressure mounting from all sides
          </p>
        </div>

        {/* Pressure Visualization */}
        <div className="relative w-[900px] h-[480px]">
          {/* SVG for animated flowing arrows */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 550">
            <defs>
              {constraints.map((c, i) => (
                <linearGradient key={`grad-${i}`} id={`arrow-grad-${i}`} gradientUnits="userSpaceOnUse"
                  x1={450 + c.position.x} y1={275 + c.position.y} x2="450" y2="275">
                  <stop offset="0%" stopColor={c.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                </linearGradient>
              ))}
              {/* Arrowhead markers for each color */}
              {constraints.map((c, i) => (
                <marker
                  key={`marker-${i}`}
                  id={`arrowhead-${i}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0,0 10,5 0,10" fill={c.color} />
                </marker>
              ))}
            </defs>

            {/* Animated flowing arrows along each path */}
            {constraints.map((c, i) => {
              const centerX = 450
              const centerY = 275
              const startX = centerX + c.position.x * 0.6
              const startY = centerY + c.position.y * 0.6
              const endX = centerX
              const endY = centerY

              // Calculate angle for arrow rotation (pointing toward center)
              const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)

              return (
                <g key={i}>
                  {/* Static path line */}
                  <line
                    x1={startX} y1={startY} x2={endX} y2={endY}
                    stroke={c.color}
                    strokeWidth="2"
                    strokeOpacity="0.2"
                  />

                  {/* Animated arrowheads flowing inward along the line */}
                  {[0, 1, 2].map((p) => (
                    <g key={p}>
                      {/* Arrow shape that follows the exact line path */}
                      <polygon
                        points="-8,-5 0,0 -8,5"
                        fill={c.color}
                        style={{ transformOrigin: '0 0' }}
                      >
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values={`${startX},${startY};${endX},${endY}`}
                          dur="4s"
                          begin={`${p * 1.3}s`}
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values={`${angle};${angle}`}
                          dur="4s"
                          begin={`${p * 1.3}s`}
                          repeatCount="indefinite"
                          additive="sum"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;0.9;0.9;0"
                          dur="4s"
                          begin={`${p * 1.3}s`}
                          repeatCount="indefinite"
                        />
                      </polygon>
                    </g>
                  ))}
                </g>
              )
            })}

            {/* Central capacity circle with looping shrink animation - BIGGER & SLOWER */}
            <g>
              {/* Outer glow rings */}
              <circle cx="450" cy="275" r="90" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="2">
                <animate attributeName="r" values="90;80;90" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle cx="450" cy="275" r="75" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="2">
                <animate attributeName="r" values="75;65;75" dur="5s" repeatCount="indefinite" />
              </circle>

              {/* Core circle that pulses/shrinks */}
              <circle cx="450" cy="275" r="55" fill="rgba(0,0,0,0.9)" stroke="rgba(34,211,238,0.5)" strokeWidth="3">
                <animate attributeName="r" values="55;42;55" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>

          {/* Center label */}
          <div className="capacity-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <span className="text-cyan-400 text-base font-semibold uppercase tracking-widest">Capacity</span>
          </div>

          {/* Constraint cards - cleaner text-only format */}
          {constraints.map((c, i) => (
            <div
              key={i}
              className="constraint-card absolute"
              style={{
                left: `calc(50% + ${c.position.x}px)`,
                top: `calc(50% + ${c.position.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="px-6 py-5 rounded-xl backdrop-blur-sm border bg-black/60 w-[300px]"
                style={{ borderColor: `${c.color}50` }}
              >
                <div className="text-lg font-semibold leading-snug" style={{ color: c.color }}>
                  {c.headline}
                </div>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  {c.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
