import { render, screen } from '@test-utils';
import SearchForm from './search-form';

describe('SearchForm', () => {
  it('renders a search input', () => {
    render(<SearchForm />);
    expect(
      screen.getByRole('searchbox', { name: 'Search for:' })
    ).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<SearchForm />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
