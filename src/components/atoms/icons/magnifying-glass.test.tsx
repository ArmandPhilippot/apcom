import { render } from '@test-utils';
import MagnifyingGlass from './magnifying-glass';

describe('MagnifyingGlass', () => {
  it('renders a magnifying glass icon', () => {
    const { container } = render(<MagnifyingGlass />);
    expect(container).toBeDefined();
  });
});
