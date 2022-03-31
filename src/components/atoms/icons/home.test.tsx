import { render } from '@test-utils';
import Home from './home';

describe('Home', () => {
  it('renders a home icon', () => {
    const { container } = render(<Home />);
    expect(container).toBeDefined();
  });
});
