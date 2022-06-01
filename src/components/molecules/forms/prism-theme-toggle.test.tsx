import { render, screen } from '@tests/utils';
import PrismThemeToggle from './prism-theme-toggle';

describe('PrismThemeToggle', () => {
  it('renders a toggle component', () => {
    render(<PrismThemeToggle />);
    expect(
      screen.getByRole('radiogroup', {
        name: /Code blocks:/i,
      })
    ).toBeInTheDocument();
  });
});
