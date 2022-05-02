import { type PageLink } from '@ts/types/app';
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
