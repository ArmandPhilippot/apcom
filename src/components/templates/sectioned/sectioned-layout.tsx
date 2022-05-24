import Section, {
  type SectionProps,
  type SectionVariant,
} from '@components/atoms/layout/section';
import Script from 'next/script';
import { FC } from 'react';
import { BreadcrumbList } from 'schema-dts';

export type Section = Pick<SectionProps, 'content' | 'title'>;

export type SectionedLayoutProps = {
  /**
   * The breadcrumb JSON schema.
   */
  breadcrumbSchema: BreadcrumbList['itemListElement'][];
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
const SectionedLayout: FC<SectionedLayoutProps> = ({
  breadcrumbSchema,
  sections,
}) => {
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

  return (
    <>
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {getSections(sections)}
    </>
  );
};

export default SectionedLayout;
