import type { ArticlePreview, WPPostPreview } from '../../../types';
import { convertWPThematicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPImgToImg } from './convert-wp-image-to-img';

export const convertPostPreviewToArticlePreview = ({
  acfPosts,
  commentCount,
  contentParts,
  databaseId,
  date,
  featuredImage,
  info,
  modified,
  slug,
  title,
}: WPPostPreview): ArticlePreview => {
  return {
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      commentsCount: typeof commentCount === 'number' ? commentCount : 0,
      cover: featuredImage ? convertWPImgToImg(featuredImage.node) : undefined,
      dates: {
        publication: date,
        update: modified,
      },
      thematics:
        acfPosts && 'postsInThematic' in acfPosts
          ? acfPosts.postsInThematic?.map(convertWPThematicPreviewToPageLink)
          : undefined,
      wordsCount: info.wordsCount,
    },
    slug,
    title,
  };
};
