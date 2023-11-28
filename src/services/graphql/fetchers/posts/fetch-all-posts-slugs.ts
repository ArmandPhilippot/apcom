import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

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
 * @param {number} count - The number of posts slugs to retrieve.
 * @returns {Promise<string[]>} The posts slugs.
 */
export const fetchAllPostsSlugs = async (count: number): Promise<string[]> => {
  const response = await fetchGraphQL<PostsSlugsResponse>({
    query: postsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: count },
  });

  if (!response.posts)
    return Promise.reject(new Error('Unable to find the posts slugs.'));

  return response.posts.nodes.map((node) => node.slug);
};
