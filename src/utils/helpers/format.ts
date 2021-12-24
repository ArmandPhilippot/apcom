import {
  Article,
  ArticlePreview,
  RawArticle,
  RawArticlePreview,
} from '@ts/types/articles';
import { Comment, RawComment } from '@ts/types/comments';
import {
  RawSubject,
  RawThematic,
  Subject,
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
    modified,
    slug,
    title,
  } = rawPost;

  const dates = {
    publication: date,
    update: modified,
  };

  const thematics = acfPosts.postsInThematic ? acfPosts.postsInThematic : [];

  const formattedPost: ArticlePreview = {
    commentCount,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    intro: contentParts.beforeMore,
    slug,
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
  const formattedPosts = rawPosts
    .filter((post) => Object.getOwnPropertyNames(post).length > 0)
    .map((post) => {
      const formattedPost = getFormattedPostPreview(post);

      return formattedPost;
    });

  return formattedPosts;
};

/**
 * Format a subject from RawSubject to Subject type.
 * @param rawSubject - A subject coming from WP GraphQL.
 * @returns A formatted subject.
 */
export const getFormattedSubject = (rawSubject: RawSubject): Subject => {
  const {
    acfSubjects,
    contentParts,
    databaseId,
    date,
    featuredImage,
    id,
    modified,
    title,
  } = rawSubject;

  const dates = {
    publication: date,
    update: modified,
  };

  const posts = getFormattedPostsList(acfSubjects.postsInSubject);

  const formattedSubject: Subject = {
    content: contentParts.afterMore,
    databaseId,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    intro: contentParts.beforeMore,
    officialWebsite: acfSubjects.officialWebsite,
    posts,
    title,
  };

  return formattedSubject;
};

/**
 * Format a thematic from RawThematic to Thematic type.
 * @param rawThematic - A thematic coming from wP GraphQL.
 * @returns A formatted thematic.
 */
export const getFormattedThematic = (rawThematic: RawThematic): Thematic => {
  const { acfThematics, contentParts, databaseId, date, id, modified, title } =
    rawThematic;

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
    intro: contentParts.beforeMore,
    posts,
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
 * Format an article from RawArticle to Article type.
 * @param rawPost - An article coming from WP GraphQL.
 * @returns A formatted article.
 */
export const getFormattedPost = (rawPost: RawArticle): Article => {
  const {
    acfPosts,
    author,
    commentCount,
    comments,
    contentParts,
    databaseId,
    date,
    id,
    modified,
    seo,
    title,
  } = rawPost;

  const dates = {
    publication: date,
    update: modified,
  };

  const formattedComments = getFormattedComments(comments.nodes);

  const formattedPost: Article = {
    author: author.node,
    commentCount,
    comments: formattedComments,
    content: contentParts.afterMore,
    databaseId,
    dates,
    id,
    intro: contentParts.beforeMore,
    seo,
    subjects: acfPosts.postsInSubject ? acfPosts.postsInSubject : [],
    thematics: acfPosts.postsInThematic ? acfPosts.postsInThematic : [],
    title,
  };

  return formattedPost;
};
