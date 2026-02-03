import { DeckPlayer } from '@shared/runtime/DeckPlayer'
import {
  TitleSlide,
  TheProblem,
  SolutionOverview,
  BigPictureFlow,
  FlowIngress,
  FlowExecution,
  MCPServer,
  Observability,
  Closing,
} from './slides'

export const metadata = {
  title: 'Agent Command Center',
  description: 'Orchestrating headless agent jobs with cloud scheduling, queuing, and observability',
}

export default function CommandCenterArchitecture() {
  return (
    <DeckPlayer title={metadata.title} transition="fade">
      <TitleSlide active={false} />
      <TheProblem active={false} />
      <SolutionOverview active={false} />
      <BigPictureFlow active={false} />
      <FlowIngress active={false} />
      <FlowExecution active={false} />
      <MCPServer active={false} />
      <Observability active={false} />
      <Closing active={false} />
    </DeckPlayer>
  )
}
