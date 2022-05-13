import { type EdgesResponse, type EdgesVars } from '@services/graphql/api';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

export type UsePaginationProps<T> = {
  /**
   * The initial data.
   */
  fallbackData: EdgesResponse<T>[];
  /**
   * A function to fetch more data.
   */
  fetcher: (props: EdgesVars) => Promise<EdgesResponse<T>>;
  /**
   * The number of results per page.
   */
  perPage: number;
  /**
   * An optional search string.
   */
  search?: string;
};

export type UsePaginationReturn<T> = {
  /**
   * The data from the API.
   */
  data?: EdgesResponse<T>[];
  /**
   * An error thrown by fetcher.
   */
  error: any;
  /**
   * Determine if there's more data to fetch.
   */
  hasNextPage?: boolean;
  /**
   * Determine if the initial data is loading.
   */
  isLoadingInitialData: boolean;
  /**
   * Determine if more data is currently loading.
   */
  isLoadingMore?: boolean;
  /**
   * Determine if the data is refreshing.
   */
  isRefreshing?: boolean;
  /**
   * Determine if there's a request or revalidation loading.
   */
  isValidating: boolean;
  /**
   * Set the number of pages that need to be fetched.
   */
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<EdgesResponse<T>[] | undefined>;
};

/**
 * Handle data fetching with pagination.
 *
 * This hook is a wrapper of `useSWRInfinite` hook.
 *
 * @param {UsePaginationProps} props - The pagination configuration.
 * @returns {UsePaginationReturn} An object with pagination data and helpers.
 */
const usePagination = <T extends object>({
  fallbackData,
  fetcher,
  perPage,
  search,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const getKey: SWRInfiniteKeyLoader = (
    pageIndex: number,
    previousData: EdgesResponse<T>
  ): EdgesVars | null => {
    // Reached the end.
    if (previousData && !previousData.edges.length) return null;

    // Fetch data using this parameters.
    return pageIndex === 0
      ? { first: perPage, search }
      : {
          first: perPage,
          after: previousData.pageInfo.endCursor,
          search,
        };
  };

  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    { fallbackData }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isRefreshing = isValidating && data && data.length === size;
  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  return {
    data,
    error,
    hasNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isRefreshing,
    isValidating,
    setSize,
  };
};

export default usePagination;
