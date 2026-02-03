import { CircularClock, ClockActivity } from '@catalog/templates';

interface AlwaysOnProps {
  title?: string;
  titleHighlight?: string;
  footer?: string;
  activities?: ClockActivity[];
  centerValue?: string;
  centerLabel?: string;
  centerSublabel?: string;
  active: boolean;
}

const defaultActivities: ClockActivity[] = [
  { hour: 2, label: 'Data sync', color: '#a78bfa' },
  { hour: 4, label: 'Report gen', color: '#8b5cf6' },
  { hour: 6, label: 'Daily briefing', color: '#f59e0b' },
  { hour: 9, label: 'Real-time alerts', color: '#fbbf24' },
  { hour: 12, label: 'Client support', color: '#34d399' },
  { hour: 15, label: 'Monitoring', color: '#22d3ee' },
  { hour: 18, label: 'End-of-day', color: '#60a5fa' },
  { hour: 21, label: 'Overnight prep', color: '#a78bfa' },
];

export const AlwaysOn = ({
  title = 'Agents',
  titleHighlight = 'run 24/7',
  footer = 'We sleep. They work.',
  activities = defaultActivities,
  centerValue = '47',
  centerLabel = 'tasks completed',
  centerSublabel = 'in the last hour',
  active
}: AlwaysOnProps) => {
  return (
    <CircularClock
      title={title}
      titleHighlight={titleHighlight}
      footer={footer}
      activities={activities}
      centerValue={centerValue}
      centerLabel={centerLabel}
      centerSublabel={centerSublabel}
      active={active}
    />
  );
};
