import { render } from '@test-utils';
import Hamburger from './hamburger';

describe('Hamburger', () => {
  it('renders a Hamburger icon', () => {
    const { container } = render(<Hamburger isActive={false} />);
    expect(container).toBeDefined();
  });
});
