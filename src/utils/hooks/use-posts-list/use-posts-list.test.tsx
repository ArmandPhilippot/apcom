import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetchPostsList } from '../../../services/graphql';
import { usePostsList } from './use-posts-list';

const wrapper = ({ children }: { children?: ReactNode }) => {
  const map = new Map();

  return (
    <SWRConfig
      value={{
        provider: () => map,
        isOnline() {
          return true;
        },
        isVisible() {
          return true;
        },
        initFocus() {
          /* nothing */
        },
        initReconnect() {
          /* nothing */
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

describe('usePostsList', () => {
  beforeEach(() => {
    /* Not sure why it is needed, but without it Jest was complaining with `You
     * are trying to import a file after the Jest environment has been torn
     * down`... Maybe because of useSWR? */
    jest.useFakeTimers({
      doNotFake: ['queueMicrotask'],
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('can return the first new result index when loading more posts', async () => {
    const perPage = 5;
    const { result } = renderHook(
      () => usePostsList({ fetcher: fetchPostsList, perPage }),
      { wrapper }
    );

    expect.assertions(2);

    expect(result.current.firstNewResultIndex).toBeUndefined();

    await act(async () => {
      await result.current.loadMore();
    });

    // Assuming there is more than one page.
    expect(result.current.firstNewResultIndex).toBe(perPage + 1);
  });
});
