import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Background } from '../visuals/Background'
import { SlideContent, itemVariants } from '../motion'

type BackgroundVariant = 'default' | 'grid' | 'horizon' | 'nebula'

interface HeroBadge {
  label: string
  icon?: ReactNode
  color: string
}

interface HeroSlideProps {
  active: boolean
  backgroundVariant?: BackgroundVariant
  underlay?: ReactNode
  icon?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  badges?: HeroBadge[]
  contentClassName?: string
  frameClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  badgesClassName?: string
  children?: ReactNode
}

export function HeroSlide({
  active,
  backgroundVariant = 'nebula',
  underlay,
  icon,
  title,
  subtitle,
  badges,
  contentClassName = 'z-10 text-center',
  frameClassName = 'overflow-hidden',
  titleClassName = 'text-5xl md:text-7xl font-bold tracking-[0.18em] uppercase mb-4',
  subtitleClassName = 'text-lg md:text-xl text-white/60 font-normal tracking-wide',
  badgesClassName = 'flex justify-center gap-6',
  children,
}: HeroSlideProps) {
  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div className={`relative flex flex-col items-center justify-center h-screen ${frameClassName}`}>
        <Background variant={backgroundVariant} />
        {underlay}

        <SlideContent active={active} className={contentClassName}>
          {icon && (
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              {icon}
            </motion.div>
          )}

          <motion.h1 variants={itemVariants} className={titleClassName}>
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p variants={itemVariants} className={subtitleClassName}>
              {subtitle}
            </motion.p>
          )}

          {children}

          {badges && badges.length > 0 && (
            <motion.div variants={itemVariants} className={badgesClassName}>
              {badges.map((badge, index) => (
                <div
                  key={`${badge.label}-${index}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full"
                  style={{
                    backgroundColor: `${badge.color}15`,
                    border: `1px solid ${badge.color}40`,
                  }}
                >
                  {badge.icon && badge.icon}
                  <span className="text-sm font-medium" style={{ color: badge.color }}>{badge.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </SlideContent>
      </div>
    </div>
  )
}
