import { motion } from 'framer-motion'
import { Background } from '@catalog/visuals'
import { SlideContent, itemVariants } from '@catalog/motion'
import { AgentDispatch, AgentFormula, AgentWorkflows, CanVsCant, HistoryTimeline, ToolsUnlock } from '@catalog/slides/ai-education'
import { TitleOpener } from '@catalog/slides/common'
import { AlwaysOn, BrandFinale, OurAgents } from '@catalog/slides/showcase'

interface CatalogGalleryGridProps {
  active: boolean
}

type CatalogSlideComponent = (props: { active: boolean }) => JSX.Element

interface GalleryItem {
  name: string
  category: string
  path: string
  Component: CatalogSlideComponent
}

const PREVIEW_SCALE = 0.2
const PREVIEW_WIDTH = 1920 * PREVIEW_SCALE
const PREVIEW_HEIGHT = 1080 * PREVIEW_SCALE

const galleryItems: GalleryItem[] = [
  { name: 'Title Opener', category: 'Common', path: 'catalog/slides/common/TitleOpener.tsx', Component: TitleOpener },
  { name: 'Agent Dispatch', category: 'AI Education', path: 'catalog/slides/ai-education/AgentDispatch.tsx', Component: AgentDispatch },
  { name: 'Agent Formula', category: 'AI Education', path: 'catalog/slides/ai-education/AgentFormula.tsx', Component: AgentFormula },
  { name: 'Agent Workflows', category: 'AI Education', path: 'catalog/slides/ai-education/AgentWorkflows.tsx', Component: AgentWorkflows },
  { name: 'Can vs Cant', category: 'AI Education', path: 'catalog/slides/ai-education/CanVsCant.tsx', Component: CanVsCant },
  { name: 'History Timeline', category: 'AI Education', path: 'catalog/slides/ai-education/HistoryTimeline.tsx', Component: HistoryTimeline },
  { name: 'Tools Unlock', category: 'AI Education', path: 'catalog/slides/ai-education/ToolsUnlock.tsx', Component: ToolsUnlock },
  { name: 'Always On', category: 'Showcase', path: 'catalog/slides/showcase/AlwaysOn.tsx', Component: AlwaysOn },
  { name: 'Our Agents', category: 'Showcase', path: 'catalog/slides/showcase/OurAgents.tsx', Component: OurAgents },
  { name: 'Brand Finale', category: 'Showcase', path: 'catalog/slides/showcase/BrandFinale.tsx', Component: BrandFinale },
]

export function CatalogGalleryGrid({ active }: CatalogGalleryGridProps) {
  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div className="relative flex flex-col items-center justify-center h-screen">
        <Background variant="grid" />

        <SlideContent active={active} className="z-10 w-full px-10">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <p className="text-white/40 mb-2 tracking-widest uppercase text-sm">Catalog</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[0.12em] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
              Slide Gallery
            </h1>
            <p className="text-white/50 text-sm mt-3">
              Copy a slide by path. Each preview is a live component scaled down.
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                className="rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-3 hover:border-cyan-400/50 transition-colors"
              >
                <div
                  className="relative overflow-hidden rounded-lg border border-white/5"
                  style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
                >
                  <div
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{
                      width: 1920,
                      height: 1080,
                      transform: `scale(${PREVIEW_SCALE})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <item.Component active />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{item.category}</div>
                  <div className="text-sm text-white/90 font-semibold">{item.name}</div>
                  <div className="text-[10px] text-white/40 font-mono truncate">{item.path}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </SlideContent>
      </div>
    </div>
  )
}
