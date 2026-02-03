import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AIHistorySlideProps {
  active: boolean;
}

interface Milestone {
  year: string;
  label: string;
  icon: IconName;
  x: number;
  row: 'top' | 'bottom';
  highlight?: boolean;
}

export const AIHistorySlide = ({ active }: AIHistorySlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const milestones: Milestone[] = [
    { year: '1950', label: 'Turing Test', icon: 'Brain', x: 70, row: 'top' },
    { year: '1956', label: 'Dartmouth', icon: 'Cpu', x: 180, row: 'bottom' },
    { year: '1997', label: 'Spam Filters', icon: 'Mail', x: 320, row: 'top' },
    { year: '2006', label: 'Recommendations', icon: 'BarChart', x: 470, row: 'bottom' },
    { year: '2011', label: 'Voice Assistants', icon: 'Mic', x: 610, row: 'top' },
    { year: '2016', label: 'Smart Feeds', icon: 'Eye', x: 740, row: 'bottom' },
    { year: '2022', label: 'Conversational AI', icon: 'Sparkles', x: 880, row: 'top', highlight: true },
  ];
  const rowY = { top: 70, bottom: 240 };
  const rowLine = { top: 90, bottom: 80 };

  // River path that flows left to right with gentle curves
  const riverPath = "M 0 300 Q 120 260 200 240 Q 300 210 400 260 Q 500 310 600 220 Q 700 160 850 240 Q 950 300 1100 280";

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const riverEl = container.querySelector('.river-path') as SVGPathElement | null;
    const milestoneEls = container.querySelectorAll('.milestone');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(title,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Draw the river
    if (riverEl) {
      const length = riverEl.getTotalLength();
      gsap.set(riverEl, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(riverEl, { strokeDashoffset: 0, duration: 2, delay: 0.3, ease: "power2.inOut" });
    }

    gsap.fromTo(milestoneEls,
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.2, delay: 0.8, ease: "back.out(1.7)" }
    );

    gsap.fromTo(footer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2.2, ease: "power2.out" }
    );
  }, [active]);

  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
      if (containerRef.current) {
        const toolBlades = containerRef.current.querySelectorAll('.tool-blade');
        gsap.set(toolBlades, { opacity: 0, x: 0, y: 0, scale: 0.3 });
      }
    }
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="grid" />

        <h1 className="slide-title z-10 text-white mb-4 text-center">
          AI long predates <span className="text-cyan-400">modern chatbots</span>
        </h1>

        {/* Timeline River Visualization */}
        <div className="z-10 relative w-full max-w-5xl h-[400px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
              </linearGradient>
              <filter id="riverGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* The River - Main Path */}
            <path
              className="river-path"
              d={riverPath}
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#riverGlow)"
            />

            {/* Flowing particles along the river */}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r="4" fill="#22d3ee" opacity="0.8">
                <animateMotion
                  dur={`${4 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={riverPath}
                  begin={`${i * 0.8}s`}
                />
              </circle>
            ))}
            {[0, 1, 2].map((i) => (
              <circle key={`small-${i}`} r="2" fill="#34d399" opacity="0.6">
                <animateMotion
                  dur={`${5 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={riverPath}
                  begin={`${i * 1.2 + 0.5}s`}
                />
              </circle>
            ))}
          </svg>

          {/* Milestones */}
          {milestones.map((m, i) => (
            <div
              key={i}
              className="milestone absolute transform -translate-x-1/2"
              style={{ left: `${m.x / 10}%`, top: `${rowY[m.row]}px` }}
            >
              <div className={`flex flex-col items-center ${m.highlight ? 'scale-110' : ''}`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                  m.highlight
                    ? 'bg-emerald-500/30 border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                    : 'bg-white/10 border border-white/20'
                }`}>
                  <Icon name={m.icon} size={22} strokeWidth={1.5} className={m.highlight ? 'text-emerald-300' : 'text-white/70'} />
                </div>
                {/* Year */}
                <span className={`text-xs font-mono mb-1 ${m.highlight ? 'text-emerald-400' : 'text-cyan-400/70'}`}>{m.year}</span>
                {/* Label */}
                <span className={`text-sm font-medium ${m.highlight ? 'text-white' : 'text-white/60'}`}>{m.label}</span>
              </div>
              {/* Connection line to river */}
              <div
                className={`absolute left-1/2 w-px ${m.highlight ? 'bg-emerald-400/50' : 'bg-white/20'}`}
                style={{
                  height: rowLine[m.row],
                  top: m.row === 'top' ? '100%' : undefined,
                  bottom: m.row === 'bottom' ? '100%' : undefined,
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          ))}
        </div>

        <p className="slide-footer z-10 text-white/40 mt-4 text-center">
          Quietly powering products - <span className="text-white/60">until it surfaced</span>
        </p>
      </div>
    </div>
  );
};
