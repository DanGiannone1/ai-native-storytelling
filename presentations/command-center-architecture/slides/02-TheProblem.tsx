import { motion } from 'framer-motion'
import { Icon, IconName, SectionSlide, itemVariants } from '@catalog'

interface TheProblemProps {
  active: boolean
}

interface ProblemCard {
  icon: IconName
  title: string
  points: string[]
  color: string
}

const problems: ProblemCard[] = [
  {
    icon: 'Search',
    title: 'The Platform Gap',
    points: ['No mature AI workforce platform exists', 'Current options are narrow or immature', 'Can\'t wait for vendors to catch up'],
    color: '#22d3ee',
  },
  {
    icon: 'Target',
    title: 'Strategic Imperative',
    points: ['AI agents are our core competency', 'Build core, buy supplemental', 'Future product: agent-as-a-service'],
    color: '#a78bfa',
  },
  {
    icon: 'Eye',
    title: 'Operational Reality',
    points: ['Need visibility into every agent', 'Control over schedules and dispatch', 'Full audit trail for debugging'],
    color: '#34d399',
  },
  {
    icon: 'Zap',
    title: 'Build-Now Opportunity',
    points: ['Modern tooling makes building trivial', 'No vendor lock-in risk', 'Own the infrastructure we depend on'],
    color: '#fbbf24',
  },
]

export const TheProblem = ({ active }: TheProblemProps) => {
  const underlay = (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Horizontal line connecting top row */}
        <line x1="320" y1="320" x2="680" y2="320" stroke="url(#lineGradient)" strokeWidth="1" />
        {/* Horizontal line connecting bottom row */}
        <line x1="320" y1="480" x2="680" y2="480" stroke="url(#lineGradient)" strokeWidth="1" />
        {/* Vertical line left */}
        <line x1="320" y1="320" x2="320" y2="480" stroke="#22d3ee" strokeOpacity="0.2" strokeWidth="1" />
        {/* Vertical line right */}
        <line x1="680" y1="320" x2="680" y2="480" stroke="#34d399" strokeOpacity="0.2" strokeWidth="1" />
        {/* Diagonal crosses */}
        <line x1="320" y1="320" x2="680" y2="480" stroke="#fbbf24" strokeOpacity="0.1" strokeWidth="1" />
        <line x1="680" y1="320" x2="320" y2="480" stroke="#a78bfa" strokeOpacity="0.1" strokeWidth="1" />
      </svg>
    </div>
  )

  return (
    <SectionSlide
      active={active}
      backgroundVariant="grid"
      underlay={underlay}
      contentClassName="z-10 w-full max-w-5xl px-8"
      headerClassName="text-center mb-6"
      headerAlign="center"
      headerSize="sm"
      eyebrow="The Vision"
      title="Building an AI-Native Business"
      description="Where AI agents run job functions and humans are executives managing everything"
      descriptionClassName="max-w-2xl"
      footer="We need infrastructure purpose-built for orchestrating AI agents"
      footerClassName="text-center text-white/40 mt-6 text-sm"
    >
      {/* Problem cards - 2x2 Glassmorphic grid */}
      <div className="grid grid-cols-2 gap-4">
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            variants={itemVariants}
            className="relative group p-5 rounded-lg backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, ${problem.color}15 0%, ${problem.color}05 100%)`,
              borderTop: `1px solid ${problem.color}35`,
              borderLeft: `1px solid ${problem.color}25`,
              borderRight: `1px solid ${problem.color}12`,
              borderBottom: `1px solid ${problem.color}12`,
              boxShadow: `0 4px 24px -4px ${problem.color}20`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute -inset-1 rounded-lg blur-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300"
              style={{ backgroundColor: problem.color }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${problem.color}25` }}
                >
                  <Icon name={problem.icon} size={18} strokeWidth={1.5} style={{ color: problem.color }} />
                </div>
                <h3 className="text-white font-semibold">{problem.title}</h3>
              </div>
              <ul className="space-y-1.5 ml-1">
                {problem.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/55 text-sm">
                    <span style={{ color: problem.color }} className="mt-1 text-xs">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Accent line */}
            <div
              className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40"
              style={{ backgroundColor: problem.color }}
            />
          </motion.div>
        ))}
      </div>
    </SectionSlide>
  )
}
