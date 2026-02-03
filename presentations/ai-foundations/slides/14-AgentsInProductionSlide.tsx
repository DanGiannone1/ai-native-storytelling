import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AgentsInProductionSlideProps {
  active: boolean;
}

interface AgentInfo {
  name: string;
  icon: IconName;
  tagline: string;
  color: string;
}

export const AgentsInProductionSlide = ({ active }: AgentsInProductionSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Six agents displayed as horizontal team roster
  const agents: AgentInfo[] = [
    { name: 'CRM', icon: 'Users', tagline: 'Client intelligence', color: '#22d3ee' },
    { name: 'Product', icon: 'Code', tagline: 'Development ops', color: '#a78bfa' },
    { name: 'SRE', icon: 'Server', tagline: 'System health', color: '#60a5fa' },
    { name: 'Finance', icon: 'DollarSign', tagline: 'Cost & compliance', color: '#34d399' },
    { name: 'Legal', icon: 'Scale', tagline: 'Risk & regulation', color: '#fbbf24' },
    { name: 'Research', icon: 'Search', tagline: 'AI news & research', color: '#f472b6' },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const cards = container.querySelectorAll('.agent-card');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });

    // Cards slide in from bottom like players being introduced
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.5, ease: "back.out(1.4)" }
    );

    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        <p className="slide-kicker z-10 text-emerald-400/70 mb-2">Running in production today</p>
        <h1 className="slide-title z-10 text-white mb-12">
          Agents in <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Production</span>
        </h1>

        {/* Team Roster - Horizontal Lineup */}
        <div className="z-10 relative w-full max-w-5xl px-8">
          {/* Connection lines between agents */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: 30, opacity: 0.35 }}>
            <defs>
              <linearGradient id="rosterConnectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 60 60 Q 230 20 400 60 Q 570 100 740 60 Q 910 20 980 60"
              fill="none"
              stroke="url(#rosterConnectGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Flowing particle */}
            <circle r="4" fill="#a78bfa">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 60 60 Q 230 20 400 60 Q 570 100 740 60 Q 910 20 980 60" />
            </circle>
          </svg>

          {/* Agent Cards */}
          <div className="grid grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div key={i} className="agent-card flex flex-col items-center">
                {/* Tall Card */}
                <div
                  className="w-36 h-48 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: `${agent.color}10`,
                    border: `1px solid ${agent.color}40`,
                    boxShadow: `0 0 30px -10px ${agent.color}40`
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `radial-gradient(circle at 50% 30%, ${agent.color}40, transparent 70%)` }}
                  />

                  {/* Large Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    <Icon name={agent.icon} size={32} strokeWidth={1.5} style={{ color: agent.color }} />
                  </div>

                  {/* Agent Name */}
                  <span className="text-white font-bold text-lg relative z-10">{agent.name}</span>

                  {/* Tagline */}
                  <span className="text-white/50 text-xs mt-1 relative z-10">{agent.tagline}</span>

                  {/* LIVE Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: agent.color }}
                    />
                    <span className="text-[10px] font-medium" style={{ color: agent.color }}>LIVE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="slide-footer z-10 text-white/30 mt-12">
          Live agents running <span className="text-white/60">real operations</span>
        </p>
      </div>
    </div>
  );
};

export default AgentsInProductionSlide;
