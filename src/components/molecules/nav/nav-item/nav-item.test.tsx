import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { NavLink } from '../nav-link';
import { NavItem } from './nav-item';

describe('NavItem', () => {
  it('renders its children', () => {
    const label = 'maxime';
    const target = '#sunt';

    render(
      <ul>
        <NavItem>
          <NavLink href={target} label={label} />
        </NavItem>
      </ul>
    );

    expect(rtlScreen.getByRole('listitem')).toHaveTextContent(label);
    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });
});
