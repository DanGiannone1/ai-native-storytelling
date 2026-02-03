import { DeckPlayer } from '@shared/runtime'
import { DepartmentHub } from './slides/DepartmentHub'

export const metadata = {
  title: 'The AI-Native Business',
  description: 'A business operating primarily through autonomous AI agents',
}

export default function AINativeBusinessDeck() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <DepartmentHub />
      {/* Add more slides here */}
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-2xl text-white/50">More slides coming soon...</p>
      </div>
    </DeckPlayer>
  )
}
