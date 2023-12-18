import useSWR from 'swr';
import { convertPostToArticle, fetchPost } from '../../../services/graphql';
import type { Article, Maybe, WPPost } from '../../../types';

export type UseArticleReturn<T extends Maybe<WPPost>> = {
  article: T extends undefined ? Maybe<Article> : Article;
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
};

export const useArticle = <T extends Maybe<WPPost>>(
  slug: string,
  fallback?: T
): UseArticleReturn<T> => {
  const { data, error, isLoading, isValidating } = useSWR(slug, fetchPost, {
    fallbackData: fallback,
  });

  if (error) console.error(error);

  return {
    article: data ? convertPostToArticle(data) : undefined,
    isError: !!error,
    isLoading: isLoading && !data,
    isValidating,
  } as UseArticleReturn<T>;
};
