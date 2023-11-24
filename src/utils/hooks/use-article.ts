import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { convertPostToArticle, fetchPost } from '../../services/graphql';
import type { Article, Maybe } from '../../types';

export type UseArticleConfig = {
  /**
   * A fallback article
   */
  fallback?: Article;
  /**
   * The article slug
   */
  slug?: string;
};

/**
 * Retrieve an article by slug.
 *
 * @param {UseArticleConfig} config - The config.
 * @returns {Article|undefined} The matching article if it exists.
 */
export const useArticle = ({
  slug,
  fallback,
}: UseArticleConfig): Article | undefined => {
  const { data } = useSWR(slug, fetchPost, {});
  const [article, setArticle] = useState<Maybe<Article>>(fallback);

  useEffect(() => {
    if (data) convertPostToArticle(data).then((post) => setArticle(post));
  }, [data]);

  return article;
};
