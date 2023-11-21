import { describe, expect, it, jest } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import type { Ref } from 'react';
import { act, render, screen as rtlScreen } from '../../../../../tests/utils';
import { SearchForm, type SearchFormRef } from './search-form';

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

  it('can give focus to the search input', () => {
    const ref: Ref<SearchFormRef> = { current: null };

    render(<SearchForm ref={ref} />);

    act(() => {
      ref.current?.focus();
    });

    expect(rtlScreen.getByRole('searchbox')).toHaveFocus();
  });
});
