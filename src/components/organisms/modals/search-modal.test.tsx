import { render, screen } from '@tests/utils';
import SearchModal from './search-modal';

describe('SearchModal', () => {
  it('renders a search modal', () => {
    render(<SearchModal searchPage="#" />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
