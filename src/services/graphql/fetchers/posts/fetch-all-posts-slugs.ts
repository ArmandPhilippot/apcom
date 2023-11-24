import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';
import { fetchPostsCount } from './fetch-posts-count';

type PostsSlugsResponse = {
  posts: Nullable<GraphQLNodes<SlugNode>>;
};

const postsSlugsQuery = `query PostsSlugs($first: Int) {
  posts(first: $first) {
    nodes {
      slug
    }
  }
}`;

/**
 * Retrieve the WordPress posts slugs.
 *
 * @returns {Promise<string[]>} The posts slugs.
 */
export const fetchAllPostsSlugs = async (): Promise<string[]> => {
  const postsCount = await fetchPostsCount();
  const response = await fetchGraphQL<PostsSlugsResponse>({
    query: postsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: postsCount },
  });

  if (!response.posts)
    return Promise.reject(new Error('Unable to find the posts slugs.'));

  return response.posts.nodes.map((node) => node.slug);
};
