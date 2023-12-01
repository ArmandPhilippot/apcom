import { useCallback } from 'react';
import useSWRInfinite, { type SWRInfiniteKeyLoader } from 'swr/infinite';
import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  Maybe,
  Nullable,
} from '../../../types';

export type UsePaginationFetcherInput = GraphQLEdgesInput & {
  search?: string;
};

export type UsePaginationConfig<T> = Pick<GraphQLEdgesInput, 'after'> & {
  /**
   * The initial data.
   */
  fallback?: GraphQLConnection<T>[];
  /**
   * A function to fetch more data.
   */
  fetcher: (props: UsePaginationFetcherInput) => Promise<GraphQLConnection<T>>;
  /**
   * The number of results per page.
   */
  perPage: number;
  /**
   * An optional search string.
   */
  searchQuery?: string;
};

export type UsePaginationReturn<T> = {
  /**
   * The data from the API.
   */
  data: Maybe<GraphQLConnection<T>[]>;
  /**
   * An error thrown by fetcher.
   */
  error: unknown;
  /**
   * Determine if there's more data to fetch.
   */
  hasNextPage: Maybe<boolean>;
  /**
   * Determine if there is some data.
   */
  isEmpty: boolean;
  /**
   * Determine if there is some errors.
   */
  isError: boolean;
  /**
   * Determine if there is an ongoing request and no loaded data.
   */
  isLoading: boolean;
  /**
   * Determine if more data is currently loading.
   */
  isLoadingMore: boolean;
  /**
   * Determine if the data is refreshing.
   */
  isRefreshing: boolean;
  /**
   * Determine if there's a request or revalidation loading.
   */
  isValidating: boolean;
  /**
   * A callback function to load more data.
   */
  loadMore: () => Promise<void>;
  /**
   * Determine the number of pages that will be fetched and returned.
   */
  size: number;
};

/**
 * Handle data fetching with pagination.
 *
 * This hook is a wrapper of `useSWRInfinite` hook.
 *
 * @param {UsePaginationConfig<T>} props - The pagination configuration.
 * @returns {UsePaginationReturn} An object with pagination data and helpers.
 */
export const usePagination = <T>({
  after,
  fallback,
  fetcher,
  perPage,
  searchQuery,
}: UsePaginationConfig<T>): UsePaginationReturn<T> => {
  const getKey: SWRInfiniteKeyLoader<GraphQLConnection<T>> = useCallback(
    (pageIndex, previousPageData): Nullable<UsePaginationFetcherInput> => {
      if (previousPageData && !previousPageData.edges.length) return null;

      return {
        first: perPage,
        after: pageIndex === 0 ? after : previousPageData?.pageInfo.endCursor,
        search: searchQuery,
      };
    },
    [after, perPage, searchQuery]
  );

  const { data, error, isLoading, isValidating, setSize, size } =
    useSWRInfinite(getKey, fetcher, { fallbackData: fallback });

  const loadMore = useCallback(async () => {
    await setSize((prevSize) => prevSize + 1);
  }, [setSize]);

  const hasNextPage =
    data && data.length > 0 && data[data.length - 1].pageInfo.hasNextPage;

  const isLoadingMore = data
    ? isLoading || (size > 0 && typeof data[size - 1] === 'undefined')
    : false;

  const isEmpty = data?.[0]?.edges.length === 0;

  const isRefreshing = data ? isValidating && data.length === size : false;

  return {
    data,
    error,
    hasNextPage,
    isEmpty,
    isError: !!error,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isValidating,
    loadMore,
    size,
  };
};
