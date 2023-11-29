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

export const convertWPThematicToThematic = (thematic: WPThematic): Thematic => {
  return {
    content: thematic.contentParts.afterMore,
    intro: thematic.contentParts.beforeMore,
    meta: {
      articles: thematic.acfThematics?.postsInThematic?.map(
        convertPostPreviewToArticlePreview
      ),
      cover: thematic.featuredImage
        ? convertWPImgToImg(thematic.featuredImage.node)
        : undefined,
      dates: {
        publication: thematic.date,
        update: thematic.modified,
      },
      seo: {
        description: thematic.seo.metaDesc,
        title: thematic.seo.title,
      },
      relatedTopics: thematic.acfThematics?.postsInThematic
        ? getRelatedTopicsFrom(thematic.acfThematics.postsInThematic)
        : undefined,
    },
    slug: `${ROUTES.THEMATICS}/${thematic.slug}`,
    title: thematic.title,
  };
};
