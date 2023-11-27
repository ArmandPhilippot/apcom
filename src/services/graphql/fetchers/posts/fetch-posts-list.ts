import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLPostOrderBy,
  GraphQLPostWhere,
  Nullable,
  WPPostPreview,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type PostsListResponse = {
  posts: Nullable<GraphQLConnection<WPPostPreview>>;
};

const postsListQuery = `query PostsList($after: String, $before: String, $first: Int, $last: Int, $authorName: String, $orderby: [PostObjectsConnectionOrderbyInput], $search: String, $title: String) {
  posts(
    after: $after
    before: $before
    first: $first
    last: $last
    where: {authorName: $authorName, orderby: $orderby, search: $search, title: $title}
  ) {
    edges {
      cursor
      node {
        acfPosts {
          postsInThematic {
            ... on Thematic {
              databaseId
              slug
              title
            }
          }
        }
        commentCount
        contentParts {
          beforeMore
        }
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
        info {
          wordsCount
        }
        modified
        slug
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      total
    }
  }
}`;

export type FetchPostsListInput = GraphQLEdgesInput & {
  orderBy?: GraphQLPostOrderBy;
  where?: GraphQLPostWhere;
};

/**
 * Retrieve a paginated list of WordPress posts.
 *
 * @param {FetchPostsListInput} input - The input to retrieve posts.
 * @returns {Promise<GraphQLConnection<WPPostPreview>>} The paginated posts.
 */
export const fetchPostsList = async ({
  orderBy,
  where,
  ...vars
}: FetchPostsListInput): Promise<GraphQLConnection<WPPostPreview>> => {
  const response = await fetchGraphQL<PostsListResponse>({
    query: postsListQuery,
    url: getGraphQLUrl(),
    variables: {
      ...vars,
      ...where,
      orderBy: orderBy ? [orderBy] : undefined,
    },
  });

  if (!response.posts) return Promise.reject(new Error('No posts found.'));

  return response.posts;
};
