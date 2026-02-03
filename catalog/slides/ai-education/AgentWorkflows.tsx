import { TaskCards, TaskCard } from '@catalog/templates';

interface AgentWorkflowsProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  footer?: string;
  workflows?: TaskCard[];
  active: boolean;
}

const defaultWorkflows: TaskCard[] = [
  {
    title: 'Process expense reports',
    icon: 'Inbox',
    steps: ['Scan receipts', 'Extract amounts', 'Categorize expenses', 'Submit for approval'],
    color: '#22d3ee'
  },
  {
    title: 'Fix a bug in code',
    icon: 'Activity',
    steps: ['Read logs', 'Find root cause', 'Write fix', 'Run tests', 'Commit'],
    color: '#a78bfa'
  },
  {
    title: 'Monitor system health',
    icon: 'BarChart',
    steps: ['Check metrics', 'Detect anomalies', 'Alert on issues', 'Generate report'],
    color: '#34d399'
  },
];

export const AgentWorkflows = ({
  title = 'Agents in',
  titleHighlight = 'Action',
  subtitle = 'Work, end to end',
  footer = 'Multi-step work - planned and executed end to end',
  workflows = defaultWorkflows,
  active
}: AgentWorkflowsProps) => {
  return (
    <TaskCards
      title={title}
      titleHighlight={titleHighlight}
      subtitle={subtitle}
      footer={footer}
      cards={workflows}
      active={active}
    />
  );
};
