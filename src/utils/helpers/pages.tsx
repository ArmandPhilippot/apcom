import NextImage from 'next/image';
import type { LinksWidgetItemData, PostData } from '../../components';
import type { ArticlePreview, PageLink } from '../../types';
import { ROUTES } from '../constants';

export const getUniquePageLinks = (pageLinks: PageLink[]): PageLink[] => {
  const pageLinksIds = pageLinks.map((pageLink) => pageLink.id);

  return pageLinks.filter(
    ({ id }, index) => !pageLinksIds.includes(id, index + 1)
  );
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
 * @param {ArticlePreview[]} posts - An array of articles.
 * @returns {PostData[]} An array of posts with full article URL.
 */
export const getPostsWithUrl = (posts: ArticlePreview[]): PostData[] =>
  posts.map(({ id, intro, meta, slug, title, ...post }) => {
    return {
      ...post,
      cover: meta.cover ? <NextImage {...meta.cover} /> : undefined,
      excerpt: intro,
      heading: title,
      id,
      meta: {
        publicationDate: meta.dates.publication,
        updateDate: meta.dates.update,
        wordsCount: meta.wordsCount,
        thematics: meta.thematics,
        comments: {
          count: meta.commentsCount ?? 0,
          postHeading: title,
          url: `${ROUTES.ARTICLE}/${slug}#comments`,
        },
      },
      url: `${ROUTES.ARTICLE}/${slug}`,
    };
  });
