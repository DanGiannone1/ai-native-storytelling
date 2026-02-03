import { motion } from 'framer-motion'
import { Icon, IconName, SectionSlide, itemVariants } from '@catalog'

interface SolutionOverviewProps {
  active: boolean
}

interface ComponentInfo {
  name: string
  role: string
  icon: IconName
  color: string
}

// Components organized by WHAT they do, not WHERE they live
const components: ComponentInfo[] = [
  { name: 'Scheduler', role: 'Triggers jobs on cron schedules', icon: 'Calendar', color: '#a78bfa' },
  { name: 'Queue', role: 'Buffers and distributes jobs', icon: 'Inbox', color: '#22d3ee' },
  { name: 'Orchestrator', role: 'Executes jobs on workstations', icon: 'Cpu', color: '#34d399' },
  { name: 'Telemetry', role: 'Captures traces and metrics', icon: 'BarChart3', color: '#fbbf24' },
  { name: 'MCP Server', role: 'API for agents and developers', icon: 'Server', color: '#0078d4' },
  { name: 'Dashboard', role: 'Real-time visibility', icon: 'Eye', color: '#fb7185' },
]

export const SolutionOverview = ({ active }: SolutionOverviewProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="grid"
      contentClassName="z-10 w-full max-w-5xl px-8"
      headerClassName="text-center mb-12"
      eyebrow="The Solution"
      title="Command Center Components"
      footer="Cloud infrastructure + local execution"
      footerClassName="text-center text-white/40 mt-10 text-sm"
    >
      {/* Bento Grid Layout - Glassmorphic */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[320px]">
        {components.map((comp) => {
          // Make Orchestrator and MCP Server span 2 columns
          const isLarge = comp.name === 'Orchestrator' || comp.name === 'MCP Server'
          return (
            <motion.div
              key={comp.name}
              variants={itemVariants}
              className={`relative group p-4 rounded-lg backdrop-blur-md ${isLarge ? 'col-span-2' : ''}`}
              style={{
                background: `linear-gradient(135deg, ${comp.color}15 0%, ${comp.color}05 100%)`,
                borderTop: `1px solid ${comp.color}35`,
                borderLeft: `1px solid ${comp.color}25`,
                borderRight: `1px solid ${comp.color}12`,
                borderBottom: `1px solid ${comp.color}12`,
                boxShadow: `0 4px 24px -4px ${comp.color}20`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute -inset-1 rounded-lg blur-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                style={{ backgroundColor: comp.color }}
              />
              <div className="relative h-full flex flex-col">
                <div className={`flex items-center gap-3 ${isLarge ? 'mb-2' : 'mb-1'}`}>
                  <div
                    className={`${isLarge ? 'w-10 h-10' : 'w-8 h-8'} rounded flex items-center justify-center flex-shrink-0`}
                    style={{ backgroundColor: `${comp.color}25` }}
                  >
                    <Icon name={comp.icon} size={isLarge ? 20 : 16} strokeWidth={1.5} style={{ color: comp.color }} />
                  </div>
                  <h3 className={`text-white font-semibold ${isLarge ? 'text-base' : 'text-sm'}`}>{comp.name}</h3>
                </div>
                <p className={`text-white/50 ${isLarge ? 'text-sm' : 'text-xs'} leading-relaxed`}>{comp.role}</p>
              </div>
              {/* Accent line */}
              <div
                className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40"
                style={{ backgroundColor: comp.color }}
              />
            </motion.div>
          )
        })}
      </div>
    </SectionSlide>
  )
}
