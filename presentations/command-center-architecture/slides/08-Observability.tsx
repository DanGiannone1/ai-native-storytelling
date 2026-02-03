import { motion } from 'framer-motion'
import { Icon, SectionSlide, itemVariants } from '@catalog'

interface ObservabilityProps {
  active: boolean
}

const jobDetails = [
  'Agent prompt',
  'Task',
  'Output report',
  'Reasoning trace',
  'Tool calls',
  'Execution time',
  'Total cost',
]

export const Observability = ({ active }: ObservabilityProps) => {
  return (
    <SectionSlide
      active={active}
      backgroundVariant="default"
      contentClassName="z-10 w-full max-w-5xl px-8"
      headerClassName="text-center mb-10"
      eyebrow="Real-Time Visibility"
      title="Observability Dashboard"
      footer="5-second polling from the analytics warehouse - near real-time visibility"
      footerClassName="text-center text-white/40 mt-8 text-sm"
    >
      {/* Feature Cards - Glassmorphic with Animated Visualizations */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {/* Network Hub - Mini node graph */}
        <motion.div
          variants={itemVariants}
          className="relative group p-4 rounded-lg backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, #22d3ee18 0%, #22d3ee08 100%)',
            borderTop: '1px solid #22d3ee40',
            borderLeft: '1px solid #22d3ee30',
            borderRight: '1px solid #22d3ee15',
            borderBottom: '1px solid #22d3ee15',
          }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Network" size={16} strokeWidth={1.5} style={{ color: '#22d3ee' }} />
              <h3 className="text-white font-semibold text-sm">Network Hub</h3>
            </div>
            {/* Mini animated network */}
            <svg className="w-full h-16 mb-2" viewBox="0 0 100 40">
              {/* Connections */}
              <line x1="20" y1="20" x2="50" y2="10" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
              <line x1="20" y1="20" x2="50" y2="30" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
              <line x1="50" y1="10" x2="80" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
              <line x1="50" y1="30" x2="80" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
              {/* Pulsing particles on connections */}
              <circle r="1.5" fill="#22d3ee">
                <animate attributeName="cx" values="20;50" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="20;10" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="1.5" fill="#22d3ee">
                <animate attributeName="cx" values="50;80" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="cy" values="30;20" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </circle>
              {/* Nodes */}
              <circle cx="20" cy="20" r="4" fill="#22d3ee" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="10" r="3" fill="#22d3ee" opacity="0.5" />
              <circle cx="50" cy="30" r="3" fill="#22d3ee" opacity="0.5" />
              <circle cx="80" cy="20" r="4" fill="#22d3ee" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="1s" />
              </circle>
            </svg>
            <p className="text-white/50 text-[10px] leading-relaxed">Agent topology & connections</p>
          </div>
          <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40" style={{ backgroundColor: '#22d3ee' }} />
        </motion.div>

        {/* Run History - Timeline */}
        <motion.div
          variants={itemVariants}
          className="relative group p-4 rounded-lg backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, #a78bfa18 0%, #a78bfa08 100%)',
            borderTop: '1px solid #a78bfa40',
            borderLeft: '1px solid #a78bfa30',
            borderRight: '1px solid #a78bfa15',
            borderBottom: '1px solid #a78bfa15',
          }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={16} strokeWidth={1.5} style={{ color: '#a78bfa' }} />
              <h3 className="text-white font-semibold text-sm">Run History</h3>
            </div>
            {/* Animated timeline bars */}
            <div className="flex items-end gap-1 h-16 mb-2">
              {[0.6, 0.8, 0.4, 0.9, 0.5, 0.7, 0.85, 0.55].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ backgroundColor: '#a78bfa' }}
                  initial={{ height: 0, opacity: 0.3 }}
                  animate={{ height: `${h * 100}%`, opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
                />
              ))}
            </div>
            <p className="text-white/50 text-[10px] leading-relaxed">Execution history over time</p>
          </div>
          <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40" style={{ backgroundColor: '#a78bfa' }} />
        </motion.div>

        {/* Live Feed - Event ticks */}
        <motion.div
          variants={itemVariants}
          className="relative group p-4 rounded-lg backdrop-blur-md overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #34d39918 0%, #34d39908 100%)',
            borderTop: '1px solid #34d39940',
            borderLeft: '1px solid #34d39930',
            borderRight: '1px solid #34d39915',
            borderBottom: '1px solid #34d39915',
          }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Activity" size={16} strokeWidth={1.5} style={{ color: '#34d399' }} />
              <h3 className="text-white font-semibold text-sm">Live Feed</h3>
            </div>
            {/* Simulated event stream */}
            <div className="space-y-1 h-16 mb-2 overflow-hidden">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: [0, 0.7, 0.7, 0], x: 0 }}
                  transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="h-2 rounded bg-emerald-400/30" style={{ width: `${50 + i * 10}%` }} />
                </motion.div>
              ))}
            </div>
            <p className="text-white/50 text-[10px] leading-relaxed">Rolling activity feed</p>
          </div>
          <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40" style={{ backgroundColor: '#34d399' }} />
        </motion.div>

        {/* Metrics - Animated counters */}
        <motion.div
          variants={itemVariants}
          className="relative group p-4 rounded-lg backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, #fbbf2418 0%, #fbbf2408 100%)',
            borderTop: '1px solid #fbbf2440',
            borderLeft: '1px solid #fbbf2430',
            borderRight: '1px solid #fbbf2415',
            borderBottom: '1px solid #fbbf2415',
          }}
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="BarChart3" size={16} strokeWidth={1.5} style={{ color: '#fbbf24' }} />
              <h3 className="text-white font-semibold text-sm">Metrics</h3>
            </div>
            {/* Mini metric displays */}
            <div className="grid grid-cols-2 gap-2 h-16 mb-2">
              <div className="flex flex-col justify-center">
                <motion.span
                  className="text-amber-400 font-mono text-lg font-bold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  1.2k
                </motion.span>
                <span className="text-white/40 text-[9px]">jobs/day</span>
              </div>
              <div className="flex flex-col justify-center">
                <motion.span
                  className="text-emerald-400 font-mono text-lg font-bold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  98%
                </motion.span>
                <span className="text-white/40 text-[9px]">success</span>
              </div>
            </div>
            <p className="text-white/50 text-[10px] leading-relaxed">Real-time performance</p>
          </div>
          <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full opacity-40" style={{ backgroundColor: '#fbbf24' }} />
        </motion.div>
      </div>

      {/* Job Details Section - Glassmorphic */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-lg backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center">
            <Icon name="Eye" size={16} className="text-cyan-400" />
          </div>
          <h3 className="text-white font-semibold text-sm">Full Job Visibility</h3>
          <span className="text-white/40 text-xs">— drill into any execution</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {jobDetails.map((detail) => (
            <span
              key={detail}
              className="px-3 py-1.5 rounded text-xs backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {detail}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionSlide>
  )
}
