import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Aside } from './aside';

describe('Aside', () => {
  it('renders the contents of an aside', () => {
    const children = 'The aside content.';

    render(<Aside>{children}</Aside>);

    expect(rtlScreen.getByRole('complementary')).toHaveTextContent(children);
  });
});
