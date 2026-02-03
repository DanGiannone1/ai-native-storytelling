import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface MCPServerProps {
  active: boolean
}

interface MCPTool {
  name: string
  description: string
  icon: IconName
  color: string
  angle: number
}

// Colors by category: data access (cyan), actions (green), documentation (purple)
const toolColors = {
  data: '#22d3ee',
  action: '#34d399',
  docs: '#a78bfa',
}

const tools: MCPTool[] = [
  { name: 'telemetry', description: 'Query job metrics', icon: 'BarChart3', color: toolColors.data, angle: 270 },
  { name: 'dispatch', description: 'Queue new jobs', icon: 'Send', color: toolColors.action, angle: 342 },
  { name: 'schedules', description: 'CRUD operations', icon: 'Calendar', color: toolColors.data, angle: 54 },
  { name: 'retro', description: 'Log retrospectives', icon: 'FileText', color: toolColors.docs, angle: 126 },
  { name: 'send_email', description: 'Notifications', icon: 'Mail', color: toolColors.action, angle: 198 },
]

export const MCPServer = ({ active }: MCPServerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const layout = { width: 820, height: 520 }
  const centerX = layout.width / 2
  const centerY = layout.height / 2
  const radius = 210

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const center = container.querySelector('.center-core')
    const toolEls = container.querySelectorAll('.tool-item')
    const footer = container.querySelector('.slide-footer')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
    gsap.fromTo(center, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "power2.out" })

    toolEls.forEach((tool, i) => {
      gsap.fromTo(tool, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.5 + i * 0.08, ease: "power2.out" })
    })

    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.1 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Header */}
        <div className="z-10 text-center mb-8">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">Integration Point</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The MCP Server
          </h1>
        </div>

        {/* Radial Diagram */}
        <div className="z-10 relative" style={{ width: layout.width, height: layout.height }}>
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${layout.width} ${layout.height}`}>
            <defs>
              <filter id="mcpGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {tools.map((tool, i) => {
              const x = centerX + Math.cos(tool.angle * Math.PI / 180) * radius
              const y = centerY + Math.sin(tool.angle * Math.PI / 180) * radius
              return (
                <g key={i}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={tool.color}
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <circle r="3" fill={tool.color} filter="url(#mcpGlow)">
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M ${centerX} ${centerY} L ${x} ${y}`}
                      begin={`${i * 0.2}s`}
                    />
                  </circle>
                </g>
              )
            })}
          </svg>

          {/* Center Core */}
          <div className="center-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute -inset-12 rounded-full blur-[50px]"
              style={{ backgroundColor: '#0078d425' }}
            />
            <div
              className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0078d430, #0078d410)',
                boxShadow: '0 0 60px -10px #0078d480',
              }}
            >
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: '#0078d460' }}
              />
              <Icon name="Server" size={36} strokeWidth={1} style={{ color: '#0078d4' }} className="mb-1" />
              <span className="text-white/90 text-sm font-semibold">MCP</span>
              <span className="text-[#0078d4] text-xs">Container App</span>
            </div>
          </div>

          {/* Tool Nodes */}
          {tools.map((tool, i) => {
            const x = centerX + Math.cos(tool.angle * Math.PI / 180) * radius
            const y = centerY + Math.sin(tool.angle * Math.PI / 180) * radius
            return (
              <div
                key={i}
                className="tool-item absolute"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${tool.color}15`,
                    border: `1px solid ${tool.color}40`,
                    boxShadow: `0 0 20px -5px ${tool.color}40`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tool.color}25` }}
                  >
                    <Icon name={tool.icon} size={20} strokeWidth={1.5} style={{ color: tool.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-mono text-sm font-semibold">{tool.name}</span>
                    <span className="text-white/60 text-sm">{tool.description}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer with legend */}
        <div className="slide-footer z-10 mt-4 flex flex-col items-center gap-3">
          <div className="flex gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: toolColors.data, boxShadow: `0 0 6px ${toolColors.data}` }} />
              <span style={{ color: toolColors.data }} className="uppercase tracking-wider font-medium">Data Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: toolColors.action, boxShadow: `0 0 6px ${toolColors.action}` }} />
              <span style={{ color: toolColors.action }} className="uppercase tracking-wider font-medium">Actions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: toolColors.docs, boxShadow: `0 0 6px ${toolColors.docs}` }} />
              <span style={{ color: toolColors.docs }} className="uppercase tracking-wider font-medium">Documentation</span>
            </div>
          </div>
          <p className="text-white/40 text-sm">
            One endpoint for all agent integrations
          </p>
        </div>
      </div>
    </div>
  )
}
