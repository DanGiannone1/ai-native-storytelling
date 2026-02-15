import { DeckPlayer, SlideSection } from '@shared/runtime'
import {
  TitleSlide,
  InfrastructureReality,
  SelectionChallenge,
} from './slides'

export const metadata = {
  title: 'Navigating Capacity Challenges & Model Selection',
  description: 'A guide to choosing the right AI models and managing capacity constraints in a resource-scarce environment',
}

const sections: SlideSection[] = [
  { title: 'Intro', startIndex: 0 },
  { title: 'Context', startIndex: 1 },
  { title: 'Models', startIndex: 2 },
]

export default function NavigatingCapacityPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade" sections={sections}>
      <TitleSlide active={false} />
      <InfrastructureReality active={false} />
      <SelectionChallenge active={false} />
    </DeckPlayer>
  )
}
