import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { slideVariants } from './variants'

export interface SlideContentProps {
  active: boolean
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

/**
 * Wrapper component for slide content that handles entrance animations.
 * Automatically animates children when the slide becomes active.
 *
 * @example
 * ```tsx
 * <SlideContent active={active} className="z-10">
 *   <motion.h1 variants={itemVariants}>Title</motion.h1>
 *   <motion.p variants={itemVariants}>Subtitle</motion.p>
 * </SlideContent>
 * ```
 */
export function SlideContent({
  active,
  children,
  className = '',
  variants = slideVariants,
  delay = 0,
}: SlideContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
