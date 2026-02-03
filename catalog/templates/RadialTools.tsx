import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog/visuals';
import { Icon, IconName } from '@catalog/primitives';

export interface RadialItem {
  icon: IconName;
  label: string;
  color: string;
  angle: number;
  distance?: number;
}

interface RadialToolsProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  footer?: string;
  centerIcon: IconName;
  centerLabel: string;
  centerColor?: string;
  items: RadialItem[];
  active: boolean;
}

export const RadialTools = ({
  title, titleHighlight, subtitle, footer,
  centerIcon, centerLabel, centerColor = '#34d399',
  items, active
}: RadialToolsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const layout = { width: 820, height: 560 };
  const centerX = layout.width / 2;
  const centerY = layout.height / 2;

  const positionedItems = items.map(item => ({
    ...item,
    distance: item.distance || 240,
  }));

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const titleEl = container.querySelector('.slide-title');
    const subtitleEl = container.querySelector('.slide-subtitle');
    const center = container.querySelector('.center-core');
    const blades = container.querySelectorAll('.radial-item');
    const footerEl = container.querySelector('.slide-footer');

    gsap.fromTo(subtitleEl, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.fromTo(titleEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" });
    gsap.fromTo(center, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" });

    blades.forEach((blade, i) => {
      gsap.fromTo(blade, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.9 + i * 0.12, ease: "back.out(1.4)" });
    });

    gsap.fromTo(footerEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: "power2.out" });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <div className="z-10 text-center mb-8">
          {subtitle && <p className="slide-subtitle text-white/40 mb-3">{subtitle}</p>}
          <h1 className="slide-title text-white">
            {title} {titleHighlight && <span style={{ color: centerColor }}>{titleHighlight}</span>}
          </h1>
        </div>

        <div className="z-10 relative" style={{ width: layout.width, height: layout.height }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${layout.width} ${layout.height}`}>
            <defs>
              <filter id="radialGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {positionedItems.map((item, i) => {
              const x = centerX + Math.cos(item.angle * Math.PI / 180) * item.distance;
              const y = centerY + Math.sin(item.angle * Math.PI / 180) * item.distance;
              return (
                <g key={i}>
                  <line x1={centerX} y1={centerY} x2={x} y2={y} stroke={item.color} strokeWidth="2" opacity="0.3" />
                  <circle r="3" fill={item.color} filter="url(#radialGlow)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path={`M ${centerX} ${centerY} L ${x} ${y}`} begin={`${i * 0.2}s`} />
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className="center-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-12 rounded-full blur-[50px]" style={{ backgroundColor: `${centerColor}25` }} />
            <div className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center"
                 style={{ background: `linear-gradient(135deg, ${centerColor}30, ${centerColor}10)`, boxShadow: `0 0 60px -10px ${centerColor}80` }}>
              <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${centerColor}60` }} />
              <Icon name={centerIcon} size={36} strokeWidth={1} style={{ color: centerColor }} className="mb-1" />
              <span className="text-white/90 text-sm font-semibold">{centerLabel}</span>
            </div>
          </div>

          {positionedItems.map((item, i) => {
            const x = centerX + Math.cos(item.angle * Math.PI / 180) * item.distance;
            const y = centerY + Math.sin(item.angle * Math.PI / 180) * item.distance;
            return (
              <div key={i} className="radial-item absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                     style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40`, boxShadow: `0 0 20px -5px ${item.color}40` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}25` }}>
                    <Icon name={item.icon} size={20} strokeWidth={1.5} style={{ color: item.color }} />
                  </div>
                  <span className="text-white/80 text-sm font-medium whitespace-nowrap">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {footer && <p className="slide-footer z-10 text-white/40 mt-4">{footer}</p>}
      </div>
    </div>
  );
};
