import { render, screen } from '@test-utils';
import MotionToggle from './motion-toggle';

describe('MotionToggle', () => {
  it('renders a checked toggle (deactivate animations choice)', () => {
    render(<MotionToggle value={true} />);
    expect(
      screen.getByRole('checkbox', {
        name: `Animations: On Off`,
      })
    ).toBeChecked();
  });
});
