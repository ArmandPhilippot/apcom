import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('renders the contents of a header', () => {
    const children = 'The header content.';

    render(<Header>{children}</Header>);

    expect(rtlScreen.getByRole('banner')).toHaveTextContent(children);
  });
});
