import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog';

interface ConversationalAISlideProps {
  active: boolean;
}

interface Particle {
  id: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  delay: number;
}

export const ConversationalAISlide = ({ active }: ConversationalAISlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    // Generate explosion particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.3;
      const speed = 150 + Math.random() * 200;
      const size = 3 + Math.random() * 5;
      newParticles.push({
        id: i,
        angle,
        speed,
        size,
        color: Math.random() > 0.5 ? '#34d399' : '#22d3ee',
        delay: Math.random() * 0.3,
      });
    }
    setParticles(newParticles);

    const container = containerRef.current;
    const dateBadge = container.querySelector('.date-badge');
    const title = container.querySelector('.main-title');
    const subtitle = container.querySelector('.subtitle');
    const ripple = container.querySelector('.ripple-effect');
    const explosionParticles = container.querySelectorAll('.explosion-particle');

    // Ripple effect starts
    gsap.fromTo(ripple,
      { scale: 0, opacity: 0.8 },
      { scale: 3, opacity: 0, duration: 2, ease: "power2.out" }
    );

    // Date badge scales in
    gsap.fromTo(dateBadge,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, delay: 0.3, ease: "back.out(1.7)" }
    );

    // Title explodes in
    gsap.fromTo(title,
      { scale: 0.3, opacity: 0, filter: 'blur(20px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, delay: 0.6, ease: "power3.out" }
    );

    // Particle explosion after title appears
    setTimeout(() => {
      explosionParticles.forEach((particle, i) => {
        const p = newParticles[i];
        if (!p) return;
        const endX = Math.cos(p.angle) * p.speed;
        const endY = Math.sin(p.angle) * p.speed;

        gsap.fromTo(particle,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          {
            x: endX,
            y: endY,
            scale: 0,
            opacity: 0,
            duration: 1.2 + Math.random() * 0.5,
            delay: 0.7 + p.delay,
            ease: "power2.out"
          }
        );
      });
    }, 100);

    // Subtitle fades in
    gsap.fromTo(subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power2.out" }
    );
  }, [active]);

  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
      setParticles([]);
    }
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex items-center justify-center h-screen overflow-hidden">
        <Background variant="nebula" />

        {/* Ripple effect */}
        <div className="ripple-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-emerald-400/50 pointer-events-none" />

        {/* Explosion particles container */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="explosion-particle absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                left: -p.size / 2,
                top: -p.size / 2,
              }}
            />
          ))}
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />

        <div className="z-10 text-center px-8">
          {/* Date badge */}
          <div className="date-badge inline-block px-6 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 mb-8">
            <span className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase">
              Late 2022
            </span>
          </div>

          {/* Main title */}
          <h1 className="main-title text-8xl md:text-9xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Conversational AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-2xl text-white/50 font-light">
            For the first time, AI could <span className="text-white font-normal">converse on demand</span>
          </p>
        </div>
      </div>
    </div>
  );
};
