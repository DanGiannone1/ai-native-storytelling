import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AutonomousBusinessSlideProps {
  active: boolean;
}

interface Badge {
  icon: IconName;
  label: string;
  color: string;
}

export const AutonomousBusinessSlide = ({ active }: AutonomousBusinessSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const convergence = container.querySelector('.convergence-effect');
    const logo = container.querySelector('.brand-logo');
    const title = container.querySelector('.brand-title');
    const tagline = container.querySelector('.brand-tagline');
    const badges = container.querySelectorAll('.badge-item');

    // Convergence particles fly in first
    gsap.fromTo(convergence, { opacity: 1 }, { opacity: 0.3, duration: 2, delay: 1.5 });

    // Logo builds up from center
    gsap.fromTo(logo, { opacity: 0, scale: 0, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, delay: 0.5, ease: "back.out(1.7)" });

    // Title reveals
    gsap.fromTo(title, { opacity: 0, y: 40, filter: 'blur(20px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 1.3, ease: "power2.out" });

    // Tagline fades in
    gsap.fromTo(tagline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.8 });

    // Badges appear
    gsap.fromTo(badges, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, delay: 2.2, ease: "back.out(1.4)" });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="nebula" />

        {/* Convergence Effect - Particles streaming in from edges */}
        <div className="convergence-effect absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <defs>
              <radialGradient id="convergenceGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <filter id="finalGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Central glow */}
            <circle cx="500" cy="300" r="200" fill="url(#convergenceGlow)" />

            {/* Particles streaming inward from all edges */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const startX = 500 + Math.cos(angle) * 600;
              const startY = 300 + Math.sin(angle) * 400;
              const colors = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24'];
              const color = colors[i % colors.length];

              return (
                <circle key={i} r={3 + (i % 3)} fill={color} filter="url(#finalGlow)">
                  <animate attributeName="cx" values={`${startX};500`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${startY};300`} dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.1}s`} repeatCount="indefinite" />
                </circle>
              );
            })}

            {/* Spiral particles */}
            {[...Array(8)].map((_, i) => {
              const startAngle = i * 45;
              const spiralPath = `M ${500 + Math.cos(startAngle * Math.PI / 180) * 400} ${300 + Math.sin(startAngle * Math.PI / 180) * 300} Q ${500 + Math.cos((startAngle + 90) * Math.PI / 180) * 200} ${300 + Math.sin((startAngle + 90) * Math.PI / 180) * 150} 500 300`;

              return (
                <circle key={`spiral-${i}`} r="2" fill="#a78bfa" opacity="0.8">
                  <animateMotion dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" path={spiralPath} begin={`${i * 0.3}s`} />
                </circle>
              );
            })}
          </svg>
        </div>

        <div className="z-10 text-center">
          {/* Central Logo - particles coalesce here */}
          <div className="brand-logo flex justify-center mb-10">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 blur-[60px] animate-pulse-slow" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center shadow-[0_0_100px_-20px_rgba(34,211,238,0.6)]">
                <div className="absolute inset-1 rounded-full bg-[#0a0a0f]" />
                <Icon name="Cpu" size={56} strokeWidth={0.75} className="text-cyan-400 relative z-10" />
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="brand-title text-7xl md:text-8xl font-bold tracking-[0.2em] uppercase mb-6">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              AI-Native Business
            </span>
          </h1>

          {/* Tagline */}
          <p className="brand-tagline text-2xl text-white/50 font-light mb-14">
            <span className="text-cyan-400">Autonomous</span> operations, delivered
          </p>

          {/* Three Badges */}
          <div className="flex justify-center gap-6">
            {([
              { icon: 'Zap', label: 'AI-Native', color: '#22d3ee' },
              { icon: 'RefreshCw', label: 'Self-Improving', color: '#a78bfa' },
              { icon: 'Users', label: 'Multi-Agent', color: '#34d399' },
            ] as Badge[]).map((badge, i) => (
              <div
                key={i}
                className="badge-item flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{
                  backgroundColor: `${badge.color}15`,
                  border: `1px solid ${badge.color}40`
                }}
              >
                <Icon name={badge.icon} size={18} strokeWidth={1.5} style={{ color: badge.color }} />
                <span className="text-sm font-medium" style={{ color: badge.color }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousBusinessSlide;
