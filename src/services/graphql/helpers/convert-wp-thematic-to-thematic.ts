import type {
  PageLink,
  Thematic,
  WPPostPreview,
  WPThematic,
} from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  getUniquePageLinks,
  sortPageLinksByName,
  updateContentTree,
} from '../../../utils/helpers';
import { convertPostPreviewToArticlePreview } from './convert-post-preview-to-article-preview';
import { convertWPTopicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPImgToImg } from './convert-wp-image-to-img';

const getRelatedTopicsFrom = (posts: WPPostPreview[]): PageLink[] => {
  const topics: PageLink[] = [];

  for (const post of posts) {
    if (
      post.acfPosts &&
      'postsInTopic' in post.acfPosts &&
      post.acfPosts.postsInTopic
    ) {
      topics.push(
        ...post.acfPosts.postsInTopic.map(convertWPTopicPreviewToPageLink)
      );
    }
  }

  return getUniquePageLinks(topics).sort(sortPageLinksByName);
};

export const convertWPThematicToThematic = ({
  acfThematics,
  contentParts,
  databaseId,
  date,
  featuredImage,
  modified,
  seo,
  slug,
  title,
}: WPThematic): Thematic => {
  return {
    content: updateContentTree(contentParts.afterMore),
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      articles: acfThematics?.postsInThematic?.map(
        convertPostPreviewToArticlePreview
      ),
      cover: featuredImage ? convertWPImgToImg(featuredImage.node) : undefined,
      dates: {
        publication: date,
        update: modified,
      },
      seo: {
        description: seo.metaDesc,
        title: seo.title,
      },
      relatedTopics: acfThematics?.postsInThematic
        ? getRelatedTopicsFrom(acfThematics.postsInThematic)
        : undefined,
    },
    slug: `${ROUTES.THEMATICS}/${slug}`,
    title,
  };
};
