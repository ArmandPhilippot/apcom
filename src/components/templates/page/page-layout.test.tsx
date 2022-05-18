import { render, screen } from '@test-utils';
import { BreadcrumbList } from 'schema-dts';
import PageLayout from './page-layout';

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
      screen.getByRole('heading', { level: 1, name: title })
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
    expect(screen.getByText(children)).toBeInTheDocument();
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
      screen.getByRole('navigation', { name: 'Breadcrumb' })
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
    expect(
      screen.getByRole('heading', { level: 2, name: /Table of Contents/i })
    ).toBeInTheDocument();
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
      screen.getByRole('form', { name: /Leave a comment/i })
    ).toBeInTheDocument();
  });

  it('renders the comments list', () => {
    const comments = [
      {
        author: {
          avatar: 'http://placeimg.com/640/480',
          name: 'Author 1',
        },
        content:
          'Voluptas ducimus inventore. Libero ut et doloribus. Earum nostrum ab. Aliquam rem dolores omnis voluptate. Sunt aut ut et.',
        id: 1,
        publication: '2021-04-03 18:04:11',
        // @ts-ignore - Needed because of the placeholder image.
        unoptimized: true,
      },
    ];
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
      screen.getByRole('heading', { level: 2, name: /Comments/i })
    ).toBeInTheDocument();
  });
});
