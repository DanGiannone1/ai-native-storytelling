import { TitleSlide } from '@catalog/templates';

interface TitleOpenerProps {
  title: string;
  subtitle?: string;
  active: boolean;
}

export const TitleOpener = ({
  title,
  subtitle,
  active
}: TitleOpenerProps) => {
  return (
    <TitleSlide
      title={title}
      subtitle={subtitle}
      active={active}
    />
  );
};
