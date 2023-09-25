import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  it('renders a search input', () => {
    render(<SearchForm searchPage="#" />);
    expect(
      screen.getByRole('searchbox', { name: 'Search for:' })
    ).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<SearchForm searchPage="#" />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
