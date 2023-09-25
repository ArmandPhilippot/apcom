import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { SocialMedia, Media } from './social-media';

const media: Media[] = [
  { name: 'Github', url: '#' },
  { name: 'LinkedIn', url: '#' },
];
const title = 'Dolores ut ut';
const titleLevel = 2;

/**
 * Next.js mock images with next/image component. So for now, I need to mock
 * the svg files manually.
 */
jest.mock('@assets/images/social-media/github.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/gitlab.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/linkedin.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/twitter.svg', () => 'svg-file');

describe('SocialMedia', () => {
  it('renders the widget title', () => {
    render(<SocialMedia media={media} title={title} level={titleLevel} />);
    expect(
      screen.getByRole('heading', {
        level: titleLevel,
        name: new RegExp(title, 'i'),
      })
    ).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    render(<SocialMedia media={media} title={title} level={titleLevel} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(media.length);
  });
});
