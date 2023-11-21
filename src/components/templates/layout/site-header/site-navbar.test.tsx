import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import {
  render,
  screen as rtlScreen,
  waitFor,
} from '../../../../../tests/utils';
import { SiteNavbar } from './site-navbar';
import { ROUTES } from 'src/utils/constants';

describe('SiteNavbar', () => {
  it('renders the main nav, a search form and a settings form', () => {
    render(<SiteNavbar />);

    expect(
      rtlScreen.getByRole('checkbox', { name: 'Open menu' })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('checkbox', { name: 'Open search' })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('checkbox', { name: 'Open settings' })
    ).toBeInTheDocument();
  });

  it('can give focus to the search input on activation', async () => {
    const user = userEvent.setup();

    render(<SiteNavbar />);

    /* It seems we cannot use it with waitFor... the assertions count is
     * inaccurate. */
    // expect.assertions(1);

    await user.click(rtlScreen.getByRole('checkbox', { name: 'Open search' }));

    await waitFor(() => {
      expect(rtlScreen.getByRole('searchbox')).toHaveFocus();
    });
  });

  it('can submit the search form', async () => {
    const user = userEvent.setup();
    const keywords = 'keywords';

    render(
      <MemoryRouterProvider>
        <SiteNavbar />
      </MemoryRouterProvider>
    );

    await user.click(rtlScreen.getByRole('checkbox', { name: 'Open search' }));
    await user.type(rtlScreen.getByRole('searchbox'), keywords);
    await user.click(rtlScreen.getByRole('button', { name: 'Search' }));

    expect(mockRouter.asPath).toBe(`${ROUTES.SEARCH}?s=${keywords}`);
  });

  it('does not submit the search form without keywords', async () => {
    const user = userEvent.setup();

    render(<SiteNavbar />);

    await user.click(rtlScreen.getByRole('checkbox', { name: 'Open search' }));
    await user.click(rtlScreen.getByRole('button', { name: 'Search' }));

    expect(
      rtlScreen.getByText(/Query must be longer than one character./)
    ).toBeInTheDocument();
  });
});
