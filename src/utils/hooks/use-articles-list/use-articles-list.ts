import { useCallback, useState } from 'react';
import {
  convertPostPreviewToArticlePreview,
  fetchPostsList,
} from '../../../services/graphql';
import type {
  ArticlePreview,
  GraphQLConnection,
  GraphQLEdge,
  Maybe,
  WPPostPreview,
} from '../../../types';
import {
  type UsePaginationConfig,
  usePagination,
  type UsePaginationReturn,
} from '../use-pagination';

export type useArticlesListReturn = Omit<
  UsePaginationReturn<WPPostPreview>,
  'data'
> & {
  /**
   * The articles list.
   */
  articles: Maybe<GraphQLConnection<ArticlePreview>[]>;
  /**
   * The index of the first new result when loading more posts.
   */
  firstNewResultIndex: Maybe<number>;
};

export const useArticlesList = (
  config: Omit<UsePaginationConfig<WPPostPreview>, 'fetcher'>
): useArticlesListReturn => {
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
  } = usePagination({ ...config, fetcher: fetchPostsList });
  const [firstNewResultIndex, setFirstNewResultIndex] =
    useState<Maybe<number>>(undefined);

  const handleLoadMore = useCallback(async () => {
    setFirstNewResultIndex(size * config.perPage + 1);

    await loadMore();
  }, [config.perPage, loadMore, size]);

  const articles: Maybe<GraphQLConnection<ArticlePreview>[]> = data?.map(
    ({ edges, pageInfo }): GraphQLConnection<ArticlePreview> => {
      return {
        edges: edges.map((edge): GraphQLEdge<ArticlePreview> => {
          return {
            cursor: edge.cursor,
            node: convertPostPreviewToArticlePreview(edge.node),
          };
        }),
        pageInfo,
      };
    }
  );

  return {
    articles,
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
    size,
  };
};
