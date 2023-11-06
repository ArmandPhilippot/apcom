import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { getReadingTimeFrom } from '../../../../utils/helpers';
import { PostPreviewMeta, type PostPreviewMetaData } from './post-preview-meta';

describe('PostPreviewMeta', () => {
  it('can render a meta for the author', () => {
    const meta = {
      author: 'Gilberto70',
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Written by:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(meta.author);
  });

  it('can render a meta for a single comment', () => {
    const meta = {
      comments: {
        count: 1,
        postHeading: 'quae commodi deserunt',
      },
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Comments:');
    expect(rtlScreen.getByRole('definition').textContent).toBe(
      `${meta.comments.count} comment about ${meta.comments.postHeading}`
    );
  });

  it('can render a meta for comments with a link', () => {
    const meta = {
      comments: {
        count: 3,
        postHeading: 'quae commodi deserunt',
        url: '#temporibus',
      },
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Comments:');
    expect(rtlScreen.getByRole('definition').textContent).toBe(
      `${meta.comments.count} comments about ${meta.comments.postHeading}`
    );
    expect(rtlScreen.getByRole('link')).toHaveAttribute(
      'href',
      meta.comments.url
    );
  });

  it('can render a meta for the publication date', () => {
    const meta = {
      publicationDate: '2002',
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Published on:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      meta.publicationDate
    );
  });

  it('can render a meta for thematics', () => {
    const meta = {
      thematics: [{ id: 1, name: 'autem', url: '#est' }],
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Thematic:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      meta.thematics[0].name
    );
    expect(rtlScreen.getByRole('link')).toHaveAttribute(
      'href',
      meta.thematics[0].url
    );
  });

  it('can render a meta for topics', () => {
    const meta = {
      topics: [{ id: 1, name: 'hic', url: '#ipsa' }],
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Topic:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      meta.topics[0].name
    );
    expect(rtlScreen.getByRole('link')).toHaveAttribute(
      'href',
      meta.topics[0].url
    );
  });

  it('can render a meta for the update date', () => {
    const meta = {
      updateDate: '2020',
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Updated on:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      meta.updateDate
    );
  });

  it('does not render a meta for the update date if it is equal to the publication date', () => {
    const meta = {
      publicationDate: '2020',
      updateDate: '2020',
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    const terms = rtlScreen.getAllByRole('term');

    expect(terms.length).toBe(1);
    expect(terms[0].textContent).toBe('Published on:');
  });

  it('can render a meta for the reading time', () => {
    const meta = {
      wordsCount: 500,
    } satisfies PostPreviewMetaData;

    render(<PostPreviewMeta meta={meta} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent('Reading time:');
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(
      `${getReadingTimeFrom(meta.wordsCount).inMinutes()} minutes`
    );
  });
});
