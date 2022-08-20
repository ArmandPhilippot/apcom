import { fetchAPI } from '@services/graphql/api';
import {
  buildCommentsTree,
  getCommentFromRawData,
} from '@services/graphql/comments';
import { commentsQuery } from '@services/graphql/comments.query';
import { Comment } from '@ts/types/app';
import { RawComment } from '@ts/types/raw-data';
import useSWR from 'swr';

export type UseCommentsConfig = {
  contentId?: string | number;
  fallback?: Comment[];
};

/**
 * Retrieve the comments of a page/article.
 *
 * @param {string | number} contentId - A page/article id.
 * @returns {Comment[]|undefined}
 */
const useComments = ({
  contentId,
  fallback,
}: UseCommentsConfig): Comment[] | undefined => {
  const { data } = useSWR(
    contentId ? { query: commentsQuery, variables: { contentId } } : null,
    fetchAPI<RawComment, typeof commentsQuery>
  );

  const comments = data?.comments.nodes.map((comment) =>
    getCommentFromRawData(comment)
  );

  return comments ? buildCommentsTree(comments) : fallback;
};

export default useComments;
