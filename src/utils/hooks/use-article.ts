import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  articleBySlugQuery,
  fetchAPI,
  getArticleFromRawData,
} from '../../services/graphql';
import type { Article, Maybe, RawArticle } from '../../types';

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
  const { data } = useSWR(
    slug ? { query: articleBySlugQuery, variables: { slug } } : null,
    fetchAPI<RawArticle, typeof articleBySlugQuery>,
    {}
  );
  const [article, setArticle] = useState<Maybe<Article>>();

  useEffect(() => {
    const getArticle = async () => {
      if (data) {
        setArticle(await getArticleFromRawData(data.post));
      } else {
        setArticle(fallback);
      }
    };

    getArticle();
  }, [data, fallback]);

  return article;
};
