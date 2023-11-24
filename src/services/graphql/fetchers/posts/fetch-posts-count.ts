import type {
  GraphQLPageInfo,
  GraphQLPostWhere,
  Nullable,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type PostsCountResponse = {
  posts: Nullable<{
    pageInfo: Pick<GraphQLPageInfo, 'total'>;
  }>;
};

const postsCountQuery = `query PostsCount($authorName: String, $search: String, $title: String) {
  posts(where: {authorName: $authorName, search: $search, title: $title}) {
    pageInfo {
      total
    }
  }
}`;

/**
 * Retrieve the total of WordPress posts.
 *
 * @param {GraphQLPostWhere} [input] - The input to filter the posts.
 * @returns {Promise<number>} The total number of posts.
 */
export const fetchPostsCount = async (
  input?: GraphQLPostWhere
): Promise<number> => {
  const response = await fetchGraphQL<PostsCountResponse>({
    query: postsCountQuery,
    url: getGraphQLUrl(),
    variables: { ...input },
  });

  if (!response.posts)
    return Promise.reject(
      new Error('Unable to find the total number of posts.')
    );

  return response.posts.pageInfo.total;
};
