import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface MultimodalSlideProps {
  active: boolean;
}

interface Modality {
  icon: IconName;
  label: string;
  color: string;
  angle: number;
  radius: number;
}

export const MultimodalSlide = ({ active }: MultimodalSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const modalities: Modality[] = [
    { icon: 'MessageSquare', label: 'Text', color: '#22d3ee', angle: -120, radius: 160 },
    { icon: 'Image', label: 'Images', color: '#a78bfa', angle: -60, radius: 170 },
    { icon: 'Mic', label: 'Audio', color: '#34d399', angle: 60, radius: 165 },
    { icon: 'Video', label: 'Video', color: '#fbbf24', angle: 120, radius: 155 },
  ];

  const centerX = 450;
  const centerY = 175;

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const center = container.querySelector('.center-core');
    const floatingIcons = container.querySelectorAll('.floating-icon');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(title,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(center,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
    );

    gsap.fromTo(floatingIcons,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.8, ease: "back.out(1.7)" }
    );

    // Gentle floating animation for each icon
    floatingIcons.forEach((icon, i) => {
      gsap.to(icon, {
        y: `+=${8 + i * 2}`,
        x: `+=${(i % 2 === 0 ? 5 : -5)}`,
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2 + i * 0.2
      });
    });

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
        <Background variant="nebula" />

        <p className="slide-subtitle z-10 text-white/30 mb-3">Modern models go beyond text</p>
        <h1 className="slide-title z-10 text-white mb-12">
          It <span className="text-cyan-400">sees</span>, <span className="text-violet-400">hears</span>, and <span className="text-emerald-400">creates</span>
        </h1>

        {/* Floating Constellation */}
        <div className="z-10 relative w-[900px] h-[350px]">
          {/* SVG for pulsing connection lines and particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines from each modality to center */}
            {modalities.map((mod, i) => {
              const angle = (mod.angle * Math.PI) / 180;
              const x = centerX + Math.cos(angle) * mod.radius;
              const y = centerY + Math.sin(angle) * mod.radius;
              const pathId = `connection-${i}`;
              const pathD = `M ${x} ${y} Q ${(x + centerX) / 2 + (i % 2 === 0 ? 20 : -20)} ${(y + centerY) / 2} ${centerX} ${centerY}`;

              return (
                <g key={i}>
                  {/* Pulsing connection line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={mod.color}
                    strokeWidth="1"
                    opacity="0.3"
                    filter="url(#lineGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.15;0.4;0.15"
                      dur={`${2 + i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Flowing particles */}
                  <path id={pathId} d={pathD} fill="none" stroke="none" />
                  {[0, 1].map((p) => (
                    <circle key={p} r="3" fill={mod.color} filter="url(#lineGlow)">
                      <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" begin={`${p * 0.9}s`}>
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" begin={`${p * 0.9}s`} />
                    </circle>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Floating modality icons */}
          {modalities.map((mod, i) => {
            const angle = (mod.angle * Math.PI) / 180;
            const x = centerX + Math.cos(angle) * mod.radius;
            const y = centerY + Math.sin(angle) * mod.radius;

            return (
              <div
                key={i}
                className="floating-icon absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
              >
                {/* Glow behind icon */}
                <div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ backgroundColor: mod.color, opacity: 0.3, transform: 'scale(1.5)' }}
                />
                {/* Icon */}
                <div className="relative flex flex-col items-center">
                  <Icon name={mod.icon} size={36} strokeWidth={1.5} style={{ color: mod.color, filter: `drop-shadow(0 0 10px ${mod.color})` }} />
                  <span className="text-white/50 text-xs mt-2">{mod.label}</span>
                </div>
              </div>
            );
          })}

          {/* Central glowing circle */}
          <div className="center-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: centerX, top: centerY }}>
            <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-500/20 to-emerald-500/15 blur-[50px] animate-pulse-slow" />
            <div className="absolute -inset-8 rounded-full border border-white/10 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 blur-sm" />
            </div>
          </div>

          {/* Input / Output labels */}
          <div
            className="absolute flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-[0.3em] uppercase text-white/60"
            style={{ left: centerX - 210, top: centerY - 6 }}
          >
            <span>IN</span>
            <Icon name="ArrowRight" size={12} strokeWidth={2} className="text-cyan-400" />
          </div>
          <div
            className="absolute flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-[0.3em] uppercase text-white/60"
            style={{ left: centerX + 150, top: centerY - 6 }}
          >
            <span>OUT</span>
            <Icon name="ArrowRight" size={12} strokeWidth={2} className="text-emerald-400" />
          </div>
        </div>

        <p className="slide-footer z-10 text-white/40 mt-6">
          <span className="text-white/60">Text, images, audio, video</span> - in and out
        </p>
      </div>
    </div>
  );
};

export default MultimodalSlide;
