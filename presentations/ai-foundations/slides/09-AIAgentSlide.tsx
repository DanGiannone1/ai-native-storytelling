import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AIAgentSlideProps {
  active: boolean;
}

interface Station {
  icon: IconName;
  label: string;
  color: string;
  x: number;
  y: number;
}

export const AIAgentSlide = ({ active }: AIAgentSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Four stations on the infinity loop
  const stations: Station[] = [
    { icon: 'Target', label: 'Think', color: '#22d3ee', x: 120, y: 200 },
    { icon: 'Wrench', label: 'Act', color: '#a78bfa', x: 400, y: 120 },
    { icon: 'Eye', label: 'Observe', color: '#34d399', x: 680, y: 200 },
    { icon: 'RefreshCw', label: 'Reflect', color: '#fbbf24', x: 400, y: 280 },
  ];

  // Infinity symbol path for the loop
  const infinityPath = "M 200 200 C 200 120 320 120 400 200 C 480 280 600 280 600 200 C 600 120 480 120 400 200 C 320 280 200 280 200 200";

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const equation = container.querySelector('.equation');
    const loopPath = container.querySelector('.infinity-path') as SVGPathElement | null;
    const stationEls = container.querySelectorAll('.station-inner');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(equation, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });

    // Draw the infinity path
    if (loopPath) {
      const length = loopPath.getTotalLength();
      gsap.set(loopPath, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(loopPath, { strokeDashoffset: 0, duration: 1.5, delay: 0.8, ease: "power2.inOut" });
    }

    gsap.fromTo(stationEls, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15, delay: 1.5, ease: "back.out(1.7)" });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.2 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        {/* Title */}
        <div className="z-10 text-center mb-4">
          <p className="slide-subtitle text-white/40 mb-2">The full system</p>
          <h1 className="slide-title text-white">
            The <span className="text-cyan-400">AI Agent</span>
          </h1>
        </div>

        {/* Clean Equation - no heavy boxes */}
        <div className="equation z-10 flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Brain" size={20} className="text-violet-400" />
            <span className="text-violet-400 font-medium">LLM</span>
          </div>
          <span className="text-white/20 text-xl">+</span>
          <div className="flex items-center gap-2">
            <Icon name="Wrench" size={20} className="text-cyan-400" />
            <span className="text-cyan-400 font-medium">Tools</span>
          </div>
          <span className="text-white/20 text-xl">+</span>
          <div className="flex items-center gap-2">
            <Icon name="RefreshCw" size={20} className="text-emerald-400" />
            <span className="text-emerald-400 font-medium">Loop</span>
          </div>
          <span className="text-white/20 text-xl">=</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30">
            <Icon name="Zap" size={20} className="text-amber-400" />
            <span className="text-amber-400 font-semibold">Agent</span>
          </div>
        </div>

        {/* Infinity Loop Visualization */}
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

            {/* The infinity symbol path */}
            <path
              className="infinity-path"
              d={infinityPath}
              fill="none"
              stroke="url(#infinityGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#infinityGlow)"
            />

            {/* Traveling dot with trail effect */}
            <circle r="8" fill="#ffffff" filter="url(#infinityGlow)">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} />
            </circle>
            <circle r="5" fill="#22d3ee" opacity="0.8">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="0.1s" />
            </circle>
            <circle r="3" fill="#a78bfa" opacity="0.6">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="0.2s" />
            </circle>
            <circle r="2" fill="#34d399" opacity="0.4">
              <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="0.3s" />
            </circle>
          </svg>

          {/* Four stations positioned on the infinity loop */}
          {stations.map((station, i) => (
            <div
              key={i}
              className="station absolute"
              style={{ left: station.x, top: station.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className="station-inner flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: `${station.color}20`,
                    border: `1px solid ${station.color}60`,
                    boxShadow: `0 0 20px -5px ${station.color}80`
                  }}
                >
                  <Icon name={station.icon} size={24} className="" style={{ color: station.color }} />
                </div>
                <span className="text-sm font-medium" style={{ color: station.color }}>{station.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="slide-footer z-10 text-white/40 mt-2">
          A loop that runs <span className="text-white/70">until the task is done</span>
        </p>
      </div>
    </div>
  );
};

export default AIAgentSlide;
