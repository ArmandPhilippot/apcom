import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { NavLink } from './nav-link';

describe('NavLink', () => {
  it('renders a link', () => {
    const label = 'eius';
    const target = '#harum';

    render(<NavLink href={target} label={label} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveAttribute(
      'href',
      target
    );
  });

  it('can render a nav link with stacked contents', () => {
    const label = 'eius';
    const target = '#harum';

    render(<NavLink href={target} isStack label={label} />);

    expect(rtlScreen.getByRole('link', { name: label })).toHaveClass(
      'link--stack'
    );
  });
});
