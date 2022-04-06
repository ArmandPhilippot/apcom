import { render, screen } from '@test-utils';
import ThemeToggle from './theme-toggle';

describe('ThemeToggle', () => {
  it('renders a checked toggle (dark theme choice)', () => {
    render(<ThemeToggle value={true} />);
    expect(
      screen.getByRole('checkbox', {
        name: `Theme: Light theme Dark theme`,
      })
    ).toBeChecked();
  });
});
