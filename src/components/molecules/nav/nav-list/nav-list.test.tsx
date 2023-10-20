import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { NavList } from './nav-list';

describe('NavList', () => {
  it('renders its children', () => {
    render(
      <NavList>
        <li>Nav item</li>
      </NavList>
    );

    expect(rtlScreen.getByRole('list')).toBeInTheDocument();
  });
});
