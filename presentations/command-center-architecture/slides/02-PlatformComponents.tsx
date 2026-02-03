import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface PlatformComponentsProps {
  active: boolean
}

interface Component {
  name: string
  description: string
  icon: IconName
}

interface ProviderGroup {
  provider: string
  color: string
  components: Component[]
}

const providers: ProviderGroup[] = [
  {
    provider: 'Cloud A',
    color: '#0078d4',
    components: [
      { name: 'Document DB', description: 'Stores cron schedules and job definitions', icon: 'Database' },
      { name: 'Dispatcher', description: 'Job runner that polls schedules and publishes jobs', icon: 'Calendar' },
      { name: 'MCP Server', description: 'Container service exposing tools for agent integration', icon: 'Server' },
    ],
  },
  {
    provider: 'Cloud B',
    color: '#22d3ee',
    components: [
      { name: 'Message Bus', description: 'Message queue for job distribution', icon: 'Send' },
      { name: 'Analytics Warehouse', description: 'Telemetry warehouse for job traces and metrics', icon: 'BarChart3' },
    ],
  },
  {
    provider: 'Local',
    color: '#64748b',
    components: [
      { name: 'Orchestrator', description: 'Workstation service that executes agent CLI jobs', icon: 'Cpu' },
      { name: 'Dashboard', description: 'Frontend for monitoring and management', icon: 'Eye' },
    ],
  },
]

export const PlatformComponents = ({ active }: PlatformComponentsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const columns = container.querySelectorAll('.provider-column')
    const cards = container.querySelectorAll('.component-card')

    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(columns, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.5 })
    gsap.fromTo(cards, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.9 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        {/* Header */}
        <div className="z-10 text-center mb-10">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">What We're Working With</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Platform Components
          </h1>
        </div>

        {/* Three-column layout */}
        <div className="z-10 flex gap-8 max-w-6xl px-8 w-full">
          {providers.map((group, gi) => (
            <div key={gi} className="provider-column flex-1 flex flex-col">
              {/* Provider Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 12px ${group.color}` }}
                />
                <h2 className="text-lg font-bold tracking-wider uppercase" style={{ color: group.color }}>
                  {group.provider}
                </h2>
              </div>

              {/* Components */}
              <div className="space-y-3 flex-1">
                {group.components.map((comp, ci) => (
                  <div
                    key={ci}
                    className="component-card p-4 rounded-xl border backdrop-blur-sm"
                    style={{
                      borderColor: `${group.color}30`,
                      backgroundColor: `${group.color}08`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${group.color}20`,
                          border: `1px solid ${group.color}40`,
                        }}
                      >
                        <Icon name={comp.icon} size={20} strokeWidth={1.5} style={{ color: group.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-1">{comp.name}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{comp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="z-10 text-white/40 mt-10 text-sm">
          Multi-cloud architecture with local execution
        </p>
      </div>
    </div>
  )
}
