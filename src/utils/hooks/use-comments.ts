import useSWR from 'swr';
import {
  type FetchCommentsListInput,
  fetchCommentsList,
  convertWPCommentToComment,
  buildCommentsTree,
} from '../../services/graphql';
import type { SingleComment } from '../../types';

export type UseCommentsConfig = FetchCommentsListInput & {
  fallback?: SingleComment[];
};

/**
 * Retrieve the comments of a page/article.
 *
 * @param {string | number} contentId - A page/article id.
 * @returns {SingleComment[]|undefined}
 */
export const useComments = ({
  fallback,
  ...input
}: UseCommentsConfig): SingleComment[] | undefined => {
  const { data } = useSWR(input, fetchCommentsList, {});

  if (!data) return fallback;

  const comments = data.map(convertWPCommentToComment);
  const commentsTree = buildCommentsTree(comments);

  return commentsTree;
};
