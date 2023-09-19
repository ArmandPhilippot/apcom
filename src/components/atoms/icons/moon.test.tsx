import { render } from '../../../../tests/utils';
import Moon from './moon';

describe('Moon', () => {
  it('renders a moon icon', () => {
    const { container } = render(<Moon />);
    expect(container).toBeDefined();
  });
});
