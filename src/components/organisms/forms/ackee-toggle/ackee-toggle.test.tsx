import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { AckeeToggle } from './ackee-toggle';

describe('AckeeToggle', () => {
  // toHaveValue received undefined. Maybe because of localStorage hook...
  it('renders a toggle component', () => {
    render(<AckeeToggle />);
    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Tracking:/i,
      })
    ).toBeInTheDocument();
  });
});
