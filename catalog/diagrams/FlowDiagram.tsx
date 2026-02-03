import { ReactFlow, Background, BackgroundVariant, Controls, Node, Edge, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useMemo } from 'react'
import { ServiceNode } from './nodes/ServiceNode'
import { AnimatedEdge } from './edges/AnimatedEdge'

// Register custom node types
const nodeTypes = {
  service: ServiceNode,
}

// Register custom edge types
const edgeTypes = {
  animated: AnimatedEdge,
}

interface FlowDiagramProps {
  nodes: Node[]
  edges: Edge[]
  className?: string
  showBackground?: boolean
  showControls?: boolean
  fitView?: boolean
  interactive?: boolean
  minZoom?: number
  maxZoom?: number
}

/**
 * Wrapper component for React Flow diagrams with presentation styling.
 * Includes custom node types and animated edges.
 *
 * @example
 * ```tsx
 * const nodes = [
 *   { id: '1', type: 'service', position: { x: 0, y: 0 }, data: { label: 'API', icon: 'Server' } },
 * ]
 * const edges = [
 *   { id: 'e1-2', source: '1', target: '2', type: 'animated' },
 * ]
 * <FlowDiagram nodes={nodes} edges={edges} />
 * ```
 */
export function FlowDiagram({
  nodes,
  edges,
  className = '',
  showBackground = false,
  showControls = false,
  fitView = true,
  interactive = false,
  minZoom = 0.5,
  maxZoom = 2,
}: FlowDiagramProps) {
  // Default edge options for presentation style
  const defaultEdgeOptions = useMemo(() => ({
    style: { strokeWidth: 2 },
    type: 'animated',
  }), [])

  return (
    <ReactFlowProvider>
      <div className={`w-full h-full ${className}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView={fitView}
          minZoom={minZoom}
          maxZoom={maxZoom}
          nodesDraggable={interactive}
          nodesConnectable={false}
          elementsSelectable={interactive}
          panOnDrag={interactive}
          zoomOnScroll={interactive}
          zoomOnPinch={interactive}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
        >
          {showBackground && (
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="rgba(255,255,255,0.05)"
            />
          )}
          {showControls && <Controls />}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}
