import { render, screen } from '@test-utils';
import Settings from './settings';

describe('Settings', () => {
  it('renders a button to open settings modal', () => {
    render(<Settings isActive={false} setIsActive={() => null} />);
    expect(
      screen.getByRole('checkbox', { name: 'Open settings' })
    ).toBeInTheDocument();
  });

  it('renders a button to close settings modal', () => {
    render(<Settings isActive={true} setIsActive={() => null} />);
    expect(
      screen.getByRole('checkbox', { name: 'Close settings' })
    ).toBeInTheDocument();
  });
});
