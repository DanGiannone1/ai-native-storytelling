import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SlideWrapper } from '@shared/runtime'
import { Icon, IconName } from '@catalog/primitives'

export interface BentoTile {
  id: string
  title: string
  description?: string
  icon?: IconName
  color?: string
  span?: 'normal' | 'wide' | 'tall' | 'large'
  stat?: string
  statLabel?: string
}

interface BentoGridProps {
  title: string
  subtitle?: string
  tiles: BentoTile[]
  active: boolean
}

const spanClasses = {
  normal: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  large: 'col-span-2 row-span-2',
}

/**
 * Bento Grid template - modular tile layout inspired by Apple keynotes.
 * Tiles can span multiple columns/rows for visual hierarchy.
 */
export function BentoGrid({ title, subtitle, tiles, active }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const titleEl = container.querySelector('.slide-title')
    const subtitleEl = container.querySelector('.slide-subtitle')
    const tileEls = container.querySelectorAll('.bento-tile')

    gsap.fromTo(titleEl,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    if (subtitleEl) {
      gsap.fromTo(subtitleEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2 }
      )
    }

    gsap.fromTo(tileEls,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
        ease: 'back.out(1.4)'
      }
    )
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <SlideWrapper>
      <div ref={containerRef} className="flex flex-col items-center justify-center h-full px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="slide-subtitle text-cyan-100/60 mt-4 text-lg font-light">
              {subtitle}
            </p>
          )}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 gap-5 w-full max-w-4xl auto-rows-[180px]">
          {tiles.map((tile) => {
            const color = tile.color || '#22d3ee'

            return (
              <div
                key={tile.id}
                className={`bento-tile group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10 ${spanClasses[tile.span || 'normal']}`}
                style={{
                  background: `linear-gradient(135deg, ${color}08 0%, ${color}15 100%)`,
                  border: `1px solid ${color}25`,
                  boxShadow: `0 0 40px -15px ${color}30`,
                }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/5 to-transparent" />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${color}20 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full p-5 flex flex-col">
                  {tile.icon && (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${color}20`,
                        boxShadow: `0 0 20px -5px ${color}50`,
                      }}
                    >
                      <Icon name={tile.icon} size={20} style={{ color }} />
                    </div>
                  )}

                  <h3
                    className="font-semibold text-sm tracking-wide uppercase"
                    style={{ color }}
                  >
                    {tile.title}
                  </h3>

                  {tile.description && (
                    <p className="text-white/50 text-xs mt-2 leading-relaxed flex-1">
                      {tile.description}
                    </p>
                  )}

                  {tile.stat && (
                    <div className="mt-auto pt-3">
                      <div
                        className="text-3xl font-bold tracking-tight"
                        style={{ color }}
                      >
                        {tile.stat}
                      </div>
                      {tile.statLabel && (
                        <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
                          {tile.statLabel}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideWrapper>
  )
}
