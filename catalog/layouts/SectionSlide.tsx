import { ReactNode } from 'react'
import { Background } from '../visuals/Background'
import { SlideContent } from '../motion'
import { SlideHeader } from './SlideHeader'
import { motion } from 'framer-motion'
import { itemVariants } from '../motion'

type BackgroundVariant = 'default' | 'grid' | 'horizon' | 'nebula'

interface SectionSlideProps {
  active: boolean
  backgroundVariant?: BackgroundVariant
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  headerAlign?: 'center' | 'left'
  headerSize?: 'sm' | 'md' | 'lg'
  headerClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  frameClassName?: string
  footer?: string
  footerClassName?: string
  underlay?: ReactNode
  children: ReactNode
}

export function SectionSlide({
  active,
  backgroundVariant = 'default',
  eyebrow,
  title,
  subtitle,
  description,
  headerAlign = 'center',
  headerSize = 'md',
  headerClassName = 'mb-10',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  contentClassName = 'w-full max-w-5xl px-8',
  frameClassName = '',
  footer,
  footerClassName = 'text-center text-white/40 mt-8 text-sm',
  underlay,
  children,
}: SectionSlideProps) {
  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div className={`relative flex flex-col items-center justify-center h-screen ${frameClassName}`}>
        <Background variant={backgroundVariant} />
        {underlay}

        <SlideContent active={active} className={`z-10 ${contentClassName}`}>
          <SlideHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            description={description}
            align={headerAlign}
            size={headerSize}
            className={headerClassName}
            titleClassName={titleClassName}
            subtitleClassName={subtitleClassName}
            descriptionClassName={descriptionClassName}
          />

          {children}

          {footer && (
            <motion.p variants={itemVariants} className={footerClassName}>
              {footer}
            </motion.p>
          )}
        </SlideContent>
      </div>
    </div>
  )
}
