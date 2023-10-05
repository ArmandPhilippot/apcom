import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  it('renders a search input', () => {
    render(<SearchForm searchPage="#" />);
    expect(
      rtlScreen.getByRole('searchbox', { name: 'Search for:' })
    ).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<SearchForm searchPage="#" />);
    expect(
      rtlScreen.getByRole('button', { name: 'Search' })
    ).toBeInTheDocument();
  });
});
