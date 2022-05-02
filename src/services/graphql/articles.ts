import { Article } from '@ts/types/app';
import { RawArticle, TotalItems } from '@ts/types/raw-data';
import { getAuthorFromRawData } from '@utils/helpers/author';
import { getImageFromRawData } from '@utils/helpers/images';
import { getPageLinkFromRawData } from '@utils/helpers/pages';
import { EdgesVars, fetchAPI, getAPIUrl, PageInfo } from './api';
import { articlesQuery, totalArticlesQuery } from './articles.query';

/**
 * Retrieve the total number of articles.
 *
 * @returns {Promise<number>} - The articles total number.
 */
export const getTotalArticles = async (): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalArticlesQuery>({
    api: getAPIUrl(),
    query: totalArticlesQuery,
  });

  return response.posts.pageInfo.total;
};

export type GetArticlesReturn = {
  articles: Article[];
  pageInfo: PageInfo;
};

/**
 * Convert raw data to an Article object.
 *
 * @param {RawArticle} data - The page raw data.
 * @returns {Article} The page data.
 */
export const getArticleFromRawData = (data: RawArticle): Article => {
  const {
    acfPosts,
    author,
    commentCount,
    contentParts,
    databaseId,
    date,
    featuredImage,
    info,
    modified,
    slug,
    title,
    seo,
  } = data;

  return {
    content: contentParts.afterMore,
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      author: getAuthorFromRawData(author.node, 'page'),
      commentsCount: commentCount || 0,
      cover: featuredImage?.node
        ? getImageFromRawData(featuredImage.node)
        : undefined,
      dates: {
        publication: date,
        update: modified,
      },
      readingTime: info.readingTime,
      seo: {
        description: seo?.metaDesc || '',
        title: seo?.title || '',
      },
      thematics: acfPosts.postsInThematic?.map((thematic) =>
        getPageLinkFromRawData(thematic)
      ),
      topics: acfPosts.postsInTopic?.map((topic) =>
        getPageLinkFromRawData(topic)
      ),
      wordsCount: info.wordsCount,
    },
    slug,
    title,
  };
};

/**
 * Retrieve the given number of articles from API.
 *
 * @param {EdgesVars} obj - An object.
 * @param {number} obj.first - The number of articles.
 * @returns {Promise<GetArticlesReturn>} - The articles data.
 */
export const getArticles = async ({
  first,
}: EdgesVars): Promise<GetArticlesReturn> => {
  const response = await fetchAPI<RawArticle, typeof articlesQuery>({
    api: getAPIUrl(),
    query: articlesQuery,
    variables: { first },
  });

  return {
    articles: response.posts.edges.map((edge) =>
      getArticleFromRawData(edge.node)
    ),
    pageInfo: response.posts.pageInfo,
  };
};
