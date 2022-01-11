import {
  Article,
  ArticlePreview,
  RawArticle,
  RawArticlePreview,
} from '@ts/types/articles';
import { Comment, RawComment } from '@ts/types/comments';
import {
  RawSubject,
  RawSubjectPreview,
  RawThematic,
  Subject,
  SubjectPreview,
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

  const subjects = acfPosts.postsInSubject ? acfPosts.postsInSubject : [];
  const thematics = acfPosts.postsInThematic ? acfPosts.postsInThematic : [];

  const formattedPost: ArticlePreview = {
    commentCount,
    dates,
    featuredImage: featuredImage ? featuredImage.node : null,
    id,
    intro: contentParts.beforeMore,
    slug,
    subjects,
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
    seo,
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
    seo,
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
  const {
    acfThematics,
    contentParts,
    databaseId,
    date,
    id,
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
    (comment) => (hashTable[comment.id] = { ...comment, replies: [] })
  );

  comments.forEach((comment) => {
    if (!comment.parentId) {
      commentsTree.push(hashTable[comment.id]);
    } else {
      hashTable[comment.parentId].replies.push(hashTable[comment.id]);
    }
  });

  return commentsTree;
};

export const getFormattedSubjectsPreview = (
  subjects: RawSubjectPreview[]
): SubjectPreview[] => {
  const formattedSubjects: SubjectPreview[] = subjects.map((subject) => {
    return {
      ...subject,
      featuredImage: subject.featuredImage ? subject.featuredImage.node : null,
    };
  });

  return formattedSubjects;
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
  const commentsTree = buildCommentsTree(formattedComments);
  const subjects = acfPosts.postsInSubject
    ? getFormattedSubjectsPreview(acfPosts.postsInSubject)
    : [];

  const formattedPost: Article = {
    author: author.node,
    commentCount,
    comments: commentsTree,
    content: contentParts.afterMore,
    databaseId,
    dates,
    id,
    intro: contentParts.beforeMore,
    seo,
    subjects,
    thematics: acfPosts.postsInThematic ? acfPosts.postsInThematic : [],
    title,
  };

  return formattedPost;
};
