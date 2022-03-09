import { ParamsIds, ParamsSlug, Slug } from '@ts/types/app';
import {
  Article,
  ArticlePreview,
  RawArticle,
  RawArticlePreview,
} from '@ts/types/articles';
import { Comment, RawComment } from '@ts/types/comments';
import {
  RawTopic,
  RawTopicPreview,
  RawThematic,
  Topic,
  TopicPreview,
  Thematic,
} from '@ts/types/taxonomies';

/**
 * Format a post preview from RawArticlePreview to ArticlePreview type.
 * @param rawPost - A post preview coming from WP GraphQL.
 * @returns A formatted post preview.
 */
export const getFormattedPostPreview = (rawPost: RawArticlePreview) => {
  const {
    acfPosts,
    commentCount,
    contentParts,
    date,
    featuredImage,
    id,
    info,
    modified,
    slug,
    title,
  } = rawPost;

  const dates = {
    publication: date,
    update: modified,
  };

  const topics = acfPosts.postsInTopic ? acfPosts.postsInTopic : [];
  const thematics = acfPosts.postsInThematic ? acfPosts.postsInThematic : [];

  const formattedPost: ArticlePreview = {
    commentCount,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    info,
    intro: contentParts.beforeMore,
    slug,
    topics,
    thematics,
    title,
  };

  return formattedPost;
};

/**
 * Format an array of posts list from RawArticlePreview to ArticlePreview type.
 * @param rawPosts - A posts list coming from WP GraphQL.
 * @returns A formatted posts list.
 */
export const getFormattedPostsList = (
  rawPosts: RawArticlePreview[]
): ArticlePreview[] => {
  return rawPosts
    .filter((post) => Object.getOwnPropertyNames(post).length > 0)
    .map((post) => {
      return getFormattedPostPreview(post);
    });
};

/**
 * Format a topic from RawTopic to Topic type.
 * @param rawTopic - A topic coming from WP GraphQL.
 * @returns A formatted topic.
 */
export const getFormattedTopic = (rawTopic: RawTopic): Topic => {
  const {
    acfTopics,
    contentParts,
    databaseId,
    date,
    featuredImage,
    id,
    info,
    modified,
    seo,
    title,
  } = rawTopic;

  const dates = {
    publication: date,
    update: modified,
  };

  const posts = getFormattedPostsList(acfTopics.postsInTopic);

  const formattedTopic: Topic = {
    content: contentParts.afterMore,
    databaseId,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    info,
    intro: contentParts.beforeMore,
    officialWebsite: acfTopics.officialWebsite,
    posts,
    seo,
    title,
  };

  return formattedTopic;
};

/**
 * Format a thematic from RawThematic to Thematic type.
 * @param rawThematic - A thematic coming from wP GraphQL.
 * @returns A formatted thematic.
 */
export const getFormattedThematic = (rawThematic: RawThematic): Thematic => {
  const {
    acfThematics,
    contentParts,
    databaseId,
    date,
    id,
    info,
    modified,
    seo,
    title,
  } = rawThematic;

  const dates = {
    publication: date,
    update: modified,
  };

  const posts = getFormattedPostsList(acfThematics.postsInThematic);

  const formattedThematic: Thematic = {
    content: contentParts.afterMore,
    databaseId,
    dates,
    id,
    info,
    intro: contentParts.beforeMore,
    posts,
    seo,
    title,
  };

  return formattedThematic;
};

/**
 * Format a comments list from RawComment to Comment type.
 * @param rawComments - A comments list coming from WP GraphQL.
 * @returns A formatted comments list.
 */
export const getFormattedComments = (rawComments: RawComment[]): Comment[] => {
  const formattedComments: Comment[] = rawComments.map((comment) => {
    const formattedComment: Comment = {
      ...comment,
      author: comment.author.node,
      replies: [],
    };

    return formattedComment;
  });

  return formattedComments;
};

/**
 * Create a comments tree with replies.
 * @param comments - A flatten comments list.
 * @returns An array of comments with replies.
 */
export const buildCommentsTree = (comments: Comment[]) => {
  type CommentsHashTable = {
    [key: string]: Comment;
  };

  const hashTable: CommentsHashTable = Object.create(null);
  const commentsTree: Comment[] = [];

  comments.forEach(
    (comment) => (hashTable[comment.databaseId] = { ...comment, replies: [] })
  );

  comments.forEach((comment) => {
    if (!comment.parentDatabaseId) {
      commentsTree.push(hashTable[comment.databaseId]);
    } else {
      hashTable[comment.parentDatabaseId].replies.push(
        hashTable[comment.databaseId]
      );
    }
  });

  return commentsTree;
};

export const getFormattedTopicsPreview = (
  topics: RawTopicPreview[]
): TopicPreview[] => {
  const formattedTopics: TopicPreview[] = topics.map((topic) => {
    return {
      ...topic,
      featuredImage: topic.featuredImage ? topic.featuredImage.node : null,
    };
  });

  return formattedTopics;
};

/**
 * Format an article from RawArticle to Article type.
 * @param rawPost - An article coming from WP GraphQL.
 * @returns A formatted article.
 */
export const getFormattedPost = (rawPost: RawArticle): Article => {
  const {
    acfPosts,
    author,
    commentCount,
    contentParts,
    databaseId,
    date,
    featuredImage,
    id,
    info,
    modified,
    seo,
    title,
  } = rawPost;

  const dates = {
    publication: date,
    update: modified,
  };

  const topics = acfPosts.postsInTopic
    ? getFormattedTopicsPreview(acfPosts.postsInTopic)
    : [];

  const formattedPost: Article = {
    author: author.node,
    commentCount,
    content: contentParts.afterMore,
    databaseId,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    info,
    intro: contentParts.beforeMore,
    seo,
    topics,
    thematics: acfPosts.postsInThematic ? acfPosts.postsInThematic : [],
    title,
  };

  return formattedPost;
};

/**
 * Converts a date to a string by using the specified locale.
 * @param {string} date The date.
 * @param {string} locale A locale.
 * @returns {string} The formatted date to locale date string.
 */
export const getFormattedDate = (date: string, locale: string) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(date).toLocaleDateString(locale, dateOptions);
};

/**
 * Convert an array of slugs to an array of params with slug.
 * @param {Slug} array - An array of object with slug.
 * @returns {ParamsSlug} An array of params with slug.
 */
export const getFormattedPaths = (array: Slug[]): ParamsSlug[] => {
  return array.map((object) => {
    return { params: { slug: object.slug } };
  });
};

/**
 * Convert a number of pages to an array of params with ids.
 * @param {number} totalPages - The total pages.
 * @returns {ParamsIds} An array of params with ids.
 */
export const getFormattedPageNumbers = (totalPages: number): ParamsIds[] => {
  const paths = [];

  for (let i = 1; i <= totalPages; i++) {
    paths.push({ params: { id: `${i}` } });
  }

  return paths;
};
