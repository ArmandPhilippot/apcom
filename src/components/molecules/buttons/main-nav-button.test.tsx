import { render, screen } from '@test-utils';
import MainNavButton from './main-nav-button';

describe('MainNavButton', () => {
  it('renders a checkbox', () => {
    render(<MainNavButton isActive={false} setIsActive={() => null} />);
    expect(
      screen.getByRole('checkbox', { name: 'Open menu' })
    ).toBeInTheDocument();
  });
});
