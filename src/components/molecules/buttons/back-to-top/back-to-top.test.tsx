import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  it('renders a BackToTop link', () => {
    const anchor = '#top';
    const label = 'eveniet';

    render(<BackToTop anchor={anchor} label={label} />);

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveAccessibleName(label);
    expect(link).toHaveAttribute('href', anchor);
  });
});
