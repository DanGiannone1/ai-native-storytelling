import { DeckPlayer, SlideSection } from '@shared/runtime'
import {
  TitleSlide,
  InfrastructureReality,
  SelectionChallenge,
  MythChatModel,
  ReasoningParameter,
  CodexBeyondCode,
  MigrationGotchas,
  FoundryLandscape,
} from './slides'

export const metadata = {
  title: 'Navigating Capacity Challenges & Model Selection',
  description: 'A guide to choosing the right AI models and managing capacity constraints in a resource-scarce environment',
}

const sections: SlideSection[] = [
  { title: 'Intro', startIndex: 0 },
  { title: 'Context', startIndex: 1 },
  { title: 'Challenges', startIndex: 2 },
  { title: 'Misconceptions', startIndex: 3 },
  { title: 'Landscape', startIndex: 7 },
]

export default function NavigatingCapacityPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade" sections={sections}>
      <TitleSlide active={false} />
      <InfrastructureReality active={false} />
      <SelectionChallenge active={false} />
      <MythChatModel active={false} />
      <ReasoningParameter active={false} />
      <CodexBeyondCode active={false} />
      <MigrationGotchas active={false} />
      <FoundryLandscape active={false} />
    </DeckPlayer>
  )
}
