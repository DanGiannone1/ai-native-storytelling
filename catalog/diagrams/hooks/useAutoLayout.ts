import { useMemo } from 'react'
import { Node, Edge } from '@xyflow/react'

interface LayoutOptions {
  direction?: 'horizontal' | 'vertical'
  nodeSpacing?: number
  rankSpacing?: number
}

interface LayoutResult {
  nodes: Node[]
  edges: Edge[]
}

/**
 * Simple auto-layout hook for positioning nodes in a flow.
 * For more complex layouts, consider using dagre or elkjs.
 *
 * @example
 * ```tsx
 * const { nodes, edges } = useAutoLayout(
 *   rawNodes,
 *   rawEdges,
 *   { direction: 'horizontal', nodeSpacing: 200 }
 * )
 * ```
 */
export function useAutoLayout(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {}
): LayoutResult {
  const {
    direction = 'horizontal',
    nodeSpacing = 200,
    rankSpacing = 150,
  } = options

  const layoutedNodes = useMemo(() => {
    if (nodes.length === 0) return nodes

    // Build adjacency list
    const children = new Map<string, string[]>()
    const parents = new Map<string, string[]>()

    edges.forEach(edge => {
      if (!children.has(edge.source)) children.set(edge.source, [])
      children.get(edge.source)!.push(edge.target)

      if (!parents.has(edge.target)) parents.set(edge.target, [])
      parents.get(edge.target)!.push(edge.source)
    })

    // Find root nodes (no parents)
    const roots = nodes.filter(n => !parents.has(n.id) || parents.get(n.id)!.length === 0)

    // Assign ranks using BFS
    const ranks = new Map<string, number>()
    const queue = roots.map(n => ({ id: n.id, rank: 0 }))

    while (queue.length > 0) {
      const { id, rank } = queue.shift()!
      if (ranks.has(id)) continue
      ranks.set(id, rank)

      const nodeChildren = children.get(id) || []
      nodeChildren.forEach(childId => {
        if (!ranks.has(childId)) {
          queue.push({ id: childId, rank: rank + 1 })
        }
      })
    }

    // Group nodes by rank
    const rankGroups = new Map<number, string[]>()
    ranks.forEach((rank, id) => {
      if (!rankGroups.has(rank)) rankGroups.set(rank, [])
      rankGroups.get(rank)!.push(id)
    })

    // Position nodes
    return nodes.map(node => {
      const rank = ranks.get(node.id) ?? 0
      const group = rankGroups.get(rank) || [node.id]
      const indexInGroup = group.indexOf(node.id)
      const groupSize = group.length

      // Center the group
      const offset = (indexInGroup - (groupSize - 1) / 2) * nodeSpacing

      const position = direction === 'horizontal'
        ? { x: rank * rankSpacing, y: offset }
        : { x: offset, y: rank * rankSpacing }

      return {
        ...node,
        position: node.position?.x !== undefined && node.position?.y !== undefined
          ? node.position // Keep existing position if set
          : position,
      }
    })
  }, [nodes, edges, direction, nodeSpacing, rankSpacing])

  return { nodes: layoutedNodes, edges }
}
