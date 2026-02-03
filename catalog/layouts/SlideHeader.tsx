import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { itemVariants } from '../motion'

type HeaderAlign = 'center' | 'left'
type HeaderSize = 'sm' | 'md' | 'lg'

interface SlideHeaderProps {
  eyebrow?: string
  title: string | ReactNode
  subtitle?: string
  description?: string
  align?: HeaderAlign
  size?: HeaderSize
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
}

const titleSizes: Record<HeaderSize, string> = {
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-5xl',
  lg: 'text-5xl md:text-6xl',
}

export function SlideHeader({
  eyebrow,
  title,
  subtitle,
  description,
  align = 'center',
  size = 'md',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
}: SlideHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const descriptionAlign = align === 'center' ? 'mx-auto' : ''

  return (
    <motion.div variants={itemVariants} className={`${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-white/40 mb-2 tracking-widest uppercase text-sm">
          {eyebrow}
        </p>
      )}
      <h1
        className={`${titleSizes[size]} font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase ${titleClassName}`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`text-white/60 text-base md:text-lg mt-3 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
      {description && (
        <p className={`text-white/50 text-lg mt-3 ${descriptionAlign} ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
