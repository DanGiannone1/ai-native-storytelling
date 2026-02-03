import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog/visuals';
import { Icon, IconName } from '@catalog/primitives';

export interface LoopStation {
  icon: IconName;
  label: string;
  color: string;
}

export interface EquationPart {
  icon: IconName;
  label: string;
  color: string;
}

interface AgentLoopProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  footer?: string;
  equation?: EquationPart[];
  resultLabel?: string;
  stations: LoopStation[];
  active: boolean;
}

export const AgentLoop = ({
  title, titleHighlight, subtitle, footer,
  equation, resultLabel = 'Agent', stations, active
}: AgentLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Calculate station positions on infinity loop
  const getStationPosition = (index: number, total: number) => {
    const positions = [
      { x: 120, y: 200 },  // Left
      { x: 400, y: 120 },  // Top
      { x: 680, y: 200 },  // Right
      { x: 400, y: 280 },  // Bottom
    ];
    return positions[index % 4];
  };

  const infinityPath = "M 200 200 C 200 120 320 120 400 200 C 480 280 600 280 600 200 C 600 120 480 120 400 200 C 320 280 200 280 200 200";

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const titleEl = container.querySelector('.slide-title');
    const subtitleEl = container.querySelector('.slide-subtitle');
    const equationEl = container.querySelector('.equation');
    const loopPath = container.querySelector('.infinity-path') as SVGPathElement | null;
    const stationEls = container.querySelectorAll('.station-inner');
    const footerEl = container.querySelector('.slide-footer');

    gsap.fromTo(subtitleEl, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(titleEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(equationEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });

    if (loopPath) {
      const length = loopPath.getTotalLength();
      gsap.set(loopPath, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(loopPath, { strokeDashoffset: 0, duration: 1.5, delay: 0.8, ease: "power2.inOut" });
    }

    gsap.fromTo(stationEls, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 1.5, ease: "back.out(1.7)" });
    gsap.fromTo(footerEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.2 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        <div className="z-10 text-center mb-4">
          {subtitle && <p className="slide-subtitle text-white/40 mb-2">{subtitle}</p>}
          <h1 className="slide-title text-white">
            {title} {titleHighlight && <span className="text-cyan-400">{titleHighlight}</span>}
          </h1>
        </div>

        {equation && (
          <div className="equation z-10 flex items-center justify-center gap-4 mb-6">
            {equation.map((part, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Icon name={part.icon} size={20} style={{ color: part.color }} />
                  <span style={{ color: part.color }} className="font-medium">{part.label}</span>
                </div>
                {i < equation.length - 1 && <span className="text-white/20 text-xl">+</span>}
              </div>
            ))}
            <span className="text-white/20 text-xl">=</span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30">
              <Icon name="Zap" size={20} className="text-amber-400" />
              <span className="text-amber-400 font-semibold">{resultLabel}</span>
            </div>
          </div>
        )}

        <div className="z-10 relative w-[800px] h-[400px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
            <defs>
              <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="25%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="75%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <filter id="infinityGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path className="infinity-path" d={infinityPath} fill="none" stroke="url(#infinityGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#infinityGlow)" />

            <circle r="8" fill="#ffffff" filter="url(#infinityGlow)">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} />
            </circle>
            <circle r="5" fill="#22d3ee" opacity="0.8">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="0.1s" />
            </circle>
            <circle r="3" fill="#a78bfa" opacity="0.6">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="0.2s" />
            </circle>
          </svg>

          {stations.map((station, i) => {
            const pos = getStationPosition(i, stations.length);
            return (
              <div key={i} className="station absolute" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}>
                <div className="station-inner flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-2"
                       style={{ backgroundColor: `${station.color}20`, border: `1px solid ${station.color}60`, boxShadow: `0 0 20px -5px ${station.color}80` }}>
                    <Icon name={station.icon} size={24} style={{ color: station.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: station.color }}>{station.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {footer && <p className="slide-footer z-10 text-white/40 mt-2">{footer}</p>}
      </div>
    </div>
  );
};
