import { type Author, type ContentKind } from '@ts/types/app';
import { type RawAuthor } from '@ts/types/raw-data';

/**
 * Convert author raw data to regular data.
 *
 * @param {RawAuthor<ContentKind>} data - The author raw data.
 * @param {ContentKind} kind - The author kind. Either `page` or `comment`.
 * @param {number} [avatarSize] - The author avatar size.
 * @returns {Author<ContentKind>} The author data.
 */
export const getAuthorFromRawData = (
  data: RawAuthor<typeof kind>,
  kind: ContentKind,
  avatarSize: number = 80
): Author<typeof kind> => {
  const { name, description, gravatarUrl, url } = data;

  return {
    name,
    avatar: gravatarUrl
      ? {
          alt: `${name} avatar`,
          height: avatarSize,
          src: gravatarUrl,
          width: avatarSize,
        }
      : undefined,
    description,
    website: url,
  };
};
