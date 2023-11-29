import type { PageLink, Topic, WPPostPreview, WPTopic } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  getUniquePageLinks,
  sortPageLinksByName,
} from '../../../utils/helpers';
import { convertPostPreviewToArticlePreview } from './convert-post-preview-to-article-preview';
import { convertWPThematicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPImgToImg } from './convert-wp-image-to-img';

const getRelatedThematicsFrom = (posts: WPPostPreview[]): PageLink[] => {
  const thematics: PageLink[] = [];

  for (const post of posts) {
    if (
      post.acfPosts &&
      'postsInThematic' in post.acfPosts &&
      post.acfPosts.postsInThematic
    ) {
      thematics.push(
        ...post.acfPosts.postsInThematic.map(convertWPThematicPreviewToPageLink)
      );
    }
  }

  return getUniquePageLinks(thematics).sort(sortPageLinksByName);
};

export const convertWPTopicToTopic = (topic: WPTopic): Topic => {
  return {
    content: topic.contentParts.afterMore,
    intro: topic.contentParts.beforeMore,
    meta: {
      articles: topic.acfTopics?.postsInTopic?.map(
        convertPostPreviewToArticlePreview
      ),
      cover: topic.featuredImage
        ? convertWPImgToImg(topic.featuredImage.node)
        : undefined,
      dates: {
        publication: topic.date,
        update: topic.modified,
      },
      seo: {
        description: topic.seo.metaDesc,
        title: topic.seo.title,
      },
      relatedThematics: topic.acfTopics?.postsInTopic
        ? getRelatedThematicsFrom(topic.acfTopics.postsInTopic)
        : undefined,
      website: topic.acfTopics?.officialWebsite ?? undefined,
    },
    slug: `${ROUTES.TOPICS}/${topic.slug}`,
    title: topic.title,
  };
};
