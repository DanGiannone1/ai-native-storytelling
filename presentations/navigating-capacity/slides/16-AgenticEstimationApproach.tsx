import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * The Approach - How to estimate and manage agentic capacity
 */
export function AgenticEstimationApproach({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const columns = container.querySelectorAll('.approach-column')
    const arrows = container.querySelectorAll('.flow-arrow')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(columns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, delay: 0.5 })
    gsap.fromTo(arrows, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, delay: 1.0 })
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

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full px-12">
        <div className="text-center mb-10">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Approach
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            A practical framework for agentic capacity
          </p>
        </div>

        {/* Three columns with arrows */}
        <div className="flex items-start gap-4">
          {/* Column 1: Benchmark */}
          <div className="approach-column w-72">
            <div className="px-5 py-5 rounded-xl border border-cyan-500/30 bg-black/60 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  1
                </div>
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-cyan-400" />
                </div>
                <span className="text-cyan-400 font-semibold">Benchmark</span>
              </div>

              <p className="text-white/60 text-sm mb-4">
                Identify <span className="text-white/90">gold standard workflows</span> that represent 90% of expected usage
              </p>

              {/* Mini workflow cards */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <Icon name="FileText" size={14} className="text-cyan-400" />
                  <span className="text-white/70 text-xs">Document analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <Icon name="Code" size={14} className="text-cyan-400" />
                  <span className="text-white/70 text-xs">Code review</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <Icon name="Search" size={14} className="text-cyan-400" />
                  <span className="text-white/70 text-xs">Research task</span>
                </div>
              </div>

              {/* Output */}
              <div className="px-3 py-2 rounded bg-white/5 border border-white/10">
                <p className="text-white/40 text-xs mb-1">Measure ranges:</p>
                <div className="text-xs font-mono space-y-1">
                  <p className="text-white/60">Input: <span className="text-cyan-400">5-15K</span></p>
                  <p className="text-white/60">Output: <span className="text-cyan-400">2-8K</span></p>
                  <p className="text-white/60">Reasoning: <span className="text-cyan-400">10-40K</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flow-arrow flex items-center pt-24">
            <Icon name="ChevronRight" size={24} className="text-white/20" />
          </div>

          {/* Column 2: Hybrid Capacity */}
          <div className="approach-column w-72">
            <div className="px-5 py-5 rounded-xl border border-violet-500/30 bg-black/60 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-sm">
                  2
                </div>
                <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Icon name="Layers" size={20} className="text-violet-400" />
                </div>
                <span className="text-violet-400 font-semibold">Hybrid Capacity</span>
              </div>

              <p className="text-white/60 text-sm mb-4">
                Combine <span className="text-white/90">PTU base</span> with <span className="text-white/90">PayGo spillover</span> for flexibility
              </p>

              {/* Stacked bar visual */}
              <div className="mb-4">
                <div className="h-32 w-full rounded-lg border border-white/10 bg-white/5 flex flex-col justify-end overflow-hidden">
                  {/* PayGo overflow */}
                  <div className="h-[25%] bg-gradient-to-r from-amber-500/40 to-orange-500/40 border-t border-amber-500/30 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-medium">PayGo Overflow</span>
                  </div>
                  {/* PTU base */}
                  <div className="h-[75%] bg-gradient-to-r from-violet-500/30 to-purple-500/30 flex items-center justify-center">
                    <span className="text-violet-400 text-sm font-medium">PTU Base</span>
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 rounded bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs text-center">
                  Base for the <span className="text-violet-400">known</span>, spillover for the <span className="text-amber-400">unknown</span>
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flow-arrow flex items-center pt-24">
            <Icon name="ChevronRight" size={24} className="text-white/20" />
          </div>

          {/* Column 3: Gradual Rollout */}
          <div className="approach-column w-72">
            <div className="px-5 py-5 rounded-xl border border-emerald-500/30 bg-black/60 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  3
                </div>
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-semibold">Gradual Rollout</span>
              </div>

              <p className="text-white/60 text-sm mb-4">
                Start small, <span className="text-white/90">prove reliability</span>, then scale with confidence
              </p>

              {/* Progressive circles */}
              <div className="flex items-end justify-center gap-4 mb-4 h-28">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-white/40 text-xs mt-2">Pilot</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-white/40 text-xs mt-2">Team</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Icon name="Globe" size={28} className="text-emerald-400" />
                  </div>
                  <p className="text-white/40 text-xs mt-2">Org</p>
                </div>
              </div>

              <div className="px-3 py-2 rounded bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs text-center">
                  Validate estimates with <span className="text-emerald-400">real production data</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
