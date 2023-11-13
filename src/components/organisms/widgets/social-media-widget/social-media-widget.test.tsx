import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Heading } from '../../../atoms';
import { type SocialMediaData, SocialMediaWidget } from './social-media-widget';

describe('SocialMediaWidget', () => {
  it('render the widget heading and a list of social media', () => {
    const heading = 'aut dolorem molestiae';
    const headingLvl = 3;
    const media = [
      { icon: 'Github', id: 'github', label: 'Github', url: '#github' },
      { icon: 'LinkedIn', id: 'linkedin', label: 'LinkedIn', url: '#linkedin' },
    ] satisfies SocialMediaData[];

    render(
      <SocialMediaWidget
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        media={media}
      />
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getAllByRole('link')).toHaveLength(media.length);
  });
});
