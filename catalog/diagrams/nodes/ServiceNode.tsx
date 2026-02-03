import { memo } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { Icon, IconName } from '../../primitives/Icon'

// Provider color mapping - muted tones for 2026 refined glassmorphism
const providerColors: Record<string, string> = {
  cloudA: '#0078d4',
  cloudB: '#22d3ee',
  local: '#94a3b8',
  default: '#94a3b8',
}

export interface ServiceNodeData {
  label: string
  description?: string
  icon?: IconName
  provider?: 'cloudA' | 'cloudB' | 'local'
  color?: string // Override provider color
  size?: 'sm' | 'md' | 'lg'
  showHandles?: boolean
}

/**
 * Refined glassmorphic node component - 2026 dark mode aesthetic.
 * Features: opaque frosted glass, inner shadows for depth, neutral borders,
 * subtle accent colors without harsh neon glow.
 */
export const ServiceNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as ServiceNodeData
  const {
    label = 'Node',
    description,
    icon,
    provider = 'default',
    color: customColor,
    size = 'md',
    showHandles = true,
  } = nodeData

  const color = customColor || providerColors[provider] || providerColors.default

  const sizeClasses = {
    sm: 'px-3 py-2.5 min-w-[90px]',
    md: 'px-4 py-3 min-w-[130px]',
    lg: 'px-5 py-4 min-w-[160px]',
  }

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  }

  return (
    <div className="relative group">
      {/* Main container - refined dark glassmorphism */}
      <div
        className={`
          relative rounded-lg backdrop-blur-xl transition-all duration-200
          ${sizeClasses[size]}
          ${selected ? 'ring-1 ring-white/40' : ''}
        `}
        style={{
          // More opaque, darker glass - not transparent
          background: `linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)`,
          // Neutral gray borders - not white (which glows harshly)
          border: '1px solid rgba(148,163,184,0.15)',
          // Inner shadow creates glass depth, subtle outer shadow
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -1px 0 rgba(0,0,0,0.2),
            0 2px 8px -2px rgba(0,0,0,0.3)
          `,
        }}
      >
        {showHandles && (
          <>
            <Handle
              type="target"
              position={Position.Left}
              className="!bg-transparent !border-0 !w-3 !h-3"
            />
            <Handle
              type="source"
              position={Position.Right}
              className="!bg-transparent !border-0 !w-3 !h-3"
            />
          </>
        )}

        {/* Left accent bar - subtle provider indicator */}
        <div
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
          style={{
            backgroundColor: color,
            opacity: 0.6,
          }}
        />

        <div className="flex items-center gap-2.5 pl-1">
          {icon && (
            <div
              className="rounded flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                width: iconSizes[size] + 10,
                height: iconSizes[size] + 10,
              }}
            >
              <Icon
                name={icon}
                size={iconSizes[size]}
                strokeWidth={1.5}
                style={{ color: `${color}` }}
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-white/90 font-medium text-sm leading-tight">{label}</span>
            {description && (
              <span className="text-white/45 text-[11px] leading-tight">{description}</span>
            )}
          </div>
        </div>
      </div>

      {/* Subtle hover highlight - not a glow, just a border highlight */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid ${color}30`,
        }}
      />
    </div>
  )
})

ServiceNode.displayName = 'ServiceNode'
