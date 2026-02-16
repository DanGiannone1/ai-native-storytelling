import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Regional vs Data Zone/Global - Breaking out of regional-first thinking
 */
export function RegionalVsGlobal({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const regionalBox = container.querySelector('.regional-box')
    const globalBox = container.querySelector('.global-box')
    const arrow = container.querySelector('.direction-arrow')
    const insight = container.querySelector('.insight-box')
    const callout = container.querySelector('.callout')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(regionalBox, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.5 })
    gsap.fromTo(arrow, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.8 })
    gsap.fromTo(globalBox, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, delay: 1.0 })
    gsap.fromTo(insight, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.3 })
    gsap.fromTo(callout, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.6 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
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
        <div className="text-center mb-5">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Regional vs Global/Data Zone
          </h1>
          <p className="slide-subtitle text-white/50 mt-2 text-lg">
            The industry is moving — is your policy keeping up?
          </p>
        </div>

        {/* Comparison */}
        <div className="flex items-center gap-6 mb-5">
          {/* Regional - the old way */}
          <div className="regional-box w-72">
            <div className="px-5 py-5 rounded-xl border border-amber-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Icon name="Server" size={22} className="text-amber-400" />
                </div>
                <span className="text-amber-400 font-semibold">Regional-Only</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Lock" size={14} className="text-amber-400/70" />
                  <span className="text-white/60">Familiar policy compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={14} className="text-red-400" />
                  <span className="text-white/60">Increasingly hard to procure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={14} className="text-red-400 rotate-180" />
                  <span className="text-white/60">Deprioritized by providers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="direction-arrow flex flex-col items-center gap-2">
            <Icon name="ArrowRight" size={32} className="text-emerald-400" />
            <span className="text-emerald-400/70 text-xs uppercase tracking-wider">Industry<br/>Direction</span>
          </div>

          {/* Global/Data Zone - the new way */}
          <div className="global-box w-72">
            <div className="px-5 py-5 rounded-xl border border-emerald-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="Globe" size={22} className="text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-semibold">Global / Data Zone</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={14} className="text-emerald-400" />
                  <span className="text-white/60">Faster capacity access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={14} className="text-emerald-400" />
                  <span className="text-white/60">Where investment is going</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={14} className="text-emerald-400" />
                  <span className="text-white/60">Still meets data residency needs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The insight */}
        <div className="insight-box max-w-2xl mb-4">
          <div className="px-5 py-3 rounded-xl bg-violet-500/10 border border-violet-500/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={20} className="text-violet-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">
                  <strong className="text-violet-400">What helped shift thinking:</strong> Microsoft deploys Copilot with different models across regions — prioritizing <span className="text-white">speed over consistency</span>. If Microsoft does it, maybe your policy needs revisiting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="callout max-w-2xl">
          <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/70 text-center text-sm">
              <Icon name="Target" size={16} className="text-cyan-400 inline mr-2" />
              Leadership often doesn't know a tradeoff is being made. Help them understand: <span className="text-white/90">speed & agility</span> vs <span className="text-white/90">standardization & compliance</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
