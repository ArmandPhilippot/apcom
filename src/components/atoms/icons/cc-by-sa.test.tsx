import { render } from '@test-utils';
import CCBySA from './cc-by-sa';

describe('CCBySA', () => {
  it('renders a CC BY SA icon', () => {
    const { container } = render(<CCBySA />);
    expect(container).toBeDefined();
  });
});
