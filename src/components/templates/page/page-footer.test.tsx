import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { PageLink } from '../../../types';
import { PageFooter } from './page-footer';

describe('PageFooter', () => {
  it('renders a list of links', () => {
    const links = [
      { id: 1, name: 'Topic 1', url: '/topic1' },
      { id: 2, name: 'Topic 2', url: '/topic2' },
      { id: 3, name: 'Topic 3', url: '/topic3' },
    ] satisfies PageLink[];

    render(<PageFooter readMoreAbout={links} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent(
      'Read more posts about:'
    );
    expect(rtlScreen.getAllByRole('link')).toHaveLength(links.length);
  });

  it('can renders a list of links with logo', () => {
    const links = [
      {
        id: 1,
        logo: {
          alt: 'a logo',
          height: 480,
          width: 640,
          src: 'https://picsum.photos/640/480',
        },
        name: 'Topic 1',
        url: '/topic1',
      },
      { id: 2, name: 'Topic 2', url: '/topic2' },
      { id: 3, name: 'Topic 3', url: '/topic3' },
    ] satisfies PageLink[];

    render(<PageFooter readMoreAbout={links} />);

    expect(rtlScreen.getByRole('term')).toHaveTextContent(
      'Read more posts about:'
    );
    expect(rtlScreen.getAllByRole('link')).toHaveLength(links.length);
    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(links[0].logo?.alt);
  });

  it('does not render a list when the prop length is 0', () => {
    const { container } = render(<PageFooter readMoreAbout={[]} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
