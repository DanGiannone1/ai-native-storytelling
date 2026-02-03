import { Barrier, BarrierItem } from '@catalog/templates';

interface CanVsCantProps {
  titleCan?: string;
  titleCant?: string;
  subtitle?: string;
  footer?: string;
  items?: BarrierItem[];
  active: boolean;
}

const defaultItems: BarrierItem[] = [
  { can: 'Write your email', cant: "Send it", iconCan: 'FileText', iconCant: 'Send' },
  { can: 'Write code', cant: "Execute it", iconCan: 'Code', iconCant: 'Server' },
  { can: 'Plan your meeting', cant: "Book it", iconCan: 'Calendar', iconCant: 'Clock' },
];

export const CanVsCant = ({
  titleCan = 'Great at creating',
  titleCant = "can't execute",
  subtitle = 'LLMs are great generators',
  footer = 'A brilliant advisor with no hands',
  items = defaultItems,
  active
}: CanVsCantProps) => {
  return (
    <Barrier
      title=""
      titleCan={titleCan}
      titleCant={titleCant}
      subtitle={subtitle}
      footer={footer}
      items={items}
      active={active}
    />
  );
};
