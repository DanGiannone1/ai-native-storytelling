import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface LimitationSlideProps {
  active: boolean;
}

interface Example {
  can: string;
  cant: string;
  iconCan: IconName;
  iconCant: IconName;
}

export const LimitationSlide = ({ active }: LimitationSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const examples: Example[] = [
    { can: 'Write your email', cant: "Send it", iconCan: 'FileText', iconCant: 'Send' },
    { can: 'Write code', cant: "Execute it", iconCan: 'Code', iconCant: 'Server' },
    { can: 'Plan your meeting', cant: "Book it", iconCan: 'Calendar', iconCant: 'Clock' },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const canColumn = container.querySelector('.can-column');
    const barrier = container.querySelector('.barrier');
    const cantColumn = container.querySelector('.cant-column');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(title,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(canColumn,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(barrier,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.6, delay: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(cantColumn,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.6, delay: 1.1, ease: "power2.out" }
    );

    gsap.fromTo(footer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: "power2.out" }
    );
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Title Section */}
        <div className="z-10 text-center mb-10">
          <p className="slide-subtitle text-white/40 mb-3">
            LLMs are great generators
          </p>
          <h1 className="slide-title">
            <span className="text-emerald-400">Great at creating</span>
            <span className="text-white/30"> - </span>
            <span className="text-rose-400">can't execute</span>
          </h1>
        </div>

        {/* Main Visualization - Can vs Can't with Barrier */}
        <div className="z-10 relative w-[800px] h-[280px]">
          {/* SVG for animated blocked particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="limitGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Particles trying to cross the barrier and bouncing back */}
            {examples.map((_, i) => {
              const y = 60 + i * 80;
              // Particles move right then bounce back at barrier
              return (
                <g key={i}>
                  {/* Path towards barrier */}
                  <circle r="4" fill="#34d399" filter="url(#limitGlow)">
                    <animate
                      attributeName="cx"
                      values={`280;380;380;280`}
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${y};${y};${y};${y}`}
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    />
                    <animate
                      attributeName="fill"
                      values="#34d399;#34d399;#f43f5e;#f43f5e"
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Can Column - Left */}
          <div className="can-column absolute left-0 top-0 w-64 h-full flex flex-col justify-center gap-4">
            <div className="text-center mb-2">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Can Generate</span>
            </div>
            {examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name={ex.iconCan} size={20} strokeWidth={1.5} className="text-emerald-400" />
                </div>
                <span className="text-white text-sm">{ex.can}</span>
              </div>
            ))}
          </div>

          {/* Barrier - Center */}
          <div className="barrier absolute left-1/2 top-0 -translate-x-1/2 h-full flex flex-col items-center justify-center">
            <div className="relative">
              {/* Barrier glow */}
              <div className="absolute inset-0 w-1 bg-rose-500/30 blur-lg" />
              {/* Barrier line */}
              <div className="w-1 h-64 bg-gradient-to-b from-transparent via-rose-500/50 to-transparent rounded-full" />
              {/* Lock icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Icon name="Lock" size={20} strokeWidth={1.5} className="text-rose-400" />
              </div>
            </div>
          </div>

          {/* Can't Column - Right */}
          <div className="cant-column absolute right-0 top-0 w-64 h-full flex flex-col justify-center gap-4">
            <div className="text-center mb-2">
              <span className="text-rose-400 font-semibold uppercase tracking-wider text-sm">Can't Execute</span>
            </div>
            {examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 opacity-70">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <Icon name={ex.iconCant} size={20} strokeWidth={1.5} className="text-rose-300" />
                </div>
                <span className="text-white/60 text-sm">{ex.cant}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="slide-footer z-10 text-white/40 mt-8 text-center max-w-xl">
          A <span className="text-white/70">brilliant advisor</span> with no hands
        </p>
      </div>
    </div>
  );
};

export default LimitationSlide;
