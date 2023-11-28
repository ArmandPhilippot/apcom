import type {
  GraphQLCommentWhere,
  GraphQLEdgesInput,
  GraphQLNodes,
  Nullable,
  WPComment,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type CommentsListResponse = {
  comments: Nullable<GraphQLNodes<WPComment>>;
};

const commentsListQuery = `query CommentsList($first: Int, $contentId: ID, $contentName: String, $status: String) {
  comments(
    first: $first
    where: {contentId: $contentId, contentName: $contentName, order: ASC, orderby: COMMENT_DATE, status: $status}
  ) {
    nodes {
      approved
      author {
        node {
          avatar {
            height
            url
            width
          }
          name
          url
        }
      }
      content
      databaseId
      date
      parentDatabaseId
      status
    }
  }
}`;

export type FetchCommentsListInput = Pick<GraphQLEdgesInput, 'first'> & {
  where?: GraphQLCommentWhere;
};

/**
 * Retrieve the comments list.
 *
 * @param {FetchCommentsListInput} input - The input to retrieve comments.
 * @returns {Promise<WPComment[]>} An array of comments.
 */
export const fetchCommentsList = async ({
  where,
  ...vars
}: FetchCommentsListInput): Promise<WPComment[]> => {
  const response = await fetchGraphQL<CommentsListResponse>({
    query: commentsListQuery,
    url: getGraphQLUrl(),
    variables: { ...vars, ...where },
  });

  if (!response.comments)
    return Promise.reject(new Error('No comments found.'));

  return response.comments.nodes;
};
