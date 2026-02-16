import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Priority Processing - The best of both worlds (Preview)
 */
export function PriorityProcessing({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const badge = container.querySelector('.preview-badge')
    const ptuBox = container.querySelector('.ptu-box')
    const paygoBox = container.querySelector('.paygo-box')
    const plusSign = container.querySelector('.plus-sign')
    const resultBox = container.querySelector('.result-box')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(badge, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.5 })
    gsap.fromTo(ptuBox, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7 })
    gsap.fromTo(plusSign, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, delay: 1.0 })
    gsap.fromTo(paygoBox, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.1 })
    gsap.fromTo(resultBox, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 1.4, ease: 'back.out(1.4)' })
    gsap.fromTo(callout, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.8 })
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
            Priority Processing
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Consumption-based capacity with PTU-grade guarantees
          </p>
          <div className="preview-badge inline-block mt-4 px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/40">
            <span className="text-violet-400 text-sm font-medium uppercase tracking-wider">Preview</span>
          </div>
        </div>

        {/* The equation: PTU benefits + PayGo flexibility = Priority Processing */}
        <div className="flex items-center gap-6 mb-10">
          {/* PTU benefits */}
          <div className="ptu-box w-56">
            <div className="px-5 py-4 rounded-xl border border-cyan-500/30 bg-black/60">
              <p className="text-cyan-400 font-semibold text-center mb-3">PTU Benefits</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={14} className="text-cyan-400" />
                  <span className="text-white/70">Guaranteed latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={14} className="text-cyan-400" />
                  <span className="text-white/70">SLA commitments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={14} className="text-cyan-400" />
                  <span className="text-white/70">Reserved capacity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plus */}
          <div className="plus-sign w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white/60 text-2xl font-light">+</span>
          </div>

          {/* PayGo flexibility */}
          <div className="paygo-box w-56">
            <div className="px-5 py-4 rounded-xl border border-amber-500/30 bg-black/60">
              <p className="text-amber-400 font-semibold text-center mb-3">PayGo Flexibility</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" size={14} className="text-amber-400" />
                  <span className="text-white/70">Consumption-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={14} className="text-amber-400" />
                  <span className="text-white/70">Scale on demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="RefreshCw" size={14} className="text-amber-400" />
                  <span className="text-white/70">No long-term commit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="result-box mb-8">
          <div className="px-10 py-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Icon name="Sparkles" size={28} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-emerald-400 font-bold text-xl">Priority Processing</p>
                <p className="text-white/60 text-sm mt-1">Reserve PayGo capacity with PTU-grade performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="callout max-w-xl">
          <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 text-center">
              <Icon name="Eye" size={18} className="text-violet-400 inline mr-2" />
              <span className="text-violet-400 font-medium">Keep an eye on this</span> — likely to become very popular once it hits GA
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
