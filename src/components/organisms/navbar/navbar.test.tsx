import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Navbar } from './navbar';
import { NavbarItem } from './navbar-item';

describe('Navbar', () => {
  it('renders the given items', () => {
    render(
      <Navbar>
        <NavbarItem icon="hamburger" id="main-nav" label="Main nav">
          Main nav
        </NavbarItem>
        <NavbarItem icon="magnifying-glass" id="search" label="Search">
          Search form
        </NavbarItem>
      </Navbar>
    );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(2);
  });
});
