import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
import { AckeeToggle } from './ackee-toggle';
import { storageKey } from './ackee-toggle.fixture';

describe('AckeeToggle', () => {
  // toHaveValue received undefined. Maybe because of localStorage hook...
  it('renders a toggle component', () => {
    render(<AckeeToggle storageKey={storageKey} defaultValue="full" />);
    expect(
      screen.getByRole('radiogroup', {
        name: /Tracking:/i,
      })
    ).toBeInTheDocument();
  });
});
