import { DeckPlayer, SlideSection } from '@shared/runtime'
import {
  TitleSlide,
  InfrastructureReality,
  SelectionChallenge,
  Part1ModelSelection,
  MythChatModel,
  CodexBeyondCode,
  ReasoningParameter,
  MigrationGotchas,
  FoundryLandscape,
  Part2Capacity,
  PTUMathProblem,
  PromptCaching,
  RPMTrap,
  BatchMode,
  AgenticEstimationProblem,
  AgenticEstimationApproach,
  RegionalVsGlobal,
  PriorityProcessing,
  ClosingSlide,
} from './slides'

export const metadata = {
  title: 'Navigating Capacity Challenges & Model Selection',
  description: 'A guide to choosing the right AI models and managing capacity constraints in a resource-scarce environment',
}

const sections: SlideSection[] = [
  { title: 'Intro', startIndex: 0 },
  { title: 'Context', startIndex: 1 },
  { title: 'Model Selection', startIndex: 3 },
  { title: 'Capacity', startIndex: 9 },
]

export default function NavigatingCapacityPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade" sections={sections}>
      <TitleSlide active={false} />
      <InfrastructureReality active={false} />
      <SelectionChallenge active={false} />
      <Part1ModelSelection active={false} />
      <MythChatModel active={false} />
      <CodexBeyondCode active={false} />
      <ReasoningParameter active={false} />
      <MigrationGotchas active={false} />
      <FoundryLandscape active={false} />
      <Part2Capacity active={false} />
      <PTUMathProblem active={false} />
      <PromptCaching active={false} />
      <RPMTrap active={false} />
      <BatchMode active={false} />
      <AgenticEstimationProblem active={false} />
      <AgenticEstimationApproach active={false} />
      <RegionalVsGlobal active={false} />
      <PriorityProcessing active={false} />
      <ClosingSlide active={false} />
    </DeckPlayer>
  )
}
