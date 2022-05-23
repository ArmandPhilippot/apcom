import { type Post } from '@components/organisms/layout/posts-list';
import { type LinksListItems } from '@components/organisms/widgets/links-list-widget';
import { type EdgesResponse } from '@services/graphql/api';
import { getArticleFromRawData } from '@services/graphql/articles';
import { type Article, type PageLink } from '@ts/types/app';
import {
  type RawArticle,
  type RawThematicPreview,
  type RawTopicPreview,
} from '@ts/types/raw-data';
import { getImageFromRawData } from './images';

/**
 * Convert raw data to a Link object.
 *
 * @param data - An object.
 * @param {number} data.databaseId - The data id.
 * @param {number} [data.logo] - The data logo.
 * @param {string} data.slug - The data slug.
 * @param {string} data.title - The data name.
 * @returns {PageLink} The link data (id, slug and title).
 */
export const getPageLinkFromRawData = (
  data: RawThematicPreview | RawTopicPreview,
  kind: 'thematic' | 'topic'
): PageLink => {
  const { databaseId, featuredImage, slug, title } = data;
  const baseUrl = kind === 'thematic' ? '/thematique/' : '/sujet/';

  return {
    id: databaseId,
    logo: featuredImage ? getImageFromRawData(featuredImage?.node) : undefined,
    name: title,
    url: `${baseUrl}${slug}`,
  };
};

/**
 * Convert page link data to an array of links items.
 *
 * @param {PageLink[]} links - An array of page links.
 * @returns {LinksListItem[]} An array of links items.
 */
export const getLinksListItems = (links: PageLink[]): LinksListItems[] => {
  return links.map((link) => {
    return {
      name: link.name,
      url: link.url,
    };
  });
};

/**
 * Retrieve the posts list with the article URL.
 *
 * @param {Article[]} posts - An array of articles.
 * @returns {Post[]} An array of posts with full article URL.
 */
export const getPostsWithUrl = (posts: Article[]): Post[] => {
  return posts.map((post) => {
    return {
      ...post,
      url: `/article/${post.slug}`,
    };
  });
};

/**
 * Retrieve the posts list from raw data.
 *
 * @param {EdgesResponse<RawArticle>[]} rawData - The raw data.
 * @returns {Post[]} An array of posts.
 */
export const getPostsList = (rawData: EdgesResponse<RawArticle>[]): Post[] => {
  const articlesList: RawArticle[] = [];
  rawData.forEach((articleData) =>
    articleData.edges.forEach((edge) => {
      articlesList.push(edge.node);
    })
  );

  return getPostsWithUrl(
    articlesList.map((article) => getArticleFromRawData(article))
  );
};
