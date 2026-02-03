import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface DataFlowProps {
  active: boolean
}

interface FlowNode {
  id: string
  name: string
  description: string
  icon: IconName
  provider: 'cloudA' | 'cloudB' | 'local'
}

const providerColors = {
  cloudA: '#0078d4',
  cloudB: '#22d3ee',
  local: '#64748b',
}

const providerLabels = {
  cloudA: 'Cloud A',
  cloudB: 'Cloud B',
  local: 'Local',
}

// Top row: Job Ingress (two paths converging on the message bus)
const ingressNodes: FlowNode[] = [
  { id: 'cosmos', name: 'Document DB', description: 'Cron schedules', icon: 'Database', provider: 'cloudA' },
  { id: 'dispatcher', name: 'Dispatcher', description: 'Polls & publishes', icon: 'Calendar', provider: 'cloudA' },
  { id: 'mcp', name: 'MCP Server', description: 'On-demand dispatch', icon: 'Server', provider: 'cloudA' },
]

// Center: Queue
const queueNode: FlowNode = { id: 'pubsub', name: 'Message Bus', description: 'Job queue', icon: 'Inbox', provider: 'cloudB' }

// Bottom row: Execution & Telemetry
const executionNodes: FlowNode[] = [
  { id: 'orchestrator', name: 'Orchestrator', description: 'Pulls & executes', icon: 'Cpu', provider: 'local' },
  { id: 'bigquery', name: 'Analytics Warehouse', description: 'Telemetry store', icon: 'BarChart3', provider: 'cloudB' },
  { id: 'dashboard', name: 'Dashboard', description: 'Visibility', icon: 'Eye', provider: 'local' },
]

const FlowNodeCard = ({ node, className = '' }: { node: FlowNode; className?: string }) => {
  const color = providerColors[node.provider]
  return (
    <div
      className={`flow-node flex flex-col items-center ${className}`}
    >
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px -5px ${color}30`,
        }}
      >
        <Icon name={node.icon} size={28} strokeWidth={1.5} style={{ color }} />
      </div>
      <h3 className="text-white font-semibold text-sm text-center">{node.name}</h3>
      <p className="text-white/60 text-sm text-center">{node.description}</p>
    </div>
  )
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
    const sections = container.querySelectorAll('.flow-section')
    const nodes = container.querySelectorAll('.flow-node')
    const arrows = container.querySelectorAll('.flow-arrow')
    const labels = container.querySelectorAll('.flow-label')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(sections, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.5 })
    gsap.fromTo(nodes, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, delay: 0.8 })
    gsap.fromTo(arrows, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.3, stagger: 0.08, delay: 1.2 })
    gsap.fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1, delay: 1.6 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="default" />

        {/* Header */}
        <div className="z-10 text-center mb-8">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">How It All Connects</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Data Flow
          </h1>
        </div>

        {/* Flow Diagram */}
        <div className="z-10 w-full max-w-5xl px-8">
          {/* Section 1: Job Ingress */}
          <div className="flow-section mb-6">
            <div className="flow-label text-xs font-semibold tracking-wider uppercase text-white/30 mb-4">
              Job Ingress
            </div>
            <div className="flex items-center justify-center gap-4">
              {/* Scheduled Path */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[#0078d4]/20 bg-[#0078d4]/05">
                <FlowNodeCard node={ingressNodes[0]} />
                <div className="flow-arrow w-8 h-[2px] bg-gradient-to-r from-[#0078d4] to-[#0078d4]/50" />
                <FlowNodeCard node={ingressNodes[1]} />
              </div>

              {/* Both paths arrow to queue */}
              <div className="flex flex-col items-center gap-2">
                <div className="flow-arrow w-12 h-[2px] bg-gradient-to-r from-[#0078d4]/50 to-[#22d3ee]" />
                <span className="text-[10px] text-white/30 uppercase tracking-wider">scheduled</span>
              </div>

              {/* Central Queue */}
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-2xl blur-xl"
                  style={{ backgroundColor: '#22d3ee10' }}
                />
                <div className="relative p-4 rounded-xl border-2 border-[#22d3ee]/40 bg-[#22d3ee]/10">
                  <FlowNodeCard node={queueNode} />
                </div>
              </div>

              {/* On-demand path arrow */}
              <div className="flex flex-col items-center gap-2">
                <div className="flow-arrow w-12 h-[2px] bg-gradient-to-l from-[#0078d4]/50 to-[#22d3ee]" />
                <span className="text-[10px] text-white/30 uppercase tracking-wider">on-demand</span>
              </div>

              {/* On-demand Path */}
              <div className="p-4 rounded-xl border border-[#0078d4]/20 bg-[#0078d4]/05">
                <FlowNodeCard node={ingressNodes[2]} />
              </div>
            </div>
          </div>

          {/* Vertical connector from queue to execution */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flow-arrow w-[2px] h-8 bg-gradient-to-b from-[#22d3ee] to-[#64748b]" />
              <span className="text-[10px] text-white/30 uppercase tracking-wider">pulls jobs</span>
            </div>
          </div>

          {/* Section 2: Execution & Telemetry */}
          <div className="flow-section">
            <div className="flow-label text-xs font-semibold tracking-wider uppercase text-white/30 mb-4">
              Execution & Telemetry
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="p-4 rounded-xl border border-[#64748b]/20 bg-[#64748b]/05">
                <FlowNodeCard node={executionNodes[0]} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flow-arrow w-16 h-[2px] bg-gradient-to-r from-[#64748b] to-[#22d3ee]" />
                <span className="text-[10px] text-white/30 uppercase tracking-wider">traces</span>
              </div>

              <div className="p-4 rounded-xl border border-[#22d3ee]/20 bg-[#22d3ee]/05">
                <FlowNodeCard node={executionNodes[1]} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flow-arrow w-16 h-[2px] bg-gradient-to-r from-[#22d3ee] to-[#64748b]" />
                <span className="text-[10px] text-white/30 uppercase tracking-wider">queries</span>
              </div>

              <div className="p-4 rounded-xl border border-[#64748b]/20 bg-[#64748b]/05">
                <FlowNodeCard node={executionNodes[2]} />
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="z-10 flex gap-8 mt-10 text-xs">
          {Object.entries(providerColors).map(([provider, color]) => (
            <div key={provider} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
              />
              <span style={{ color }} className="uppercase tracking-wider font-medium">
                {providerLabels[provider as keyof typeof providerLabels]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
