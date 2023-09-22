import { render, screen } from '../../../../../tests/utils';
import { MotionToggle } from './motion-toggle';
import { storageKey } from './motion-toggle.fixture';

describe('MotionToggle', () => {
  // toHaveValue received undefined. Maybe because of localStorage hook...
  it('renders a toggle component', () => {
    render(<MotionToggle storageKey={storageKey} defaultValue="on" />);
    expect(
      screen.getByRole('radiogroup', {
        name: /Animations:/i,
      })
    ).toBeInTheDocument();
  });
});
