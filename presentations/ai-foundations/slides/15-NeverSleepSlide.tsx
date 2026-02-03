import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog';

interface NeverSleepSlideProps {
  active: boolean;
}

export const NeverSleepSlide = ({ active }: NeverSleepSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Activities around the 24-hour clock
  const activities = [
    { hour: 2, label: 'Data sync', color: '#a78bfa' },
    { hour: 4, label: 'Report gen', color: '#8b5cf6' },
    { hour: 6, label: 'Daily briefing', color: '#f59e0b' },
    { hour: 9, label: 'Real-time alerts', color: '#fbbf24' },
    { hour: 12, label: 'Client support', color: '#34d399' },
    { hour: 15, label: 'Monitoring', color: '#22d3ee' },
    { hour: 18, label: 'End-of-day', color: '#60a5fa' },
    { hour: 21, label: 'Overnight prep', color: '#a78bfa' },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const ring = container.querySelector('.activity-ring');
    const activityDots = container.querySelectorAll('.activity-dot');
    const centerStats = container.querySelector('.center-stats');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });
    gsap.fromTo(ring, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.4)" });
    gsap.fromTo(activityDots, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, delay: 0.8, ease: "back.out(1.7)" });
    gsap.fromTo(centerStats, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.3 });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.6 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="horizon" />

        <h1 className="slide-title z-10 mb-8">
          <span className="text-white/40">Agents </span>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">run 24/7</span>
        </h1>

        {/* 24-Hour Activity Ring */}
        <div className="activity-ring z-10 relative w-[450px] h-[450px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 450">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="25%" stopColor="#34d399" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="75%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
              </linearGradient>
              <filter id="activityGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Outer ring - 24 hour clock */}
            <circle cx="225" cy="225" r="180" fill="none" stroke="url(#ringGradient)" strokeWidth="8" />

            {/* Hour markers */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15 - 90) * (Math.PI / 180);
              const x1 = 225 + Math.cos(angle) * 170;
              const y1 = 225 + Math.sin(angle) * 170;
              const x2 = 225 + Math.cos(angle) * 180;
              const y2 = 225 + Math.sin(angle) * 180;
              const isNight = i >= 20 || i <= 6;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isNight ? 'rgba(167,139,250,0.4)' : 'rgba(251,191,36,0.4)'}
                  strokeWidth={i % 3 === 0 ? 3 : 1}
                />
              );
            })}

            {/* Sun and Moon indicators */}
            <circle cx="225" cy="45" r="12" fill="#fbbf24" opacity="0.8" />
            <circle cx="225" cy="405" r="10" fill="#a78bfa" opacity="0.6" />

            {/* Animated sweep - the glow that never stops */}
            <circle r="10" fill="#22d3ee" filter="url(#activityGlow)">
              <animateMotion dur="12s" repeatCount="indefinite" path="M 225 45 A 180 180 0 1 1 224.99 45" />
            </circle>
            <circle r="6" fill="#ffffff" opacity="0.8">
              <animateMotion dur="12s" repeatCount="indefinite" path="M 225 45 A 180 180 0 1 1 224.99 45" />
            </circle>
          </svg>

          {/* Activity dots around the ring */}
          {activities.map((activity, i) => {
            const angle = (activity.hour * 15 - 90) * (Math.PI / 180);
            const x = 225 + Math.cos(angle) * 180;
            const y = 225 + Math.sin(angle) * 180;
            const labelX = 225 + Math.cos(angle) * 220;
            const labelY = 225 + Math.sin(angle) * 220;

            return (
              <div key={i} className="activity-dot absolute" style={{ left: x - 8, top: y - 8 }}>
                <div
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: activity.color, boxShadow: `0 0 10px ${activity.color}` }}
                />
                <span
                  className="absolute text-[11px] text-white/60 whitespace-nowrap"
                  style={{
                    left: labelX - x,
                    top: labelY - y,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {activity.label}
                </span>
              </div>
            );
          })}

          {/* Center Stats */}
          <div className="center-stats absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-4xl font-bold text-white mb-1">47</div>
            <div className="text-white/40 text-sm">tasks completed</div>
            <div className="text-white/30 text-xs">in the last hour</div>
          </div>
        </div>

        <p className="slide-footer z-10 text-white/50 mt-8">
          We sleep. <span className="text-white">They work.</span>
        </p>
      </div>
    </div>
  );
};

export default NeverSleepSlide;
