import { getAllComments } from '@services/graphql/comments';
import { SingleComment } from '@ts/types/app';
import useSWR from 'swr';

export type UseCommentsConfig = {
  contentId?: string | number;
  fallback?: SingleComment[];
};

/**
 * Retrieve the comments of a page/article.
 *
 * @param {string | number} contentId - A page/article id.
 * @returns {SingleComment[]|undefined}
 */
const useComments = ({
  contentId,
  fallback,
}: UseCommentsConfig): SingleComment[] | undefined => {
  const { data } = useSWR(contentId ? { contentId } : null, getAllComments);

  return data || fallback;
};

export default useComments;
