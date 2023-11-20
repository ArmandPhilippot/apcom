import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { PageHeader, type PageHeaderMetaData } from './page-header';

describe('PageHeader', () => {
  it('renders the page title', () => {
    const title = 'nostrum et impedit';

    render(<PageHeader heading={title} />);

    expect(rtlScreen.getByRole('heading', { level: 1 })).toHaveTextContent(
      title
    );
  });

  it('can render an introduction', () => {
    const title = 'nostrum et impedit';
    const intro =
      'Non reiciendis error eveniet deserunt vel quis debitis incidunt voluptas. Distinctio dolorem reiciendis molestias et velit. Aut distinctio autem dolore ratione neque laudantium sed. Asperiores quo qui omnis maiores.';

    render(<PageHeader heading={title} intro={intro} />);

    expect(rtlScreen.getByText(intro)).toBeInTheDocument();
  });

  it('can render a meta for the author', () => {
    const title = 'nostrum et impedit';
    const meta = {
      author: 'Edward_Hansen72',
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Written by:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(meta.author);
  });

  it('can render a meta for the publication date', () => {
    const title = 'nostrum et impedit';
    const meta = {
      publicationDate: '2023-11-19',
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Published on:');
  });

  it('can render a meta for the thematics', () => {
    const title = 'nostrum et impedit';
    const meta = {
      thematics: [
        { id: 1, name: 'Thematic 1', url: '#thematic1' },
        { id: 2, name: 'Thematic 2', url: '#thematic2' },
      ],
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Thematics:');
    expect(rtlScreen.getAllByRole('definition')).toHaveLength(
      meta.thematics.length
    );
  });

  it('can render a meta for the posts total', () => {
    const title = 'nostrum et impedit';
    const meta = {
      total: 40,
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Total:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      new RegExp(`${meta.total}`)
    );
  });

  it('can render a meta for the update date', () => {
    const title = 'nostrum et impedit';
    const meta = {
      updateDate: '2023-11-20',
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Updated on:');
  });

  it('can render a meta for the website', () => {
    const title = 'nostrum et impedit';
    const meta = {
      website: 'https://example.test',
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Website:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(meta.website);
  });

  it('can render a meta for the reading time', () => {
    const title = 'nostrum et impedit';
    const meta = {
      wordsCount: 640,
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
    expect(rtlScreen.getByRole('term')).toHaveTextContent('Reading time:');
  });

  it('does not render an undefined meta', () => {
    const title = 'nostrum et impedit';
    const meta = {
      author: undefined,
      publicationDate: '2023-11-20',
    } satisfies Partial<PageHeaderMetaData>;

    render(<PageHeader heading={title} meta={meta} />);

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      // Author is invalid
      Object.keys(meta).length - 1
    );
  });
});
