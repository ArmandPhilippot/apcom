import Section, {
  type SectionProps,
  type SectionVariant,
} from '@components/atoms/layout/section';
import { FC } from 'react';
import Layout from '../layout/layout';

export type Section = Pick<SectionProps, 'content' | 'title'>;

export type SectionedLayoutProps = {
  /**
   * An array of objects describing each section.
   */
  sections: Section[];
};

/**
 * SectionedLayout component
 *
 * Render a sectioned layout.
 */
const SectionedLayout: FC<SectionedLayoutProps> = ({ sections }) => {
  const getSections = (items: SectionProps[]) => {
    return items.map((section, index) => {
      const variant: SectionVariant = index % 2 ? 'light' : 'dark';
      const isLastSection = index === items.length - 1;

      return (
        <Section
          key={`section-${index}`}
          title={section.title}
          content={section.content}
          variant={variant}
          withBorder={!isLastSection}
        />
      );
    });
  };

  return <Layout>{getSections(sections)}</Layout>;
};

export default SectionedLayout;
