import { render } from '@test-utils';
import Arrow from './arrow';

describe('Arrow', () => {
  it('renders an arrow icon', () => {
    const { container } = render(<Arrow />);
    expect(container).toBeDefined();
  });
});
