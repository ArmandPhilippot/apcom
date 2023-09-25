import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { Settings } from './settings';

describe('Settings', () => {
  it('renders a button to open settings modal', () => {
    render(
      <Settings
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduced-motion"
        isActive={false}
        setIsActive={() => null}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: 'Open settings' })
    ).toBeInTheDocument();
  });

  it('renders a button to close settings modal', () => {
    render(
      <Settings
        ackeeStorageKey="ackee-tracking"
        motionStorageKey="reduced-motion"
        isActive={true}
        setIsActive={() => null}
      />
    );
    expect(
      screen.getByRole('checkbox', { name: 'Close settings' })
    ).toBeInTheDocument();
  });
});
