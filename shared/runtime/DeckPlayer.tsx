import { useState, useEffect, useCallback, ReactNode, isValidElement, cloneElement, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@catalog'

interface SlideProps {
  active: boolean
}

export interface SlideSection {
  title: string
  startIndex: number
  icon?: string
}

interface DeckPlayerProps {
  children: ReactNode[]
  title?: string
  showControls?: boolean
  transition?: 'fade' | 'slide' | 'zoom' | 'none'
  sections?: SlideSection[]
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
  sections = [],
}: DeckPlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNavigator, setShowNavigator] = useState(false)
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
        case 'g':
        case 'G':
          e.preventDefault()
          setShowNavigator(prev => !prev)
          break
        case 'Escape':
          if (showNavigator) {
            setShowNavigator(false)
          } else if (isFullscreen) {
            document.exitFullscreen()
            setIsFullscreen(false)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, totalSlides, toggleFullscreen, isFullscreen, showNavigator])

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

      {/* Non-linear Navigator Overlay */}
      <AnimatePresence>
        {showNavigator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col"
            onClick={() => setShowNavigator(false)}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">{title || 'Slides'}</h2>
                  <p className="text-white/50 text-sm mt-1">Click a slide to jump • Press G or ESC to close</p>
                </div>
                <button
                  onClick={() => setShowNavigator(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon name="X" size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Sections (if defined) */}
            {sections.length > 0 && (
              <div className="px-6 py-4 border-b border-white/5">
                <div className="flex gap-2 max-w-6xl mx-auto overflow-x-auto">
                  {sections.map((section, i) => {
                    const isActive = currentSlide >= section.startIndex &&
                      (i === sections.length - 1 || currentSlide < sections[i + 1].startIndex)
                    return (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation()
                          goToSlide(section.startIndex)
                          setShowNavigator(false)
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        {section.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Slide Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {slides.map((_, index) => {
                  const isCurrent = index === currentSlide
                  // Find section for this slide
                  const section = sections.findLast(s => s.startIndex <= index)

                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToSlide(index)
                        setShowNavigator(false)
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden transition-all hover:scale-105 hover:ring-2 hover:ring-cyan-500/50 ${
                        isCurrent ? 'ring-2 ring-cyan-500 bg-cyan-500/20' : 'bg-white/5'
                      }`}
                    >
                      {/* Slide number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-2xl font-bold ${isCurrent ? 'text-cyan-400' : 'text-white/30'}`}>
                          {index + 1}
                        </span>
                      </div>

                      {/* Section indicator */}
                      {section && index === section.startIndex && (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-violet-500/30 text-violet-300 text-[9px] font-medium uppercase tracking-wider">
                          {section.title}
                        </div>
                      )}

                      {/* Current indicator */}
                      {isCurrent && (
                        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
