import { motion, Variants } from 'framer-motion'
import { ReactNode, Children, isValidElement } from 'react'
import { itemVariants, createStaggerVariants } from './variants'

interface AnimateItemsProps {
  children: ReactNode
  active: boolean
  staggerDelay?: number
  initialDelay?: number
  className?: string
  itemClassName?: string
  itemVariants?: Variants
}

/**
 * Animates a list of children with staggered entrance.
 * Each child is automatically wrapped in a motion.div with item variants.
 *
 * @example
 * ```tsx
 * <AnimateItems active={active} staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </AnimateItems>
 * ```
 */
export function AnimateItems({
  children,
  active,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
  itemClassName = '',
  itemVariants: customItemVariants,
}: AnimateItemsProps) {
  const containerVariants = createStaggerVariants(staggerDelay, initialDelay)
  const variants = customItemVariants || itemVariants

  return (
    <motion.div
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child

        return (
          <motion.div
            key={index}
            variants={variants}
            className={itemClassName}
          >
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
