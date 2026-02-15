import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Understanding RPM Limits - A commonly overlooked rate limit
 */
export function RPMTrap({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const tpmBox = container.querySelector('.tpm-box')
    const rpmBox = container.querySelector('.rpm-box')
    const scenario = container.querySelector('.scenario')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })
    gsap.fromTo(tpmBox, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.5 })
    gsap.fromTo(rpmBox, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.8 })
    gsap.fromTo(scenario, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.1 })
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
        <div className="text-center mb-10">
          <h1 className="slide-title text-5xl font-bold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Understanding RPM Limits
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            A commonly overlooked rate limit
          </p>
        </div>

        {/* Two limits side by side */}
        <div className="flex items-stretch gap-8 mb-10">
          {/* TPM - what everyone knows */}
          <div className="tpm-box w-80">
            <div className="h-full px-6 py-6 rounded-xl border border-emerald-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Icon name="FileText" size={22} className="text-emerald-400" />
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold">TPM Limit</span>
                  <p className="text-white/40 text-sm">Tokens per minute</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                  <span className="text-white/70 text-sm">Documented everywhere</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                  <span className="text-white/70 text-sm">In the capacity calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                  <span className="text-white/70 text-sm">Visible in Azure Monitor</span>
                </div>
              </div>
            </div>
          </div>

          {/* RPM - the hidden one */}
          <div className="rpm-box w-80">
            <div className="h-full px-6 py-6 rounded-xl border border-red-500/30 bg-black/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Icon name="Zap" size={22} className="text-red-400" />
                </div>
                <div>
                  <span className="text-red-400 font-semibold">RPM Limit</span>
                  <p className="text-white/40 text-sm">Requests per minute</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-red-400/50" />
                  <span className="text-white/70 text-sm">Barely mentioned in docs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-red-400/50" />
                  <span className="text-white/70 text-sm">Not in the calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-red-400/50" />
                  <span className="text-white/70 text-sm">Scales with PTU (can't adjust separately)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The scenario */}
        <div className="scenario max-w-2xl">
          <div className="px-8 py-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={22} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white/80 mb-2">
                  <strong className="text-amber-400">Common scenario:</strong> "We have plenty of TPM headroom, let's send 1,000 parallel requests"
                </p>
                <p className="text-white/60 text-sm">
                  High parallelism can hit RPM limits even when TPM looks fine — worth checking if you see unexpected throttling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
