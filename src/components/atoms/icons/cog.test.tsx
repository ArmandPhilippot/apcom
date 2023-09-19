import { render } from '../../../../tests/utils';
import Cog from './cog';

describe('Cog', () => {
  it('renders a Cog icon', () => {
    const { container } = render(<Cog />);
    expect(container).toBeDefined();
  });
});
