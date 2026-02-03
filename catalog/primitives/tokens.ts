// Design tokens extracted from existing presentations

export const colors = {
  // Backgrounds
  bg: {
    deep: '#02040a',
    surface: '#0a0f1e',
    elevated: '#101827',
  },

  // Status colors
  status: {
    operational: {
      primary: '#22d3ee',     // cyan-400
      bg: 'rgba(8, 145, 178, 0.3)',  // cyan-950/30
      border: 'rgba(34, 211, 238, 0.4)',
      glow: 'rgba(34, 211, 238, 0.4)',
    },
    progress: {
      primary: '#a78bfa',     // violet-400
      bg: 'rgba(76, 29, 149, 0.3)',  // violet-950/30
      border: 'rgba(167, 139, 250, 0.4)',
      glow: 'rgba(167, 139, 250, 0.4)',
    },
    planned: {
      primary: '#64748b',     // slate-500
      bg: 'rgba(30, 41, 59, 0.4)',  // slate-900/40
      border: 'rgba(51, 65, 85, 1)',
      glow: 'transparent',
    },
  },

  // Accent colors
  accent: {
    cyan: '#22d3ee',
    violet: '#a78bfa',
    emerald: '#34d399',
    amber: '#fbbf24',
    rose: '#fb7185',
  },

  // Text
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
    subtle: 'rgba(255, 255, 255, 0.3)',
  },
} as const

export const animation = {
  // Durations
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 1000,
  },

  // Spin speeds for orbital elements
  spin: {
    slow: '50s',
    slower: '70s',
  },

  // Particle animation durations
  particle: {
    fast: '3s',
    normal: '5s',
    slow: '7s',
  },
} as const

export const spacing = {
  slide: {
    width: 1000,
    height: 650,
  },
} as const

export type Status = 'operational' | 'progress' | 'planned'

export function getStatusColors(status: Status) {
  return colors.status[status]
}
