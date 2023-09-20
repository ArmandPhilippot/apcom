import {
  type Article,
  type ArticleCard,
  type EdgesResponse,
  type EndCursorResponse,
  type GraphQLEdgesInput,
  type GraphQLPageInfo,
  type RawArticle,
  type RawArticlePreview,
  type Slug,
  type TotalItems,
} from '../../types';
import {
  getAuthorFromRawData,
  getImageFromRawData,
  getPageLinkFromRawData,
} from '../../utils/helpers';
import { fetchAPI } from './api';
import {
  articleBySlugQuery,
  articlesCardQuery,
  articlesEndCursorQuery,
  articlesQuery,
  articlesSlugQuery,
  totalArticlesQuery,
} from './articles.query';

/**
 * Retrieve the total number of articles.
 *
 * @returns {Promise<number>} - The articles total number.
 */
export const getTotalArticles = async (search?: string): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalArticlesQuery>({
    query: totalArticlesQuery,
    variables: { search },
  });

  return response.posts.pageInfo.total;
};

export type GetArticlesReturn = {
  articles: Article[];
  pageInfo: GraphQLPageInfo;
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
      author: author && getAuthorFromRawData(author.node, 'page'),
      commentsCount: commentCount || 0,
      cover: featuredImage?.node
        ? getImageFromRawData(featuredImage.node)
        : undefined,
      dates: { publication: date, update: modified },
      seo: {
        description: seo?.metaDesc || '',
        title: seo?.title || '',
      },
      thematics: acfPosts.postsInThematic?.map((thematic) =>
        getPageLinkFromRawData(thematic, 'thematic')
      ),
      topics: acfPosts.postsInTopic?.map((topic) =>
        getPageLinkFromRawData(topic, 'topic')
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
 * @param {GraphQLEdgesInput} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawArticle>>} The articles data.
 */
export const getArticles = async (
  props: GraphQLEdgesInput
): Promise<EdgesResponse<RawArticle>> => {
  const response = await fetchAPI<RawArticle, typeof articlesQuery>({
    query: articlesQuery,
    variables: { ...props },
  });

  return response.posts;
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
    dates: { publication: date },
    id: databaseId,
    slug,
    title,
  };
};

/**
 * Retrieve the given number of article cards from API.
 *
 * @param {GraphQLEdgesInput} obj - An object.
 * @param {number} obj.first - The number of articles.
 * @returns {Promise<ArticleCard[]>} - The article cards data.
 */
export const getArticlesCard = async ({
  first,
}: GraphQLEdgesInput): Promise<ArticleCard[]> => {
  const response = await fetchAPI<RawArticlePreview, typeof articlesCardQuery>({
    query: articlesCardQuery,
    variables: { first },
  });

  return response.posts.nodes.map((node) => getArticleCardFromRawData(node));
};

/**
 * Retrieve an Article object by slug.
 *
 * @param {string} slug - The article slug.
 * @returns {Promise<Article>} The requested article.
 */
export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const response = await fetchAPI<RawArticle, typeof articleBySlugQuery>({
    query: articleBySlugQuery,
    variables: { slug },
  });

  return getArticleFromRawData(response.post);
};

/**
 * Retrieve all the articles slugs.
 *
 * @returns {Promise<string[]>} - An array of articles slugs.
 */
export const getAllArticlesSlugs = async (): Promise<string[]> => {
  const totalArticles = await getTotalArticles();
  const response = await fetchAPI<Slug, typeof articlesSlugQuery>({
    query: articlesSlugQuery,
    variables: { first: totalArticles },
  });

  return response.posts.edges.map((edge) => edge.node.slug);
};

/**
 * Retrieve the last cursor.
 *
 * @param {GraphQLEdgesInput} props - An object of GraphQL variables.
 * @returns {Promise<string>} - The end cursor.
 */
export const getArticlesEndCursor = async (
  props: GraphQLEdgesInput
): Promise<string> => {
  const response = await fetchAPI<
    EndCursorResponse,
    typeof articlesEndCursorQuery
  >({
    query: articlesEndCursorQuery,
    variables: { ...props },
  });

  return response.posts.pageInfo.endCursor;
};
