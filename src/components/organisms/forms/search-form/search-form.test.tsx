import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  it('renders a search input with a submit button', () => {
    render(<SearchForm />);

    expect(
      rtlScreen.getByRole('searchbox', { name: 'Search for:' })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('button', { name: 'Search' })
    ).toBeInTheDocument();
  });

  it('can submit the form', async () => {
    const onSubmit = jest.fn((_search: { query?: string }) => undefined);
    const user = userEvent.setup();
    const query = 'autem voluptatum eos';

    render(<SearchForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('searchbox', { name: 'Search for:' }),
      query
    );
    await user.click(rtlScreen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ query });
  });
});
