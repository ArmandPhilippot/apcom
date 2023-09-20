import { render } from '../../../../tests/utils';
import { ComputerScreen } from './computer-screen';

describe('ComputerScreen', () => {
  it('renders a computer screen icon', () => {
    const { container } = render(<ComputerScreen />);
    expect(container).toBeDefined();
  });
});
