import type { RecentArticle, RecentWPPost } from '../../../types';
import { convertWPImgToImg } from './convert-wp-image-to-img';

/**
 * Convert a WordPress post to an article.
 *
 * @param {RecentWPPost} post - A post.
 * @returns {RecentArticle} An article.
 */
export const convertRecentPostToRecentArticle = ({
  databaseId,
  date,
  featuredImage,
  slug,
  title,
}: RecentWPPost): RecentArticle => {
  return {
    cover: featuredImage ? convertWPImgToImg(featuredImage.node) : undefined,
    id: databaseId,
    publicationDate: date,
    slug,
    title,
  };
};
