import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface RecursiveImprovementSlideProps {
  active: boolean;
}

interface Stage {
  label: string;
  icon: IconName;
  color: string;
}

export const RecursiveImprovementSlide = ({ active }: RecursiveImprovementSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const stages: Stage[] = [
    { label: 'Execute', icon: 'Cpu', color: 'cyan' },
    { label: 'Reflect', icon: 'Eye', color: 'violet' },
    { label: 'Update', icon: 'Wrench', color: 'emerald' },
    { label: 'Repeat', icon: 'RefreshCw', color: 'amber' },
  ];

  const stagePositions = [
    { x: 450, y: 70 },
    { x: 650, y: 240 },
    { x: 450, y: 410 },
    { x: 250, y: 240 },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const loopPath = container.querySelector('.loop-path') as SVGPathElement | null;
    const nodes = container.querySelectorAll('.loop-node');
    const core = container.querySelector('.core-node');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });

    if (loopPath) {
      const length = loopPath.getTotalLength();
      gsap.set(loopPath, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(loopPath, { strokeDashoffset: 0, duration: 1.8, delay: 0.5, ease: "power2.out" });
    }

    gsap.fromTo(core, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.6, ease: "back.out(1.4)" });
    gsap.fromTo(nodes, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, delay: 0.9, ease: "back.out(1.6)" });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.6 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  const colorMap: Record<string, { text: string; glow: string }> = {
    cyan: { text: 'text-cyan-400', glow: '#22d3ee' },
    violet: { text: 'text-violet-400', glow: '#a78bfa' },
    emerald: { text: 'text-emerald-400', glow: '#34d399' },
    amber: { text: 'text-amber-400', glow: '#fbbf24' },
  };

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="nebula" />

        <h1 className="slide-title z-10 text-white mb-8">
          Automatic <span className="text-violet-400">Self-Improvement</span>
        </h1>

        <div className="z-10 relative" style={{ width: 900, height: 480 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 480">
            <defs>
              <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
              </linearGradient>
              <filter id="loopGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path
              id="loopPathDef"
              className="loop-path"
              d="M 450 70 A 170 170 0 1 1 449.9 70"
              fill="none"
              stroke="url(#loopGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#loopGlow)"
            />

            <circle r="6" fill="#ffffff" filter="url(#loopGlow)">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 450 70 A 170 170 0 1 1 449.9 70" />
            </circle>
          </svg>

          <div className="core-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-12 rounded-full bg-violet-500/15 blur-[50px]" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-white/20 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(167,139,250,0.5)]">
              <Icon name="Cpu" size={26} strokeWidth={1} className="text-white/90 mb-1" />
              <span className="text-white/70 text-[11px] font-medium">AGENT</span>
              <span className="text-white/40 text-[10px]">CORE</span>
            </div>
          </div>

          {stages.map((stage, i) => {
            const pos = stagePositions[i];
            const colors = colorMap[stage.color];
            return (
              <div
                key={stage.label}
                className="loop-node absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
                style={{ left: pos.x, top: pos.y }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: `${colors.glow}20`, boxShadow: `0 0 20px ${colors.glow}40` }}
                >
                  <Icon name={stage.icon} size={20} strokeWidth={1.5} className={colors.text} />
                </div>
                <span className={`text-sm font-medium ${colors.text}`}>{stage.label}</span>
              </div>
            );
          })}
        </div>

        <p className="slide-footer z-10 text-white/30 mt-2">
          Execute, reflect, update, repeat - <span className="text-white/60">automatically</span>
        </p>
      </div>
    </div>
  );
};

export default RecursiveImprovementSlide;
