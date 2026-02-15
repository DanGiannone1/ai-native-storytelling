import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Batch Mode - Not everything needs real-time
 */
export function BatchMode({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const realtime = container.querySelector('.realtime-box')
    const batch = container.querySelector('.batch-box')
    const useCases = container.querySelectorAll('.use-case')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(realtime, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.5 })
    gsap.fromTo(batch, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.7 })
    gsap.fromTo(useCases, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 1.0 })
    gsap.fromTo(callout, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.4 })
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
        <div className="text-center mb-8">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Batch Mode
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Not everything needs real-time
          </p>
        </div>

        {/* Comparison */}
        <div className="flex items-stretch gap-8 mb-8">
          {/* Real-time */}
          <div className="realtime-box w-72">
            <div className="h-full px-6 py-5 rounded-xl border border-amber-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Icon name="Zap" size={22} className="text-amber-400" />
                </div>
                <span className="text-amber-400 font-semibold">Real-time API</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Response</span>
                  <span className="text-white/80">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Cost</span>
                  <span className="text-amber-400">Full price</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Capacity impact</span>
                  <span className="text-amber-400">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center text-white/20 text-xl">vs</div>

          {/* Batch */}
          <div className="batch-box w-72">
            <div className="h-full px-6 py-5 rounded-xl border border-emerald-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="Clock" size={22} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-semibold">Batch Mode</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Response</span>
                  <span className="text-white/80">1-3 hrs typical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Cost</span>
                  <span className="text-emerald-400">50% discount</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Capacity impact</span>
                  <span className="text-emerald-400">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Good use cases for batch */}
        <div className="mb-8">
          <p className="text-white/40 text-sm uppercase tracking-wider mb-4 text-center">Good candidates for batch</p>
          <div className="flex items-center gap-4">
            <div className="use-case flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="BarChart" size={16} className="text-emerald-400" />
              <span className="text-white/70 text-sm">Nightly reports</span>
            </div>
            <div className="use-case flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="Database" size={16} className="text-emerald-400" />
              <span className="text-white/70 text-sm">Bulk document processing</span>
            </div>
            <div className="use-case flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="RefreshCw" size={16} className="text-emerald-400" />
              <span className="text-white/70 text-sm">Data enrichment</span>
            </div>
            <div className="use-case flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="Search" size={16} className="text-emerald-400" />
              <span className="text-white/70 text-sm">Batch classification</span>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="callout max-w-xl">
          <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 text-center">
              <Icon name="Target" size={18} className="text-cyan-400 inline mr-2" />
              Push back on <span className="text-white/90">"I need it ASAP"</span> — many use-cases don't actually have strict SLAs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
