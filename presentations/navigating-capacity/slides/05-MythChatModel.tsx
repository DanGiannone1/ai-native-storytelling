import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Icon } from '@catalog/primitives'

interface Props {
  active: boolean
}

/**
 * Misconception #1: Chat App = Chat Model
 * Clear visual showing this is FALSE
 */
export function MythChatModel({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const leftBox = container.querySelector('.left-box')
    const rightBox = container.querySelector('.right-box')
    const notEqual = container.querySelector('.not-equal')
    const realityItems = container.querySelectorAll('.reality-item')

    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.3 })

    gsap.fromTo(leftBox,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.5 }
    )
    gsap.fromTo(rightBox,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.5 }
    )
    gsap.fromTo(notEqual,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.5)' }
    )
    gsap.fromTo(realityItems,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, delay: 1.2 }
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
            Common Misconception <span className="text-cyan-400">#1</span>
          </h1>
          <p className="slide-subtitle text-white/50 mt-3 text-lg">
            "I'm building a chat application, so I need the Chat model"
          </p>
        </div>

        {/* Main visual - Two boxes with ≠ */}
        <div className="flex items-center gap-8 mb-16">
          {/* Left box - Chat Application */}
          <div className="left-box">
            <div className="w-[280px] px-8 py-10 rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon name="MessageSquare" size={40} className="text-cyan-400" />
                </div>
                <span className="text-2xl font-semibold text-cyan-400">Chat Application</span>
                <span className="text-white/50 text-sm mt-2">Your use case</span>
              </div>
            </div>
          </div>

          {/* Not Equal Sign */}
          <div className="not-equal">
            <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
              <span className="text-5xl font-bold text-red-400">≠</span>
            </div>
          </div>

          {/* Right box - Chat Model */}
          <div className="right-box">
            <div className="w-[280px] px-8 py-10 rounded-2xl border border-orange-500/30 bg-black/60 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                  <Icon name="Sparkles" size={40} className="text-orange-400" />
                </div>
                <span className="text-2xl font-semibold text-orange-400">Chat Model</span>
                <span className="text-white/50 text-sm mt-2">GPT-5-chat, etc.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reality section */}
        <div className="max-w-3xl">
          <div className="reality-item flex items-start gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Zap" size={18} className="text-yellow-400" />
            </div>
            <div>
              <span className="text-white/90 text-lg">
                <strong className="text-yellow-400">Chat variants are experimental</strong> — preview only, no GA target date, OpenAI hasn't committed long-term
              </span>
            </div>
          </div>

          <div className="reality-item flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="CheckCircle" size={18} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-white/90 text-lg">
                <strong className="text-emerald-400">Enterprise apps need reliability</strong> — accuracy and logic matter more than natural conversation flow
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
