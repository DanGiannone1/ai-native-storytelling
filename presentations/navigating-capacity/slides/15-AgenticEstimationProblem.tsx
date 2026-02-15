import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * The Agentic Estimation Problem - Why capacity planning gets 10x harder
 */
export function AgenticEstimationProblem({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const chatbotBox = container.querySelector('.chatbot-box')
    const agentBox = container.querySelector('.agent-box')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(chatbotBox, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.5 })
    gsap.fromTo(agentBox, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.7 })
    gsap.fromTo(callout, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.1 })
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
        <div className="text-center mb-10">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Agentic Estimation Problem
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Capacity planning just got 10x harder
          </p>
        </div>

        {/* Side by side comparison */}
        <div className="flex items-stretch gap-10 mb-10">
          {/* Traditional Chatbot */}
          <div className="chatbot-box w-80">
            <div className="h-full px-6 py-6 rounded-xl border border-emerald-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="MessageSquare" size={22} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-semibold">Traditional Chatbot</span>
              </div>

              {/* Simple linear flow */}
              <div className="flex items-center justify-center gap-3 mb-5 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Icon name="User" size={20} className="text-emerald-400" />
                </div>
                <Icon name="ArrowRight" size={20} className="text-emerald-400/50" />
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Icon name="Cpu" size={20} className="text-emerald-400" />
                </div>
                <Icon name="ArrowRight" size={20} className="text-emerald-400/50" />
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Icon name="MessageSquare" size={20} className="text-emerald-400" />
                </div>
              </div>

              {/* Token range - tight */}
              <div className="mb-3">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Token Range</p>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full ml-[10%]" />
                </div>
                <p className="text-emerald-400 text-sm mt-2 text-center font-mono">2-5K tokens</p>
              </div>

              <p className="text-white/50 text-sm text-center">Predictable, linear</p>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center text-white/20 text-xl">vs</div>

          {/* Agentic Workflow */}
          <div className="agent-box w-80">
            <div className="h-full px-6 py-6 rounded-xl border border-amber-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Icon name="GitBranch" size={22} className="text-amber-400" />
                </div>
                <span className="text-amber-400 font-semibold">Agentic Workflow</span>
              </div>

              {/* Branching flow */}
              <div className="flex flex-col items-center mb-5 py-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Icon name="User" size={18} className="text-amber-400" />
                </div>
                <div className="w-px h-3 bg-amber-500/30" />
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Icon name="Cpu" size={18} className="text-amber-400" />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-8 h-px bg-amber-500/30 -rotate-45 origin-right" />
                  <div className="w-px h-3 bg-amber-500/30" />
                  <div className="w-8 h-px bg-amber-500/30 rotate-45 origin-left" />
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Icon name="Tool" size={14} className="text-amber-400" />
                  </div>
                  <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Icon name="Tool" size={14} className="text-amber-400" />
                  </div>
                  <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Icon name="Users" size={14} className="text-amber-400" />
                  </div>
                </div>
                <p className="text-amber-400/60 text-xs mt-2">5 tools... or 100?</p>
              </div>

              {/* Token range - wide */}
              <div className="mb-3">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Token Range</p>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full ml-[5%]" />
                </div>
                <p className="text-amber-400 text-sm mt-2 text-center font-mono">10K - 500K+ tokens</p>
              </div>

              <p className="text-white/50 text-sm text-center">Variable, branching</p>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="callout max-w-2xl">
          <div className="px-8 py-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 text-center">
              <Icon name="AlertCircle" size={18} className="text-amber-400 inline mr-2" />
              The same prompt can consume <span className="text-white/90">10x different capacity</span> depending on the path the agent takes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
