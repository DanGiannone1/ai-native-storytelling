import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background, Icon, IconName } from '@catalog';

interface OvernightMagicSlideProps {
  active: boolean;
}

interface InboxItem {
  from: string;
  subject: string;
  time: string;
  icon: IconName;
  color: string;
}

export const OvernightMagicSlide = ({ active }: OvernightMagicSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const inboxItems: InboxItem[] = [
    { from: 'Executive Assistant Agent', subject: "Today's priorities + calendar updates", time: '6:05 AM', icon: 'Calendar', color: 'amber' },
    { from: 'Customer Success Agent', subject: 'Client follow-ups and risk flags', time: '5:40 AM', icon: 'Users', color: 'violet' },
    { from: 'Finance Agent', subject: 'Invoices reconciled + exceptions list', time: '5:20 AM', icon: 'DollarSign', color: 'cyan' },
    { from: 'Sales Agent', subject: 'Pipeline update + next-best actions', time: '4:30 AM', icon: 'BarChart', color: 'emerald' },
    { from: 'Research Agent', subject: 'Industry news digest ready', time: '3:15 AM', icon: 'Search', color: 'amber' },
  ];

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const title = container.querySelector('.slide-title');
    const time = container.querySelector('.morning-time');
    const inbox = container.querySelector('.inbox-container');
    const items = container.querySelectorAll('.inbox-item');
    const footer = container.querySelector('.slide-footer');

    gsap.fromTo(time, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.2 });
    gsap.fromTo(inbox, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });
    gsap.fromTo(items, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.7, ease: "power2.out" });
    gsap.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
    violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', dot: 'bg-violet-400' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
  };

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Morning indicator */}
        <div className="morning-time z-10 flex items-center gap-3 mb-4">
          <Icon name="Sun" size={24} className="text-amber-400" />
          <span className="text-amber-300/70 text-lg">7:00 AM</span>
        </div>

        <h1 className="slide-title z-10 text-white mb-10">
          What we <span className="text-emerald-400">wake up to</span>
        </h1>

        {/* Inbox visualization */}
        <div className="inbox-container z-10 w-full max-w-2xl">
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
            {/* Inbox header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/5">
              <Icon name="Mail" size={18} className="text-white/40" />
              <span className="text-white/60 text-sm font-medium">Inbox</span>
              <span className="ml-auto text-white/40 text-xs">{inboxItems.length} new from agents</span>
            </div>

            {/* Inbox items */}
            <div className="divide-y divide-white/5">
              {inboxItems.map((item, i) => {
                const colors = colorMap[item.color];
                return (
                  <div key={i} className="inbox-item flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                    {/* Unread dot */}
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />

                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center`}>
                      <Icon name={item.icon} size={18} strokeWidth={1.5} className={colors.text} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${colors.text}`}>{item.from}</span>
                      </div>
                      <p className="text-white/80 text-sm truncate mt-0.5">{item.subject}</p>
                    </div>

                    {/* Time */}
                    <span className="text-white/30 text-xs">{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="slide-footer z-10 text-white/30 mt-10">
          We sleep. <span className="text-white/60">They deliver.</span>
        </p>
      </div>
    </div>
  );
};

export default OvernightMagicSlide;
