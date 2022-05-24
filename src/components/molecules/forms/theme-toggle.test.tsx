import { render, screen } from '@test-utils';
import ThemeToggle from './theme-toggle';

describe('ThemeToggle', () => {
  it('renders a toggle component', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('checkbox', {
        name: `Theme: Light theme Dark theme`,
      })
    ).toBeInTheDocument();
  });
});
