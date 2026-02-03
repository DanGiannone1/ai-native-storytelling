import { TeamRoster, TeamMember } from '@catalog/templates';

interface OurAgentsProps {
  title?: string;
  titleHighlight?: string;
  kicker?: string;
  footer?: string;
  agents?: TeamMember[];
  active: boolean;
}

const defaultAgents: TeamMember[] = [
  { name: 'CRM', icon: 'Users', tagline: 'Client intelligence', color: '#22d3ee' },
  { name: 'Product', icon: 'Code', tagline: 'Development ops', color: '#a78bfa' },
  { name: 'SRE', icon: 'Server', tagline: 'System health', color: '#60a5fa' },
  { name: 'Finance', icon: 'DollarSign', tagline: 'Cost & compliance', color: '#34d399' },
  { name: 'Legal', icon: 'Scale', tagline: 'Risk & regulation', color: '#fbbf24' },
  { name: 'Research', icon: 'Search', tagline: 'AI news & research', color: '#f472b6' },
];

export const OurAgents = ({
  title = 'Agents in',
  titleHighlight = 'Production',
  kicker = 'Running in production today',
  footer = 'Live agents running real operations',
  agents = defaultAgents,
  active
}: OurAgentsProps) => {
  return (
    <TeamRoster
      title={title}
      titleHighlight={titleHighlight}
      kicker={kicker}
      footer={footer}
      members={agents}
      columns={3}
      active={active}
    />
  );
};
