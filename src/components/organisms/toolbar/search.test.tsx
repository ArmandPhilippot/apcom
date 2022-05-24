import { render, screen } from '@test-utils';
import Search from './search';

describe('Search', () => {
  it('renders a button to open search modal', () => {
    render(<Search searchPage="#" isActive={false} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Open search');
  });

  it('renders a button to close search modal', () => {
    render(<Search searchPage="#" isActive={true} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Close search');
  });
});
