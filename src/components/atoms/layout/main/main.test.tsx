import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Main } from './main';

describe('Main', () => {
  it('renders the contents of the main element', () => {
    const children = 'The main content.';

    render(<Main>{children}</Main>);

    expect(rtlScreen.getByRole('main')).toHaveTextContent(children);
  });
});
