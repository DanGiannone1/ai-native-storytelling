import { Icon, IconName, HeroSlide } from '@catalog'

interface ClosingProps {
  active: boolean
}

interface Badge {
  icon: IconName
  label: string
  color: string
}

const badges: Badge[] = [
  { icon: 'Globe', label: 'Multi-Cloud', color: '#0078d4' },
  { icon: 'Activity', label: 'Real-Time', color: '#22d3ee' },
  { icon: 'RefreshCw', label: 'Self-Healing', color: '#34d399' },
]

export const Closing = ({ active }: ClosingProps) => {
  const underlay = (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1000 600">
        <defs>
          <radialGradient id="convergenceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="finalGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="500" cy="300" r="200" fill="url(#convergenceGlow)" />

        {/* Converging particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180)
          const startX = 500 + Math.cos(angle) * 600
          const startY = 300 + Math.sin(angle) * 400
          const colors = ['#0078d4', '#22d3ee', '#34d399', '#64748b']
          const color = colors[i % colors.length]

          return (
            <circle key={i} r={2 + (i % 3)} fill={color} filter="url(#finalGlow)">
              <animate attributeName="cx" values={`${startX};500`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${startY};300`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
            </circle>
          )
        })}
      </svg>
    </div>
  )

  const icon = (
    <div className="relative">
      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-[60px] animate-pulse-slow" />
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center shadow-[0_0_100px_-20px_rgba(34,211,238,0.6)]">
        <div className="absolute inset-1 rounded-full bg-deck-bg" />
        <Icon name="Cpu" size={56} strokeWidth={0.75} className="text-cyan-400 relative z-10" />
      </div>
    </div>
  )

  return (
    <HeroSlide
      active={active}
      underlay={underlay}
      icon={icon}
      title={(
        <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
          Command Center
        </span>
      )}
      subtitle="Autonomous operations, unified control"
      titleClassName="text-6xl md:text-7xl font-bold tracking-[0.2em] uppercase mb-6"
      subtitleClassName="text-xl md:text-2xl text-white/70 font-normal mb-14 tracking-wide"
      badges={badges.map((badge) => ({
        label: badge.label,
        icon: <Icon name={badge.icon} size={18} strokeWidth={1.5} style={{ color: badge.color }} />,
        color: badge.color,
      }))}
    />
  )
}
