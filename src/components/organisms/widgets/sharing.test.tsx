import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Sharing, type SharingData } from './sharing';

const postData: SharingData = {
  excerpt: 'A post excerpt',
  title: 'A post title',
  url: 'https://sharing-website.test',
};

describe('Sharing', () => {
  it('renders a sharing widget', () => {
    render(<Sharing data={postData} media={['facebook', 'twitter']} />);
    expect(
      rtlScreen.getByRole('link', { name: 'Share on Facebook' })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('link', { name: 'Share on Twitter' })
    ).toBeInTheDocument();
    expect(
      rtlScreen.queryByRole('link', { name: 'Share on LinkedIn' })
    ).not.toBeInTheDocument();
  });
});
