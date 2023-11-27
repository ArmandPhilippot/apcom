import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLPostWhere,
  Nullable,
  RecentWPPost,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type RecentPostsResponse = {
  posts: Nullable<GraphQLConnection<RecentWPPost>>;
};

const recentPostsQuery = `query RecentPosts($after: String, $before: String, $first: Int, $last: Int, $authorName: String, $search: String, $title: String) {
  posts(
    after: $after
    before: $before
    first: $first
    last: $last
    where: {authorName: $authorName, search: $search, title: $title, orderby: {field: DATE, order: DESC}}
  ) {
    edges {
      cursor
      node {
        databaseId
        date
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
        }
        slug
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
}`;

export type FetchRecentPostsInput = GraphQLEdgesInput & {
  where?: GraphQLPostWhere;
};

/**
 * Retrieve a paginated list of recent WordPress posts.
 *
 * @param {FetchRecentPostsInput} input - The input to retrieve recent posts.
 * @returns {Promise<GraphQLConnection<RecentWPPost>>} The recent posts.
 */
export const fetchRecentPosts = async ({
  where,
  ...vars
}: FetchRecentPostsInput): Promise<GraphQLConnection<RecentWPPost>> => {
  const response = await fetchGraphQL<RecentPostsResponse>({
    query: recentPostsQuery,
    url: getGraphQLUrl(),
    variables: { ...vars, ...where },
  });

  if (!response.posts)
    return Promise.reject(new Error('No recent posts found.'));

  return response.posts;
};
