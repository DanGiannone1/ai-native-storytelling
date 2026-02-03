import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface AgentsInActionSlideProps {
  active: boolean;
}

interface Example {
  title: string;
  icon: IconName;
  steps: string[];
  color: string;
}

export const AgentsInActionSlide = ({ active }: AgentsInActionSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const examples: Example[] = [
    {
      title: 'Process expense reports',
      icon: 'Inbox',
      steps: ['Scan receipts', 'Extract amounts', 'Categorize expenses', 'Submit for approval'],
      color: '#22d3ee'
    },
    {
      title: 'Fix a bug in code',
      icon: 'Activity',
      steps: ['Read logs', 'Find root cause', 'Write fix', 'Run tests', 'Commit'],
      color: '#a78bfa'
    },
    {
      title: 'Monitor system health',
      icon: 'BarChart',
      steps: ['Check metrics', 'Detect anomalies', 'Alert on issues', 'Generate report'],
      color: '#34d399'
    },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const cards = container.querySelectorAll('.example-card');
    const steps = container.querySelectorAll('.step-item');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.5 });
    gsap.fromTo(steps, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.05, delay: 0.9 });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.6 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="horizon" />

        <div className="z-10 text-center mb-10">
          <p className="slide-subtitle text-white/40 mb-2">Work, end to end</p>
          <h1 className="slide-title text-white">
            Agents in <span className="text-emerald-400">Action</span>
          </h1>
        </div>

        <div className="z-10 flex gap-6 max-w-5xl px-8">
          {examples.map((ex, i) => (
            <div key={i} className="example-card relative flex-1 p-5 rounded-2xl border overflow-hidden flex flex-col"
                 style={{ borderColor: `${ex.color}40`, backgroundColor: `${ex.color}08` }}>
              {/* Animated flow line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
                <defs>
                  <linearGradient id={`cardFlow-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={ex.color} stopOpacity="0" />
                    <stop offset="50%" stopColor={ex.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={ex.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="10" y1="0" x2="10" y2="100%" stroke={`url(#cardFlow-${i})`} strokeWidth="2">
                  <animate attributeName="y1" values="-50;200%" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="y2" values="0;250%" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                </line>
              </svg>

              <div className="relative flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ backgroundColor: `${ex.color}20`, border: `1px solid ${ex.color}40` }}>
                    <Icon name={ex.icon} size={20} strokeWidth={1.5} style={{ color: ex.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{ex.title}</h3>
                </div>

                {/* Steps */}
                <div className="space-y-2 flex-1">
                  {ex.steps.map((step, j) => (
                    <div key={j} className="step-item flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[11px]"
                           style={{ backgroundColor: `${ex.color}20`, color: ex.color }}>
                        {j + 1}
                      </div>
                      <span className="text-white/70 text-sm">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Completion indicator */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: ex.color }}>
                    <Icon name="CheckCircle" size={10} strokeWidth={2} className="text-black" />
                  </div>
                  <span className="text-xs" style={{ color: ex.color }}>Completed autonomously</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="slide-footer z-10 text-white/40 mt-10">
          <span className="text-white/70">Multi-step work</span> - planned and executed end to end
        </p>
      </div>
    </div>
  );
};

export default AgentsInActionSlide;
