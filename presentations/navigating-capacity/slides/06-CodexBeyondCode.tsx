import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Misconception #3: Codex is only for coding
 * Shows the many non-code use cases Codex excels at
 */
export function CodexBeyondCode({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const centerHub = container.querySelector('.center-hub')
    const lines = container.querySelectorAll('.connection-line')
    const useCases = container.querySelectorAll('.use-case')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    gsap.fromTo(centerHub,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: 'back.out(1.5)' }
    )

    // Lines draw outward from center
    lines.forEach((line, i) => {
      const length = (line as SVGLineElement).getTotalLength?.() || 250
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 0.4,
        delay: 0.9 + i * 0.08,
        ease: 'power2.out'
      })
    })

    gsap.fromTo(useCases,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, delay: 1.1, ease: 'back.out(1.4)' }
    )

    gsap.fromTo(callout,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.8 }
    )

  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  const useCases = [
    { icon: 'FileText' as const, label: 'Document Processing', color: '#3b82f6', position: { x: -200, y: -120 } },
    { icon: 'BarChart' as const, label: 'Data Analytics', color: '#10b981', position: { x: 200, y: -120 } },
    { icon: 'Search' as const, label: 'Data Extraction', color: '#f59e0b', position: { x: -250, y: 50 } },
    { icon: 'Database' as const, label: 'Structured Output', color: '#8b5cf6', position: { x: 250, y: 50 } },
    { icon: 'Zap' as const, label: 'Complex Logic', color: '#ec4899', position: { x: -150, y: 180 } },
    { icon: 'RefreshCw' as const, label: 'Multi-step Tasks', color: '#06b6d4', position: { x: 150, y: 180 } },
  ]

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Grid background */}
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full px-16">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Common Misconception <span className="text-emerald-400">#2</span>
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            "Codex models are only for coding tasks"
          </p>
        </div>

        {/* Radial visualization */}
        <div className="relative w-[700px] h-[420px]">
          {/* SVG for connecting lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 420">
            {useCases.map((uc, i) => (
              <line
                key={i}
                className="connection-line"
                x1="350"
                y1="190"
                x2={350 + uc.position.x}
                y2={190 + uc.position.y}
                stroke={uc.color}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            ))}
          </svg>

          {/* Center hub - Codex */}
          <div className="center-hub absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-xl" />
              <div className="relative w-32 h-32 rounded-full bg-black border-2 border-emerald-500/50 flex flex-col items-center justify-center">
                <Icon name="Code" size={36} className="text-emerald-400 mb-1" />
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Codex</span>
              </div>
            </div>
          </div>

          {/* Use case nodes */}
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="use-case absolute"
              style={{
                left: `calc(50% + ${uc.position.x}px)`,
                top: `calc(45% + ${uc.position.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-black/60 backdrop-blur-sm"
                style={{ borderColor: `${uc.color}50` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${uc.color}25` }}
                >
                  <Icon name={uc.icon} size={20} style={{ color: uc.color }} />
                </div>
                <span className="text-white/90 font-medium whitespace-nowrap">{uc.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="callout max-w-2xl mt-4">
          <div className="flex items-start gap-4 px-6 py-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Target" size={18} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-white/90 text-lg">
                Codex models excel at any task requiring <strong className="text-emerald-400">structured reasoning</strong> and <strong className="text-emerald-400">precise output</strong> — not just writing code
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
