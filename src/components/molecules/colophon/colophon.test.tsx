import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Colophon, type ColophonLink } from './colophon';

describe('Colophon', () => {
  it('renders a copyright', () => {
    const copyright = 'ea aliquam porro';

    render(<Colophon copyright={copyright} />);

    expect(rtlScreen.getByRole('listitem')).toHaveTextContent(copyright);
  });

  it('can render a license', () => {
    const copyright = 'ea aliquam porro';
    const license = 'ea facere non';

    render(<Colophon copyright={copyright} license={license} />);

    const items = rtlScreen.getAllByRole('listitem');

    expect(items[items.length - 1]).toHaveTextContent(license);
  });

  it('can render some links', () => {
    const copyright = 'ea aliquam porro';
    const links: ColophonLink[] = [
      { href: '#blanditiis', id: 'perferendis', label: 'quis' },
      { href: '#mollitia', id: 'sint', label: 'ducimus' },
    ];

    render(<Colophon copyright={copyright} links={links} />);

    // The links + the copyright
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(links.length + 1);
  });
});
