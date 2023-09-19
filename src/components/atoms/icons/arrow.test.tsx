import { render } from '../../../../tests/utils';
import Arrow from './arrow';

describe('Arrow', () => {
  it('renders an arrow icon oriented to the right', () => {
    const { container } = render(<Arrow direction="right" />);
    expect(container).toBeDefined();
  });
});
