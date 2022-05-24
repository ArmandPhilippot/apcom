import { render, screen } from '@test-utils';
import PrismThemeToggle from './prism-theme-toggle';

describe('PrismThemeToggle', () => {
  it('renders a toggle component', () => {
    render(<PrismThemeToggle />);
    expect(
      screen.getByRole('checkbox', {
        name: `Code blocks: Light theme Dark theme`,
      })
    ).toBeInTheDocument();
  });
});
