import { render, screen } from '@test-utils';
import SearchModal from './search-modal';

describe('SearchModal', () => {
  it('renders a search modal', () => {
    render(<SearchModal />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
