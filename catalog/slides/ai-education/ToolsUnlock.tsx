import { RadialTools, RadialItem } from '@catalog/templates';

interface ToolsUnlockProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  footer?: string;
  tools?: RadialItem[];
  active: boolean;
}

const defaultTools: RadialItem[] = [
  { icon: 'Send', label: 'Send Email', color: '#22d3ee', angle: -150 },
  { icon: 'Globe', label: 'Browse Web', color: '#a78bfa', angle: -90 },
  { icon: 'Code', label: 'Run Code', color: '#34d399', angle: -30 },
  { icon: 'Calendar', label: 'Schedule', color: '#fbbf24', angle: 30 },
  { icon: 'Database', label: 'Query Data', color: '#f472b6', angle: 90 },
  { icon: 'Server', label: 'Call APIs', color: '#60a5fa', angle: 150 },
];

export const ToolsUnlock = ({
  title = 'Give the model',
  titleHighlight = 'tools',
  subtitle = 'The next unlock after chatbots',
  footer = 'The model chooses the right tool at the right time',
  tools = defaultTools,
  active
}: ToolsUnlockProps) => {
  return (
    <RadialTools
      title={title}
      titleHighlight={titleHighlight}
      subtitle={subtitle}
      footer={footer}
      centerIcon="Brain"
      centerLabel="LLM"
      centerColor="#34d399"
      items={tools}
      active={active}
    />
  );
};
