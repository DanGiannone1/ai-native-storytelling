import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon } from '@catalog';

interface AgentsCreatingAgentsSlideProps {
  active: boolean;
}

export const AgentsCreatingAgentsSlide = ({ active }: AgentsCreatingAgentsSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const tree = container.querySelector('.growth-tree');
    const nodes = container.querySelectorAll('.tree-node');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(tree, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.5 });

    // Nodes appear in sequence like spawning
    gsap.fromTo(nodes, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 0.7, ease: "back.out(2)" });

    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.2 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  // Tree node positions - exponential growth pattern
  const rootNode = { x: 450, y: 320, level: 0 };
  const level1Nodes = [
    { x: 300, y: 220, level: 1 },
    { x: 450, y: 200, level: 1 },
    { x: 600, y: 220, level: 1 },
  ];
  const level2Nodes = [
    { x: 220, y: 120, level: 2 },
    { x: 340, y: 130, level: 2 },
    { x: 410, y: 100, level: 2 },
    { x: 490, y: 100, level: 2 },
    { x: 560, y: 130, level: 2 },
    { x: 680, y: 120, level: 2 },
  ];

  const allNodes = [rootNode, ...level1Nodes, ...level2Nodes];

  // Connections between nodes
  const connections: [number, number][] = [
    [0, 1], [0, 2], [0, 3], // root to level 1
    [1, 4], [1, 5], // level 1 to level 2
    [2, 6], [2, 7],
    [3, 8], [3, 9],
  ];

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="nebula" />

        <p className="slide-kicker z-10 text-fuchsia-400/70 mb-2">Agent swarms</p>
        <h1 className="slide-title z-10 text-white mb-8">
          Agents <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">creating</span> agents
        </h1>

        {/* Exponential Growth Tree */}
        <div className="growth-tree z-10 relative w-[900px] h-[400px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 400">
            <defs>
              <linearGradient id="treeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines with particles */}
            {connections.map(([from, to], i) => {
              const fromNode = allNodes[from];
              const toNode = allNodes[to];
              const pathId = `spawn-path-${i}`;
              const midY = (fromNode.y + toNode.y) / 2 - 20;

              return (
                <g key={i}>
                  <path
                    id={pathId}
                    d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + toNode.x) / 2} ${midY} ${toNode.x} ${toNode.y}`}
                    fill="none"
                    stroke="url(#treeGrad)"
                    strokeWidth="2"
                  />
                  {/* Spawn particles flowing upward */}
                  <circle r="3" fill="#d946ef" filter="url(#nodeGlow)">
                    <animateMotion dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite" begin={`${i * 0.2}s`}>
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Tree Nodes */}
          {allNodes.map((node, i) => {
            const size = node.level === 0 ? 60 : node.level === 1 ? 44 : 32;
            const iconSize = node.level === 0 ? 28 : node.level === 1 ? 20 : 14;
            const color = node.level === 0 ? '#d946ef' : node.level === 1 ? '#a855f7' : '#8b5cf6';

            return (
              <div
                key={i}
                className="tree-node absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: node.x, top: node.y }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: `${color}30`,
                    border: `2px solid ${color}60`,
                    boxShadow: `0 0 ${20 + (2 - node.level) * 10}px ${color}40`
                  }}
                >
                  <Icon name="Cpu" size={iconSize} strokeWidth={1.5} style={{ color: color }} />
                </div>
                {node.level === 0 && (
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-fuchsia-400 text-xs font-medium whitespace-nowrap">
                    Root Agent
                  </span>
                )}
              </div>
            );
          })}

          {/* Hint of more nodes fading out */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-8 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-violet-500/40 blur-sm" />
            ))}
          </div>
        </div>

        <p className="slide-footer z-10 text-white/40 mt-4">
          When one isn't enough, <span className="text-fuchsia-400/70">they spawn specialists</span>
        </p>
      </div>
    </div>
  );
};

export default AgentsCreatingAgentsSlide;
