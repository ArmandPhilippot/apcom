import { fetchAPI, getAPIUrl } from '@services/graphql/api';
import { getArticleFromRawData } from '@services/graphql/articles';
import { articleBySlugQuery } from '@services/graphql/articles.query';
import { Article } from '@ts/types/app';
import { RawArticle } from '@ts/types/raw-data';
import useSWR from 'swr';

/**
 * Retrieve an article by slug.
 *
 * @param {string} slug - The article slug.
 * @param {Article} fallback - A fallback article.
 * @returns {Article} The matching article.
 */
const useArticle = (slug: string, fallback: Article): Article => {
  const { data } = useSWR(
    { api: getAPIUrl(), query: articleBySlugQuery, variables: { slug } },
    fetchAPI<RawArticle, typeof articleBySlugQuery>
  );

  return data ? getArticleFromRawData(data.post) : fallback;
};

export default useArticle;
