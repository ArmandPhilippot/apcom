import { render, screen } from '@test-utils';
import NoResults from './no-results';

describe('NoResults', () => {
  it('renders a no results text', () => {
    render(<NoResults searchPage="#" />);
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('renders a search form', () => {
    render(<NoResults searchPage="#" />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
