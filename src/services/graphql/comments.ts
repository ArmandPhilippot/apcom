import { Comment } from '@ts/types/app';
import { RawComment } from '@ts/types/raw-data';
import { getAuthorFromRawData } from '@utils/helpers/author';
import { fetchAPI, getAPIUrl, SendCommentVars } from './api';
import { sendCommentMutation } from './comments.mutation';
import { commentsQuery } from './comments.query';

/**
 * Create a comments tree with replies.
 *
 * @param {Comment[]} comments - A flatten comments list.
 * @returns {Comment[]} An array of comments with replies.
 */
export const buildCommentsTree = (comments: Comment[]): Comment[] => {
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

/**
 * Convert a comment from RawComment to Comment type.
 *
 * @param {RawComment} comment - A raw comment.
 * @returns {Comment} A formatted comment.
 */
export const getCommentFromRawData = (comment: RawComment): Comment => {
  const { author, databaseId, date, parentDatabaseId, ...data } = comment;

  return {
    id: databaseId,
    meta: {
      author: getAuthorFromRawData(author.node, 'comment'),
      date,
    },
    parentId: parentDatabaseId,
    replies: [],
    ...data,
  };
};

/**
 * Retrieve a comments list by post id.
 *
 * @param {number} id - A post id.
 * @returns {Promise<Comment[]>} The comments list.
 */
export const getPostComments = async (id: number): Promise<Comment[]> => {
  const response = await fetchAPI<RawComment, typeof commentsQuery>({
    api: getAPIUrl(),
    query: commentsQuery,
    variables: { contentId: id },
  });

  const comments = response.comments.nodes.map((comment) =>
    getCommentFromRawData(comment)
  );

  return buildCommentsTree(comments);
};

export type SentComment = {
  clientMutationId: string;
  success: boolean;
  comment: {
    approved: boolean;
  } | null;
};

/**
 * Send a comment using GraphQL API.
 *
 * @param {SendCommentVars} data - The comment data.
 * @returns {Promise<SentEmail>} The mutation response.
 */
export const sendComment = async (
  data: SendCommentVars
): Promise<SentComment> => {
  const response = await fetchAPI<SentComment, typeof sendCommentMutation>({
    api: getAPIUrl(),
    query: sendCommentMutation,
    variables: { ...data },
  });

  return response.createComment;
};
