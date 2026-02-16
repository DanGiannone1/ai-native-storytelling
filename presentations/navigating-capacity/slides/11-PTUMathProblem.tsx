import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * The PTU Math Problem - Progressive reveal showing docs → confusion → solution
 */
export function PTUMathProblem({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const docsBox = container.querySelector('.docs-box')
    const arrow1 = container.querySelector('.arrow-1')
    const gauges = container.querySelector('.gauges')
    const arrow2 = container.querySelector('.arrow-2')
    const realityBox = container.querySelector('.reality-box')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(docsBox, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
    gsap.fromTo(arrow1, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.8 })
    gsap.fromTo(gauges, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, delay: 1.0 })
    gsap.fromTo(arrow2, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 1.3 })
    gsap.fromTo(realityBox, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.5 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
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
        <div className="text-center mb-6">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            PTU Math
          </h1>
          <p className="slide-subtitle text-white/50 mt-2 text-lg">
            The docs and calculator don't tell the full story
          </p>
        </div>

        {/* Row 1: What docs say */}
        <div className="docs-box flex items-center gap-4 px-6 py-3 rounded-xl border border-amber-500/30 bg-black/60 mb-3">
          <Icon name="FileText" size={20} className="text-amber-400" />
          <span className="text-amber-400 font-medium">The Docs:</span>
          <span className="font-mono text-lg text-white/80">"1 PTU = 23,500 TPM"</span>
          <span className="text-white/40 mx-2">&rarr;</span>
          <span className="font-mono text-lg text-white/80">TPM = Input + Output</span>
        </div>

        {/* Arrow down */}
        <div className="arrow-1 text-white/20 my-1 rotate-90">
          <Icon name="ArrowRight" size={20} />
        </div>

        {/* Row 2: The gauges */}
        <div className="gauges flex items-center gap-8 my-2">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-black border-2 border-white/10 flex flex-col items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle cx="40" cy="40" r="32" fill="none" stroke="#10b981" strokeWidth="4"
                  strokeDasharray={`${0.47 * 201} 201`} strokeLinecap="round" />
              </svg>
              <span className="text-xl font-bold text-emerald-400">47%</span>
            </div>
            <p className="text-white/50 mt-1 text-sm">TPM Used</p>
          </div>

          <div className="text-white/30 text-lg">vs</div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-black border-2 border-red-500/30 flex flex-col items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(239,68,68,0.1)" strokeWidth="4" />
                <circle cx="40" cy="40" r="32" fill="none" stroke="#ef4444" strokeWidth="4"
                  strokeDasharray="201 201" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-bold text-red-400">100%</span>
            </div>
            <p className="text-red-400 mt-1 text-sm font-medium">PTU Maxed</p>
          </div>

          <div className="pl-6 border-l border-white/10">
            <p className="text-white/60 text-base">"Why am I getting throttled?"</p>
          </div>
        </div>

        {/* Arrow down */}
        <div className="arrow-2 text-white/20 my-0.5 rotate-90">
          <Icon name="ArrowRight" size={18} />
        </div>

        {/* Row 3: The reality */}
        <div className="reality-box px-6 py-3 rounded-xl border border-emerald-500/30 bg-black/60">
          <div className="flex items-center gap-2 mb-1.5 justify-center">
            <Icon name="Zap" size={18} className="text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm">The Missing Piece</span>
          </div>
          <p className="font-mono text-lg text-white/90 text-center">
            Effective Load = Input + (<span className="text-emerald-400">Output</span> + <span className="text-violet-400">Reasoning</span>) &times; <span className="text-amber-400 font-bold">8</span>
          </p>
          <p className="text-white/40 text-xs text-center mt-1">
            Output and reasoning tokens have 8&times; the weight
          </p>
        </div>
      </div>
    </div>
  )
}
