import { Convergence, Badge } from '@catalog/templates';
import { IconName } from '@catalog/primitives';

interface BrandFinaleProps {
  title?: string;
  tagline?: string;
  centerIcon?: IconName;
  badges?: Badge[];
  active: boolean;
}

const defaultBadges: Badge[] = [
  { icon: 'Zap', label: 'AI-Native', color: '#22d3ee' },
  { icon: 'RefreshCw', label: 'Self-Improving', color: '#a78bfa' },
  { icon: 'Users', label: 'Multi-Agent', color: '#34d399' },
];

export const BrandFinale = ({
  title = 'AI-Native Business',
  tagline = 'Autonomous operations, delivered',
  centerIcon = 'Cpu',
  badges = defaultBadges,
  active
}: BrandFinaleProps) => {
  return (
    <Convergence
      title={title}
      tagline={tagline}
      centerIcon={centerIcon}
      badges={badges}
      active={active}
    />
  );
};
