import { FlowLanes, FlowAgent } from '@catalog/templates';

interface AgentDispatchProps {
  title?: string;
  titleHighlight?: string;
  kicker?: string;
  footer?: string;
  orchestratorLabel?: string;
  agents?: FlowAgent[];
  active: boolean;
}

const defaultAgents: FlowAgent[] = [
  { label: 'PO Agent', role: 'Defines scope', icon: 'Target', color: 'white' },
  { label: 'Lead Agent', role: 'Plans approach', icon: 'Network', color: 'violet' },
  { label: 'Builder Agent', role: 'Implements', icon: 'Code', color: 'cyan' },
  { label: 'QA Agent', role: 'Systems testing', icon: 'CheckCircle', color: 'emerald' },
  { label: 'Review Agent', role: 'UI / user journey', icon: 'Eye', color: 'amber' },
];

export const AgentDispatch = ({
  title = 'A full',
  titleHighlight = 'agent team',
  kicker = 'Agents coordinating agents',
  footer = 'Dispatch happens in parallel - specialists spin up on demand',
  orchestratorLabel = 'ORCHESTRATOR',
  agents = defaultAgents,
  active
}: AgentDispatchProps) => {
  return (
    <FlowLanes
      title={title}
      titleHighlight={titleHighlight}
      kicker={kicker}
      footer={footer}
      orchestratorLabel={orchestratorLabel}
      agents={agents}
      active={active}
    />
  );
};
