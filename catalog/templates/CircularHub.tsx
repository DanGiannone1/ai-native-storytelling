import { useState, useEffect } from 'react'
import { SlideWrapper } from '@shared/runtime'
import { Icon, IconName } from '@catalog/primitives'
import { Status } from '@catalog/primitives'

export interface HubNode {
  id: string
  label: string
  status: Status
  icon: IconName
  angle: number  // Position on ellipse (0-360)
  progress: number  // 0-100
}

export interface HubConnection {
  from: string
  to: string
}

interface CircularHubProps {
  title: string
  subtitle?: string
  centerTitle: string
  centerSubtitle?: string
  centerIcon?: IconName
  centerTagline?: string
  nodes: HubNode[]
  connections?: HubConnection[]
  width?: number
  height?: number
}

/**
 * Orbital diagram template with a central hub and nodes arranged in an ellipse.
 * Includes animated particles flowing between nodes and the center.
 */
export function CircularHub({
  title,
  subtitle,
  centerTitle,
  centerSubtitle,
  centerIcon = 'Cpu',
  centerTagline,
  nodes,
  connections = [],
  width = 1000,
  height = 650,
}: CircularHubProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activePulse, setActivePulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse(prev => !prev)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const centerX = width / 2
  const centerY = height / 2

  // Calculate position on ellipse
  const getPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180
    const rx = width * 0.44
    const ry = height * 0.40
    return {
      x: centerX + rx * Math.cos(radian),
      y: centerY + ry * Math.sin(radian),
    }
  }

  // Build node map with positions
  const nodeMap = nodes.reduce((acc, node) => {
    acc[node.id] = { ...node, pos: getPosition(node.angle) }
    return acc
  }, {} as Record<string, HubNode & { pos: { x: number; y: number } }>)

  return (
    <SlideWrapper>
      {/* Header */}
      <div className="z-10 absolute top-6 text-center w-full max-w-4xl left-1/2 -translate-x-1/2 px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase drop-shadow-lg mb-4">
          {title}
        </h1>
        {subtitle && (
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <p className="text-cyan-100/70 tracking-wide text-sm font-light uppercase">
              {subtitle}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
        )}
      </div>

      {/* Main Diagram Container */}
      <div className="relative mt-16" style={{ width, height }}>
        {/* SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="grad-operational" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-progress" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-cross" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Cross-Domain Connections */}
          {connections.map((conn, i) => {
            const fromNode = nodeMap[conn.from]
            const toNode = nodeMap[conn.to]
            if (!fromNode || !toNode) return null
            if (fromNode.status === 'planned' || toNode.status === 'planned') return null

            const start = fromNode.pos
            const end = toNode.pos
            const midX = (start.x + end.x) / 2
            const midY = (start.y + end.y) / 2
            const cpX = midX * 0.7 + centerX * 0.3
            const cpY = midY * 0.7 + centerY * 0.3

            return (
              <g key={`cross-${i}`}>
                <path
                  d={`M${start.x},${start.y} Q${cpX},${cpY} ${end.x},${end.y}`}
                  fill="none"
                  stroke="url(#grad-cross)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
                <circle r="1.5" fill="#cbd5e1">
                  <animateMotion
                    dur={`${4 + i}s`}
                    repeatCount="indefinite"
                    path={`M${start.x},${start.y} Q${cpX},${cpY} ${end.x},${end.y}`}
                    calcMode="linear"
                  />
                </circle>
              </g>
            )
          })}

          {/* Center-to-Node Connections */}
          {nodes.map((node) => {
            const pos = nodeMap[node.id].pos
            const isHovered = hoveredNode === node.id

            let strokeUrl = "url(#grad-planned)"
            let particleColor = "#ffffff"
            if (node.status === 'operational') { strokeUrl = "url(#grad-operational)"; particleColor = "#22d3ee" }
            if (node.status === 'progress') { strokeUrl = "url(#grad-progress)"; particleColor = "#a78bfa" }

            return (
              <g key={node.id}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={strokeUrl}
                  strokeWidth={isHovered ? 2 : 1}
                  opacity={isHovered || hoveredNode === 'center' ? 0.8 : 0.3}
                  className="transition-all duration-500"
                />
                {node.status !== 'planned' && (
                  <>
                    <circle r={1.5} fill={particleColor}>
                      <animateMotion
                        dur={node.status === 'operational' ? "3s" : "5s"}
                        repeatCount="indefinite"
                        path={`M${centerX},${centerY} L${pos.x},${pos.y}`}
                      />
                    </circle>
                    <circle r={1} fill="#fbbf24" opacity="0.8">
                      <animateMotion
                        dur={node.status === 'operational' ? "4.5s" : "7s"}
                        repeatCount="indefinite"
                        path={`M${pos.x},${pos.y} L${centerX},${centerY}`}
                      />
                    </circle>
                  </>
                )}
              </g>
            )
          })}
        </svg>

        {/* Central Hub */}
        <div
          className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          onMouseEnter={() => setHoveredNode('center')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Atmosphere Glow */}
          <div className={`absolute inset-[-60px] rounded-full bg-cyan-500/5 blur-[60px] transition-all duration-1000 ${activePulse ? 'opacity-70 scale-110' : 'opacity-30 scale-100'}`} />

          {/* Main Core Container */}
          <div className="relative w-96 h-96">
            {/* Rotating Rings */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/10 border-dashed animate-spin-slow" />
            <div className="absolute inset-6 rounded-full border border-slate-500/10 border-dotted animate-spin-slower-reverse" />

            {/* Solid Core */}
            <div className="absolute inset-10 rounded-full bg-deck-surface/90 backdrop-blur-xl border border-slate-700/50 shadow-[0_0_100px_-20px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cyan-400/30 group-hover:shadow-[0_0_120px_-10px_rgba(6,182,212,0.3)]">
              {/* Inner Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-gradient-to-b from-cyan-900/20 to-transparent rounded-full blur-xl" />

              {/* Icon & Labels */}
              <div className="relative z-10 flex flex-col items-center mt-2">
                <div className="mb-5 relative">
                  <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 animate-pulse" />
                  <div className="text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                    <Icon name={centerIcon} size={48} strokeWidth={1.5} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-[0.15em] uppercase leading-none text-center">
                  {centerTitle}
                </h2>
                {centerSubtitle && (
                  <h2 className="text-xl font-bold text-cyan-50 font-mono tracking-[0.1em] uppercase leading-tight mt-2 text-center">
                    {centerSubtitle}
                  </h2>
                )}

                {centerTagline && (
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-cyan-950/60 rounded-full border border-cyan-800/60 shadow-lg backdrop-blur-sm">
                      <div className="text-cyan-400 animate-pulse">
                        <Icon name="Activity" size={14} />
                      </div>
                      <span className="text-[10px] text-cyan-100 tracking-[0.15em] font-mono uppercase font-semibold">
                        {centerTagline}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodeMap[node.id].pos
          const isHovered = hoveredNode === node.id

          let containerClass = "border-slate-800 bg-slate-900/40 text-slate-500"
          let iconClass = "text-slate-600 bg-slate-800"
          let barColorClass = "bg-slate-600"

          if (node.status === 'operational') {
            containerClass = "border-cyan-500/40 bg-cyan-950/30 text-cyan-50 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]"
            iconClass = "text-cyan-300 bg-cyan-900/40 shadow-inner"
            barColorClass = "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
          } else if (node.status === 'progress') {
            containerClass = "border-violet-500/40 bg-violet-950/30 text-violet-50 shadow-[0_0_40px_-10px_rgba(167,139,250,0.2)]"
            iconClass = "text-violet-300 bg-violet-900/40 shadow-inner"
            barColorClass = "bg-violet-400 shadow-[0_0_8px_#a78bfa]"
          }

          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 cursor-pointer ${isHovered ? 'z-50 scale-110' : 'scale-100'}`}
              style={{ left: pos.x, top: pos.y }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className={`w-44 p-3 backdrop-blur-md rounded-xl border flex flex-row items-center gap-3 transition-all duration-300 hover:border-opacity-80 hover:bg-opacity-60 ${containerClass} ${isHovered ? 'ring-1 ring-white/20' : ''}`}>
                <div className={`p-2.5 rounded-lg ${iconClass} transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}>
                  <Icon name={node.icon} size={18} strokeWidth={2} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-bold text-[10px] tracking-[0.1em] uppercase leading-tight">{node.label}</span>
                  <div className="h-1.5 mt-2 rounded-full overflow-hidden bg-slate-700/30 w-full max-w-[80%]">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${barColorClass}`}
                      style={{ width: `${node.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Legend */}
      <div className="absolute bottom-8 flex gap-16 text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span className="text-cyan-100">Operational</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
          <span className="text-violet-100">In Progress</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full border border-slate-500" />
          <span className="text-slate-500">Planned</span>
        </div>
      </div>
    </SlideWrapper>
  )
}
