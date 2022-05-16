import { render, screen } from '@test-utils';
import { BreadcrumbList } from 'schema-dts';
import Layout from './layout';

const body =
  'Sit dolorem eveniet. Sit sit odio nemo vitae corrupti modi sint est rerum. Pariatur quidem maiores distinctio. Quia et illum aspernatur est cum.';
const breadcrumbSchema: BreadcrumbList['itemListElement'][] = [];

describe('Layout', () => {
  it('renders the website header', () => {
    render(<Layout breadcrumbSchema={breadcrumbSchema}>{body}</Layout>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the website main content', () => {
    render(<Layout breadcrumbSchema={breadcrumbSchema}>{body}</Layout>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the website footer', () => {
    render(<Layout breadcrumbSchema={breadcrumbSchema}>{body}</Layout>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a skip to content link', () => {
    render(<Layout breadcrumbSchema={breadcrumbSchema}>{body}</Layout>);
    expect(
      screen.getByRole('link', { name: 'Skip to content' })
    ).toBeInTheDocument();
  });

  it('renders an article', () => {
    render(<Layout breadcrumbSchema={breadcrumbSchema}>{body}</Layout>);
    expect(screen.getByRole('article')).toHaveTextContent(body);
  });
});
