import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import { getConnection } from '../../../../tests/utils/graphql';
import type { EdgesResponse, GraphQLEdgesInput, Search } from '../../../types';
import { usePagination } from './use-pagination';

type Data = {
  id: number;
  title: string;
};

describe('usePagination', () => {
  const data: Data[] = [
    { id: 1, title: 'illo sequi nihil' },
    { id: 2, title: 'atque et magni' },
    { id: 3, title: 'cupiditate ut sit' },
    { id: 4, title: 'aut rerum quisquam' },
    { id: 5, title: 'et ea officia' },
    { id: 6, title: 'ratione eos numquam' },
    { id: 7, title: 'repellat quos et' },
  ];
  const fetcher = jest.fn(
    async ({
      after,
      first,
      search,
    }: GraphQLEdgesInput & Search): Promise<EdgesResponse<Data>> => {
      const filteredData = search
        ? data.filter((d) => d.title.includes(search))
        : data;

      return Promise.resolve(
        getConnection({ after, first, data: filteredData })
      );
    }
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('can use a fetcher to retrieve data from a GraphQL API', async () => {
    /* We should use this statement because of async nature but with waitFor
     * the number of assertion in inaccurate... */
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    //expect.assertions(6);

    expect(fetcher).not.toHaveBeenCalled();

    const perPage = 10;
    const { result } = renderHook(() =>
      usePagination({
        fetcher,
        perPage,
      })
    );

    await waitFor(() => {
      // `data.length` is lower than `perPage` so 1 page.
      expect(result.current.data?.length).toBe(1);
    });
    expect(result.current.data?.[0].edges.length).toBe(data.length);
    expect(result.current.hasNextPage).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith({ first: perPage });
  });

  it('can retrieve more data from the GraphQL API', async () => {
    /* We should use this statement because of async nature but with waitFor
     * the number of assertion in inaccurate... */
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    //expect.assertions(7);

    const perPage = 5;
    const { result } = renderHook(() =>
      usePagination({
        fetcher,
        perPage,
      })
    );

    await waitFor(() => {
      expect(result.current.data?.length).toBe(1);
    });
    expect(result.current.data?.[0].edges.length).toBe(perPage);
    expect(result.current.hasNextPage).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.data?.length).toBe(2);
    expect(result.current.data?.[1].edges.length).toBe(data.length - perPage);
  });
});
