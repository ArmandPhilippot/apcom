import type { SingleComment } from '../../../types';

/**
 * Create a comments tree with replies.
 *
 * @param {SingleComment[]} comments - A flatten comments list.
 * @returns {SingleComment[]} An array of comments with replies.
 */
export const buildCommentsTree = (
  comments: SingleComment[]
): SingleComment[] => {
  type CommentsHashTable = Record<string, SingleComment>;

  const hashTable: CommentsHashTable = Object.create(null);
  const commentsTree: SingleComment[] = [];

  comments.forEach((comment) => {
    hashTable[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      hashTable[comment.parentId].replies.push(hashTable[comment.id]);
    } else {
      commentsTree.push(hashTable[comment.id]);
    }
  });

  return commentsTree;
};
