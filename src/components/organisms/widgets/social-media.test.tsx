import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SocialMedia, type Media } from './social-media';
import { Heading } from 'src/components/atoms';

const media: Media[] = [
  { icon: 'Github', id: 'github', label: 'Github', url: '#' },
  { icon: 'LinkedIn', id: 'gitlab', label: 'Gitlab', url: '#' },
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
    render(
      <SocialMedia
        heading={<Heading level={titleLevel}>{title}</Heading>}
        media={media}
      />
    );
    expect(
      rtlScreen.getByRole('heading', {
        level: titleLevel,
        name: new RegExp(title, 'i'),
      })
    ).toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    render(
      <SocialMedia
        heading={<Heading level={titleLevel}>{title}</Heading>}
        media={media}
      />
    );
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(media.length);
  });
});
