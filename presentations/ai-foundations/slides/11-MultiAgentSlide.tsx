import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface MultiAgentSlideProps {
  active: boolean;
}

interface Specialist {
  icon: IconName;
  label: string;
  detail: string;
  color: string;
  x: number;
  y: number;
}

export const MultiAgentSlide = ({ active }: MultiAgentSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const specialists: Specialist[] = [
    { icon: 'FileText', label: 'Research', detail: 'Signals + sources', color: 'cyan', x: 180, y: 300 },
    { icon: 'Activity', label: 'Analysis', detail: 'Synthesize insight', color: 'violet', x: 450, y: 50 },
    { icon: 'BarChart', label: 'Presentation', detail: 'Story + visuals', color: 'emerald', x: 720, y: 300 },
  ];

  const hub = { x: 450, y: 280 };

  const colorMap: Record<string, { border: string; bg: string; text: string; accent: string }> = {
    cyan: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/12', text: 'text-cyan-300', accent: '#22d3ee' },
    violet: { border: 'border-violet-500/40', bg: 'bg-violet-500/12', text: 'text-violet-300', accent: '#a78bfa' },
    emerald: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/12', text: 'text-emerald-300', accent: '#34d399' },
  };

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const task = container.querySelector('.task-chip');
    const hubCore = container.querySelector('.hub-core');
    const cards = container.querySelectorAll('.specialist-card');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo(task, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.fromTo(hubCore, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.4, ease: "back.out(1.6)" });
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.6, ease: "back.out(1.4)" });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.4 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <h1 className="slide-title z-10 text-white mb-4">
          Specialists work <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">together</span>
        </h1>

        <div className="task-chip z-10 mb-8 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white/70 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          Task: "Prepare the quarterly business review"
        </div>

        <div className="z-10 relative w-[900px] h-[420px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 420">
            <defs>
              <filter id="teamGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {specialists.map((s, i) => {
              const accent = colorMap[s.color].accent;
              return (
                <path
                  key={i}
                  d={`M ${s.x} ${s.y} L ${hub.x} ${hub.y}`}
                  fill="none"
                  stroke={accent}
                  strokeOpacity="0.25"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          <div
            className="hub-core absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: hub.x, top: hub.y }}
          >
            <div className="absolute -inset-12 rounded-full bg-violet-500/20 blur-[60px]" />
            <div className="relative w-28 h-28 rounded-full border border-white/20 bg-gradient-to-br from-white/5 to-white/10 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(167,139,250,0.6)]">
              <Icon name="Network" size={28} strokeWidth={1.3} className="text-white/80 mb-1" />
              <span className="text-white/80 text-[11px] font-semibold tracking-[0.2em]">SHARED</span>
              <span className="text-white/50 text-[10px]">CONTEXT</span>
            </div>
          </div>

          {specialists.map((s, i) => {
            const colors = colorMap[s.color];
            return (
              <div
                key={i}
                className="specialist-card absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: s.x, top: s.y }}
              >
                <div className={`w-44 p-4 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm text-center`}>
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-2">
                    <Icon name={s.icon} size={24} strokeWidth={1.5} className={colors.text} />
                  </div>
                  <span className="text-white/90 text-base font-semibold block">{s.label}</span>
                  <span className="text-white/50 text-sm">{s.detail}</span>
                </div>
              </div>
            );
          })}

          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/15"
            style={{ left: hub.x, top: hub.y + 105 }}
          >
            <Icon name="CheckCircle" size={18} strokeWidth={1.6} className="text-emerald-300" />
            <span className="text-emerald-300 text-sm font-medium">Report ready</span>
          </div>
        </div>

        <p className="slide-footer z-10 text-white/45 mt-6">
          Specialists coordinate through a <span className="text-white/70">shared context</span>
        </p>
      </div>
    </div>
  );
};

export default MultiAgentSlide;
