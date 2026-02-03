import { memo, useMemo } from 'react'
import { BaseEdge, EdgeProps, getSmoothStepPath, getBezierPath, getStraightPath } from '@xyflow/react'

interface AnimatedEdgeData {
  color?: string
  animated?: boolean
  dashed?: boolean
  label?: string
  pathType?: 'smoothstep' | 'bezier'
}

/**
 * Animated edge with a single flowing particle.
 * Animation duration scales with edge length to maintain consistent visual speed.
 */
export const AnimatedEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
}: EdgeProps) => {
  const {
    color = '#22d3ee',
    animated = true,
    dashed = false,
    label,
    pathType = 'smoothstep',
  } = (data || {}) as AnimatedEdgeData

  // Calculate approximate edge length for animation timing
  // This helps maintain consistent visual speed regardless of edge length
  const edgeLength = useMemo(() => {
    const dx = targetX - sourceX
    const dy = targetY - sourceY
    return Math.sqrt(dx * dx + dy * dy)
  }, [sourceX, sourceY, targetX, targetY])

  // Scale duration: target ~60px/sec visual speed
  // Min 0.5s, max 2.5s to keep animations reasonable
  const duration = useMemo(() => {
    const baseDuration = edgeLength / 60 // 60px per second
    return Math.max(0.5, Math.min(2.5, baseDuration))
  }, [edgeLength])

  const shortEdgeThreshold = 80
  const tinyEdgeThreshold = 40
  const isShortEdge = edgeLength < shortEdgeThreshold
  const isTinyEdge = edgeLength < tinyEdgeThreshold
  const particleRadius = isTinyEdge ? 2 : 3

  // Calculate path based on type
  const [edgePath, labelX, labelY] = useMemo(() => {
    if (pathType === 'bezier') {
      return getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      })
    }

    if (isShortEdge) {
      return getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      })
    }

    return getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 8,
    })
  }, [
    pathType,
    isShortEdge,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  ])

  return (
    <>
      {/* Subtle glow layer */}
      <BaseEdge
        id={`${id}-glow`}
        path={edgePath}
        style={{
          stroke: color,
          strokeWidth: 6,
          strokeOpacity: 0.1,
          filter: 'blur(3px)',
        }}
      />

      {/* Main edge line */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: color,
          strokeWidth: 2,
          strokeOpacity: dashed ? 0.4 : 0.5,
          strokeDasharray: dashed ? '5 5' : undefined,
          ...style,
        }}
      />

      {/* Animated particle - single dot moving along the path */}
      {animated && (
        <circle r={particleRadius} fill={color} opacity="0">
          <animateMotion
            dur={`${duration}s`}
            repeatCount="indefinite"
            path={edgePath}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values={isTinyEdge ? "0;0.8;0.8;0" : "0;0.9;0.9;0"}
            keyTimes={isTinyEdge ? "0;0.1;0.8;1" : "0;0.05;0.9;1"}
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Label */}
      {label && (
        <g transform={`translate(${labelX}, ${labelY - 12})`}>
          <rect
            x={-label.length * 3.5 - 6}
            y={-8}
            width={label.length * 7 + 12}
            height={16}
            rx={4}
            fill="rgba(0,0,0,0.7)"
            stroke={color}
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
          <text
            x={0}
            y={0}
            className="fill-white/70 text-[10px] uppercase tracking-wider"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        </g>
      )}
    </>
  )
})

AnimatedEdge.displayName = 'AnimatedEdge'
