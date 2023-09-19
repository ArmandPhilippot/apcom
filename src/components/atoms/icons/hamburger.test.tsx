import { render } from '../../../../tests/utils';
import Hamburger from './hamburger';

describe('Hamburger', () => {
  it('renders a Hamburger icon', () => {
    const { container } = render(<Hamburger />);
    expect(container).toBeDefined();
  });
});
