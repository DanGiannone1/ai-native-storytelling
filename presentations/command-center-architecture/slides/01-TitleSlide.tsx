import { Icon, HeroSlide } from '@catalog'

interface TitleSlideProps {
  active: boolean
}

export const TitleSlide = ({ active }: TitleSlideProps) => {
  const underlay = (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1000 600">
        <defs>
          <radialGradient id="titleGlow" cx="50%" cy="45%" r="40%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="particleBlur">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="500" cy="270" r="180" fill="url(#titleGlow)" />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * 36) * (Math.PI / 180)
          const radius = 150 + (i % 3) * 80
          const cx = 500 + Math.cos(angle) * radius
          const cy = 270 + Math.sin(angle) * radius * 0.6
          const colors = ['#0078d4', '#22d3ee', '#34d399', '#64748b']
          const color = colors[i % colors.length]
          const size = 2 + (i % 3)

          return (
            <circle key={i} cx={cx} cy={cy} r={size} fill={color} filter="url(#particleBlur)" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${cy};${cy - 10};${cy}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          )
        })}
      </svg>
    </div>
  )

  const icon = (
    <div className="relative">
      <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[40px]" />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/25 flex items-center justify-center shadow-[0_0_80px_-15px_rgba(34,211,238,0.5)]">
        <div className="absolute inset-1 rounded-full bg-deck-bg" />
        <Icon name="Cpu" size={44} strokeWidth={0.75} className="text-cyan-400 relative z-10" />
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
          Agent Command Center
        </span>
      )}
      subtitle="Orchestrating autonomous intelligence at scale"
    />
  )
}
