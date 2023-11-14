import NextImage from 'next/image';
import type { LinksWidgetItemData, PostData } from '../../components';
import { getArticleFromRawData } from '../../services/graphql';
import type {
  Article,
  EdgesResponse,
  PageLink,
  RawArticle,
  RawThematicPreview,
  RawTopicPreview,
} from '../../types';
import { ROUTES } from '../constants';
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
  const baseUrl = `${
    kind === 'thematic' ? ROUTES.THEMATICS.INDEX : ROUTES.TOPICS
  }/`;

  return {
    id: databaseId,
    logo: featuredImage ? getImageFromRawData(featuredImage.node) : undefined,
    name: title,
    url: `${baseUrl}${slug}`,
  };
};

/**
 * Method to sort PageLink objects by name.
 *
 * @param {PageLink} a - A PageLink object.
 * @param {PageLink} b - Another PageLink object.
 * @returns {1 | -1 | 0}
 */
export const sortPageLinksByName = (a: PageLink, b: PageLink) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

/**
 * Convert page link data to an array of links items.
 *
 * @param {PageLink[]} links - An array of page links.
 * @returns {LinksListItem[]} An array of links items.
 */
export const getLinksItemData = (links: PageLink[]): LinksWidgetItemData[] =>
  links.map((link) => {
    return {
      id: `${link.id}`,
      label: link.name,
      url: link.url,
    };
  });

/**
 * Retrieve the posts list with the article URL.
 *
 * @param {Article[]} posts - An array of articles.
 * @returns {PostData[]} An array of posts with full article URL.
 */
export const getPostsWithUrl = (posts: Article[]): PostData[] =>
  posts.map(({ intro, meta, slug, title, ...post }) => {
    return {
      ...post,
      cover: meta.cover ? <NextImage {...meta.cover} /> : undefined,
      excerpt: intro,
      heading: title,
      meta: {
        publicationDate: meta.dates.publication,
        updateDate: meta.dates.update,
        wordsCount: meta.wordsCount,
        author: meta.author?.name,
        thematics: meta.thematics,
        topics: meta.topics,
        comments:
          meta.commentsCount === undefined
            ? undefined
            : {
                count: meta.commentsCount,
                postHeading: title,
                url: `${ROUTES.ARTICLE}/${slug}#comments`,
              },
      },
      url: `${ROUTES.ARTICLE}/${slug}`,
    };
  });

/**
 * Retrieve the posts list from raw data.
 *
 * @param {EdgesResponse<RawArticle>[]} rawData - The raw data.
 * @returns {PostData[]} An array of posts.
 */
export const getPostsList = (
  rawData: EdgesResponse<RawArticle>[]
): PostData[] => {
  const articlesList: RawArticle[] = [];
  rawData.forEach((articleData) => {
    articleData.edges.forEach((edge) => {
      articlesList.push(edge.node);
    });
  });

  return getPostsWithUrl(
    articlesList.map((article) => getArticleFromRawData(article))
  );
};
