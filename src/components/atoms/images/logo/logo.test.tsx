import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders a logo with a title', () => {
    const heading = 'enim quaerat veritatis';

    render(<Logo heading={heading} />);

    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(heading);
  });
});
