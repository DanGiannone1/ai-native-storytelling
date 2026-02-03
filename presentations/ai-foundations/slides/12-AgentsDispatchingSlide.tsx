import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AgentsDispatchingSlideProps {
  active: boolean;
}

interface Agent {
  label: string;
  role: string;
  icon: IconName;
  color: string;
  laneY: number;
}

export const AgentsDispatchingSlide = ({ active }: AgentsDispatchingSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const agents: Agent[] = [
    { label: 'PO Agent', role: 'Defines scope', icon: 'Target', color: 'white', laneY: 60 },
    { label: 'Lead Agent', role: 'Plans approach', icon: 'Network', color: 'violet', laneY: 130 },
    { label: 'Builder Agent', role: 'Implements', icon: 'Code', color: 'cyan', laneY: 200 },
    { label: 'QA Agent', role: 'Systems testing', icon: 'CheckCircle', color: 'emerald', laneY: 270 },
    { label: 'Review Agent', role: 'UI / user journey', icon: 'Eye', color: 'amber', laneY: 340 },
  ];

  const colorMap: Record<string, { accent: string; text: string }> = {
    white: { accent: '#ffffff', text: 'text-white' },
    violet: { accent: '#a78bfa', text: 'text-violet-300' },
    cyan: { accent: '#22d3ee', text: 'text-cyan-300' },
    emerald: { accent: '#34d399', text: 'text-emerald-300' },
    amber: { accent: '#fbbf24', text: 'text-amber-300' },
  };

  const hub = { x: 170, y: 190 };
  const laneStart = { x: hub.x + 60, y: hub.y };
  const laneEndX = 860;
  const laneEndOffset = 110;

  const lanes = agents.map((agent) => {
    const midX = hub.x + 280;
    const midY = hub.y + (agent.laneY - hub.y) * 0.55;
    const endX = laneEndX - laneEndOffset;
    return {
      ...agent,
      accent: colorMap[agent.color].accent,
      path: `M ${laneStart.x} ${laneStart.y} Q ${midX} ${midY} ${endX} ${agent.laneY}`,
      reversePath: `M ${endX} ${agent.laneY} Q ${midX} ${midY} ${laneStart.x} ${laneStart.y}`,
    };
  });

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const kicker = container.querySelector('.slide-kicker');
    const title = container.querySelector('.slide-title');
    const hubEl = container.querySelector('.dispatch-hub');
    const tickets = container.querySelectorAll('.dispatch-ticket');
    const cards = container.querySelectorAll('.agent-card');
    const footer = container.querySelector('.dispatch-footer');

    if (kicker) gsap.fromTo(kicker, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    if (title) gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    if (hubEl) gsap.fromTo(hubEl, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.35, ease: "back.out(1.7)" });
    gsap.fromTo(tickets, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.7 });
    gsap.fromTo(cards, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.9, ease: "back.out(1.4)" });
    if (footer) gsap.fromTo(footer, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.6 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        <p className="slide-kicker z-10 text-white/50 mb-2">Agents coordinating agents</p>
        <h1 className="slide-title z-10 text-white mb-10">
          A full <span className="text-violet-400">agent team</span>
        </h1>

        <div className="z-10 relative" style={{ width: 980, height: 380 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 980 380">
            <defs>
              <filter id="laneGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {lanes.map((lane, i) => (
                <linearGradient key={i} id={`laneGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={lane.accent} stopOpacity="0" />
                  <stop offset="35%" stopColor={lane.accent} stopOpacity="0.55" />
                  <stop offset="100%" stopColor={lane.accent} stopOpacity="0.15" />
                </linearGradient>
              ))}
            </defs>

            {lanes.map((lane, i) => (
              <g key={i}>
                <path
                  d={lane.path}
                  fill="none"
                  stroke={`url(#laneGrad-${i})`}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle r="4" fill={lane.accent} filter="url(#laneGlow)">
                  <animateMotion dur={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={lane.path} begin={`${i * 0.2}s`} />
                </circle>
                <circle r="2.5" fill="#ffffff" opacity="0.35">
                  <animateMotion dur={`${3.1 + i * 0.35}s`} repeatCount="indefinite" path={lane.path} begin={`${i * 0.35 + 0.4}s`} />
                </circle>
                <circle r="3.5" fill={lane.accent} opacity="0.55" filter="url(#laneGlow)">
                  <animateMotion dur={`${2.9 + i * 0.3}s`} repeatCount="indefinite" path={lane.reversePath} begin={`${i * 0.25 + 0.2}s`} />
                </circle>
                <circle r="2" fill="#ffffff" opacity="0.25">
                  <animateMotion dur={`${3.6 + i * 0.3}s`} repeatCount="indefinite" path={lane.reversePath} begin={`${i * 0.3 + 0.8}s`} />
                </circle>
              </g>
            ))}
          </svg>

          <div
            className="dispatch-hub absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: hub.x, top: hub.y }}
          >
            <div className="absolute -inset-16 rounded-full border border-cyan-400/20 animate-spin-slow" />
            <div className="absolute -inset-10 rounded-[36px] rotate-45 bg-cyan-500/10 blur-[40px]" />
            <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-white/15 to-white/5 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center">
              <Icon name="Network" size={28} strokeWidth={1.4} className="text-cyan-200 mb-1" />
              <span className="text-[11px] font-semibold tracking-[0.32em] text-white/70">ORCHESTRATOR</span>
              <span className="text-[10px] text-white/40">AGENT</span>
            </div>

            <div className="dispatch-queue absolute left-full ml-6 top-1/2 -translate-y-1/2">
              <div className="text-[10px] text-white/35 uppercase tracking-[0.28em] mb-2">Messages</div>
              <div className="flex flex-col gap-2 w-32">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="dispatch-ticket flex items-center gap-2 px-2.5 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {agents.map((agent, i) => {
            const colors = colorMap[agent.color];
            return (
              <div
                key={i}
                className="agent-card absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: laneEndX, top: agent.laneY }}
              >
                <div
                  className="relative w-48 px-4 py-3 rounded-2xl border bg-slate-950/50 backdrop-blur-md"
                  style={{
                    borderColor: `${colors.accent}55`,
                    boxShadow: `0 20px 50px -30px ${colors.accent}b0`
                  }}
                >
                  <div
                    className="absolute -top-px left-4 right-4 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
                  />
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${colors.accent}1a`, border: `1px solid ${colors.accent}55` }}
                    >
                      <Icon name={agent.icon} size={20} strokeWidth={1.5} style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/90">{agent.label}</div>
                      <div className="text-xs text-white/45">{agent.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="dispatch-footer z-10 text-white/45 text-lg mt-6">
          Dispatch happens in parallel - <span className="text-white/60">specialists spin up on demand</span>
        </p>
      </div>
    </div>
  );
};

export default AgentsDispatchingSlide;
