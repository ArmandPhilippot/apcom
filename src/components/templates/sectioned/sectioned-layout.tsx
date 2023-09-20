import Script from 'next/script';
import { FC } from 'react';
import { BreadcrumbList } from 'schema-dts';
import { Section, type SectionProps, type SectionVariant } from '../../atoms';

export type PageSection = Pick<SectionProps, 'content' | 'title'>;

export type SectionedLayoutProps = {
  /**
   * The breadcrumb JSON schema.
   */
  breadcrumbSchema: BreadcrumbList['itemListElement'][];
  /**
   * An array of objects describing each section.
   */
  sections: PageSection[];
};

/**
 * SectionedLayout component
 *
 * Render a sectioned layout.
 */
export const SectionedLayout: FC<SectionedLayoutProps> = ({
  breadcrumbSchema,
  sections,
}) => {
  const getSections = (items: SectionProps[]) => {
    return items.map((section, index) => {
      const variant: SectionVariant = index % 2 ? 'light' : 'dark';
      const isLastSection = index === items.length - 1;

      return (
        <Section
          content={section.content}
          key={`section-${index}`}
          title={section.title}
          variant={variant}
          withBorder={!isLastSection}
        />
      );
    });
  };

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      {getSections(sections)}
    </>
  );
};
