import { motion } from 'framer-motion'
import { Background, Icon } from '@catalog'
import { SlideContent, itemVariants } from '@catalog/motion'

interface GetStartedSlideProps {
  active: boolean
}

const steps = [
  { num: '01', title: 'Create a presentation folder', code: 'presentations/my-deck/' },
  { num: '02', title: 'Add your slides', code: 'slides/01-TitleSlide.tsx' },
  { num: '03', title: 'Export from index.tsx', code: 'import { DeckPlayer } from "@shared/runtime"' },
  { num: '04', title: 'Run the dev server', code: 'npm run dev' },
]

export const GetStartedSlide = ({ active }: GetStartedSlideProps) => {
  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="gradient" />

        <SlideContent active={active} className="z-10 w-full max-w-4xl px-10">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-white/40 mb-2 tracking-widest uppercase text-sm">Quick Start</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
              Get Started
            </h1>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                custom={index}
                className="flex items-center gap-6 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-5 hover:border-cyan-400/30 transition-colors"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                  <span className="text-cyan-300 font-bold text-lg">{step.num}</span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <code className="text-cyan-400/80 text-sm font-mono">{step.code}</code>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <Icon name="Rocket" size={18} className="text-cyan-300" />
              <span className="text-cyan-100 text-sm">Browse the catalog to discover more components</span>
            </div>
          </motion.div>
        </SlideContent>
      </div>
    </div>
  )
}
