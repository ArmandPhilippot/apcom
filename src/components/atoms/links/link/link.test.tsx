import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Link } from './link';

describe('Link', () => {
  it('renders a link', () => {
    const anchor = 'porro';
    const target = '/tempora';

    render(<Link href={target}>{anchor}</Link>);

    expect(rtlScreen.getByRole('link', { name: anchor })).toHaveAttribute(
      'href',
      target
    );
  });

  it('can render an external link', () => {
    const anchor = 'accusamus';
    const target = 'https://www.example.com';

    render(
      <Link href={target} isExternal>
        {anchor}
      </Link>
    );

    expect(rtlScreen.getByRole('link', { name: anchor })).toHaveClass(
      'link--external'
    );
  });

  it('can render a download link', () => {
    const anchor = 'dolor';
    const target = '/officiis.pdf';

    render(
      <Link href={target} isDownload>
        {anchor}
      </Link>
    );

    expect(rtlScreen.getByRole('link', { name: anchor })).toHaveClass(
      'link--download'
    );
  });
});
