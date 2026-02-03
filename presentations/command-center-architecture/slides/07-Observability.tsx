import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Background, Icon, IconName } from '@catalog'

interface ObservabilityProps {
  active: boolean
}

interface AgentStatus {
  name: string
  status: 'running' | 'idle' | 'success' | 'error'
  lastRun: string
  icon: IconName
}

const agents: AgentStatus[] = [
  { name: 'code-review', status: 'running', lastRun: '2m ago', icon: 'Code' },
  { name: 'test-runner', status: 'success', lastRun: '15m ago', icon: 'CheckCircle' },
  { name: 'doc-writer', status: 'idle', lastRun: '1h ago', icon: 'FileText' },
  { name: 'deploy-bot', status: 'success', lastRun: '3h ago', icon: 'Server' },
  { name: 'monitor', status: 'running', lastRun: 'continuous', icon: 'Activity' },
  { name: 'backup', status: 'error', lastRun: '6h ago', icon: 'Database' },
]

const statusColors = {
  running: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  idle: { bg: 'bg-slate-500/20', border: 'border-slate-500/50', text: 'text-slate-400', dot: 'bg-slate-400' },
  success: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  error: { bg: 'bg-rose-500/20', border: 'border-rose-500/50', text: 'text-rose-400', dot: 'bg-rose-400' },
}

export const Observability = ({ active }: ObservabilityProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const dashboard = container.querySelector('.dashboard-container')
    const statsCards = container.querySelectorAll('.stat-card')
    const agentCards = container.querySelectorAll('.agent-card')
    gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.6 })
    gsap.fromTo(title, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
    gsap.fromTo(dashboard, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.5 })
    gsap.fromTo(statsCards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.8 })
    gsap.fromTo(agentCards, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 1.2 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="default" />

        {/* Header */}
        <div className="z-10 absolute top-6 text-center w-full px-4">
          <p className="slide-subtitle text-white/40 mb-2 tracking-widest uppercase text-sm">Real-Time Visibility</p>
          <h1 className="slide-title text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
            Observability Dashboard
          </h1>
        </div>

        {/* Dashboard Container */}
        <div className="dashboard-container z-10 mt-20 w-full max-w-5xl px-8">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <Icon name="Eye" size={20} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Network Hub</h3>
                  <p className="text-white/50 text-sm">Command Center Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Live</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-700/30">
              <div className="stat-card p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Activity" size={18} className="text-cyan-400" />
                  <span className="text-emerald-400 text-sm">+12%</span>
                </div>
                <p className="text-2xl font-bold text-white">847</p>
                <p className="text-white/60 text-sm">Jobs Today</p>
              </div>
              <div className="stat-card p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="CheckCircle" size={18} className="text-emerald-400" />
                  <span className="text-emerald-400 text-sm">98.2%</span>
                </div>
                <p className="text-2xl font-bold text-white">831</p>
                <p className="text-white/60 text-sm">Successful</p>
              </div>
              <div className="stat-card p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Clock" size={18} className="text-violet-400" />
                  <span className="text-white/60 text-sm">avg</span>
                </div>
                <p className="text-2xl font-bold text-white">4.2m</p>
                <p className="text-white/60 text-sm">Execution Time</p>
              </div>
              <div className="stat-card p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="DollarSign" size={18} className="text-amber-400" />
                  <span className="text-rose-400 text-sm">-8%</span>
                </div>
                <p className="text-2xl font-bold text-white">$127</p>
                <p className="text-white/60 text-sm">API Costs</p>
              </div>
            </div>

            {/* Agent Grid */}
            <div className="p-6">
              <h4 className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-4">Active Agents</h4>
              <div className="grid grid-cols-3 gap-3">
                {agents.map((agent, i) => {
                  const colors = statusColors[agent.status]
                  return (
                    <div
                      key={i}
                      className={`agent-card p-3 rounded-xl border ${colors.bg} ${colors.border} flex items-center gap-3`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <Icon name={agent.icon} size={16} strokeWidth={2} className={colors.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium truncate">{agent.name}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${agent.status === 'running' ? 'animate-pulse' : ''}`} />
                        </div>
                        <span className="text-white/50 text-sm">{agent.lastRun}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
