import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Sidebar } from './sidebar';

const children = 'A widget';

describe('Sidebar', () => {
  it('renders an aside element', () => {
    render(<Sidebar>{children}</Sidebar>);
    expect(rtlScreen.getByRole('complementary')).toHaveTextContent(children);
  });
});
