import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { wpPostsFixture } from '../../../../tests/fixtures';
import { getConnection } from '../../../../tests/utils/graphql';
import { convertPostPreviewToArticlePreview } from '../../../services/graphql';
import { useArticlesList } from './use-articles-list';

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

describe('useArticlesList', () => {
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
    const { result } = renderHook(() => useArticlesList({ perPage }), {
      wrapper,
    });

    expect.assertions(2);

    expect(result.current.firstNewResultIndex).toBeUndefined();

    await act(async () => {
      await result.current.loadMore();
    });

    // Assuming there is more than one page.
    expect(result.current.firstNewResultIndex).toBe(perPage + 1);
  });

  it('converts a WordPress post connection to an article connection', async () => {
    const perPage = 1;
    const { result } = renderHook(() => useArticlesList({ perPage }), {
      wrapper,
    });
    const connection = getConnection({
      after: null,
      data: wpPostsFixture,
      first: perPage,
    });

    expect.hasAssertions();

    await waitFor(() => {
      expect(result.current.articles).toBeDefined();
    });

    expect(result.current.articles).toStrictEqual([
      {
        edges: connection.edges.map((edge) => {
          return {
            cursor: edge.cursor,
            node: convertPostPreviewToArticlePreview(edge.node),
          };
        }),
        pageInfo: {
          endCursor: connection.pageInfo.endCursor,
          hasNextPage: connection.pageInfo.hasNextPage,
          total: connection.pageInfo.total,
        },
      },
    ]);
  });
});
