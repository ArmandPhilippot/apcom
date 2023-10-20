import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SiteFooter, type SiteFooterProps } from './site-footer';

const copyright: SiteFooterProps['copyright'] = {
  from: '2017',
  owner: 'Lorem ipsum',
};

const navItems = [
  { id: 'legal-notice', href: '#', label: 'Legal notice' },
] satisfies SiteFooterProps['navItems'];

describe('SiteFooter', () => {
  it('renders the website copyright', () => {
    render(<SiteFooter copyright={copyright} topId="top" />);
    expect(
      rtlScreen.getByText(new RegExp(copyright.owner))
    ).toBeInTheDocument();
    expect(rtlScreen.getByText(new RegExp(copyright.from))).toBeInTheDocument();
  });

  it('renders a back to top link', () => {
    render(<SiteFooter copyright={copyright} topId="top" />);
    expect(
      rtlScreen.getByRole('link', { name: 'Back to top' })
    ).toBeInTheDocument();
  });

  it('renders some nav items', () => {
    render(
      <SiteFooter copyright={copyright} navItems={navItems} topId="top" />
    );
    expect(
      rtlScreen.getByRole('link', { name: navItems[0].label })
    ).toBeInTheDocument();
  });
});
