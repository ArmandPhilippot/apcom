import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { fetchPostsList } from '../../../services/graphql';
import { usePostsList } from './use-posts-list';

describe('usePostsList', () => {
  it('can return the first new result index when loading more posts', async () => {
    const perPage = 5;
    const { result } = renderHook(() =>
      usePostsList({ fetcher: fetchPostsList, perPage })
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
