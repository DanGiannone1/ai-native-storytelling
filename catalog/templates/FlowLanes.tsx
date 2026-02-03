import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog/visuals';
import { Icon, IconName } from '@catalog/primitives';

export interface FlowAgent {
  label: string;
  role: string;
  icon: IconName;
  color: string;
}

interface FlowLanesProps {
  title: string;
  titleHighlight?: string;
  kicker?: string;
  footer?: string;
  orchestratorLabel?: string;
  agents: FlowAgent[];
  active: boolean;
}

export const FlowLanes = ({
  title, titleHighlight, kicker, footer,
  orchestratorLabel = 'ORCHESTRATOR', agents, active
}: FlowLanesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const colorMap: Record<string, { accent: string }> = {
    white: { accent: '#ffffff' },
    violet: { accent: '#a78bfa' },
    cyan: { accent: '#22d3ee' },
    emerald: { accent: '#34d399' },
    amber: { accent: '#fbbf24' },
    rose: { accent: '#fb7185' },
    blue: { accent: '#60a5fa' },
  };

  const hub = { x: 170, y: 190 };
  const laneStart = { x: hub.x + 60, y: hub.y };
  const laneEndX = 860;
  const laneEndOffset = 110;
  const laneSpacing = 70;
  const startY = hub.y - ((agents.length - 1) * laneSpacing) / 2;

  const lanes = agents.map((agent, i) => {
    const laneY = startY + i * laneSpacing;
    const accent = colorMap[agent.color]?.accent || agent.color;
    const midX = hub.x + 280;
    const midY = hub.y + (laneY - hub.y) * 0.55;
    const endX = laneEndX - laneEndOffset;
    return {
      ...agent,
      laneY,
      accent,
      path: `M ${laneStart.x} ${laneStart.y} Q ${midX} ${midY} ${endX} ${laneY}`,
      reversePath: `M ${endX} ${laneY} Q ${midX} ${midY} ${laneStart.x} ${laneStart.y}`,
    };
  });

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const kickerEl = container.querySelector('.slide-kicker');
    const titleEl = container.querySelector('.slide-title');
    const hubEl = container.querySelector('.dispatch-hub');
    const cards = container.querySelectorAll('.agent-card');
    const footerEl = container.querySelector('.dispatch-footer');

    if (kickerEl) gsap.fromTo(kickerEl, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    if (titleEl) gsap.fromTo(titleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    if (hubEl) gsap.fromTo(hubEl, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.35, ease: "back.out(1.7)" });
    gsap.fromTo(cards, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, delay: 0.9, ease: "back.out(1.4)" });
    if (footerEl) gsap.fromTo(footerEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.6 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="glow" />

        {kicker && <p className="slide-kicker z-10 text-white/50 mb-2">{kicker}</p>}
        <h1 className="slide-title z-10 text-white mb-10">
          {title} {titleHighlight && <span className="text-violet-400">{titleHighlight}</span>}
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
                <path d={lane.path} fill="none" stroke={`url(#laneGrad-${i})`} strokeWidth="2.6" strokeLinecap="round" />
                <circle r="4" fill={lane.accent} filter="url(#laneGlow)">
                  <animateMotion dur={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={lane.path} begin={`${i * 0.2}s`} />
                </circle>
                <circle r="3.5" fill={lane.accent} opacity="0.55" filter="url(#laneGlow)">
                  <animateMotion dur={`${2.9 + i * 0.3}s`} repeatCount="indefinite" path={lane.reversePath} begin={`${i * 0.25 + 0.2}s`} />
                </circle>
              </g>
            ))}
          </svg>

          <div className="dispatch-hub absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: hub.x, top: hub.y }}>
            <div className="absolute -inset-16 rounded-full border border-cyan-400/20 animate-spin-slow" />
            <div className="absolute -inset-10 rounded-[36px] rotate-45 bg-cyan-500/10 blur-[40px]" />
            <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-white/15 to-white/5 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center">
              <Icon name="Network" size={28} strokeWidth={1.4} className="text-cyan-200 mb-1" />
              <span className="text-[11px] font-semibold tracking-[0.32em] text-white/70">{orchestratorLabel}</span>
              <span className="text-[10px] text-white/40">AGENT</span>
            </div>
          </div>

          {lanes.map((agent, i) => (
            <div key={i} className="agent-card absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: laneEndX, top: agent.laneY }}>
              <div className="relative w-48 px-4 py-3 rounded-2xl border bg-slate-950/50 backdrop-blur-md"
                   style={{ borderColor: `${agent.accent}55`, boxShadow: `0 20px 50px -30px ${agent.accent}b0` }}>
                <div className="absolute -top-px left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${agent.accent}, transparent)` }} />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ backgroundColor: `${agent.accent}1a`, border: `1px solid ${agent.accent}55` }}>
                    <Icon name={agent.icon} size={20} strokeWidth={1.5} style={{ color: agent.accent }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/90">{agent.label}</div>
                    <div className="text-xs text-white/45">{agent.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {footer && <p className="dispatch-footer z-10 text-white/45 text-lg mt-6">{footer}</p>}
      </div>
    </div>
  );
};
