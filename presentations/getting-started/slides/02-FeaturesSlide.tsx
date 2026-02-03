import { motion } from 'framer-motion'
import { Background, Icon, IconName } from '@catalog'
import { SlideContent, itemVariants } from '@catalog/motion'

interface FeaturesSlideProps {
  active: boolean
}

interface Feature {
  icon: IconName
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: 'Sparkles',
    title: 'Beautiful Animations',
    description: 'Built-in GSAP and Framer Motion support for cinematic transitions'
  },
  {
    icon: 'Palette',
    title: 'Rich Visual Catalog',
    description: 'Pre-built backgrounds, templates, and diagram components'
  },
  {
    icon: 'Zap',
    title: 'Keyboard Navigation',
    description: 'Arrow keys, spacebar, and touch gestures for seamless control'
  },
  {
    icon: 'Layers',
    title: 'Modular Architecture',
    description: 'Compose slides from reusable primitives, templates, and layouts'
  },
  {
    icon: 'Code',
    title: 'TypeScript First',
    description: 'Full type safety with React components and custom hooks'
  },
  {
    icon: 'Box',
    title: '3D Capabilities',
    description: 'Three.js integration via React Three Fiber for immersive visuals'
  },
]

export const FeaturesSlide = ({ active }: FeaturesSlideProps) => {
  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <SlideContent active={active} className="z-10 w-full max-w-6xl px-10">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-white/40 mb-2 tracking-widest uppercase text-sm">Built For Impact</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
              Framework Features
            </h1>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={index}
                className="group relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-cyan-300" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SlideContent>
      </div>
    </div>
  )
}
