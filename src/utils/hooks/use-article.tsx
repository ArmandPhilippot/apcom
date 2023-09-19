import useSWR from 'swr';
import { fetchAPI } from '../../services/graphql/api';
import { getArticleFromRawData } from '../../services/graphql/articles';
import { articleBySlugQuery } from '../../services/graphql/articles.query';
import { Article } from '../../types/app';
import { RawArticle } from '../../types/raw-data';

export type UseArticleConfig = {
  fallback?: Article;
  slug?: string;
};

/**
 * Retrieve an article by slug.
 *
 * @param {string} slug - The article slug.
 * @param {Article} fallback - A fallback article.
 * @returns {Article|undefined} The matching article if it exists.
 */
const useArticle = ({
  slug,
  fallback,
}: UseArticleConfig): Article | undefined => {
  const { data } = useSWR(
    slug ? { query: articleBySlugQuery, variables: { slug } } : null,
    fetchAPI<RawArticle, typeof articleBySlugQuery>
  );

  return data ? getArticleFromRawData(data.post) : fallback;
};

export default useArticle;
