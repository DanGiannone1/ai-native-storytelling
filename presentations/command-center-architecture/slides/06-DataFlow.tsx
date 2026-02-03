import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon } from '@catalog'

interface DataFlowProps {
  active: boolean
}

export const DataFlow = ({ active }: DataFlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const cloudBand = container.querySelector('.cloud-band')
    const localBand = container.querySelector('.local-band')
    const nodes = container.querySelectorAll('.flow-node')
    const labels = container.querySelectorAll('.zone-label')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(cloudBand, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
    gsap.fromTo(localBand, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 })
    gsap.fromTo(nodes, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.8 })
    gsap.fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.15, delay: 1.5 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="default" />

        {/* Header */}
        <div className="z-10 absolute top-6 text-center w-full px-4">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">Follow the Data</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Data Flow
          </h1>
        </div>

        {/* Main Diagram */}
        <div className="z-10 relative w-full max-w-5xl mt-20" style={{ height: 500 }}>
          {/* SVG for paths and animations */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
            <defs>
              {/* Gradients */}
              <linearGradient id="cloudAGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00bcf2" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="cloudBGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="localGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
              </linearGradient>
              <filter id="flowGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Zone backgrounds */}
            <rect x="50" y="40" width="900" height="160" rx="16" fill="#0078d4" fillOpacity="0.05" stroke="#0078d4" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="50" y="280" width="900" height="160" rx="16" fill="#64748b" fillOpacity="0.05" stroke="#64748b" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />

            {/* Flow Path 1: Document DB -> Dispatcher */}
            <path d="M 200 120 L 360 120" stroke="#0078d4" strokeWidth="2" opacity="0.4" markerEnd="url(#arrowhead)" />
            <circle r="4" fill="#0078d4" filter="url(#flowGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 200 120 L 360 120" begin="0s" />
            </circle>

            {/* Flow Path 2: Dispatcher -> Message Bus */}
            <path d="M 500 120 L 640 120" stroke="#22d3ee" strokeWidth="2" opacity="0.4" />
            <circle r="4" fill="#fbbf24" filter="url(#flowGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 500 120 L 640 120" begin="0.5s" />
            </circle>

            {/* Flow Path 3: Message Bus -> Orchestrator (cross zone) */}
            <path d="M 720 170 Q 720 225 500 360" stroke="#22d3ee" strokeWidth="2" opacity="0.3" strokeDasharray="6 4" />
            <circle r="4" fill="#34d399" filter="url(#flowGlow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 720 170 Q 720 225 500 360" begin="1s" />
            </circle>

            {/* Flow Path 4: Orchestrator -> Analytics Warehouse (cross zone) */}
            <path d="M 500 360 Q 650 280 850 170" stroke="#a78bfa" strokeWidth="2" opacity="0.3" strokeDasharray="6 4" />
            <circle r="4" fill="#a78bfa" filter="url(#flowGlow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 500 360 Q 650 280 850 170" begin="2s" />
            </circle>

            {/* Flow Path 5: Analytics Warehouse -> Dashboard */}
            <path d="M 850 170 Q 750 280 300 360" stroke="#64748b" strokeWidth="2" opacity="0.3" strokeDasharray="6 4" />
            <circle r="4" fill="#22d3ee" filter="url(#flowGlow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 850 170 Q 750 280 300 360" begin="3s" />
            </circle>
          </svg>

          {/* Zone Labels */}
          <div className="zone-label absolute left-16 top-12 text-[#0078d4] text-xs font-bold tracking-widest uppercase">Cloud</div>
          <div className="zone-label absolute left-16 top-[290px] text-slate-400 text-xs font-bold tracking-widest uppercase">Local</div>

          {/* Cloud Nodes */}
          <div className="cloud-band">
            {/* Document DB */}
            <div className="flow-node absolute" style={{ left: 100, top: 80 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[#0078d4]/20 border border-[#0078d4]/50 flex items-center justify-center">
                  <Icon name="Database" size={28} strokeWidth={1.5} className="text-[#0078d4]" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Document DB</p>
                  <p className="text-[#0078d4]/70 text-xs">Schedules</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-xs font-bold shadow-lg">1</div>
              </div>
            </div>

            {/* Dispatcher */}
            <div className="flow-node absolute" style={{ left: 360, top: 80 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-[#0078d4]/20 border border-[#0078d4]/50 flex items-center justify-center">
                  <Icon name="Calendar" size={28} strokeWidth={1.5} className="text-[#0078d4]" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Dispatcher</p>
                  <p className="text-[#0078d4]/70 text-xs">Job Runner</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0078d4] flex items-center justify-center text-white text-xs font-bold shadow-lg">2</div>
              </div>
            </div>

            {/* Message Bus */}
            <div className="flow-node absolute" style={{ left: 620, top: 80 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                  <Icon name="Send" size={28} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Message Bus</p>
                  <p className="text-cyan-400/70 text-xs">Job Queue</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">3</div>
              </div>
            </div>

            {/* Analytics Warehouse */}
            <div className="flow-node absolute" style={{ left: 820, top: 80 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                  <Icon name="BarChart3" size={28} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Analytics Warehouse</p>
                  <p className="text-cyan-400/70 text-xs">Telemetry</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">5</div>
              </div>
            </div>
          </div>

          {/* Local Nodes */}
          <div className="local-band">
            {/* Dashboard */}
            <div className="flow-node absolute" style={{ left: 200, top: 320 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-slate-500/20 border border-slate-500/50 flex items-center justify-center">
                  <Icon name="Eye" size={28} strokeWidth={1.5} className="text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Dashboard</p>
                  <p className="text-slate-400/70 text-xs">Frontend</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">6</div>
              </div>
            </div>

            {/* Orchestrator */}
            <div className="flow-node absolute" style={{ left: 450, top: 320 }}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-xl bg-slate-500/20 border-2 border-slate-500/50 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(100,116,139,0.4)]">
                  <Icon name="Cpu" size={36} strokeWidth={1.5} className="text-slate-300" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">Orchestrator</p>
                  <p className="text-slate-400/70 text-xs">Workstation</p>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend at bottom */}
        <div className="z-10 absolute bottom-8 flex gap-8 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded bg-gradient-to-r from-[#0078d4] to-cyan-400" />
            <span className="text-white/50">Scheduled trigger</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #22d3ee, #22d3ee 6px, transparent 6px, transparent 10px)' }} />
            <span className="text-white/50">Cross-zone flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded bg-gradient-to-r from-violet-400 to-slate-400" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #a78bfa, #a78bfa 6px, transparent 6px, transparent 10px)' }} />
            <span className="text-white/50">Telemetry stream</span>
          </div>
        </div>
      </div>
    </div>
  )
}
