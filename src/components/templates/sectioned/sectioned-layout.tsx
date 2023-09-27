import Script from 'next/script';
import type { FC } from 'react';
import type { BreadcrumbList } from 'schema-dts';
import { Section, type SectionProps, type SectionVariant } from '../../atoms';

export type PageSection = Required<Pick<SectionProps, 'children' | 'id'>>;

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
  const getSections = (items: PageSection[]) =>
    items.map((section, index) => {
      const variant: SectionVariant = index % 2 ? 'light' : 'dark';
      const isLastSection = index === items.length - 1;

      return (
        <Section hasBorder={!isLastSection} key={section.id} variant={variant}>
          {section.children}
        </Section>
      );
    });

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed.
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      {getSections(sections)}
    </>
  );
};
