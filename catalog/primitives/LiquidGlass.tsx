import { ReactNode } from 'react'

interface LiquidGlassProps {
  children: ReactNode
  className?: string
  variant?: 'panel' | 'card' | 'button' | 'badge'
  color?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
  hover?: boolean
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

/**
 * Liquid Glass component - Apple-inspired glassmorphism with depth and translucency.
 * Adapts to content and provides a premium, modern feel.
 */
export function LiquidGlass({
  children,
  className = '',
  variant = 'panel',
  color = '#22d3ee',
  blur = 'md',
  glow = true,
  hover = true,
}: LiquidGlassProps) {
  const baseClasses = `
    relative overflow-hidden
    ${blurClasses[blur]}
    transition-all duration-300
  `

  const variantClasses = {
    panel: 'rounded-2xl p-6',
    card: 'rounded-xl p-4',
    button: 'rounded-lg px-4 py-2',
    badge: 'rounded-full px-3 py-1 text-sm',
  }

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:bg-white/10' : ''

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid rgba(255,255,255,0.1)`,
        boxShadow: glow
          ? `0 8px 32px -8px ${color}20, inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)`
          : `inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)`,
      }}
    >
      {/* Top highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)`,
        }}
      />

      {/* Specular highlight */}
      <div
        className="absolute top-0 left-1/4 w-1/2 h-1/3 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center top, rgba(255,255,255,0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Color tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${color}15 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  color?: string
  active?: boolean
  className?: string
}

export function GlassButton({
  children,
  onClick,
  color = '#22d3ee',
  active = false,
  className = '',
}: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg px-4 py-2
        backdrop-blur-md transition-all duration-200
        hover:scale-105 active:scale-95
        ${active ? 'ring-1' : ''}
        ${className}
      `}
      style={{
        background: active
          ? `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`
          : `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${active ? color + '50' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: active ? `0 0 20px -5px ${color}50` : 'none',
        ringColor: color,
      }}
    >
      <span className="relative z-10 text-sm font-medium" style={{ color: active ? color : 'white' }}>
        {children}
      </span>
    </button>
  )
}

interface GlassBadgeProps {
  children: ReactNode
  color?: string
  icon?: ReactNode
  pulse?: boolean
}

export function GlassBadge({
  children,
  color = '#22d3ee',
  icon,
  pulse = false,
}: GlassBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
      style={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}08 100%)`,
        border: `1px solid ${color}40`,
        boxShadow: `0 0 20px -8px ${color}60`,
      }}
    >
      {icon && (
        <span className={pulse ? 'animate-pulse' : ''} style={{ color }}>
          {icon}
        </span>
      )}
      <span className="text-xs font-medium tracking-wide uppercase" style={{ color }}>
        {children}
      </span>
    </div>
  )
}
