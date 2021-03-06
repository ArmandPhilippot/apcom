import { render, screen } from '@tests/utils';
import Sharing, { type SharingData } from './sharing';

const postData: SharingData = {
  excerpt: 'A post excerpt',
  title: 'A post title',
  url: 'https://sharing-website.test',
};

describe('Sharing', () => {
  it('renders a sharing widget', () => {
    render(<Sharing data={postData} media={['facebook', 'twitter']} />);
    expect(
      screen.getByRole('link', { name: 'Share on facebook' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Share on twitter' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Share on linkedin' })
    ).not.toBeInTheDocument();
  });
});
