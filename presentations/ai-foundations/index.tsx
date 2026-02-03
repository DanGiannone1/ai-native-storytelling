import { DeckPlayer } from '@shared/runtime/DeckPlayer'
import {
  TitleSlide,
  AIHistorySlide,
  ConversationalAISlide,
  WhatIsLLMSlide,
  TextFlowSlide,
  MultimodalSlide,
  LimitationSlide,
  ToolsSlide,
  AIAgentSlide,
  AgentsInActionSlide,
  MultiAgentSlide,
  AgentsDispatchingSlide,
  AgentsCreatingAgentsSlide,
  AgentsInProductionSlide,
  NeverSleepSlide,
  OvernightMagicSlide,
  RecursiveImprovementSlide,
  CommandCenterSlide,
  AutonomousBusinessSlide,
  OrbitalNodeSystemHeroSlide,
} from './slides'

export const metadata = {
  title: 'AI in 2026: From Chatbots to Autonomous Agents',
  description: 'A journey through the AI landscape - from LLM fundamentals to autonomous agent systems',
}

export default function AIFoundationsPresentation() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <TitleSlide active={false} />
      <AIHistorySlide active={false} />
      <ConversationalAISlide active={false} />
      <WhatIsLLMSlide active={false} />
      <TextFlowSlide active={false} />
      <MultimodalSlide active={false} />
      <LimitationSlide active={false} />
      <ToolsSlide active={false} />
      <AIAgentSlide active={false} />
      <AgentsInActionSlide active={false} />
      <MultiAgentSlide active={false} />
      <AgentsDispatchingSlide active={false} />
      <AgentsCreatingAgentsSlide active={false} />
      <AgentsInProductionSlide active={false} />
      <NeverSleepSlide active={false} />
      <OvernightMagicSlide active={false} />
      <RecursiveImprovementSlide active={false} />
      <CommandCenterSlide active={false} />
      <AutonomousBusinessSlide active={false} />
      {/* Appendix - Agentic Loop Hero */}
      <OrbitalNodeSystemHeroSlide active={false} />
    </DeckPlayer>
  )
}
