import { TimelineRiver, Milestone } from '@catalog/templates';

interface HistoryTimelineProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  milestones?: Milestone[];
  active: boolean;
}

const defaultMilestones: Milestone[] = [
  { year: '1950', label: 'Turing Test', icon: 'Brain' },
  { year: '1956', label: 'Dartmouth', icon: 'Cpu' },
  { year: '1997', label: 'Spam Filters', icon: 'Mail' },
  { year: '2006', label: 'Recommendations', icon: 'BarChart' },
  { year: '2011', label: 'Voice Assistants', icon: 'Mic' },
  { year: '2016', label: 'Smart Feeds', icon: 'Eye' },
  { year: '2022', label: 'Conversational AI', icon: 'Sparkles', highlight: true },
];

export const HistoryTimeline = ({
  title = 'AI long predates',
  titleHighlight = 'chatbots',
  subtitle = 'Quietly powering products - until it surfaced',
  milestones = defaultMilestones,
  active
}: HistoryTimelineProps) => {
  return (
    <TimelineRiver
      title={title}
      titleHighlight={titleHighlight}
      subtitle={subtitle}
      milestones={milestones}
      active={active}
    />
  );
};
