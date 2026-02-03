import { motion } from 'framer-motion'
import { Node, Edge } from '@xyflow/react'
import { FlowDiagram, Icon, IconName, SectionSlide, itemVariants } from '@catalog'

interface FlowExecutionProps {
  active: boolean
}

// Execution flow nodes - evenly spaced at 250px intervals for longer visible edges
const nodes: Node[] = [
  {
    id: 'queue',
    type: 'service',
    position: { x: 0, y: 80 },
    data: { label: 'Message Bus', description: 'Job queue', icon: 'Inbox', provider: 'cloudB' },
  },
  {
    id: 'orchestrator',
    type: 'service',
    position: { x: 250, y: 80 },
    data: { label: 'Orchestrator', description: 'Workstation', icon: 'Cpu', provider: 'local' },
  },
  {
    id: 'runtime',
    type: 'service',
    position: { x: 500, y: 80 },
    data: { label: 'Agent Runtime', description: 'Headless', icon: 'Code', provider: 'local' },
  },
  {
    id: 'bigquery',
    type: 'service',
    position: { x: 750, y: 80 },
    data: { label: 'Analytics Warehouse', description: 'Telemetry', icon: 'BarChart3', provider: 'cloudB' },
  },
]

// Remove labels from edges - they're unreadable over lines
const edges: Edge[] = [
  { id: 'e1', source: 'queue', target: 'orchestrator', data: { color: '#22d3ee' } },
  { id: 'e2', source: 'orchestrator', target: 'runtime', data: { color: '#64748b' } },
  { id: 'e3', source: 'runtime', target: 'bigquery', data: { color: '#22d3ee' } },
]

interface Step {
  icon: IconName
  title: string
  description: string
  color: string
}

const steps: Step[] = [
  { icon: 'Inbox', title: 'Pull', description: 'Poll message bus, decode job payload, ACK message', color: '#22d3ee' },
  { icon: 'Play', title: 'Execute', description: 'Load agent prompt, spawn headless runtime, stream output', color: '#64748b' },
  { icon: 'Send', title: 'Stream', description: 'Parse events, buffer trace batches, write to analytics warehouse', color: '#34d399' },
]

export const FlowExecution = ({ active }: FlowExecutionProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="horizon"
      contentClassName="z-10 w-full max-w-6xl px-8"
      headerClassName="text-center mb-6"
      eyebrow="Deep Dive"
      title="Job Execution"
      footer="Local execution leverages a CLI subscription - more cost-effective than raw API"
      footerClassName="text-center text-white/40 mt-8 text-sm"
    >
      {/* Flow Diagram - Glassmorphic container */}
      <motion.div
        variants={itemVariants}
        className="h-[180px] rounded-lg backdrop-blur-sm mb-6"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          borderRight: '1px solid rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <FlowDiagram nodes={nodes} edges={edges} fitView />
      </motion.div>

      {/* Step Cards - Glassmorphic */}
      <div className="grid grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            className="relative group p-5 rounded-lg backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 100%)`,
              borderTop: `1px solid ${step.color}35`,
              borderLeft: `1px solid ${step.color}25`,
              borderRight: `1px solid ${step.color}12`,
              borderBottom: `1px solid ${step.color}12`,
              boxShadow: `0 4px 24px -4px ${step.color}20`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute -inset-1 rounded-lg blur-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300"
              style={{ backgroundColor: step.color }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}25` }}
                >
                  <Icon name={step.icon} size={18} strokeWidth={1.5} style={{ color: step.color }} />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: step.color, color: '#000' }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-white font-semibold">{step.title}</h3>
                </div>
              </div>
              <p className="text-white/55 text-xs leading-relaxed">{step.description}</p>
            </div>
            {/* Accent line */}
            <div
              className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40"
              style={{ backgroundColor: step.color }}
            />
          </motion.div>
        ))}
      </div>
    </SectionSlide>
  )
}
