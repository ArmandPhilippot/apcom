import { useCallback, useEffect, useState } from 'react';
import type { PostData } from '../../../components';
import type { Maybe, RawArticle } from '../../../types';
import { getPostsList } from '../../helpers';
import {
  type UsePaginationConfig,
  usePagination,
  type UsePaginationReturn,
} from '../use-pagination';

export type usePostsListReturn = Omit<
  UsePaginationReturn<RawArticle>,
  'data'
> & {
  /**
   * The index of the first new result when loading more posts.
   */
  firstNewResultIndex: Maybe<number>;
  /**
   * The posts list.
   */
  posts: Maybe<PostData[]>;
};

export const usePostsList = (
  config: UsePaginationConfig<RawArticle>
): usePostsListReturn => {
  const {
    data,
    error,
    hasNextPage,
    isEmpty,
    isError,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isValidating,
    loadMore,
    size,
  } = usePagination(config);
  const [firstNewResultIndex, setFirstNewResultIndex] =
    useState<Maybe<number>>(undefined);
  const [posts, setPosts] = useState<Maybe<PostData[]>>(undefined);

  useEffect(() => {
    const getPosts = async () => {
      if (data) setPosts(await getPostsList(data));
    };

    getPosts();
  }, [data]);

  const handleLoadMore = useCallback(async () => {
    setFirstNewResultIndex(size * config.perPage + 1);

    await loadMore();
  }, [config.perPage, loadMore, size]);

  return {
    error,
    firstNewResultIndex,
    hasNextPage,
    isEmpty,
    isError,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isValidating,
    loadMore: handleLoadMore,
    posts,
    size,
  };
};
