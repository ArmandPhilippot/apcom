import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Envelop, Home } from '../../atoms';
import { NavList, type NavItem } from './nav-list';

const navItems: NavItem[] = [
  { id: 'homeLink', href: '/', label: 'Home', logo: <Home /> },
  { id: 'contactLink', href: '/contact', label: 'Contact', logo: <Envelop /> },
];

describe('Nav', () => {
  it('renders a main navigation', () => {
    render(<NavList kind="main" items={navItems} />);
    expect(rtlScreen.getByRole('navigation')).toHaveClass('nav--main');
  });

  it('renders a footer navigation', () => {
    render(<NavList kind="footer" items={navItems} />);
    expect(rtlScreen.getByRole('navigation')).toHaveClass('nav--footer');
  });

  it('renders navigation links', () => {
    render(<NavList kind="main" items={navItems} />);
    expect(
      rtlScreen.getByRole('link', { name: navItems[0].label })
    ).toHaveAttribute('href', navItems[0].href);
  });
});
