import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { SocialLink } from './social-link';

/**
 * Next.js mock images to use next/image component. So for now, I need to mock
 * the svg files manually.
 */
jest.mock('@assets/images/social-media/github.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/gitlab.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/linkedin.svg', () => 'svg-file');
jest.mock('@assets/images/social-media/twitter.svg', () => 'svg-file');

describe('SocialLink', () => {
  it('render a social link', () => {
    render(<SocialLink name="Github" url="#" />);
    expect(screen.getByRole('link')).toHaveAccessibleName('Github');
  });
});
