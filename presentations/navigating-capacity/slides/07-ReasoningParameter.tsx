import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Misconception #2: Not knowing about the Reasoning Parameter
 * Simple slide showing the parameter exists and is adjustable
 */
export function ReasoningParameter({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const parameterBox = container.querySelector('.parameter-box')
    const sliderTrack = container.querySelector('.slider-track')
    const sliderThumb = container.querySelector('.slider-thumb')
    const labels = container.querySelectorAll('.slider-label')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    gsap.fromTo(parameterBox,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.5 }
    )

    gsap.fromTo(sliderTrack,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
    )

    gsap.fromTo(labels,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, stagger: 0.1, delay: 1.2 }
    )

    gsap.fromTo(sliderThumb,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 1.4, ease: 'back.out(2)' }
    )

    // Animate the thumb sliding
    gsap.to(sliderThumb, {
      x: 120,
      duration: 1.5,
      delay: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1
    })

    gsap.fromTo(callout,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.8 }
    )

  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center h-full px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Reasoning Parameter
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            A critical setting most customers don't know exists
          </p>
        </div>

        {/* Main visual - Parameter control */}
        <div className="parameter-box w-[700px] px-12 py-10 rounded-2xl border border-violet-500/30 bg-black/60 backdrop-blur-sm mb-10">
          {/* Parameter name */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Icon name="Brain" size={24} className="text-violet-400" />
            </div>
            <code className="text-2xl font-mono text-violet-400">reasoning_effort</code>
          </div>

          {/* Slider visualization */}
          <div className="relative px-4">
            {/* Track */}
            <div className="slider-track h-3 rounded-full bg-gradient-to-r from-emerald-500/40 via-yellow-500/40 to-red-500/40 origin-left" />

            {/* Thumb */}
            <div className="slider-thumb absolute top-1/2 -translate-y-1/2 left-[20%] w-6 h-6 rounded-full bg-white shadow-lg shadow-violet-500/50 border-2 border-violet-400" />

            {/* Labels */}
            <div className="flex justify-between mt-4">
              <span className="slider-label text-emerald-400 font-medium">low</span>
              <span className="slider-label text-yellow-400 font-medium">medium</span>
              <span className="slider-label text-red-400 font-medium">high</span>
            </div>
          </div>

          {/* Models this applies to */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-white/50 text-sm">Applies to GPT-5 series reasoning models:</span>
            <div className="flex gap-3 mt-3 flex-wrap">
              {['gpt-5', 'gpt-5-mini', 'gpt-5.1', 'gpt-5.2'].map((model) => (
                <span key={model} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-mono">
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="callout max-w-2xl">
          <div className="flex items-start gap-4 px-6 py-5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Target" size={18} className="text-amber-400" />
            </div>
            <div>
              <span className="text-white/90 text-lg">
                This parameter controls how much "thinking" the model does — adjusting it can dramatically change behavior, latency, and cost
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
