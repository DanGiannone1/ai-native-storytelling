import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * GPT-5 Series Gotchas - Key migration and control issues
 */
export function MigrationGotchas({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const gotchas = container.querySelectorAll('.gotcha-card')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    gsap.fromTo(gotchas,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.6 }
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
        <div className="text-center mb-10">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            GPT-5 Series Gotchas
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            Key issues to know when migrating or capacity planning
          </p>
        </div>

        {/* Two gotcha cards side by side */}
        <div className="flex gap-8 max-w-5xl items-stretch">
          {/* Gotcha 1: No reasoning control on GPT-5 */}
          <div className="gotcha-card flex-1">
            <div className="h-full px-7 py-6 rounded-xl border border-red-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Icon name="Settings" size={26} className="text-red-400" />
                </div>
                <span className="text-red-400 text-xl font-semibold">No Reasoning Control on GPT-5</span>
              </div>

              <p className="text-white/80 mb-4">
                The <code className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">reasoning_effort</code> parameter
                is only available on GPT-5.1 and GPT-5.2 — not on GPT-5 base models.
              </p>

              <div className="bg-red-500/10 rounded-lg px-4 py-3">
                <span className="text-white/70 text-sm">
                  <strong className="text-red-400">Impact:</strong> Capacity planning for GPT-5 is difficult since you can't control how much "thinking" the model does
                </span>
              </div>
            </div>
          </div>

          {/* Gotcha 2: No GPT-4.1-mini replacement */}
          <div className="gotcha-card flex-1">
            <div className="h-full px-7 py-6 rounded-xl border border-amber-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Icon name="Zap" size={26} className="text-amber-400" />
                </div>
                <span className="text-amber-400 text-xl font-semibold">No GPT-4.1-mini Replacement</span>
              </div>

              <p className="text-white/80 mb-4">
                There is no direct replacement for GPT-4.1-mini in the GPT-5 series:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span className="text-white/70 text-sm"><strong className="text-white/90">GPT-5-mini</strong> — Reasoning model, can't disable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span className="text-white/70 text-sm"><strong className="text-white/90">GPT-5.1 / 5.2</strong> — Can disable reasoning, but no mini variant</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 rounded-lg px-4 py-3">
                <span className="text-white/70 text-sm">
                  <strong className="text-amber-400">Impact:</strong> Expect retirement dates to be pushed back
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
