import { render, screen } from '@test-utils';
import Search from './search';

describe('Search', () => {
  it('renders a button to open search modal', () => {
    render(<Search isActive={false} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Open search');
  });

  it('renders a button to close search modal', () => {
    render(<Search isActive={true} setIsActive={() => null} />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Close search');
  });

  it('renders a search form', () => {
    render(<Search isActive={true} setIsActive={() => null} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
