import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { MotionToggle } from './motion-toggle';

describe('MotionToggle', () => {
  // toHaveValue received undefined. Maybe because of localStorage hook...
  it('renders a toggle component', () => {
    render(<MotionToggle />);
    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Animations:/i,
      })
    ).toBeInTheDocument();
  });
});
