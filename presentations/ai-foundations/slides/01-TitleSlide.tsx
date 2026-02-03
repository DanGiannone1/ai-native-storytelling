import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon } from '@catalog';

interface TitleSlideProps {
  active: boolean;
}

export const TitleSlide = ({ active }: TitleSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const chars = container.querySelectorAll('.title-char');
    const subtitle = container.querySelector('.subtitle');

    // Animate title characters with GSAP
    if (chars.length > 0) {
      gsap.fromTo(chars,
        { opacity: 0, y: 60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
          delay: 0.2
        }
      );

      // Animate subtitle
      if (subtitle) {
        gsap.fromTo(subtitle,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.8,
            ease: "power2.out"
          }
        );
      }
    }
  }, [active]);

  // Reset animation when slide becomes inactive
  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
    }
  }, [active]);

  // Pre-split the title into characters using React
  const titleText = "AI in 2026";

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex items-center justify-center h-screen">
        <Background variant="particles" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="z-10 text-center px-8">
          {/* Brand seed - subtle echo of the finale */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-[50px]" />
              <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
              <div className="absolute inset-2 rounded-full border border-cyan-500/20 animate-spin-slower" style={{ borderStyle: 'dotted' }} />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)]">
                <div className="absolute inset-2 rounded-full bg-[#0a0a0f]" />
                <Icon name="Cpu" size={30} strokeWidth={1} className="text-cyan-300 relative z-10" />
              </div>
            </div>
          </div>

          {/* Main Title - pre-split into chars with gradient via color stops */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 text-white">
            {titleText.split('').map((char, i) => {
              // Create gradient effect by varying opacity based on position
              const opacity = 1 - (i / (titleText.length * 2.5));
              return (
                <span
                  key={i}
                  className="title-char inline-block"
                  style={{ opacity: Math.max(0.6, opacity), color: '#ffffff' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-xl md:text-2xl text-white/40 font-light tracking-wide">
            From chatbots to autonomous agents
          </p>
        </div>
      </div>
    </div>
  );
};
