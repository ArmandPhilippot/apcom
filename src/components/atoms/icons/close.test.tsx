import { render } from '../../../../tests/utils';
import { Close } from './close';

describe('Close', () => {
  it('renders a Close icon', () => {
    const { container } = render(<Close />);
    expect(container).toBeDefined();
  });
});
