import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Navbar, type NavbarItems } from './navbar';

const doNothing = () => {
  // do nothing;
};

const items: NavbarItems = [
  {
    icon: 'hamburger',
    id: 'main-nav',
    isActive: false,
    label: 'Nav',
    contents: 'Main nav contents',
    onToggle: doNothing,
  },
  {
    icon: 'magnifying-glass',
    id: 'search',
    isActive: false,
    label: 'Search',
    contents: 'Search contents',
    onToggle: doNothing,
  },
  {
    icon: 'cog',
    id: 'settings',
    isActive: false,
    label: 'Settings',
    contents: 'Settings contents',
    onToggle: doNothing,
  },
];

describe('Navbar', () => {
  it('renders the given items', () => {
    render(<Navbar items={items} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(items.length);
  });
});
