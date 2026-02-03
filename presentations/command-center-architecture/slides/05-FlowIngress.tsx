import { motion } from 'framer-motion'
import { Node, Edge } from '@xyflow/react'
import { FlowDiagram, SectionSlide, itemVariants, Icon } from '@catalog'

interface FlowIngressProps {
  active: boolean
}

// Scheduled path nodes - 200px spacing to keep nodes readable in fitView
const scheduledNodes: Node[] = [
  {
    id: 'cosmos',
    type: 'service',
    position: { x: 0, y: 50 },
    data: { label: 'Document DB', description: 'Cron schedules', icon: 'Database', provider: 'cloudA' },
  },
  {
    id: 'dispatcher',
    type: 'service',
    position: { x: 200, y: 50 },
    data: { label: 'Dispatcher', description: 'Polls & publishes', icon: 'Calendar', provider: 'cloudA' },
  },
  {
    id: 'queue1',
    type: 'service',
    position: { x: 400, y: 50 },
    data: { label: 'Message Bus', description: 'Job queue', icon: 'Inbox', provider: 'cloudB' },
  },
]

// Remove labels - they're unreadable over lines
const scheduledEdges: Edge[] = [
  { id: 'e1', source: 'cosmos', target: 'dispatcher', data: { color: '#0078d4' } },
  { id: 'e2', source: 'dispatcher', target: 'queue1', data: { color: '#22d3ee' } },
]

// On-demand path nodes - 200px spacing to match scheduled path
const onDemandNodes: Node[] = [
  {
    id: 'agent',
    type: 'service',
    position: { x: 0, y: 50 },
    data: { label: 'Agent / CLI', description: 'Developer or agent', icon: 'Code', provider: 'local' },
  },
  {
    id: 'mcp',
    type: 'service',
    position: { x: 200, y: 50 },
    data: { label: 'MCP Server', description: 'dispatch tool', icon: 'Server', provider: 'cloudA' },
  },
  {
    id: 'queue2',
    type: 'service',
    position: { x: 400, y: 50 },
    data: { label: 'Message Bus', description: 'Job queue', icon: 'Inbox', provider: 'cloudB' },
  },
]

const onDemandEdges: Edge[] = [
  { id: 'e3', source: 'agent', target: 'mcp', data: { color: '#64748b' } },
  { id: 'e4', source: 'mcp', target: 'queue2', data: { color: '#22d3ee' } },
]

export const FlowIngress = ({ active }: FlowIngressProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="grid"
      contentClassName="z-10 w-full max-w-6xl px-8"
      headerClassName="text-center mb-8"
      eyebrow="Deep Dive"
      title="Job Ingress"
    >
      {/* Two paths side by side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Scheduled Path */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 100%)',
            borderTop: '1px solid rgba(139,92,246,0.35)',
            borderLeft: '1px solid rgba(139,92,246,0.25)',
            borderRight: '1px solid rgba(139,92,246,0.12)',
            borderBottom: '1px solid rgba(139,92,246,0.12)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Icon name="Clock" size={18} strokeWidth={1.5} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Scheduled</h3>
              <p className="text-white/50 text-sm">Document DB → Dispatcher → Message Bus</p>
            </div>
          </div>
          <div
            className="h-[160px] rounded-lg backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.02)',
            }}
          >
            <FlowDiagram nodes={scheduledNodes} edges={scheduledEdges} fitView />
          </div>
          <p className="text-white/50 text-sm mt-3 leading-relaxed">
            Cron definitions in the document store are polled by the Dispatcher, which publishes jobs to the queue on schedule.
          </p>
        </motion.div>

        {/* On-Demand Path */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.04) 100%)',
            borderTop: '1px solid rgba(251,191,36,0.35)',
            borderLeft: '1px solid rgba(251,191,36,0.25)',
            borderRight: '1px solid rgba(251,191,36,0.12)',
            borderBottom: '1px solid rgba(251,191,36,0.12)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Icon name="Zap" size={18} strokeWidth={1.5} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">On-Demand</h3>
              <p className="text-white/50 text-sm">Agent/CLI → MCP Server → Message Bus</p>
            </div>
          </div>
          <div
            className="h-[160px] rounded-lg backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.02)',
            }}
          >
            <FlowDiagram nodes={onDemandNodes} edges={onDemandEdges} fitView />
          </div>
          <p className="text-white/50 text-sm mt-3 leading-relaxed">
            Agents or developers call the MCP <code className="text-amber-400/80">dispatch</code> tool to queue jobs immediately.
          </p>
        </motion.div>
      </div>

      {/* Convergence callout - Glassmorphic */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 rounded-lg backdrop-blur-md flex items-center justify-center gap-4"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 100%)',
          borderTop: '1px solid rgba(34,211,238,0.4)',
          borderLeft: '1px solid rgba(34,211,238,0.3)',
          borderRight: '1px solid rgba(34,211,238,0.15)',
          borderBottom: '1px solid rgba(34,211,238,0.15)',
        }}
      >
        <Icon name="Network" size={20} className="text-cyan-400" />
        <p className="text-cyan-300/90 text-sm">
          Both paths converge at the same queue — same execution path regardless of trigger
        </p>
      </motion.div>
    </SectionSlide>
  )
}
