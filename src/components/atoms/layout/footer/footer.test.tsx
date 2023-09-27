import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders the contents of a footer', () => {
    const children = 'The footer content.';

    render(<Footer>{children}</Footer>);

    expect(rtlScreen.getByRole('contentinfo')).toHaveTextContent(children);
  });
});
