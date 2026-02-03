import { AgentLoop, LoopStation, EquationPart } from '@catalog/templates';

interface AgentFormulaProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  footer?: string;
  equation?: EquationPart[];
  stations?: LoopStation[];
  active: boolean;
}

const defaultEquation: EquationPart[] = [
  { icon: 'Brain', label: 'LLM', color: '#a78bfa' },
  { icon: 'Wrench', label: 'Tools', color: '#22d3ee' },
  { icon: 'RefreshCw', label: 'Loop', color: '#34d399' },
];

const defaultStations: LoopStation[] = [
  { icon: 'Target', label: 'Think', color: '#22d3ee' },
  { icon: 'Wrench', label: 'Act', color: '#a78bfa' },
  { icon: 'Eye', label: 'Observe', color: '#34d399' },
  { icon: 'RefreshCw', label: 'Reflect', color: '#fbbf24' },
];

export const AgentFormula = ({
  title = 'The',
  titleHighlight = 'AI Agent',
  subtitle = 'The full system',
  footer = 'A loop that runs until the task is done',
  equation = defaultEquation,
  stations = defaultStations,
  active
}: AgentFormulaProps) => {
  return (
    <AgentLoop
      title={title}
      titleHighlight={titleHighlight}
      subtitle={subtitle}
      footer={footer}
      equation={equation}
      stations={stations}
      active={active}
    />
  );
};
