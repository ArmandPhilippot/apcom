import type { SingleComment, WPComment } from '../../../types';

/**
 * Convert a comment from WordPress type to SingleComment.
 *
 * @param {WPComment} comment - A raw comment from WordPress.
 * @returns {SingleComment} A comment.
 */
export const convertWPCommentToComment = (
  comment: WPComment
): SingleComment => {
  return {
    content: comment.content,
    isApproved: comment.approved,
    id: comment.databaseId,
    meta: {
      author: {
        name: comment.author.node.name,
        avatar: comment.author.node.avatar
          ? {
              alt: `${comment.author.node.name} avatar`,
              height: comment.author.node.avatar.height,
              src: comment.author.node.avatar.url,
              width: comment.author.node.avatar.width,
            }
          : undefined,
        website: comment.author.node.url ?? undefined,
      },
      date: comment.date,
    },
    parentId:
      comment.parentDatabaseId === 0 ? undefined : comment.parentDatabaseId,
    replies: [],
  };
};
