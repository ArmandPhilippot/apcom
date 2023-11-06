import { describe, expect, it } from '@jest/globals';
import NextImage from 'next/image';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { PostPreview } from './post-preview';
import type { PostPreviewMetaData } from './post-preview-meta';

describe('PostPreview', () => {
  it('renders an excerpt with a heading and a link', () => {
    const excerpt = 'At necessitatibus id soluta adipisci quibusdam.';
    const heading = 'impedit et ea';
    const url = '#quia';

    render(<PostPreview excerpt={excerpt} heading={heading} url={url} />);

    expect(rtlScreen.getByRole('heading')).toHaveTextContent(heading);
    expect(rtlScreen.getByRole('link', { name: heading })).toHaveAttribute(
      'href',
      url
    );
    expect(rtlScreen.getByText(excerpt)).toBeInTheDocument();
  });

  it('can render a cover', () => {
    const excerpt = 'At necessitatibus id soluta adipisci quibusdam.';
    const heading = 'impedit et ea';
    const url = '#quia';
    const altTxt = 'alias consequatur quod';

    render(
      <PostPreview
        cover={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
        excerpt={excerpt}
        heading={heading}
        url={url}
      />
    );

    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(altTxt);
  });

  it('can render some meta', () => {
    const excerpt = 'At necessitatibus id soluta adipisci quibusdam.';
    const heading = 'impedit et ea';
    const url = '#quia';
    const meta = {
      author: 'Noah_Gleason48',
      publicationDate: '2023',
      wordsCount: 250,
    } satisfies PostPreviewMetaData;

    render(
      <PostPreview excerpt={excerpt} heading={heading} meta={meta} url={url} />
    );

    expect(rtlScreen.getAllByRole('term')).toHaveLength(
      Object.keys(meta).length
    );
  });
});
