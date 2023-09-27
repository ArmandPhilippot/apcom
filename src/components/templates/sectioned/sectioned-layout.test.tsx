import { describe, expect, it } from '@jest/globals';
import type { BreadcrumbList } from 'schema-dts';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SectionedLayout } from './sectioned-layout';
import { sections } from './sectioned-layout.fixtures';

const breadcrumbSchema: BreadcrumbList['itemListElement'][] = [];

describe('SectionedLayout', () => {
  it('renders the correct number of section', () => {
    render(
      <SectionedLayout
        breadcrumbSchema={breadcrumbSchema}
        sections={sections}
      />
    );
    expect(
      rtlScreen.getAllByRole('heading', { name: /^Section/ })
    ).toHaveLength(sections.length);
  });
});
