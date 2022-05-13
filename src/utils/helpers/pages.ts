import { type Post } from '@components/organisms/layout/posts-list';
import { type LinksListItems } from '@components/organisms/widgets/links-list-widget';
import { type Meta, type PageLink } from '@ts/types/app';
import {
  type RawThematicPreview,
  type RawTopicPreview,
} from '@ts/types/raw-data';

/**
 * Convert raw data to a Link object.
 *
 * @param data - An object.
 * @param {number} data.databaseId - The data id.
 * @param {string} data.slug - The data slug.
 * @param {string} data.title - The data name.
 * @returns {PageLink} The link data (id, slug and title).
 */
export const getPageLinkFromRawData = (
  data: RawThematicPreview | RawTopicPreview
): PageLink => {
  const { databaseId, slug, title } = data;

  return {
    id: databaseId,
    name: title,
    slug,
  };
};

/**
 * Convert page link data to an array of links items.
 *
 * @param {PageLink[]} links - An array of page links.
 * @param {'thematic'|'topic'} kind - The page links kind.
 * @returns {LinksListItem[]} An array of links items.
 */
export const getLinksListItems = (
  links: PageLink[],
  kind: 'thematic' | 'topic'
): LinksListItems[] => {
  const baseUrl = kind === 'thematic' ? '/thematique/' : '/sujet/';

  return links.map((link) => {
    return {
      name: link.name,
      url: `${baseUrl}${link.slug}`,
    };
  });
};

/**
 * Retrieve the formatted meta.
 *
 * @param {Meta<'article'>} meta - The article meta.
 * @returns {Post['meta']} The formatted meta.
 */
export const getPostMeta = (meta: Meta<'article'>): Post['meta'] => {
  const { commentsCount, dates, thematics, topics, wordsCount } = meta;

  return {
    commentsCount,
    dates,
    readingTime: { wordsCount: wordsCount || 0, onlyMinutes: true },
    thematics: thematics?.map((thematic) => {
      return { ...thematic, url: `/thematique/${thematic.slug}` };
    }),
    topics: topics?.map((topic) => {
      return { ...topic, url: `/sujet/${topic.slug}` };
    }),
  };
};
