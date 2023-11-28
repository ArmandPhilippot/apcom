import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type ThematicsSlugsResponse = {
  thematics: Nullable<GraphQLNodes<SlugNode>>;
};

const thematicsSlugsQuery = `query ThematicsSlugs($first: Int) {
  thematics(first: $first) {
    nodes {
      slug
    }
  }
}`;

/**
 * Retrieve the WordPress thematics slugs.
 *
 * @param {number} count - The number of thematics slugs to retrieve.
 * @returns {Promise<string[]>} The thematics slugs.
 */
export const fetchAllThematicsSlugs = async (
  count: number
): Promise<string[]> => {
  const response = await fetchGraphQL<ThematicsSlugsResponse>({
    query: thematicsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: count },
  });

  if (!response.thematics)
    return Promise.reject(new Error('Unable to find the thematics slugs.'));

  return response.thematics.nodes.map((node) => node.slug);
};
