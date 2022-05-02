import { type Article, type ArticleCard } from '@ts/types/app';
import {
  type RawArticle,
  type RawArticlePreview,
  type TotalItems,
} from '@ts/types/raw-data';
import { getAuthorFromRawData } from '@utils/helpers/author';
import { getDates } from '@utils/helpers/dates';
import { getImageFromRawData } from '@utils/helpers/images';
import { getPageLinkFromRawData } from '@utils/helpers/pages';
import { EdgesVars, fetchAPI, getAPIUrl, PageInfo } from './api';
import {
  articlesCardQuery,
  articlesQuery,
  totalArticlesQuery,
} from './articles.query';

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

/**
 * Convert a raw article preview to an article card.
 *
 * @param {RawArticlePreview} data - A raw article preview.
 * @returns {ArticleCard} An article card.
 */
const getArticleCardFromRawData = (data: RawArticlePreview): ArticleCard => {
  const { databaseId, date, featuredImage, slug, title } = data;

  return {
    cover: featuredImage ? getImageFromRawData(featuredImage.node) : undefined,
    dates: getDates(date, ''),
    id: databaseId,
    slug,
    title,
  };
};

/**
 * Retrieve the given number of article cards from API.
 *
 * @param {EdgesVars} obj - An object.
 * @param {number} obj.first - The number of articles.
 * @returns {Promise<ArticleCard[]>} - The article cards data.
 */
export const getArticlesCard = async ({
  first,
}: EdgesVars): Promise<ArticleCard[]> => {
  const response = await fetchAPI<RawArticlePreview, typeof articlesCardQuery>({
    api: getAPIUrl(),
    query: articlesCardQuery,
    variables: { first },
  });

  return response.posts.nodes.map((node) => getArticleCardFromRawData(node));
};
