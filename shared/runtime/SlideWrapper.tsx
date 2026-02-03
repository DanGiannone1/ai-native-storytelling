import { ReactNode } from 'react'

interface SlideWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Consistent wrapper for all slides.
 * Provides:
 * - Full viewport sizing
 * - Dark background with starfield pattern
 * - Centered content
 */
export function SlideWrapper({ children, className = '' }: SlideWrapperProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen bg-deck-bg text-white font-sans overflow-hidden ${className}`}>
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,25,40,1)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

      {/* Star grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
