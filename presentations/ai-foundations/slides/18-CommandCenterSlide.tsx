import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface CommandCenterSlideProps {
  active: boolean;
}

interface Department {
  label: string;
  icon: IconName;
  color: string;
  status: 'operational' | 'building';
}

export const CommandCenterSlide = ({ active }: CommandCenterSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const departments: Department[] = [
    { label: 'CRM', icon: 'Users', color: 'cyan', status: 'operational' },
    { label: 'Product', icon: 'Box', color: 'violet', status: 'operational' },
    { label: 'SRE', icon: 'Server', color: 'emerald', status: 'operational' },
    { label: 'Finance', icon: 'BarChart', color: 'emerald', status: 'operational' },
    { label: 'Legal', icon: 'Shield', color: 'amber', status: 'building' },
    { label: 'Marketing', icon: 'Globe', color: 'cyan', status: 'operational' },
    { label: 'HR', icon: 'Users', color: 'violet', status: 'building' },
    { label: 'Operations', icon: 'Activity', color: 'emerald', status: 'operational' },
    { label: 'Analytics', icon: 'BarChart', color: 'cyan', status: 'operational' },
    { label: 'Support', icon: 'MessageSquare', color: 'violet', status: 'operational' },
  ];

  const centerX = 450;
  const centerY = 260;
  const radiusX = 320;
  const radiusY = 180;

  // Calculate ellipse positions
  const getDeptPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radiusX,
      y: centerY + Math.sin(angle) * radiusY,
    };
  };

  // Cross-connections between departments
  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [7, 8], [8, 9], [0, 5], [2, 7], [4, 9]
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const core = container.querySelector('.command-core');
    const deptNodes = container.querySelectorAll('.dept-node');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(core, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" });
    gsap.fromTo(deptNodes, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.8, ease: "back.out(1.4)" });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
    cyan: { border: 'border-cyan-500/50', bg: 'bg-cyan-500/15', text: 'text-cyan-400', glow: '#22d3ee' },
    violet: { border: 'border-violet-500/50', bg: 'bg-violet-500/15', text: 'text-violet-400', glow: '#a78bfa' },
    emerald: { border: 'border-emerald-500/50', bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: '#34d399' },
    amber: { border: 'border-amber-500/50', bg: 'bg-amber-500/15', text: 'text-amber-400', glow: '#fbbf24' },
  };

  const statusColors: Record<string, string> = {
    operational: 'bg-emerald-400',
    building: 'bg-amber-400',
    planned: 'bg-white/30',
  };

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <p className="slide-kicker z-10 text-white/40 mb-2">Every function powered by agents</p>
        <h1 className="slide-title z-10 text-white mb-6">
          The <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">AI-Native</span> Business
        </h1>

        {/* Constellation visualization */}
        <div className="z-10 relative" style={{ width: 900, height: 520 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 520">
            <defs>
              <filter id="ccGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(167,139,250,0.4)" />
                <stop offset="100%" stopColor="rgba(167,139,250,0)" />
              </radialGradient>
            </defs>

            {/* Connection lines between departments and to center */}
            {departments.map((dept, i) => {
              const pos = getDeptPosition(i, departments.length);
              const pathId = `cc-path-${i}`;
              const pathD = `M ${centerX} ${centerY} L ${pos.x} ${pos.y}`;
              const colors = colorMap[dept.color];

              return (
                <g key={`conn-${i}`}>
                  {/* Line to center */}
                  <path d={pathD} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* Animated particles to center */}
                  <path id={pathId} d={pathD} fill="none" />
                  <circle r="2" fill={colors.glow} filter="url(#ccGlow)">
                    <animateMotion dur={`${2 + i * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.2}s`}>
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.15}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>
                </g>
              );
            })}

            {/* Cross-connections between departments */}
            {connections.map(([from, to], i) => {
              const fromPos = getDeptPosition(from, departments.length);
              const toPos = getDeptPosition(to, departments.length);
              const crossId = `cross-path-${i}`;

              return (
                <g key={`cross-${i}`}>
                  <path
                    id={crossId}
                    d={`M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle r="2" fill="rgba(167,139,250,0.6)">
                    <animateMotion dur={`${3 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                      <mpath href={`#${crossId}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
                  </circle>
                </g>
              );
            })}

            {/* Ellipse orbit path */}
            <ellipse
              cx={centerX}
              cy={centerY}
              rx={radiusX}
              ry={radiusY}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Central Command Center core */}
          <div
            className="command-core absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: centerX, top: centerY }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-500/20 to-emerald-500/15 blur-[50px]" />

            {/* Rotating rings */}
            <div className="absolute -inset-12 rounded-full border border-white/10 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
            <div className="absolute -inset-8 rounded-full border border-violet-500/20 animate-spin-slower" style={{ borderStyle: 'dotted' }} />
            <div className="absolute -inset-4 rounded-full border border-cyan-500/15 animate-spin-slow" />

            {/* Core */}
            <div className="relative w-24 h-24 rounded-full border-2 border-white/30 bg-gradient-to-br from-violet-500/20 via-cyan-500/15 to-emerald-500/20 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(167,139,250,0.5)]">
              <Icon name="Cpu" size={28} strokeWidth={1} className="text-white/90 mb-1" />
              <span className="text-white/70 text-[11px] font-medium">COMMAND</span>
              <span className="text-white/40 text-[10px]">CENTER</span>
            </div>
          </div>

          {/* Department nodes */}
          {departments.map((dept, i) => {
            const pos = getDeptPosition(i, departments.length);
            const colors = colorMap[dept.color];

            return (
              <div
                key={i}
                className="dept-node absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.x, top: pos.y }}
              >
                <div className={`relative w-16 p-2 rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm text-center`}>
                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${statusColors[dept.status]}`} />

                  <Icon name={dept.icon} size={18} strokeWidth={1.5} className={`${colors.text} mx-auto mb-1`} />
                  <span className="text-white/80 text-[11px] font-medium block">{dept.label}</span>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-white/40">Operational</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-white/40">Building</span>
            </div>
          </div>
        </div>

        <p className="slide-footer z-10 text-white/30 mt-2">
          Every department <span className="text-white/60">connected, coordinated, autonomous</span>
        </p>
      </div>
    </div>
  );
};

export default CommandCenterSlide;
