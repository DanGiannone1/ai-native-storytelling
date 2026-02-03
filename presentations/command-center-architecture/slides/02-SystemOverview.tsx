import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface SystemOverviewProps {
  active: boolean
}

interface SystemNode {
  id: string
  label: string
  sublabel: string
  icon: IconName
  provider: 'cloudA' | 'cloudB' | 'local'
  angle: number
}

// Provider color schemes
const providerColors = {
  cloudA: { primary: '#0078d4', accent: '#00bcf2', name: 'Cloud A' },
  cloudB: { primary: '#22d3ee', accent: '#34d399', name: 'Cloud B' },
  local: { primary: '#64748b', accent: '#94a3b8', name: 'Local' },
}

const nodes: SystemNode[] = [
  // Cloud A nodes (top-left quadrant)
  { id: 'cosmos', label: 'Document DB', sublabel: 'Schedules', icon: 'Database', provider: 'cloudA', angle: 200 },
  { id: 'mcp', label: 'MCP Server', sublabel: 'Container Service', icon: 'Server', provider: 'cloudA', angle: 160 },
  { id: 'dispatcher', label: 'Dispatcher', sublabel: 'Job Runner', icon: 'Calendar', provider: 'cloudA', angle: 120 },

  // Cloud B nodes (top-right quadrant)
  { id: 'pubsub', label: 'Message Bus', sublabel: 'Job Queue', icon: 'Send', provider: 'cloudB', angle: 60 },
  { id: 'bigquery', label: 'Analytics Warehouse', sublabel: 'Telemetry', icon: 'BarChart3', provider: 'cloudB', angle: 20 },

  // Local nodes (bottom)
  { id: 'orchestrator', label: 'Orchestrator', sublabel: 'Workstation', icon: 'Cpu', provider: 'local', angle: 270 },
  { id: 'dashboard', label: 'Dashboard', sublabel: 'Frontend', icon: 'Eye', provider: 'local', angle: 320 },
]

export const SystemOverview = ({ active }: SystemOverviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const layout = { width: 1000, height: 620 }
  const centerX = layout.width / 2
  const centerY = layout.height / 2 + 20

  const getPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180
    const rx = layout.width * 0.40
    const ry = layout.height * 0.38
    return {
      x: centerX + rx * Math.cos(radian),
      y: centerY + ry * Math.sin(radian),
    }
  }

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const center = container.querySelector('.center-hub')
    const nodeEls = container.querySelectorAll('.system-node')
    const legend = container.querySelector('.legend')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(center, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" })
    gsap.fromTo(nodeEls, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.8, ease: "back.out(1.4)" })
    gsap.fromTo(legend, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.8 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Header */}
        <div className="z-10 absolute top-6 text-center w-full px-4">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">Architecture Overview</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            System Overview
          </h1>
        </div>

        {/* Main Diagram */}
        <div className="z-10 relative mt-16" style={{ width: layout.width, height: layout.height }}>
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${layout.width} ${layout.height}`}>
            <defs>
              <linearGradient id="grad-cloud-a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0078d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-cloud-b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-local" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Center-to-Node Connections */}
            {nodes.map((node, i) => {
              const pos = getPosition(node.angle)
              const colors = providerColors[node.provider]
              const isHovered = hoveredNode === node.id

              return (
                <g key={node.id}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={colors.primary}
                    strokeWidth={isHovered ? 2 : 1}
                    opacity={isHovered ? 0.8 : 0.25}
                    className="transition-all duration-300"
                  />
                  {/* Particle flowing outward */}
                  <circle r={2} fill={colors.primary} filter="url(#nodeGlow)">
                    <animateMotion
                      dur={`${3 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M${centerX},${centerY} L${pos.x},${pos.y}`}
                    />
                  </circle>
                  {/* Particle flowing inward */}
                  <circle r={1.5} fill={colors.accent} opacity="0.8">
                    <animateMotion
                      dur={`${4 + i * 0.2}s`}
                      repeatCount="indefinite"
                      path={`M${pos.x},${pos.y} L${centerX},${centerY}`}
                    />
                  </circle>
                </g>
              )
            })}

            {/* Special connection: Dispatcher -> Message Bus */}
            {(() => {
              const dispatcherPos = getPosition(120)
              const pubsubPos = getPosition(60)
              const midX = (dispatcherPos.x + pubsubPos.x) / 2
              const midY = Math.min(dispatcherPos.y, pubsubPos.y) - 30

              return (
                <g>
                  <path
                    d={`M${dispatcherPos.x},${dispatcherPos.y} Q${midX},${midY} ${pubsubPos.x},${pubsubPos.y}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  <circle r="2" fill="#fbbf24" opacity="0.9">
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      path={`M${dispatcherPos.x},${dispatcherPos.y} Q${midX},${midY} ${pubsubPos.x},${pubsubPos.y}`}
                    />
                  </circle>
                </g>
              )
            })()}

            {/* Special connection: Orchestrator -> Message Bus */}
            {(() => {
              const orchestratorPos = getPosition(270)
              const pubsubPos = getPosition(60)

              return (
                <g>
                  <path
                    d={`M${orchestratorPos.x},${orchestratorPos.y} Q${centerX + 100},${centerY} ${pubsubPos.x},${pubsubPos.y}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <circle r="2" fill="#34d399" opacity="0.9">
                    <animateMotion
                      dur="3.5s"
                      repeatCount="indefinite"
                      path={`M${pubsubPos.x},${pubsubPos.y} Q${centerX + 100},${centerY} ${orchestratorPos.x},${orchestratorPos.y}`}
                    />
                  </circle>
                </g>
              )
            })()}

            {/* Special connection: Orchestrator -> Analytics Warehouse */}
            {(() => {
              const orchestratorPos = getPosition(270)
              const bigqueryPos = getPosition(20)

              return (
                <g>
                  <path
                    d={`M${orchestratorPos.x},${orchestratorPos.y} Q${centerX + 150},${centerY + 50} ${bigqueryPos.x},${bigqueryPos.y}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <circle r="2" fill="#a78bfa" opacity="0.9">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={`M${orchestratorPos.x},${orchestratorPos.y} Q${centerX + 150},${centerY + 50} ${bigqueryPos.x},${bigqueryPos.y}`}
                    />
                  </circle>
                </g>
              )
            })()}
          </svg>

          {/* Central Hub */}
          <div
            className="center-hub absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onMouseEnter={() => setHoveredNode('center')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="absolute -inset-16 rounded-full bg-cyan-500/5 blur-[50px] animate-pulse-slow" />

            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-slate-500/10 border-dashed animate-spin-slower-reverse" />

              <div className="absolute inset-8 rounded-full bg-deck-surface/95 backdrop-blur-xl border border-slate-700/50 shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)] flex flex-col items-center justify-center">
                <div className="text-cyan-400 mb-2">
                  <Icon name="Cpu" size={36} strokeWidth={1.5} />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">Command</span>
                <span className="text-cyan-300 font-bold text-sm tracking-widest uppercase">Center</span>
              </div>
            </div>
          </div>

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = getPosition(node.angle)
            const colors = providerColors[node.provider]
            const isHovered = hoveredNode === node.id

            return (
              <div
                key={node.id}
                className={`system-node absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 cursor-pointer ${isHovered ? 'z-50 scale-110' : ''}`}
                style={{ left: pos.x, top: pos.y }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className="w-40 p-3 backdrop-blur-md rounded-xl border flex flex-row items-center gap-3 transition-all duration-300"
                  style={{
                    borderColor: `${colors.primary}50`,
                    backgroundColor: `${colors.primary}10`,
                    boxShadow: isHovered ? `0 0 30px -5px ${colors.primary}60` : 'none',
                  }}
                >
                  <div
                    className="p-2 rounded-lg transition-transform duration-300"
                    style={{
                      backgroundColor: `${colors.primary}25`,
                      border: `1px solid ${colors.primary}40`,
                    }}
                  >
                    <Icon name={node.icon} size={18} strokeWidth={2} style={{ color: colors.primary }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] tracking-wider uppercase text-white/90">{node.label}</span>
                    <span className="text-[10px] tracking-wide uppercase" style={{ color: `${colors.primary}90` }}>{node.sublabel}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="legend absolute bottom-6 flex gap-10 text-[11px] font-semibold tracking-[0.15em] uppercase">
          {Object.entries(providerColors).map(([key, colors]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary, boxShadow: `0 0 8px ${colors.primary}` }}
              />
              <span style={{ color: colors.primary }}>{colors.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
