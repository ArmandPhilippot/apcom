import { render } from '@test-utils';
import Feed from './feed';

describe('Feed', () => {
  it('renders a feed icon', () => {
    const { container } = render(<Feed />);
    expect(container).toBeDefined();
  });
});
