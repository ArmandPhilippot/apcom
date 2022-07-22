import { fetchAPI, getAPIUrl } from '@services/graphql/api';
import {
  buildCommentsTree,
  getCommentFromRawData,
} from '@services/graphql/comments';
import { commentsQuery } from '@services/graphql/comments.query';
import { Comment } from '@ts/types/app';
import { RawComment } from '@ts/types/raw-data';
import useSWR from 'swr';

/**
 * Retrieve the comments of a page/article.
 * @param contentId - A page/article id.
 * @returns {Comment[]|undefined}
 */
const useComments = (
  contentId: string | number,
  fallback?: Comment[]
): Comment[] | undefined => {
  const { data } = useSWR(
    { api: getAPIUrl(), query: commentsQuery, variables: { contentId } },
    fetchAPI<RawComment, typeof commentsQuery>,
    { fallback }
  );

  const comments = data?.comments.nodes.map((comment) =>
    getCommentFromRawData(comment)
  );

  return comments ? buildCommentsTree(comments) : undefined;
};

export default useComments;
