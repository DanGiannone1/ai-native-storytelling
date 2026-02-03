import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface WhatIsLLMSlideProps {
  active: boolean;
}

interface Source {
  icon: IconName;
  label: string;
  color: string;
  x: number;
  y: number;
  angle: number;
}

export const WhatIsLLMSlide = ({ active }: WhatIsLLMSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Floating source labels positioned around the center
  const sources: Source[] = [
    { icon: 'FileText', label: 'Books & Articles', color: '#22d3ee', x: 100, y: 120, angle: -30 },
    { icon: 'Globe', label: 'The Internet', color: '#a78bfa', x: 80, y: 220, angle: -15 },
    { icon: 'MessageSquare', label: 'Conversations', color: '#34d399', x: 120, y: 320, angle: 10 },
    { icon: 'Code', label: 'Source Code', color: '#fbbf24', x: 160, y: 400, angle: 25 },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const sourceItems = container.querySelectorAll('.source-item');
    const brain = container.querySelector('.central-brain');
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const desc = container.querySelector('.slide-desc');

    gsap.fromTo(title,
      { opacity: 0, y: -30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(subtitle,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(brain,
      { opacity: 0, scale: 0.3 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(sourceItems,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(desc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: "power2.out" }
    );
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
          <h1 className="slide-title text-white mb-3">
            The <span className="text-violet-400">Large Language Model</span>
          </h1>
          <p className="slide-subtitle text-white/40">
            Trained on large-scale human text
          </p>
        </div>

        {/* Absorption Field Visualization */}
        <div className="z-10 relative w-[900px] h-[420px]">
          {/* SVG for curved particle flows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 420">
            <defs>
              <filter id="absorptionGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="gravityField" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15" />
                <stop offset="70%" stopColor="#a78bfa" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Gravitational field effect */}
            <circle cx="620" cy="210" r="200" fill="url(#gravityField)" />

            {/* Curved particle streams from each source to center */}
            {sources.map((source, i) => {
              const startX = source.x + 120;
              const startY = source.y;
              const endX = 620;
              const endY = 210;
              const cp1x = startX + 150;
              const cp1y = startY + (endY - startY) * 0.2;
              const cp2x = endX - 100;
              const cp2y = endY + (startY - endY) * 0.1;
              const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`;

              return (
                <g key={i}>
                  {/* Subtle path trace */}
                  <path d={pathD} fill="none" stroke={source.color} strokeWidth="1" opacity="0.1" />

                  {/* Multiple particles with varying sizes - gravitational pull effect */}
                  {[0, 1, 2, 3, 4].map((p) => (
                    <circle key={p} r={4 - p * 0.5} fill={source.color} filter="url(#absorptionGlow)" opacity={0.9 - p * 0.15}>
                      <animateMotion
                        dur={`${2.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={pathD}
                        begin={`${p * 0.4 + i * 0.2}s`}
                      />
                    </circle>
                  ))}
                </g>
              );
            })}

            {/* Orbital rings around the brain */}
            <ellipse cx="620" cy="210" rx="120" ry="100" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="1" strokeDasharray="4 8">
              <animateTransform attributeName="transform" type="rotate" from="0 620 210" to="360 620 210" dur="30s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="620" cy="210" rx="90" ry="75" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="1">
              <animateTransform attributeName="transform" type="rotate" from="360 620 210" to="0 620 210" dur="25s" repeatCount="indefinite" />
            </ellipse>
          </svg>

          {/* Floating Source Labels - No boxes, just text with icons */}
          {sources.map((source, i) => (
            <div
              key={i}
              className="source-item absolute flex items-center gap-2"
              style={{ left: source.x, top: source.y - 15, transform: `rotate(${source.angle}deg)` }}
            >
              <Icon name={source.icon} size={20} strokeWidth={1.5} style={{ color: source.color }} className="opacity-80" />
              <span className="text-white/70 text-sm font-medium" style={{ textShadow: `0 0 20px ${source.color}40` }}>
                {source.label}
              </span>
            </div>
          ))}

          {/* Central Brain - Gravitational Core */}
          <div className="central-brain absolute" style={{ left: 620, top: 210, transform: 'translate(-50%, -50%)' }}>
            {/* Pulsing outer glow */}
            <div className="absolute -inset-16 rounded-full bg-violet-500/10 blur-[80px] animate-pulse-slow" />

            {/* Inner glow ring */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-[40px]" />

            {/* Core */}
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-b from-violet-500/30 to-violet-900/30 flex flex-col items-center justify-center shadow-[0_0_80px_-10px_rgba(167,139,250,0.6)]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
              <Icon name="Brain" size={52} strokeWidth={1} className="text-violet-300 mb-1 relative z-10" />
              <span className="text-white/90 font-semibold text-lg relative z-10">LLM</span>
            </div>
          </div>
        </div>

        <p className="slide-desc z-10 text-white/50 text-lg text-center max-w-xl mt-4">
          Patterns of language, <span className="text-white/80">compressed at scale</span><br />
          into a model that predicts text
        </p>
      </div>
    </div>
  );
};
