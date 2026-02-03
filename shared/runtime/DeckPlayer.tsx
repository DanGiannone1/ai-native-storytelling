import { useState, useEffect, useCallback, ReactNode, isValidElement, cloneElement, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@catalog'

interface SlideProps {
  active: boolean
}

interface DeckPlayerProps {
  children: ReactNode[]
  title?: string
  showControls?: boolean
  transition?: 'fade' | 'slide' | 'zoom' | 'none'
}

const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
}

export function DeckPlayer({
  children,
  title,
  showControls = true,
  transition = 'fade',
}: DeckPlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const slides = Array.isArray(children) ? children : [children]
  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
    }
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(totalSlides - 1)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen()
            setIsFullscreen(false)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, totalSlides, toggleFullscreen, isFullscreen])

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const transitionConfig = transitions[transition]

  return (
    <div className="relative w-full h-screen bg-deck-bg overflow-hidden">
      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={transitionConfig.initial}
          animate={transitionConfig.animate}
          exit={transitionConfig.exit}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {isValidElement(slides[currentSlide])
            ? cloneElement(slides[currentSlide] as ReactElement<SlideProps>, { active: true })
            : slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Controls overlay */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
          {/* Left: Title */}
          <div className="text-white/70 text-sm">
            {title && <span className="font-medium">{title}</span>}
          </div>

          {/* Center: Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </button>

            <span className="text-white/70 text-sm font-mono min-w-[60px] text-center">
              {currentSlide + 1} / {totalSlides}
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="ChevronRight" size={20} className="text-white" />
            </button>
          </div>

          {/* Right: Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={18} className="text-white" />
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  )
}
