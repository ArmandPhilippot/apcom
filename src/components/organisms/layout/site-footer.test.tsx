import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { SiteFooter, type SiteFooterProps } from './site-footer';

const copyright: SiteFooterProps['copyright'] = {
  dates: { start: '2017', end: '2022' },
  owner: 'Lorem ipsum',
  icon: 'CC',
};

const navItems: SiteFooterProps['navItems'] = [
  { id: 'legal-notice', href: '#', label: 'Legal notice' },
];

describe('SiteFooter', () => {
  it('renders the website copyright', () => {
    render(<SiteFooter copyright={copyright} topId="top" />);
    expect(rtlScreen.getByText(copyright.owner)).toBeInTheDocument();
    expect(rtlScreen.getByText(copyright.dates.start)).toBeInTheDocument();
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
