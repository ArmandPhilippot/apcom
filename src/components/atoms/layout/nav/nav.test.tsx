import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Nav } from './nav';

describe('Nav', () => {
  it('renders the contents of a nav', () => {
    const children = 'The nav content.';

    render(<Nav>{children}</Nav>);

    expect(rtlScreen.getByRole('navigation')).toHaveTextContent(children);
  });
});
