import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Settings } from './settings';

const doNothing = () => {
  // do nothing
};

describe('Settings', () => {
  it('renders a button to open settings modal', () => {
    render(<Settings isActive={false} setIsActive={doNothing} />);
    expect(
      rtlScreen.getByRole('checkbox', { name: 'Open settings' })
    ).toBeInTheDocument();
  });

  it('renders a button to close settings modal', () => {
    render(<Settings isActive={true} setIsActive={doNothing} />);
    expect(
      rtlScreen.getByRole('checkbox', { name: 'Close settings' })
    ).toBeInTheDocument();
  });
});
