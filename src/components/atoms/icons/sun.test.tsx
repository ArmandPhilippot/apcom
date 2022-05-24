import { render } from '@test-utils';
import Sun from './sun';

describe('Sun', () => {
  it('renders a sun icon', () => {
    const { container } = render(<Sun />);
    expect(container).toBeDefined();
  });
});
