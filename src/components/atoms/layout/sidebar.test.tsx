import { render, screen } from '@test-utils';
import Sidebar from './sidebar';

const children = 'A widget';

describe('Sidebar', () => {
  it('renders an aside element', () => {
    render(<Sidebar>{children}</Sidebar>);
    expect(screen.getByRole('complementary')).toHaveTextContent(children);
  });
});
