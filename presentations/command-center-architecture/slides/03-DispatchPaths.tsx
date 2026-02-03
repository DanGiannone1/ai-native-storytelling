import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon } from '@catalog'

interface DispatchPathsProps {
  active: boolean
}

export const DispatchPaths = ({ active }: DispatchPathsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const leftPanel = container.querySelector('.left-panel')
    const rightPanel = container.querySelector('.right-panel')
    const centerQueue = container.querySelector('.center-queue')
    const footer = container.querySelector('.slide-footer')
    const leftSteps = container.querySelectorAll('.left-step')
    const rightSteps = container.querySelectorAll('.right-step')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(leftPanel, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" })
    gsap.fromTo(rightPanel, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: "power2.out" })
    gsap.fromTo(leftSteps, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, delay: 0.9 })
    gsap.fromTo(rightSteps, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, delay: 0.9 })
    gsap.fromTo(centerQueue, { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 1.4, ease: "back.out(1.4)" })
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.8 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="horizon" />

        {/* Header */}
        <div className="z-10 absolute top-6 text-center w-full px-4">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">Two Ways In</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Dispatch Paths
          </h1>
        </div>

        {/* Main Content */}
        <div className="z-10 relative w-full max-w-5xl px-8 mt-16">
          <div className="flex gap-8 items-stretch">
            {/* Left Panel - Scheduled Dispatch */}
            <div className="left-panel flex-1 p-6 rounded-2xl border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Icon name="Calendar" size={24} strokeWidth={1.5} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Scheduled Dispatch</h3>
                  <p className="text-blue-300/70 text-sm">Cron-based automation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="left-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Database" size={16} strokeWidth={2} className="text-[#0078d4]" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Document DB</span>
                    <p className="text-white/50 text-sm">Schedules stored with cron expressions</p>
                  </div>
                </div>

                <div className="left-step flex items-center justify-center">
                  <Icon name="ChevronRight" size={20} className="text-blue-400/50 rotate-90" />
                </div>

                <div className="left-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Clock" size={16} strokeWidth={2} className="text-[#0078d4]" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Dispatcher Job</span>
                    <p className="text-white/50 text-sm">Container service polls schedules</p>
                  </div>
                </div>

                <div className="left-step flex items-center justify-center">
                  <Icon name="ChevronRight" size={20} className="text-blue-400/50 rotate-90" />
                </div>

                <div className="left-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Send" size={16} strokeWidth={2} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Publish to Queue</span>
                    <p className="text-white/50 text-sm">Job message sent to message bus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - On-Demand Dispatch */}
            <div className="right-panel flex-1 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Icon name="Zap" size={24} strokeWidth={1.5} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">On-Demand Dispatch</h3>
                  <p className="text-emerald-300/70 text-sm">Agent-triggered execution</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="right-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="MessageSquare" size={16} strokeWidth={2} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Agent Request</span>
                    <p className="text-white/50 text-sm">Any agent calls MCP dispatch tool</p>
                  </div>
                </div>

                <div className="right-step flex items-center justify-center">
                  <Icon name="ChevronRight" size={20} className="text-emerald-400/50 rotate-90" />
                </div>

                <div className="right-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0078d4]/20 border border-[#0078d4]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Server" size={16} strokeWidth={2} className="text-[#0078d4]" />
                  </div>
                  <div>
                    <span className="text-white font-medium">MCP Server</span>
                    <p className="text-white/50 text-sm">Validates and routes request</p>
                  </div>
                </div>

                <div className="right-step flex items-center justify-center">
                  <Icon name="ChevronRight" size={20} className="text-emerald-400/50 rotate-90" />
                </div>

                <div className="right-step flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Send" size={16} strokeWidth={2} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Direct to Queue</span>
                    <p className="text-white/50 text-sm">Job message sent to message bus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Convergence - Message Queue */}
          <div className="center-queue relative flex justify-center mt-8">
            {/* Convergence lines */}
            <svg className="absolute -top-8 left-0 right-0 h-12 pointer-events-none" viewBox="0 0 800 50">
              <defs>
                <linearGradient id="leftArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="rightArrow" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path d="M 150 0 Q 250 40 400 45" stroke="url(#leftArrow)" strokeWidth="2" fill="none" />
              <path d="M 650 0 Q 550 40 400 45" stroke="url(#rightArrow)" strokeWidth="2" fill="none" />

              {/* Animated particles */}
              <circle r="3" fill="#3b82f6">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 150 0 Q 250 40 400 45" />
              </circle>
              <circle r="3" fill="#34d399">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 650 0 Q 550 40 400 45" />
              </circle>
            </svg>

            <div className="relative px-8 py-4 rounded-2xl border border-cyan-500/50 bg-cyan-950/30 backdrop-blur-sm shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]">
              <div className="absolute -inset-4 rounded-3xl bg-cyan-500/5 blur-xl" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                  <Icon name="Inbox" size={28} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">Message Queue</h3>
                  <p className="text-cyan-300/70 text-sm">Cloud B - Job Distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="slide-footer z-10 absolute bottom-8 text-white/40 text-sm tracking-wide">
          Same queue, same execution — different triggers
        </p>
      </div>
    </div>
  )
}
