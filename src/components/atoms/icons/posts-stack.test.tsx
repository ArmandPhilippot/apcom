import { render } from '@tests/utils';
import PostsStack from './posts-stack';

describe('PostsStack', () => {
  it('renders a posts stack icon', () => {
    const { container } = render(<PostsStack />);
    expect(container).toBeDefined();
  });
});
