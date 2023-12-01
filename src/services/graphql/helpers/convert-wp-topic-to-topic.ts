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

export const convertWPTopicToTopic = ({
  acfTopics,
  contentParts,
  databaseId,
  date,
  featuredImage,
  modified,
  seo,
  slug,
  title,
}: WPTopic): Topic => {
  return {
    content: contentParts.afterMore,
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      articles: acfTopics?.postsInTopic?.map(
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
      relatedThematics: acfTopics?.postsInTopic
        ? getRelatedThematicsFrom(acfTopics.postsInTopic)
        : undefined,
      website: acfTopics?.officialWebsite ?? undefined,
    },
    slug: `${ROUTES.TOPICS}/${slug}`,
    title,
  };
};
