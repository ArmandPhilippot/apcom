import { render } from '@test-utils';
import Cog from './cog';

describe('Cog', () => {
  it('renders a Cog icon', () => {
    const { container } = render(<Cog />);
    expect(container).toBeDefined();
  });
});
