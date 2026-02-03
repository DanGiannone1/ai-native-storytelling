import { motion } from 'framer-motion'
import { Node, Edge } from '@xyflow/react'
import { FlowDiagram, SectionSlide, itemVariants } from '@catalog'

interface BigPictureFlowProps {
  active: boolean
}

// Define nodes for the high-level flow
// Layout: spread horizontally to create longer edges (better for animation)
// Right side flows L→R: Orchestrator → Telemetry → Dashboard
const nodes: Node[] = [
  // Triggers (left side, stacked)
  {
    id: 'schedule',
    type: 'service',
    position: { x: 0, y: 20 },
    data: { label: 'Schedule', description: 'Cron trigger', icon: 'Calendar', provider: 'cloudA' },
  },
  {
    id: 'agent',
    type: 'service',
    position: { x: 0, y: 110 },
    data: { label: 'Agent / CLI', description: 'On-demand', icon: 'Code', provider: 'local' },
  },

  // Queue (center-left)
  {
    id: 'queue',
    type: 'service',
    position: { x: 280, y: 65 },
    data: { label: 'Queue', description: 'Job buffer', icon: 'Inbox', provider: 'cloudB', size: 'lg' },
  },

  // Execution (center)
  {
    id: 'orchestrator',
    type: 'service',
    position: { x: 540, y: 65 },
    data: { label: 'Orchestrator', description: 'Executes jobs', icon: 'Cpu', provider: 'local', size: 'lg' },
  },

  // Outputs (spread horizontally on right - no more vertical stack)
  {
    id: 'telemetry',
    type: 'service',
    position: { x: 820, y: 35 },
    data: { label: 'Telemetry', description: 'Traces & metrics', icon: 'BarChart3', provider: 'cloudB' },
  },
  {
    id: 'dashboard',
    type: 'service',
    position: { x: 1050, y: 95 },
    data: { label: 'Dashboard', description: 'Visibility', icon: 'Eye', provider: 'local' },
  },
]

// Define edges with colors
const edges: Edge[] = [
  { id: 'e-schedule-queue', source: 'schedule', target: 'queue', data: { color: '#0078d4' } },
  { id: 'e-agent-queue', source: 'agent', target: 'queue', data: { color: '#64748b' } },
  { id: 'e-queue-orchestrator', source: 'queue', target: 'orchestrator', data: { color: '#22d3ee', label: 'pulls' } },
  { id: 'e-orchestrator-telemetry', source: 'orchestrator', target: 'telemetry', data: { color: '#22d3ee', label: 'streams' } },
  { id: 'e-telemetry-dashboard', source: 'telemetry', target: 'dashboard', data: { color: '#64748b', label: 'queries' } },
]

export const BigPictureFlow = ({ active }: BigPictureFlowProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="default"
      contentClassName="z-10 w-full h-full flex flex-col"
      headerClassName="text-center pt-8 pb-4"
      eyebrow="End to End"
      title="The Big Picture"
      headerSize="md"
    >
      {/* Flow Diagram - Glassmorphic container */}
      <motion.div
        variants={itemVariants}
        className="flex-1 mx-8 mb-4 rounded-xl backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          borderRight: '1px solid rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <FlowDiagram
          nodes={nodes}
          edges={edges}
          fitView
        />
      </motion.div>

      {/* Legend - Glassmorphic */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-6 pb-8"
      >
        {[
          { color: '#0078d4', label: 'Cloud A' },
          { color: '#22d3ee', label: 'Cloud B' },
          { color: '#64748b', label: 'Local' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
              border: `1px solid ${item.color}30`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: item.color }}>
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </SectionSlide>
  )
}
