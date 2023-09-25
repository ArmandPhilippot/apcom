import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { Envelop, Home } from '../../atoms';
import { Nav, type NavItem } from './nav';

const navItems: NavItem[] = [
  { id: 'homeLink', href: '/', label: 'Home', logo: <Home /> },
  { id: 'contactLink', href: '/contact', label: 'Contact', logo: <Envelop /> },
];

describe('Nav', () => {
  it('renders a main navigation', () => {
    render(<Nav kind="main" items={navItems} />);
    expect(screen.getByRole('navigation')).toHaveClass('nav--main');
  });

  it('renders a footer navigation', () => {
    render(<Nav kind="footer" items={navItems} />);
    expect(screen.getByRole('navigation')).toHaveClass('nav--footer');
  });

  it('renders navigation links', () => {
    render(<Nav kind="main" items={navItems} />);
    expect(
      screen.getByRole('link', { name: navItems[0].label })
    ).toHaveAttribute('href', navItems[0].href);
  });
});
