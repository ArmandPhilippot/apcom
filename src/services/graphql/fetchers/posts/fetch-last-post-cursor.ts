import type { GraphQLPageInfo, Nullable } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type LastPostCursorResponse = {
  posts: Nullable<{
    pageInfo: Pick<GraphQLPageInfo, 'endCursor'>;
  }>;
};

const lastPostCursorQuery = `query LastPostCursor($first: Int) {
  posts(first: $first) {
    pageInfo {
      endCursor
    }
  }
}`;

/**
 * Retrieve the cursor of the last post for a given number of posts.
 *
 * @param {number} count - The number of posts to fetch.
 * @returns {Promise<string>} The cursor of the last post.
 */
export const fetchLastPostCursor = async (count: number): Promise<string> => {
  const response = await fetchGraphQL<LastPostCursorResponse>({
    url: getGraphQLUrl(),
    query: lastPostCursorQuery,
    variables: { first: count },
  });

  if (!response.posts?.pageInfo.endCursor)
    return Promise.reject(
      new Error('Unable to find the cursor of the last post.')
    );

  return response.posts.pageInfo.endCursor;
};
