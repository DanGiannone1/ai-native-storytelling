import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Foundry Landscape - The untapped potential beyond OpenAI
 */
export function FoundryLandscape({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const statBox = container.querySelector('.stat-box')
    const sections = container.querySelectorAll('.landscape-section')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    gsap.fromTo(statBox,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.5, ease: 'back.out(1.5)' }
    )

    gsap.fromTo(sections,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.9 }
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
        <div className="text-center mb-8">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            The Foundry Landscape
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Untapped potential beyond OpenAI
          </p>
        </div>

        {/* Big stat */}
        <div className="stat-box mb-10">
          <div className="px-10 py-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
            <div className="text-center">
              <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
                99%
              </span>
              <p className="text-white/70 text-lg mt-2">
                of customers only use OpenAI models
              </p>
              <p className="text-white/50 text-sm mt-1">
                when Foundry offers hundreds of alternatives
              </p>
            </div>
          </div>
        </div>

        {/* Two sections side by side */}
        <div className="flex gap-8 max-w-5xl">
          {/* Opportunity */}
          <div className="landscape-section flex-1">
            <div className="px-6 py-5 rounded-xl border border-emerald-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="Globe" size={22} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 text-lg font-semibold">The Opportunity</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Mistral, Llama, and other models available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Potential cost and performance advantages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Reduced dependency on single provider</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Claude challenges */}
          <div className="landscape-section flex-1">
            <div className="px-6 py-5 rounded-xl border border-amber-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Icon name="Shield" size={22} className="text-amber-400" />
                </div>
                <span className="text-amber-400 text-lg font-semibold">Claude in Foundry — Considerations</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon name="Server" size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Runs on Anthropic infrastructure, not Azure</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Lock" size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Anthropic is data processor (separate terms)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Globe" size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-white/80">Data may be processed outside your region</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
