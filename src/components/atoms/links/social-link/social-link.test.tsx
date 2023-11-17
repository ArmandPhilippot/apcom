import { describe, expect, it, jest } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
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
  it('render a Github social link', () => {
    const label = 'sed ea impedit';
    const target = '/voluptas';

    render(<SocialLink icon="Github" label={label} url={target} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });

  it('render a Gitlab social link', () => {
    const label = 'rerum velit asperiores';
    const target = '/enim';

    render(<SocialLink icon="Gitlab" label={label} url={target} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });

  it('render a LinkedIn social link', () => {
    const label = 'in dolores sed';
    const target = '/ut';

    render(<SocialLink icon="LinkedIn" label={label} url={target} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });

  it('render a Twitter social link', () => {
    const label = 'voluptatibus temporibus expedita';
    const target = '/magni';

    render(<SocialLink icon="Twitter" label={label} url={target} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });
});
