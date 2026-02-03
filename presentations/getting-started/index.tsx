import { DeckPlayer } from '@shared/runtime/DeckPlayer'
import { WelcomeSlide, FeaturesSlide, GetStartedSlide } from './slides'

export const metadata = {
  title: 'Getting Started',
  description: 'An introduction to the AI Native Storytelling presentation framework',
}

export default function GettingStartedPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <WelcomeSlide active={false} />
      <FeaturesSlide active={false} />
      <GetStartedSlide active={false} />
    </DeckPlayer>
  )
}
