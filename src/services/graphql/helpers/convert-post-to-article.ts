import type { Article, WPPost } from '../../../types';
import { updateContentTree } from '../../../utils/helpers';
import { convertTaxonomyToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPImgToImg } from './convert-wp-image-to-img';

export const convertPostToArticle = async ({
  acfPosts,
  author,
  commentCount,
  contentParts,
  databaseId,
  date,
  featuredImage,
  info,
  modified,
  seo,
  slug,
  title,
}: WPPost): Promise<Article> => {
  return {
    content: await updateContentTree(contentParts.afterMore),
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      author: author.node.name,
      commentsCount: commentCount ?? 0,
      cover: featuredImage ? convertWPImgToImg(featuredImage.node) : undefined,
      dates: {
        publication: date,
        update: modified,
      },
      seo: {
        description: seo.metaDesc,
        title: seo.title,
      },
      thematics: acfPosts?.postsInThematic?.map(convertTaxonomyToPageLink),
      topics: acfPosts?.postsInTopic?.map(convertTaxonomyToPageLink),
      wordsCount: info.wordsCount,
    },
    slug,
    title,
  };
};
