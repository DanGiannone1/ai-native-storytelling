import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog/visuals';
import { Icon, IconName } from '@catalog/primitives';

export interface TeamMember {
  name: string;
  icon: IconName;
  tagline: string;
  color: string;
  live?: boolean;
}

interface TeamRosterProps {
  title: string;
  titleHighlight?: string;
  kicker?: string;
  footer?: string;
  members: TeamMember[];
  columns?: number;
  active: boolean;
}

export const TeamRoster = ({
  title, titleHighlight, kicker, footer,
  members, columns = 3, active
}: TeamRosterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const titleEl = container.querySelector('.slide-title');
    const kickerEl = container.querySelector('.slide-kicker');
    const cards = container.querySelectorAll('.member-card');
    const footerEl = container.querySelector('.slide-footer');

    gsap.fromTo(kickerEl, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(titleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(cards, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.5, ease: "back.out(1.4)" });
    gsap.fromTo(footerEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        {kicker && <p className="slide-kicker z-10 text-emerald-400/70 mb-2">{kicker}</p>}
        <h1 className="slide-title z-10 text-white mb-12">
          {title} {titleHighlight && (
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">{titleHighlight}</span>
          )}
        </h1>

        <div className="z-10 relative w-full max-w-5xl px-8">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: 30, opacity: 0.35 }}>
            <defs>
              <linearGradient id="rosterConnectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M 60 60 Q 230 20 400 60 Q 570 100 740 60 Q 910 20 980 60" fill="none" stroke="url(#rosterConnectGrad)" strokeWidth="2" strokeDasharray="6 4" />
            <circle r="4" fill="#a78bfa">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 60 60 Q 230 20 400 60 Q 570 100 740 60 Q 910 20 980 60" />
            </circle>
          </svg>

          <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {members.map((member, i) => (
              <div key={i} className="member-card flex flex-col items-center">
                <div className="w-36 h-48 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden"
                     style={{ backgroundColor: `${member.color}10`, border: `1px solid ${member.color}40`, boxShadow: `0 0 30px -10px ${member.color}40` }}>
                  <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 30%, ${member.color}40, transparent 70%)` }} />

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10" style={{ backgroundColor: `${member.color}20` }}>
                    <Icon name={member.icon} size={32} strokeWidth={1.5} style={{ color: member.color }} />
                  </div>

                  <span className="text-white font-bold text-lg relative z-10">{member.name}</span>
                  <span className="text-white/50 text-xs mt-1 relative z-10">{member.tagline}</span>

                  {member.live !== false && (
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: member.color }} />
                      <span className="text-[10px] font-medium" style={{ color: member.color }}>LIVE</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {footer && <p className="slide-footer z-10 text-white/30 mt-12">{footer}</p>}
      </div>
    </div>
  );
};
