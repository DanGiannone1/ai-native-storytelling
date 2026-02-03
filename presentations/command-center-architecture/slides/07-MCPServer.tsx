import { motion } from 'framer-motion'
import { Icon, IconName, SectionSlide, itemVariants } from '@catalog'

interface MCPServerProps {
  active: boolean
}

interface MCPTool {
  name: string
  description: string
  detail: string
  icon: IconName
  color: string
}

const tools: MCPTool[] = [
  {
    name: 'dispatch',
    description: 'Queue a job',
    detail: 'Push jobs to the message bus for orchestrator execution',
    icon: 'Send',
    color: '#34d399',
  },
  {
    name: 'telemetry',
    description: 'Query metrics',
    detail: 'Read job history, traces, and performance data',
    icon: 'BarChart3',
    color: '#22d3ee',
  },
  {
    name: 'schedules',
    description: 'Manage cron jobs',
    detail: 'CRUD operations on scheduled job definitions',
    icon: 'Calendar',
    color: '#fbbf24',
  },
  {
    name: 'retro',
    description: 'Self-improvement',
    detail: 'Log retrospectives that feed the recursive improvement loop',
    icon: 'FileText',
    color: '#a78bfa',
  },
  {
    name: 'send_email',
    description: 'Send emails',
    detail: 'Formatted HTML emails via cloud mail service - no credentials needed',
    icon: 'Mail',
    color: '#fb7185',
  },
]

export const MCPServer = ({ active }: MCPServerProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="grid"
      contentClassName="z-10 w-full max-w-6xl px-8"
      headerClassName="text-center mb-8"
      eyebrow="Integration Point"
      title="The MCP Server"
      footer="Single endpoint for all Command Center operations"
      footerClassName="text-center text-white/40 mt-10 text-sm"
    >
      {/* Three-column layout: Clients → MCP Server → Tools */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Left: Clients */}
        <motion.div variants={itemVariants} className="relative flex flex-col gap-3 pr-6">
          <div className="pointer-events-none absolute right-2 top-3 bottom-3 w-px bg-slate-500/35" />
          <div
            className="relative group flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 100%)',
              borderTop: '1px solid rgba(34,211,238,0.3)',
              borderLeft: '1px solid rgba(34,211,238,0.2)',
              borderRight: '1px solid rgba(34,211,238,0.1)',
              borderBottom: '1px solid rgba(34,211,238,0.1)',
            }}
          >
            <div className="pointer-events-none absolute -right-3 top-1/2 h-px w-3 bg-slate-500/40 -translate-y-1/2" />
            <div className="w-10 h-10 rounded bg-cyan-500/20 flex items-center justify-center">
              <Icon name="Cpu" size={20} strokeWidth={1.5} className="text-cyan-400" />
            </div>
            <div>
              <span className="text-white font-semibold block text-sm">Autonomous Agents</span>
              <span className="text-white/50 text-xs">Scheduled jobs, background tasks</span>
            </div>
          </div>
          <div
            className="relative group flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(52,211,153,0.05) 100%)',
              borderTop: '1px solid rgba(52,211,153,0.3)',
              borderLeft: '1px solid rgba(52,211,153,0.2)',
              borderRight: '1px solid rgba(52,211,153,0.1)',
              borderBottom: '1px solid rgba(52,211,153,0.1)',
            }}
          >
            <div className="pointer-events-none absolute -right-3 top-1/2 h-px w-3 bg-slate-500/40 -translate-y-1/2" />
            <div className="w-10 h-10 rounded bg-emerald-500/20 flex items-center justify-center">
              <Icon name="Code" size={20} strokeWidth={1.5} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-white font-semibold block text-sm">Developer Terminals</span>
              <span className="text-white/50 text-xs">Interactive CLI sessions</span>
            </div>
          </div>
        </motion.div>

        {/* Center: MCP Server with bidirectional connectors */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          {/* Left connector - bidirectional (clients to MCP) */}
          <svg className="w-24 h-8" viewBox="0 0 96 32">
            {/* Solid visible line */}
            <line x1="8" y1="16" x2="88" y2="16" stroke="#64748b" strokeWidth="2" />
            {/* Arrows on both ends */}
            <path d="M82 10 L90 16 L82 22" fill="none" stroke="#0078d4" strokeWidth="2" />
            <path d="M14 10 L6 16 L14 22" fill="none" stroke="#22d3ee" strokeWidth="2" />
            {/* Particle going right (requests) */}
            <circle r="3" fill="#22d3ee">
              <animate attributeName="cx" values="10;86" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="16;16" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Particle going left (responses) */}
            <circle r="2.5" fill="#0078d4">
              <animate attributeName="cx" values="86;10" dur="2.5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="cy" values="16;16" dur="2.5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.1;0.85;1" dur="2.5s" repeatCount="indefinite" begin="1s" />
            </circle>
          </svg>

          {/* MCP Server box with subtle pulse */}
          <div className="relative">
            <motion.div
              className="absolute -inset-2 rounded-xl bg-[#0078d4]/15 blur-lg"
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              className="relative px-6 py-5 rounded-xl backdrop-blur-md"
              style={{
                background: 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)',
                border: '1px solid rgba(0,120,212,0.3)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px -8px rgba(0,120,212,0.3)',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-[#0078d4]/20 flex items-center justify-center">
                  <Icon name="Server" size={24} strokeWidth={1.5} style={{ color: '#0078d4' }} />
                </div>
                <div className="text-center">
                  <span className="text-[#0078d4] font-semibold block">MCP Server</span>
                  <span className="text-white/40 text-xs">Container Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right connector - bidirectional (MCP to tools) - matches left */}
          <svg className="w-20 h-8" viewBox="0 0 80 32">
            <defs>
              <linearGradient id="connectorGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0078d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {/* Line - more visible */}
            <line x1="0" y1="16" x2="80" y2="16" stroke="url(#connectorGrad2)" strokeWidth="2.5" />
            {/* Arrows on both ends - larger and more visible */}
            <path d="M72 10 L80 16 L72 22" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.7" />
            <path d="M8 10 L0 16 L8 22" fill="none" stroke="#0078d4" strokeWidth="2" opacity="0.8" />
            {/* Particle going right (to tools) */}
            <circle r="2.5" fill="#0078d4">
              <animate attributeName="cx" values="4;76" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="16;16" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Particle going left (return data from telemetry/schedules) */}
            <circle r="2" fill="#22d3ee">
              <animate attributeName="cx" values="76;4" dur="2.2s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="cy" values="16;16" dur="2.2s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.85;1" dur="2.2s" repeatCount="indefinite" begin="0.8s" />
            </circle>
          </svg>
        </motion.div>

        {/* Right: Tools with staggered float animation */}
        <motion.div variants={itemVariants} className="relative flex flex-col gap-1.5 pl-6">
          <div className="pointer-events-none absolute left-2 top-2 bottom-2 w-px bg-slate-500/35" />
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="relative flex items-center gap-2.5 px-3 py-2 rounded-lg backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${tool.color}15 0%, ${tool.color}05 100%)`,
                borderTop: `1px solid ${tool.color}30`,
                borderLeft: `1px solid ${tool.color}20`,
                borderRight: `1px solid ${tool.color}10`,
                borderBottom: `1px solid ${tool.color}10`,
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.4,
              }}
            >
              <div className="pointer-events-none absolute -left-3 top-1/2 h-px w-3 bg-slate-500/40 -translate-y-1/2" />
              <div
                className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${tool.color}25` }}
              >
                <Icon name={tool.icon} size={14} strokeWidth={1.5} style={{ color: tool.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-mono text-xs font-semibold">{tool.name}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/60 text-xs">{tool.description}</span>
                </div>
                <p className="text-white/35 text-[10px] truncate">{tool.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionSlide>
  )
}
