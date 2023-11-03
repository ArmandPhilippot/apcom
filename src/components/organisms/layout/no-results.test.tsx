import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { NoResults } from './no-results';

describe('NoResults', () => {
  it('renders a text with a form', () => {
    render(<NoResults />);

    expect(rtlScreen.getByText(/No results/i)).toBeInTheDocument();
    expect(rtlScreen.getByRole('searchbox')).toBeInTheDocument();
  });
});
