import { describe, expect, it } from '@jest/globals';
import type { BreadcrumbList } from 'schema-dts';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { comments } from '../../organisms/layout/comments-list.fixture';
import { PageLayout } from './page-layout';

const title = 'Incidunt ad earum';
const breadcrumb = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'page', url: '#', name: title },
];
const breadcrumbSchema: BreadcrumbList['itemListElement'][] = [];
const children =
  'Reprehenderit aut quis aperiam magnam quia id. Vero enim animi placeat quia. Laborum sit odio minima. Dolores et debitis eaque iste quidem. Omnis aliquam illum porro ea non. Quaerat totam iste quos ex facilis officia accusantium.';

describe('PageLayout', () => {
  it('renders the page title', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
      >
        {children}
      </PageLayout>
    );
    expect(
      rtlScreen.getByRole('heading', { level: 1, name: title })
    ).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
      >
        {children}
      </PageLayout>
    );
    expect(rtlScreen.getByText(children)).toBeInTheDocument();
  });

  it('renders the breadcrumb', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
      >
        {children}
      </PageLayout>
    );
    expect(
      rtlScreen.getByRole('navigation', { name: 'Breadcrumb' })
    ).toBeInTheDocument();
  });

  it('renders the table of contents', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
        withToC={true}
      >
        {children}
      </PageLayout>
    );
    expect(rtlScreen.getByText(/Table of Contents/i)).toBeInTheDocument();
  });

  it('renders the comment form', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
        allowComments={true}
      >
        {children}
      </PageLayout>
    );
    expect(
      rtlScreen.getByRole('form', { name: /Comment form/i })
    ).toBeInTheDocument();
  });

  it('renders the comments list', () => {
    render(
      <PageLayout
        breadcrumb={breadcrumb}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
        allowComments={true}
        comments={comments}
      >
        {children}
      </PageLayout>
    );
    expect(
      rtlScreen.getByRole('heading', { level: 2, name: /Comments/i })
    ).toBeInTheDocument();
  });
});
