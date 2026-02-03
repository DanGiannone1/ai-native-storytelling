import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface ToolsSlideProps {
  active: boolean;
}

interface Tool {
  icon: IconName;
  label: string;
  color: string;
  angle: number;
  distance: number;
}

export const ToolsSlide = ({ active }: ToolsSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const layout = { width: 820, height: 560 };
  const centerX = layout.width / 2;
  const centerY = layout.height / 2;

  // Tools arranged like Swiss Army knife blades - each unfolds from center
  const tools: Tool[] = [
    { icon: 'Send', label: 'Send Email', color: '#22d3ee', angle: -150, distance: 250 },
    { icon: 'Globe', label: 'Browse Web', color: '#a78bfa', angle: -90, distance: 240 },
    { icon: 'Code', label: 'Run Code', color: '#34d399', angle: -30, distance: 250 },
    { icon: 'Calendar', label: 'Schedule', color: '#fbbf24', angle: 30, distance: 250 },
    { icon: 'Database', label: 'Query Data', color: '#f472b6', angle: 90, distance: 230 },
    { icon: 'Server', label: 'Call APIs', color: '#60a5fa', angle: 150, distance: 230 },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const center = container.querySelector('.center-ai');
    const toolBlades = container.querySelectorAll('.tool-blade');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    gsap.fromTo(center, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" });

    // Tools unfold sequentially like a Swiss Army knife
    toolBlades.forEach((blade, i) => {
      gsap.fromTo(blade,
        { opacity: 0, scale: 0.3 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.9 + i * 0.12,
          ease: "back.out(1.4)"
        }
      );
    });

    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: "power2.out" });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Title */}
        <div className="z-10 text-center mb-8">
          <p className="slide-subtitle text-white/40 mb-3">
            The next unlock after chatbots
          </p>
          <h1 className="slide-title text-white">
            Give the model <span className="text-emerald-400">tools</span>
          </h1>
        </div>

        {/* Swiss Army Knife Visualization */}
        <div className="z-10 relative" style={{ width: layout.width, height: layout.height }}>
          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${layout.width} ${layout.height}`}>
            <defs>
              <filter id="toolGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connector lines from center to each tool */}
            {tools.map((tool, i) => {
              const x = centerX + Math.cos(tool.angle * Math.PI / 180) * tool.distance;
              const y = centerY + Math.sin(tool.angle * Math.PI / 180) * tool.distance;
              return (
                <g key={i}>
                  <line x1={centerX} y1={centerY} x2={x} y2={y} stroke={tool.color} strokeWidth="2" opacity="0.3" />
                  {/* Animated pulse along the line */}
                  <circle r="3" fill={tool.color} filter="url(#toolGlow)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path={`M ${centerX} ${centerY} L ${x} ${y}`} begin={`${i * 0.2}s`} />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Center LLM Core */}
          <div className="center-ai absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-12 rounded-full bg-emerald-500/15 blur-[50px]" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/30 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(52,211,153,0.5)]">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40" />
              <Icon name="Brain" size={36} strokeWidth={1} className="text-emerald-300 mb-1" />
              <span className="text-white/90 text-sm font-semibold">LLM</span>
            </div>
          </div>

          {/* Tool Blades - unfold outward */}
          {tools.map((tool, i) => {
            const x = centerX + Math.cos(tool.angle * Math.PI / 180) * tool.distance;
            const y = centerY + Math.sin(tool.angle * Math.PI / 180) * tool.distance;
            return (
            <div
              key={i}
              className="tool-blade absolute"
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${tool.color}15`,
                  border: `1px solid ${tool.color}40`,
                  boxShadow: `0 0 20px -5px ${tool.color}40`
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tool.color}25` }}
                >
                  <Icon name={tool.icon} size={20} strokeWidth={1.5} style={{ color: tool.color }} />
                </div>
                <span className="text-white/80 text-sm font-medium whitespace-nowrap">{tool.label}</span>
              </div>
            </div>
          )})}
        </div>

        <p className="slide-footer z-10 text-white/40 mt-4">
          The model chooses the <span className="text-white/70">right tool</span> at the <span className="text-white/70">right time</span>
        </p>
      </div>
    </div>
  );
};

export default ToolsSlide;
