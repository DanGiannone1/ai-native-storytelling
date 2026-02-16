import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Prompt Caching - The #1 optimization lever most customers miss
 */
export function PromptCaching({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const concept = container.querySelector('.concept-section')
    const stat = container.querySelector('.stat-section')
    const benefits = container.querySelectorAll('.benefit')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(concept, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.5 })
    gsap.fromTo(stat, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.8, ease: 'back.out(1.4)' })
    gsap.fromTo(benefits, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, delay: 1.2 })
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
            Prompt Caching
          </h1>
          <p className="slide-subtitle text-white/50 mt-2 text-lg">
            The #1 optimization lever most customers aren't using
          </p>
        </div>

        <div className="flex items-center gap-10 mb-5">
          {/* Left: The concept */}
          <div className="concept-section w-96">
            <div className="px-5 py-3 rounded-xl border border-white/10 bg-black/60">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-3">How it works</p>

              {/* Visual of prompt structure */}
              <div className="space-y-2 font-mono text-sm mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="flex-1 px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    <span className="text-emerald-400">System prompt</span>
                    <span className="text-white/40 ml-2">&larr; cached</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="flex-1 px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    <span className="text-emerald-400">Static context</span>
                    <span className="text-white/40 ml-2">&larr; cached</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className="flex-1 px-3 py-1.5 rounded bg-white/5 border border-white/10">
                    <span className="text-white/60">User message</span>
                    <span className="text-white/40 ml-2">&larr; varies</span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-sm">
                First N tokens identical across requests = <span className="text-emerald-400">cache hits</span>
              </p>
            </div>
          </div>

          {/* Right: The impact */}
          <div className="stat-section">
            <div className="px-8 py-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
              <p className="text-white/50 text-xs uppercase tracking-wider text-center mb-1">Real Customer Result</p>
              <div className="text-center">
                <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                  40%
                </span>
                <p className="text-white/70 text-base mt-1">
                  PTU utilization reduction
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  from restructuring prompts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits row */}
        <div className="flex items-center gap-4">
          <div className="benefit flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Icon name="DollarSign" size={16} className="text-emerald-400" />
            <span className="text-white/70 text-sm">Lower cost on PayGO</span>
          </div>
          <div className="benefit flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Icon name="Activity" size={16} className="text-cyan-400" />
            <span className="text-white/70 text-sm">Lower utilization on PTU</span>
          </div>
          <div className="benefit flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Icon name="Zap" size={16} className="text-amber-400" />
            <span className="text-white/70 text-sm">Lower latency for both</span>
          </div>
        </div>
      </div>
    </div>
  )
}
