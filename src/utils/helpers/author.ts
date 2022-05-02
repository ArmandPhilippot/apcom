import { type Author, type AuthorKind } from '@ts/types/app';
import { type RawAuthor } from '@ts/types/raw-data';

/**
 * Convert author raw data to regular data.
 *
 * @param {RawAuthor<AuthorKind>} data - The author raw data.
 * @param {AuthorKind} kind - The author kind. Either `page` or `comment`.
 * @param {number} [avatarSize] - The author avatar size.
 * @returns {Author<AuthorKind>} The author data.
 */
export const getAuthorFromRawData = (
  data: RawAuthor<typeof kind>,
  kind: AuthorKind,
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
